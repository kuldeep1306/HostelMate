import React, { useEffect, useState } from 'react';
import { noticesAPI } from '../../api';
import { Bell, Clock } from 'lucide-react';

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    noticesAPI.getAll()
      .then(setNotices)
      .catch(console.error);
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '110px 52px 32px' }}>
      <style>{`
        .nc-wrap { max-width:780px; margin:0 auto; }
        .nc-item { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius);
          padding:24px 28px; display:flex; gap:18px; align-items:flex-start;
          animation:fadeUp 0.5s ease both; transition:all 0.2s; border-left:3px solid var(--gold); }
        .nc-item:hover { border-color:var(--border-accent); transform:translateX(4px); }
        .nc-icon { width:36px; height:36px; border-radius:8px; background:var(--gold-dim);
          display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }
        .nc-msg { font-size:15px; color:var(--text-primary); line-height:1.65; flex:1; }
        .nc-time { display:flex; align-items:center; gap:5px; font-size:12px; color:var(--text-muted); margin-top:10px; }
      `}</style>
      <div className="nc-wrap">
        <div style={{ marginBottom: '36px' }}>
          <div style={{ width: '40px', height: '3px', background: 'var(--gold)', borderRadius: '2px', marginBottom: '12px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '6px' }}>Notice Board</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Official announcements from hostel administration</p>
        </div>

        {notices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <Bell size={40} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
            <p>No notices posted yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {notices.map((n, i) => (
              <div key={n._id} className="nc-item" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="nc-icon"><Bell size={16} color="var(--gold)" /></div>
                <div>
                  <p className="nc-msg">{n.message}</p>
                  <div className="nc-time">
                    <Clock size={11} />
                    {new Date(n.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;
