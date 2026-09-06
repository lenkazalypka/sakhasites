'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  EMPTY_PROJECT_ANSWERS,
  calculateProjectQuote,
  type BudgetBand,
  type ProjectQuizAnswers,
} from '@/lib/project-quote';

interface ProjectQuoteContextValue {
  answers: ProjectQuizAnswers;
  quote: ReturnType<typeof calculateProjectQuote>;
  completed: boolean;
  budgetBand: BudgetBand | '';
  setAnswer: <K extends keyof ProjectQuizAnswers>(key: K, value: ProjectQuizAnswers[K]) => void;
  setBudgetBand: (value: BudgetBand | '') => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

const ProjectQuoteContext = createContext<ProjectQuoteContextValue | null>(null);

export function ProjectQuoteProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<ProjectQuizAnswers>(EMPTY_PROJECT_ANSWERS);
  const [completed, setCompleted] = useState(false);
  const [budgetOverride, setBudgetOverride] = useState<BudgetBand | ''>('');

  const quote = useMemo(() => calculateProjectQuote(answers), [answers]);
  const budgetBand = budgetOverride || (completed
    ? answers.format === 'unknown'
      ? 'unknown'
      : quote?.budgetBand ?? ''
    : '');

  const setAnswer = <K extends keyof ProjectQuizAnswers>(key: K, value: ProjectQuizAnswers[K]) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setCompleted(false);
    setBudgetOverride('');
  };

  const resetQuiz = () => {
    setAnswers(EMPTY_PROJECT_ANSWERS);
    setCompleted(false);
    setBudgetOverride('');
  };

  return (
    <ProjectQuoteContext.Provider value={{
      answers,
      quote,
      completed,
      budgetBand,
      setAnswer,
      setBudgetBand: setBudgetOverride,
      completeQuiz: () => setCompleted(true),
      resetQuiz,
    }}>
      {children}
    </ProjectQuoteContext.Provider>
  );
}

export function useProjectQuote() {
  const value = useContext(ProjectQuoteContext);
  if (!value) throw new Error('useProjectQuote must be used inside ProjectQuoteProvider');
  return value;
}
