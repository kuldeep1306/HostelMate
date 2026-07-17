import React, { useState, useEffect } from 'react';
import { noticesAPI } from '../../api';
import { Bell, Send, Trash2, Clock } from 'lucide-react';

const NoticesPage = () => {
  const [notices,    setNotices]    = useState([]);
  const [newNotice,  setNewNotice]  = useState('');
  const [error,      setError]      = useState('');

  useEffect(() => { load(); }, []);

  const load = () => noticesAPI.getAll().then(setNotices).catch(console.error);

  const handleAdd = async () => {
    if (!newNotice.trim()) return;
    setError('');
    try { await noticesAPI.create(newNotice); setNewNotice(''); load(); }
    catch (err) { setError(err.message); }
  };

  const handleDelete = async (id) => {
    try { await noticesAPI.delete(id); setNotices(prev => prev.filter(n => n._id !== id)); }
    catch (err) { alert(err.message); }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '110px 52px 32px' }}>
      <style>{`
        .np-wrap { max-width:780px; margin:0 auto; }
        .np-form { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius); padding:28px; margin-bottom:32px; }
        .np-textarea { width:100%; padding:14px; background:var(--bg-secondary); border:1px solid var(--border);
          border-radius:var(--radius-sm); color:var(--text-primary); font-size:15px; outline:none;
          resize:vertical; font-family:var(--font-body); transition:border-color 0.2s; box-sizing:border-box; }
        .np-textarea:focus { border-color:var(--gold); }
        .np-btn { display:flex; align-items:center; gap:8px; padding:12px 24px; margin-top:14px;
          background:linear-gradient(135deg, var(--gold), #b8962e); color:#0a0e1a;
          font-weight:700; font-size:14px; border:none; border-radius:var(--radius-sm);
          cursor:pointer; transition:opacity 0.2s; }
        .np-btn:hover { opacity:0.88; }
        .np-item { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius);
          padding:22px 26px; margin-bottom:12px; display:flex; justify-content:space-between;
          align-items:flex-start; gap:14px; border-left:3px solid var(--gold); animation:fadeUp 0.4s ease both; }
        .np-msg { font-size:14.5px; color:var(--text-primary); line-height:1.65; flex:1; }
        .np-time { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--text-muted); margin-top:8px; }
        .np-del { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25);
          color:#f87171; padding:8px 12px; border-radius:var(--radius-sm); cursor:pointer; transition:all 0.2s; }
        .np-del:hover { background:rgba(239,68,68,0.2); }
        .np-err { padding:10px 14px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3);
          border-radius:var(--radius-sm); color:#fca5a5; font-size:13px; margin-top:10px; }
      `}</style>
      <div className="np-wrap">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '3px', background: 'var(--gold)', borderRadius: '2px', marginBottom: '12px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '6px' }}>Notice Board</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Post announcements for all students</p>
        </div>
        <div className="np-form">
          <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.07em', marginBottom: '14px' }}>Post New Notice</p>
          <textarea className="np-textarea" placeholder="Write your notice..." value={newNotice}
            onChange={e => setNewNotice(e.target.value)} rows={4} />
          <button className="np-btn" onClick={handleAdd}><Send size={15} /> Post Notice</button>
          {error && <div className="np-err">{error}</div>}
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Published Notices ({notices.length})
        </h3>
        {notices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <Bell size={36} style={{ margin: '0 auto 14px', display: 'block', opacity: 0.3 }} />
            <p>No notices published yet.</p>
          </div>
        ) : (
          notices.map((n, i) => (
            <div key={n._id} className="np-item" style={{ animationDelay: `${i * 0.05}s` }}>
              <div>
                <p className="np-msg">{n.message}</p>
                <div className="np-time">
                  <Clock size={11} />
                  {new Date(n.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
              <button className="np-del" onClick={() => handleDelete(n._id)}><Trash2 size={15} /></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoticesPage;
