'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface Lead {
  id: number;
  created_at: string;
  source: string;
  lang: string;
  name: string;
  contact: string;
  need?: string;
  project?: string;
  format?: string;
  budget?: string;
  message?: string;
  status?: string;
  note?: string;
}

const PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || 'demo';

const s = {
  bg: '#0d0e0b', panel: '#13140f', panel2: '#181a14',
  line: 'rgba(244,241,232,.11)', line2: 'rgba(244,241,232,.18)',
  text: '#f4f1e8', muted: '#8d8b82', soft: 'rgba(244,241,232,.66)',
  accent: '#d7f56f', cyan: '#7df9d2', bad: '#ff8a7a',
};

const btn = (ghost = false): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 38, padding: '9px 16px',
  background: ghost ? 'rgba(244,241,232,.04)' : s.accent,
  border: `1px solid ${ghost ? s.line2 : s.accent}`,
  color: ghost ? s.text : '#111',
  fontFamily: "'Unbounded', system-ui, sans-serif", fontSize: 11, fontWeight: 900,
  letterSpacing: '.06em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: '.18s',
});

const field: React.CSSProperties = {
  width: '100%', minHeight: 46, background: 'rgba(13,14,11,.7)', border: `1px solid ${s.line}`,
  color: s.text, padding: '12px 14px', outline: 0, fontFamily: 'inherit', fontSize: 14,
};

export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'quick' | 'brief'>('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const fetchLeads = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) fetchLeads(); }, [authed, fetchLeads]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === PASS) { setAuthed(true); setErr(''); }
    else setErr('Неверный пароль');
  };

  const updateStatus = async (id: number, status: string) => {
    if (!supabase) return;
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    showToast('Статус сохранён');
  };

  const updateNote = async (id: number, note: string) => {
    if (!supabase) return;
    await supabase.from('leads').update({ note }).eq('id', id);
    showToast('Заметка сохранена');
  };

  const deleteLead = async (id: number) => {
    if (!supabase || !confirm('Удалить заявку?')) return;
    await supabase.from('leads').delete().eq('id', id);
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast('Удалено');
  };

  const filtered = leads.filter(l => {
    if (filter !== 'all' && l.source !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      return [l.name, l.contact, l.project, l.need, l.message].some(v => v?.toLowerCase().includes(s));
    }
    return true;
  });

  const stats = {
    total: leads.length,
    quick: leads.filter(l => l.source === 'quick').length,
    brief: leads.filter(l => l.source === 'brief').length,
    newLeads: leads.filter(l => !l.status || l.status === 'новая').length,
    today: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length,
  };

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: s.bg, padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 380, border: `1px solid ${s.line2}`, background: s.panel, padding: 34 }}>
          <h1 style={{ fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: '-.04em', marginBottom: 6, color: s.text }}>
            sakha<i style={{ fontStyle: 'normal', color: s.accent }}>sites</i>
          </h1>
          <p style={{ color: s.muted, fontSize: 13, marginBottom: 24 }}>панель заявок</p>
          {!supabase && (
            <div style={{ marginBottom: 18, border: '1px solid rgba(255,212,121,.35)', background: 'rgba(255,212,121,.06)', color: '#ffd479', padding: '14px 16px', fontSize: 13 }}>
              Supabase не настроен. Заявки не будут загружены.
            </div>
          )}
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: 0 }}>
            <input style={{ ...field, marginBottom: 12 }} type="password" placeholder="пароль" value={pass} onChange={e => setPass(e.target.value)} required />
            <button type="submit" style={{ ...btn(), justifyContent: 'center' }}>войти</button>
            {err && <div style={{ marginTop: 14, border: '1px solid rgba(255,138,122,.35)', background: 'rgba(255,138,122,.08)', color: s.bad, padding: '10px 12px', fontSize: 13 }}>{err}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: s.bg, minHeight: '100vh', fontFamily: "'Manrope',system-ui,sans-serif", color: s.text }}>
      {/* Topbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 22px', borderBottom: `1px solid ${s.line}`, background: 'rgba(13,14,11,.86)', position: 'sticky', top: 0, backdropFilter: 'blur(14px)', zIndex: 10 }}>
        <div>
          <div style={{ fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 19, fontWeight: 900, letterSpacing: '-.05em' }}>
            sakha<i style={{ fontStyle: 'normal', color: s.accent }}>sites</i>
          </div>
          <small style={{ display: 'block', marginTop: 2, color: s.muted, fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>админка заявок</small>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={fetchLeads} style={btn(true)}>обновить</button>
          <button onClick={() => setAuthed(false)} style={{ ...btn(true), color: s.bad }}>выйти</button>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 22px 60px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, margin: '26px 0' }}>
          {[
            { label: 'всего', val: stats.total },
            { label: 'новые', val: stats.newLeads, accent: true },
            { label: 'сегодня', val: stats.today },
            { label: 'quick', val: stats.quick },
            { label: 'бриф', val: stats.brief },
          ].map(item => (
            <div key={item.label} style={{ border: `1px solid ${s.line}`, background: 'rgba(244,241,232,.025)', padding: '16px 18px' }}>
              <b style={{ display: 'block', fontFamily: "'Unbounded',system-ui,sans-serif", fontSize: 26, fontWeight: 900, color: item.accent ? s.accent : s.text }}>{item.val}</b>
              <span style={{ color: s.muted, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(['all', 'quick', 'brief'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '9px 14px', border: `1px solid ${s.line}`, background: filter === f ? s.accent : 'rgba(244,241,232,.025)', color: filter === f ? '#111' : s.soft, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', cursor: 'pointer' }}>
                {f === 'all' ? 'все' : f}
              </button>
            ))}
          </div>
          <input style={{ ...field, minWidth: 220, flex: 1, maxWidth: 320, minHeight: 40 }} placeholder="поиск..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: s.muted, fontSize: 13 }}>загрузка...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: s.muted }}>заявок нет</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${s.line}`, fontSize: 13.5 }}>
            <thead>
              <tr>
                {['имя', 'контакт', 'проект / нужда', 'формат', 'бюджет', 'статус', 'дата', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 14px', background: s.panel2, color: s.muted, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', borderBottom: `1px solid ${s.line}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} style={{ borderBottom: `1px solid ${s.line}` }}>
                  <td style={{ padding: '13px 14px', color: s.text, fontWeight: 700, verticalAlign: 'top' }}>
                    {lead.name}
                    <span style={{ display: 'inline-flex', marginLeft: 8, padding: '4px 9px', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.05em', background: lead.source === 'quick' ? 'rgba(215,245,111,.14)' : 'rgba(244,241,232,.1)', color: lead.source === 'quick' ? s.accent : s.soft }}>{lead.source}</span>
                  </td>
                  <td style={{ padding: '13px 14px', color: s.soft, verticalAlign: 'top' }}>{lead.contact}</td>
                  <td style={{ padding: '13px 14px', color: s.soft, verticalAlign: 'top', maxWidth: 200 }}>{lead.project || lead.need || lead.message || '—'}</td>
                  <td style={{ padding: '13px 14px', color: s.soft, verticalAlign: 'top' }}>{lead.format || '—'}</td>
                  <td style={{ padding: '13px 14px', color: s.soft, verticalAlign: 'top' }}>{lead.budget || '—'}</td>
                  <td style={{ padding: '13px 14px', verticalAlign: 'top' }}>
                    <select
                      value={lead.status || 'новая'}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      style={{ background: 'rgba(13,14,11,.7)', border: `1px solid ${s.line2}`, color: s.text, padding: '7px 9px', fontSize: 12 }}
                    >
                      {['новая', 'в работе', 'отложена', 'закрыта'].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <div style={{ marginTop: 6 }}>
                      <textarea
                        defaultValue={lead.note || ''}
                        placeholder="заметка"
                        style={{ width: '100%', minHeight: 54, background: 'rgba(13,14,11,.6)', border: `1px solid ${s.line}`, color: s.text, padding: '8px 10px', fontSize: 12.5, resize: 'vertical' }}
                        onBlur={e => updateNote(lead.id, e.target.value)}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '13px 14px', color: s.muted, fontSize: 12, verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                    {new Date(lead.created_at).toLocaleString('ru', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '13px 14px', verticalAlign: 'top' }}>
                    <button onClick={() => deleteLead(lead.id)} style={{ background: 'transparent', border: `1px solid ${s.line2}`, color: s.muted, padding: '6px 9px', fontSize: 12, cursor: 'pointer' }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 22, right: 22, border: '1px solid rgba(215,245,111,.35)', background: s.panel, color: s.accent, padding: '13px 18px', fontSize: 13, fontWeight: 700, boxShadow: '0 12px 40px rgba(0,0,0,.4)', zIndex: 50 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
