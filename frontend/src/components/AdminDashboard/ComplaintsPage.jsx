import React, { useEffect, useState } from 'react';
import { complaintsAPI } from '../../api';
import { AlertTriangle, Trash2, Clock, User } from 'lucide-react';
import { PriorityBadge, CategoryBadge } from '../ComplaintBadges';

const priorityBorderColor = {
  Urgent: '#ef4444',
  High: '#fb923c',
  Medium: '#facc15',
  Low: '#4ade80',
};

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    complaintsAPI.getAll().then(setComplaints).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    try { await complaintsAPI.delete(id); setComplaints(prev => prev.filter(c => c._id !== id)); }
    catch (err) { alert(err.message); }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '110px 52px 32px' }}>
      <style>{`
        .cmp-wrap { max-width:800px; margin:0 auto; }
        .cmp-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius);
          padding:24px 28px; margin-bottom:14px; border-left:3px solid #ef4444; animation:fadeUp 0.4s ease both; }
        .cmp-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
        .cmp-user { display:flex; align-items:center; gap:7px; font-weight:600; font-size:14px; margin-bottom:10px; }
        .cmp-msg { color:var(--text-secondary); font-size:14px; line-height:1.65; margin-bottom:10px; }
        .cmp-time { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--text-muted); }
        .cmp-del { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25);
          color:#f87171; padding:8px 12px; border-radius:var(--radius-sm); cursor:pointer; transition:all 0.2s; }
        .cmp-del:hover { background:rgba(239,68,68,0.2); }
      `}</style>
      <div className="cmp-wrap">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '3px', background: '#ef4444', borderRadius: '2px', marginBottom: '12px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '6px' }}>Student Complaints</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {complaints.length} complaint{complaints.length !== 1 ? 's' : ''} received
          </p>
        </div>
        {complaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <AlertTriangle size={40} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
            <p>No complaints found.</p>
          </div>
        ) : (
          complaints.map((c, i) => (
            <div key={c._id} className="cmp-card"
              style={{ animationDelay: `${i * 0.05}s`, borderLeftColor: priorityBorderColor[c.priority] || '#ef4444' }}>
              <div className="cmp-header">
                <div style={{ flex: 1 }}>
                  <div className="cmp-user"><User size={14} color="var(--text-muted)" />{c.user}</div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {c.priority && <PriorityBadge priority={c.priority} />}
                    {c.category && <CategoryBadge category={c.category} />}
                  </div>
                  <p className="cmp-msg" title={c.aiReasoning || ''}>{c.message}</p>
                  <div className="cmp-time">
                    <Clock size={11} />
                    {new Date(c.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
                <button className="cmp-del" onClick={() => handleDelete(c._id)}><Trash2 size={15} /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComplaintsPage;
