'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// ─── types ────────────────────────────────────────────────
interface Lead {
  id: string; created_at: string; source: string; lang: string;
  name: string; contact: string; need?: string; project?: string;
  format?: string; budget?: string; message?: string; status?: string; note?: string;
}
interface Service {
  id: string; lang: string; sort_order: number; num: string;
  title: string; desc_text: string; list_items: string[]; published: boolean;
}
interface Case {
  id: string; lang: string; sort_order: number; kind: string; title: string;
  task_text: string; done_text: string; result_text: string; is_large: boolean; published: boolean;
}
interface Pricing {
  id: string; lang: string; sort_order: number; num: string; title: string;
  price: string; desc_text: string; note_text: string; published: boolean;
}
interface ProcessStep {
  id: string; lang: string; sort_order: number; num: string; title: string; text: string; published: boolean;
}
interface FaqItem {
  id: string; lang: string; sort_order: number; question: string; answer: string; published: boolean;
}

type Tab = 'leads' | 'services' | 'cases' | 'pricing' | 'process' | 'faq';

// ─── design tokens ────────────────────────────────────────
const s = {
  bg: '#0d0e0b', panel: '#13140f', panel2: '#181a14',
  line: 'rgba(244,241,232,.11)', line2: 'rgba(244,241,232,.18)',
  text: '#f4f1e8', muted: '#8d8b82', soft: 'rgba(244,241,232,.66)',
  accent: '#d7f56f', cyan: '#7df9d2', bad: '#ff8a7a',
};
const btn = (ghost = false, danger = false): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 36, padding: '8px 14px',
  background: danger ? 'rgba(255,138,122,.08)' : ghost ? 'rgba(244,241,232,.04)' : s.accent,
  border: `1px solid ${danger ? 'rgba(255,138,122,.35)' : ghost ? s.line2 : s.accent}`,
  color: danger ? s.bad : ghost ? s.text : '#111',
  fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 10, fontWeight: 900,
  letterSpacing: '.08em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: '.18s',
});
const field: React.CSSProperties = {
  width: '100%', background: 'rgba(13,14,11,.7)', border: `1px solid ${s.line}`,
  color: s.text, padding: '10px 12px', outline: 0, fontFamily: 'inherit', fontSize: 13,
};
const label: React.CSSProperties = {
  display: 'block', marginBottom: 5,
  fontFamily: "'Unbounded',system-ui,sans-serif",
  fontSize: 9, fontWeight: 900, letterSpacing: '.1em',
  textTransform: 'uppercase', color: s.muted,
};

const PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || 'demo';

// ─── helpers ──────────────────────────────────────────────
function Field({ lbl, value, onChange, textarea, rows }: {
  lbl: string; value: string; onChange: (v: string) => void; textarea?: boolean; rows?: number;
}) {
  return (
    <div>
      <span style={label}>{lbl}</span>
      {textarea
        ? <textarea style={{ ...field, minHeight: (rows ?? 3) * 28 }} value={value} onChange={e => onChange(e.target.value)} />
        : <input style={{ ...field, minHeight: 40 }} value={value} onChange={e => onChange(e.target.value)} />
      }
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} style={{
      ...btn(true), background: value ? 'rgba(215,245,111,.12)' : 'rgba(244,241,232,.04)',
      borderColor: value ? 'rgba(215,245,111,.4)' : s.line2,
      color: value ? s.accent : s.muted,
    }}>
      {value ? '● published' : '○ draft'}
    </button>
  );
}

// ─── main component ───────────────────────────────────────
export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [tab, setTab] = useState<Tab>('leads');
  const [toast, setToast] = useState('');
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  // data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [process, setProcess] = useState<ProcessStep[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const fetchAll = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const [leadsR, servR, casesR, pricR, procR, faqR] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('services').select('*').eq('lang', lang).order('sort_order'),
      supabase.from('cases').select('*').eq('lang', lang).order('sort_order'),
      supabase.from('pricing').select('*').eq('lang', lang).order('sort_order'),
      supabase.from('process_steps').select('*').eq('lang', lang).order('sort_order'),
      supabase.from('faq').select('*').eq('lang', lang).order('sort_order'),
    ]);
    setLeads(leadsR.data ?? []);
    setServices(servR.data ?? []);
    setCases(casesR.data ?? []);
    setPricing(pricR.data ?? []);
    setProcess(procR.data ?? []);
    setFaq(faqR.data ?? []);
    setLoading(false);
  }, [lang]);

  useEffect(() => { if (authed) fetchAll(); }, [authed, fetchAll]);

  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: s.bg, padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380, border: `1px solid ${s.line2}`, background: s.panel, padding: 34 }}>
        <div style={{ fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: '-.04em', marginBottom: 6, color: s.text }}>
          sakha<i style={{ fontStyle: 'normal', color: s.accent }}>sites</i>
        </div>
        <p style={{ color: s.muted, fontSize: 13, marginBottom: 24 }}>cms · admin</p>
        <div style={{ display: 'grid', gap: 10 }}>
          <input style={{ ...field, minHeight: 44 }} type="password" placeholder="пароль" value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (pass === PASS ? setAuthed(true) : setErr('Неверный пароль'))} />
          <button style={{ ...btn(), justifyContent: 'center' }}
            onClick={() => pass === PASS ? (setAuthed(true), setErr('')) : setErr('Неверный пароль')}>
            войти
          </button>
          {err && <div style={{ border: '1px solid rgba(255,138,122,.35)', background: 'rgba(255,138,122,.08)', color: s.bad, padding: '10px 12px', fontSize: 13 }}>{err}</div>}
        </div>
      </div>
    </div>
  );

  const TABS: { id: Tab; label: string }[] = [
    { id: 'leads', label: 'заявки' },
    { id: 'services', label: 'услуги' },
    { id: 'cases', label: 'кейсы' },
    { id: 'pricing', label: 'цены' },
    { id: 'process', label: 'процесс' },
    { id: 'faq', label: 'faq' },
  ];

  return (
    <div style={{ background: s.bg, minHeight: '100vh', fontFamily: "'Manrope',system-ui,sans-serif", color: s.text }}>
      {/* topbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 22px', borderBottom: `1px solid ${s.line}`, background: 'rgba(13,14,11,.9)', position: 'sticky', top: 0, backdropFilter: 'blur(14px)', zIndex: 10 }}>
        <div style={{ fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 18, fontWeight: 900, letterSpacing: '-.05em' }}>
          sakha<i style={{ fontStyle: 'normal', color: s.accent }}>sites</i>
          <small style={{ display: 'inline-block', marginLeft: 10, color: s.muted, fontSize: 9, fontWeight: 700, letterSpacing: '.12em', verticalAlign: 'middle' }}>CMS</small>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* lang toggle */}
          <div style={{ display: 'flex', border: `1px solid ${s.line2}` }}>
            {(['ru','en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '6px 12px', fontSize: 10, fontWeight: 700, fontFamily: "'Unbounded',system-ui,sans-serif",
                background: lang === l ? s.text : 'transparent',
                color: lang === l ? '#111' : s.muted,
                border: 'none', cursor: 'pointer', letterSpacing: '.08em',
              }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button onClick={fetchAll} style={btn(true)}>↻ обновить</button>
          <button onClick={() => setAuthed(false)} style={btn(false, true)}>выйти</button>
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${s.line}`, background: s.panel, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '14px 22px', fontSize: 11, fontWeight: 800, letterSpacing: '.08em',
            textTransform: 'uppercase', fontFamily: "'Unbounded',system-ui,sans-serif",
            background: 'transparent', color: tab === t.id ? s.accent : s.muted,
            borderBottom: tab === t.id ? `2px solid ${s.accent}` : '2px solid transparent',
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: '.15s',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 22px 80px' }}>
        {loading
          ? <div style={{ padding: 60, textAlign: 'center', color: s.muted, fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 12 }}>загрузка...</div>
          : <>
            {tab === 'leads'    && <LeadsPanel    leads={leads}   setLeads={setLeads}   showToast={showToast} />}
            {tab === 'services' && <ServicesPanel data={services} setData={setServices} lang={lang} showToast={showToast} />}
            {tab === 'cases'    && <CasesPanel    data={cases}    setData={setCases}    lang={lang} showToast={showToast} />}
            {tab === 'pricing'  && <PricingPanel  data={pricing}  setData={setPricing}  lang={lang} showToast={showToast} />}
            {tab === 'process'  && <ProcessPanel  data={process}  setData={setProcess}  lang={lang} showToast={showToast} />}
            {tab === 'faq'      && <FaqPanel      data={faq}      setData={setFaq}      lang={lang} showToast={showToast} />}
          </>
        }
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 22, right: 22, border: `1px solid rgba(215,245,111,.35)`, background: s.panel, color: s.accent, padding: '13px 18px', fontSize: 13, fontWeight: 700, boxShadow: '0 12px 40px rgba(0,0,0,.4)', zIndex: 50 }}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── LEADS PANEL ──────────────────────────────────────────
function LeadsPanel({ leads, setLeads, showToast }: { leads: Lead[]; setLeads: (v: Lead[]) => void; showToast: (m: string) => void }) {
  const [filter, setFilter] = useState<'all' | 'quick' | 'brief'>('all');
  const [search, setSearch] = useState('');

  const updateStatus = async (id: string, status: string) => {
    if (!supabase) return;
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
    showToast('Статус сохранён');
  };
  const updateNote = async (id: string, note: string) => {
    if (!supabase) return;
    await supabase.from('leads').update({ note }).eq('id', id);
    showToast('Заметка сохранена');
  };
  const del = async (id: string) => {
    if (!supabase || !confirm('Удалить заявку?')) return;
    await supabase.from('leads').delete().eq('id', id);
    setLeads(leads.filter(l => l.id !== id));
    showToast('Удалено');
  };

  const filtered = leads.filter(l => {
    if (filter !== 'all' && l.source !== filter) return false;
    if (search) { const q = search.toLowerCase(); return [l.name, l.contact, l.project, l.need, l.message].some(v => v?.toLowerCase().includes(q)); }
    return true;
  });

  const stats = {
    total: leads.length,
    newLeads: leads.filter(l => !l.status || l.status === 'новая').length,
    today: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length,
    quick: leads.filter(l => l.source === 'quick').length,
    brief: leads.filter(l => l.source === 'brief').length,
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 22 }}>
        {[['всего', stats.total, false], ['новые', stats.newLeads, true], ['сегодня', stats.today, false], ['quick', stats.quick, false], ['бриф', stats.brief, false]].map(([l, v, acc]) => (
          <div key={l as string} style={{ border: `1px solid ${s.line}`, background: 'rgba(244,241,232,.025)', padding: '14px 16px' }}>
            <b style={{ display: 'block', fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 24, fontWeight: 900, color: acc ? s.accent : s.text }}>{v as number}</b>
            <span style={{ color: s.muted, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em' }}>{l as string}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {(['all','quick','brief'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ ...btn(filter !== f), background: filter === f ? s.accent : 'rgba(244,241,232,.025)', color: filter === f ? '#111' : s.soft }}>
            {f === 'all' ? 'все' : f}
          </button>
        ))}
        <input style={{ ...field, flex: 1, minWidth: 180, maxWidth: 280, minHeight: 36 }} placeholder="поиск..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0
        ? <div style={{ padding: '60px 20px', textAlign: 'center', color: s.muted }}>заявок нет</div>
        : (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${s.line}`, fontSize: 13 }}>
            <thead>
              <tr>{['имя','контакт','задача','формат','бюджет','статус','дата',''].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', background: s.panel2, color: s.muted, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', borderBottom: `1px solid ${s.line}` }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} style={{ borderBottom: `1px solid ${s.line}` }}>
                  <td style={{ padding: '12px', verticalAlign: 'top', fontWeight: 700 }}>
                    {lead.name}
                    <span style={{ display: 'block', marginTop: 4, fontSize: 10, color: lead.source === 'quick' ? s.accent : s.muted }}>{lead.source}</span>
                  </td>
                  <td style={{ padding: '12px', color: s.soft, verticalAlign: 'top', fontSize: 12 }}>{lead.contact}</td>
                  <td style={{ padding: '12px', color: s.soft, verticalAlign: 'top', maxWidth: 180, fontSize: 12 }}>{lead.project || lead.need || lead.message || '—'}</td>
                  <td style={{ padding: '12px', color: s.soft, verticalAlign: 'top', fontSize: 12 }}>{lead.format || '—'}</td>
                  <td style={{ padding: '12px', color: s.soft, verticalAlign: 'top', fontSize: 12 }}>{lead.budget || '—'}</td>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <select value={lead.status || 'новая'} onChange={e => updateStatus(lead.id, e.target.value)}
                      style={{ ...field, minHeight: 34, width: 'auto', fontSize: 12 }}>
                      {['новая','в работе','отложена','закрыта'].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <textarea defaultValue={lead.note || ''} placeholder="заметка"
                      style={{ ...field, marginTop: 6, minHeight: 52, fontSize: 12, resize: 'vertical' }}
                      onBlur={e => updateNote(lead.id, e.target.value)} />
                  </td>
                  <td style={{ padding: '12px', color: s.muted, fontSize: 11, verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                    {new Date(lead.created_at).toLocaleString('ru', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit' })}
                  </td>
                  <td style={{ padding: '12px', verticalAlign: 'top' }}>
                    <button onClick={() => del(lead.id)} style={btn(false, true)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </>
  );
}

// ─── GENERIC CRUD LIST ────────────────────────────────────
function CrudList<T extends { id: string; published: boolean }>({
  data, onDelete, onToggle, renderRow, renderForm, addLabel,
  emptyForm, tableName,
}: {
  data: T[];
  onDelete: (id: string) => void;
  onToggle: (id: string, pub: boolean) => void;
  renderRow: (item: T) => React.ReactNode;
  renderForm: (item: T, onChange: (updated: T) => void, onSave: () => void, onCancel: () => void) => React.ReactNode;
  addLabel: string;
  emptyForm: Omit<T, 'id'>;
  tableName: string;
}) {
  const [editing, setEditing] = useState<T | null>(null);
  const [draft, setDraft] = useState<T | null>(null);
  const [adding, setAdding] = useState(false);
  const [addDraft, setAddDraft] = useState<Omit<T, 'id'> | null>(null);

  const startEdit = (item: T) => { setEditing(item); setDraft({ ...item }); setAdding(false); };
  const cancelEdit = () => { setEditing(null); setDraft(null); };

  const startAdd = () => { setAdding(true); setAddDraft({ ...emptyForm }); setEditing(null); };
  const cancelAdd = () => { setAdding(false); setAddDraft(null); };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={startAdd} style={btn()}>+ {addLabel}</button>
      </div>

      {adding && addDraft && (
        <div style={{ border: `1px solid rgba(215,245,111,.3)`, background: 'rgba(215,245,111,.03)', padding: 22, marginBottom: 16 }}>
          <div style={{ marginBottom: 14, color: s.accent, fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase' }}>+ новая запись</div>
          {renderForm(
            { ...addDraft, id: '' } as T,
            (upd) => setAddDraft({ ...upd }),
            async () => {
              if (!supabase) return;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { id: _id, ...payload } = addDraft as T & { id: string };
              const { error } = await supabase.from(tableName).insert([payload]);
              if (!error) { cancelAdd(); window.location.reload(); }
            },
            cancelAdd,
          )}
        </div>
      )}

      <div style={{ display: 'grid', gap: 8 }}>
        {data.map(item => (
          <div key={item.id} style={{ border: `1px solid ${editing?.id === item.id ? 'rgba(215,245,111,.4)' : s.line}`, background: editing?.id === item.id ? 'rgba(215,245,111,.03)' : 'rgba(244,241,232,.02)', padding: editing?.id === item.id ? 22 : '14px 18px' }}>
            {editing?.id === item.id && draft
              ? renderForm(draft, (upd) => setDraft(upd as T), async () => {
                  if (!supabase || !draft) return;
                  await supabase.from(tableName).update(draft).eq('id', draft.id);
                  cancelEdit();
                  window.location.reload();
                }, cancelEdit)
              : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>{renderRow(item)}</div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <Toggle value={item.published} onChange={pub => onToggle(item.id, pub)} />
                    <button onClick={() => startEdit(item)} style={btn(true)}>✎ ред.</button>
                    <button onClick={() => onDelete(item.id)} style={btn(false, true)}>✕</button>
                  </div>
                </div>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SERVICES PANEL ───────────────────────────────────────
function ServicesPanel({ data, setData, lang, showToast }: { data: Service[]; setData: (v: Service[]) => void; lang: string; showToast: (m: string) => void }) {
  const del = async (id: string) => {
    if (!supabase || !confirm('Удалить?')) return;
    await supabase.from('services').delete().eq('id', id);
    setData(data.filter(d => d.id !== id)); showToast('Удалено');
  };
  const toggle = async (id: string, pub: boolean) => {
    if (!supabase) return;
    await supabase.from('services').update({ published: pub }).eq('id', id);
    setData(data.map(d => d.id === id ? { ...d, published: pub } : d)); showToast('Сохранено');
  };

  return (
    <CrudList
      data={data} onDelete={del} onToggle={toggle} tableName="services"
      addLabel="добавить услугу"
      emptyForm={{ lang, sort_order: data.length + 1, num: String(data.length + 1).padStart(2,'0'), title: '', desc_text: '', list_items: [''], published: true }}
      renderRow={item => (
        <div>
          <span style={{ fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 10, color: s.accent, marginRight: 10 }}>{item.num}</span>
          <b style={{ fontSize: 15 }}>{item.title}</b>
          <p style={{ marginTop: 4, color: s.muted, fontSize: 12 }}>{item.desc_text}</p>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {item.list_items.map((li, i) => <span key={i} style={{ fontSize: 11, color: s.soft, background: 'rgba(244,241,232,.06)', padding: '3px 8px', border: `1px solid ${s.line}` }}>{li}</span>)}
          </div>
        </div>
      )}
      renderForm={(item, onChange, onSave, onCancel) => (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 10 }}>
            <Field lbl="Номер" value={item.num} onChange={v => onChange({ ...item, num: v })} />
            <Field lbl="Заголовок" value={item.title} onChange={v => onChange({ ...item, title: v })} />
          </div>
          <Field lbl="Описание" value={item.desc_text} onChange={v => onChange({ ...item, desc_text: v })} textarea rows={2} />
          <div>
            <span style={label}>Пункты списка (каждый с новой строки)</span>
            <textarea style={{ ...field, minHeight: 80 }}
              value={item.list_items.join('\n')}
              onChange={e => onChange({ ...item, list_items: e.target.value.split('\n').filter(Boolean) })} />
          </div>
          <Field lbl="Порядок" value={String(item.sort_order)} onChange={v => onChange({ ...item, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onSave} style={btn()}>сохранить</button>
            <button onClick={onCancel} style={btn(true)}>отмена</button>
          </div>
        </div>
      )}
    />
  );
}

// ─── CASES PANEL ──────────────────────────────────────────
function CasesPanel({ data, setData, lang, showToast }: { data: Case[]; setData: (v: Case[]) => void; lang: string; showToast: (m: string) => void }) {
  const del = async (id: string) => {
    if (!supabase || !confirm('Удалить?')) return;
    await supabase.from('cases').delete().eq('id', id);
    setData(data.filter(d => d.id !== id)); showToast('Удалено');
  };
  const toggle = async (id: string, pub: boolean) => {
    if (!supabase) return;
    await supabase.from('cases').update({ published: pub }).eq('id', id);
    setData(data.map(d => d.id === id ? { ...d, published: pub } : d)); showToast('Сохранено');
  };

  return (
    <CrudList
      data={data} onDelete={del} onToggle={toggle} tableName="cases"
      addLabel="добавить кейс"
      emptyForm={{ lang, sort_order: data.length + 1, kind: '', title: '', task_text: '', done_text: '', result_text: '', is_large: false, published: true }}
      renderRow={item => (
        <div>
          <span style={{ fontSize: 10, color: s.cyan, fontFamily: "'Unbounded',system-ui,sans-serif", marginRight: 10 }}>{item.kind}</span>
          {item.is_large && <span style={{ fontSize: 9, color: s.muted, border: `1px solid ${s.line}`, padding: '2px 6px', marginRight: 8 }}>wide</span>}
          <b style={{ fontSize: 15 }}>{item.title}</b>
          <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {[['задача', item.task_text], ['сделано', item.done_text], ['результат', item.result_text]].map(([k, v]) => (
              <div key={k as string}><span style={{ fontSize: 9, color: s.accent, textTransform: 'uppercase', letterSpacing: '.08em' }}>{k}</span><p style={{ fontSize: 12, color: s.muted, marginTop: 2 }}>{v as string}</p></div>
            ))}
          </div>
        </div>
      )}
      renderForm={(item, onChange, onSave, onCancel) => (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field lbl="Тег (kind)" value={item.kind} onChange={v => onChange({ ...item, kind: v })} />
            <Field lbl="Заголовок" value={item.title} onChange={v => onChange({ ...item, title: v })} />
          </div>
          <Field lbl="Задача" value={item.task_text} onChange={v => onChange({ ...item, task_text: v })} textarea rows={2} />
          <Field lbl="Что сделано" value={item.done_text} onChange={v => onChange({ ...item, done_text: v })} textarea rows={2} />
          <Field lbl="Результат" value={item.result_text} onChange={v => onChange({ ...item, result_text: v })} textarea rows={2} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ flex: 1 }}><Field lbl="Порядок" value={String(item.sort_order)} onChange={v => onChange({ ...item, sort_order: parseInt(v) || 0 })} /></div>
            <div style={{ paddingTop: 20 }}>
              <button type="button" onClick={() => onChange({ ...item, is_large: !item.is_large })} style={{ ...btn(true), background: item.is_large ? 'rgba(125,249,210,.1)' : undefined, color: item.is_large ? s.cyan : s.muted, borderColor: item.is_large ? 'rgba(125,249,210,.3)' : s.line2 }}>
                {item.is_large ? '⬛ wide (span 2)' : '▪ normal'}
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onSave} style={btn()}>сохранить</button>
            <button onClick={onCancel} style={btn(true)}>отмена</button>
          </div>
        </div>
      )}
    />
  );
}

// ─── PRICING PANEL ────────────────────────────────────────
function PricingPanel({ data, setData, lang, showToast }: { data: Pricing[]; setData: (v: Pricing[]) => void; lang: string; showToast: (m: string) => void }) {
  const del = async (id: string) => {
    if (!supabase || !confirm('Удалить?')) return;
    await supabase.from('pricing').delete().eq('id', id);
    setData(data.filter(d => d.id !== id)); showToast('Удалено');
  };
  const toggle = async (id: string, pub: boolean) => {
    if (!supabase) return;
    await supabase.from('pricing').update({ published: pub }).eq('id', id);
    setData(data.map(d => d.id === id ? { ...d, published: pub } : d)); showToast('Сохранено');
  };

  return (
    <CrudList
      data={data} onDelete={del} onToggle={toggle} tableName="pricing"
      addLabel="добавить пакет"
      emptyForm={{ lang, sort_order: data.length + 1, num: String(data.length + 1).padStart(2,'0'), title: '', price: '', desc_text: '', note_text: '', published: true }}
      renderRow={item => (
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 140px', gap: 16, alignItems: 'center' }}>
          <span style={{ fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 10, color: s.accent }}>{item.num}</span>
          <div><b style={{ fontSize: 14 }}>{item.title}</b><p style={{ fontSize: 12, color: s.muted, marginTop: 2 }}>{item.desc_text}</p><p style={{ fontSize: 11, color: s.muted, marginTop: 2 }}>{item.note_text}</p></div>
          <b style={{ fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 16, color: s.text, textAlign: 'right' }}>{item.price}</b>
        </div>
      )}
      renderForm={(item, onChange, onSave, onCancel) => (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 160px', gap: 10 }}>
            <Field lbl="Номер" value={item.num} onChange={v => onChange({ ...item, num: v })} />
            <Field lbl="Название" value={item.title} onChange={v => onChange({ ...item, title: v })} />
            <Field lbl="Цена" value={item.price} onChange={v => onChange({ ...item, price: v })} />
          </div>
          <Field lbl="Описание" value={item.desc_text} onChange={v => onChange({ ...item, desc_text: v })} />
          <Field lbl="Примечание" value={item.note_text} onChange={v => onChange({ ...item, note_text: v })} />
          <Field lbl="Порядок" value={String(item.sort_order)} onChange={v => onChange({ ...item, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onSave} style={btn()}>сохранить</button>
            <button onClick={onCancel} style={btn(true)}>отмена</button>
          </div>
        </div>
      )}
    />
  );
}

// ─── PROCESS PANEL ────────────────────────────────────────
function ProcessPanel({ data, setData, lang, showToast }: { data: ProcessStep[]; setData: (v: ProcessStep[]) => void; lang: string; showToast: (m: string) => void }) {
  const del = async (id: string) => {
    if (!supabase || !confirm('Удалить?')) return;
    await supabase.from('process_steps').delete().eq('id', id);
    setData(data.filter(d => d.id !== id)); showToast('Удалено');
  };
  const toggle = async (id: string, pub: boolean) => {
    if (!supabase) return;
    await supabase.from('process_steps').update({ published: pub }).eq('id', id);
    setData(data.map(d => d.id === id ? { ...d, published: pub } : d)); showToast('Сохранено');
  };

  return (
    <CrudList
      data={data} onDelete={del} onToggle={toggle} tableName="process_steps"
      addLabel="добавить шаг"
      emptyForm={{ lang, sort_order: data.length + 1, num: String(data.length + 1).padStart(2,'0'), title: '', text: '', published: true }}
      renderRow={item => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <b style={{ fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 11, color: s.accent, flexShrink: 0, paddingTop: 2 }}>{item.num}</b>
          <div><b style={{ fontSize: 14 }}>{item.title}</b><p style={{ fontSize: 13, color: s.muted, marginTop: 3 }}>{item.text}</p></div>
        </div>
      )}
      renderForm={(item, onChange, onSave, onCancel) => (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 10 }}>
            <Field lbl="Номер" value={item.num} onChange={v => onChange({ ...item, num: v })} />
            <Field lbl="Название" value={item.title} onChange={v => onChange({ ...item, title: v })} />
          </div>
          <Field lbl="Текст" value={item.text} onChange={v => onChange({ ...item, text: v })} textarea rows={2} />
          <Field lbl="Порядок" value={String(item.sort_order)} onChange={v => onChange({ ...item, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onSave} style={btn()}>сохранить</button>
            <button onClick={onCancel} style={btn(true)}>отмена</button>
          </div>
        </div>
      )}
    />
  );
}

// ─── FAQ PANEL ────────────────────────────────────────────
function FaqPanel({ data, setData, lang, showToast }: { data: FaqItem[]; setData: (v: FaqItem[]) => void; lang: string; showToast: (m: string) => void }) {
  const del = async (id: string) => {
    if (!supabase || !confirm('Удалить?')) return;
    await supabase.from('faq').delete().eq('id', id);
    setData(data.filter(d => d.id !== id)); showToast('Удалено');
  };
  const toggle = async (id: string, pub: boolean) => {
    if (!supabase) return;
    await supabase.from('faq').update({ published: pub }).eq('id', id);
    setData(data.map(d => d.id === id ? { ...d, published: pub } : d)); showToast('Сохранено');
  };

  return (
    <CrudList
      data={data} onDelete={del} onToggle={toggle} tableName="faq"
      addLabel="добавить вопрос"
      emptyForm={{ lang, sort_order: data.length + 1, question: '', answer: '', published: true }}
      renderRow={item => (
        <div>
          <b style={{ fontSize: 14 }}>{item.question}</b>
          <p style={{ fontSize: 13, color: s.muted, marginTop: 4 }}>{item.answer}</p>
        </div>
      )}
      renderForm={(item, onChange, onSave, onCancel) => (
        <div style={{ display: 'grid', gap: 12 }}>
          <Field lbl="Вопрос" value={item.question} onChange={v => onChange({ ...item, question: v })} />
          <Field lbl="Ответ" value={item.answer} onChange={v => onChange({ ...item, answer: v })} textarea rows={3} />
          <Field lbl="Порядок" value={String(item.sort_order)} onChange={v => onChange({ ...item, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onSave} style={btn()}>сохранить</button>
            <button onClick={onCancel} style={btn(true)}>отмена</button>
          </div>
        </div>
      )}
    />
  );
}
