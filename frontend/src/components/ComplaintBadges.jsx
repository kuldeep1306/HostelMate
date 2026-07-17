import React from 'react';
import { Zap, AlertTriangle, Wrench, Wifi, ShieldAlert, Utensils, Sparkles, Sofa, HelpCircle } from 'lucide-react';

const priorityStyles = {
  Urgent: { bg: 'rgba(239,68,68,0.15)',  fg: '#f87171', border: 'rgba(239,68,68,0.35)' },
  High:   { bg: 'rgba(249,115,22,0.15)', fg: '#fb923c', border: 'rgba(249,115,22,0.35)' },
  Medium: { bg: 'rgba(234,179,8,0.15)',  fg: '#facc15', border: 'rgba(234,179,8,0.35)' },
  Low:    { bg: 'rgba(34,197,94,0.15)',  fg: '#4ade80', border: 'rgba(34,197,94,0.35)' },
};

const categoryIcons = {
  Electrical: Zap,
  Plumbing: Wrench,
  Security: ShieldAlert,
  Mess: Utensils,
  Internet: Wifi,
  Cleanliness: Sparkles,
  Furniture: Sofa,
  Other: HelpCircle,
};

export const PriorityBadge = ({ priority }) => {
  const s = priorityStyles[priority] || priorityStyles.Medium;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
        background: s.bg, color: s.fg, border: `1px solid ${s.border}`,
        textTransform: 'uppercase', letterSpacing: '0.04em',
      }}
    >
      {priority === 'Urgent' && <AlertTriangle size={11} />}
      {priority}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  const Icon = categoryIcons[category] || HelpCircle;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
        background: 'var(--gold-dim, rgba(212,175,55,0.1))', color: 'var(--gold, #d4af37)',
        border: '1px solid var(--border-accent, rgba(212,175,55,0.3))',
      }}
    >
      <Icon size={11} /> {category}
    </span>
  );
};
