import React, { useState } from 'react';
import { AlertTriangle, Send, CheckCircle } from 'lucide-react';
import { complaintsAPI } from '../../api';

const Complaint = () => {
  const [name,      setName]      = useState('');
  const [hostel,    setHostel]    = useState('');
  const [room,      setRoom]      = useState('');
  const [message,   setMessage]   = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await complaintsAPI.submit(name, hostel, room, message);
      setName(''); setHostel(''); setRoom(''); setMessage('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) { setError(err.message); }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '120px 52px 32px' }}>
      <style>{`
        .cp-wrap { max-width:640px; margin:0 auto; }
        .cp-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius); padding:36px; }
        .cp-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
        .cp-field { margin-bottom:20px; }
        .cp-label { display:block; font-size:13px; font-weight:500; color:var(--text-secondary); margin-bottom:7px; letter-spacing:0.03em; }
        .cp-input { width:100%; padding:12px 14px; background:var(--bg-secondary); border:1px solid var(--border);
          border-radius:var(--radius-sm); color:var(--text-primary); font-size:15px; outline:none;
          transition:border-color 0.2s; font-family:var(--font-body); box-sizing:border-box; }
        .cp-input:focus { border-color:rgba(239,68,68,0.7); }
        .cp-btn { display:flex; align-items:center; gap:8px; padding:13px 28px;
          background:linear-gradient(135deg, #ef4444, #b91c1c); color:#fff;
          font-weight:700; font-size:15px; border:none; border-radius:var(--radius-sm);
          cursor:pointer; transition:opacity 0.2s; }
        .cp-btn:hover { opacity:0.88; }
        .cp-success { display:flex; align-items:center; gap:8px; margin-top:16px; padding:12px 16px;
          background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3);
          border-radius:var(--radius-sm); color:#6ee7b7; font-size:13px; }
        .cp-err { margin-top:16px; padding:12px 16px; background:rgba(239,68,68,0.1);
          border:1px solid rgba(239,68,68,0.3); border-radius:var(--radius-sm); color:#fca5a5; font-size:13px; }
        @media(max-width:550px) { .cp-grid { grid-template-columns:1fr; } }
      `}</style>
      <div className="cp-wrap">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '3px', background: '#ef4444', borderRadius: '2px', marginBottom: '12px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '6px' }}>Hostel Complaint</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Report issues clearly for faster resolution</p>
        </div>
        <div className="cp-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px',
            paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} color="#f87171" />
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>Submit a Complaint</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Will be reviewed by admin</div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="cp-grid">
              <div className="cp-field" style={{ gridColumn: '1/3' }}>
                <label className="cp-label">Full Name</label>
                <input className="cp-input" type="text" placeholder="John Doe" value={name}
                  onChange={e => setName(e.target.value)} required />
              </div>
              <div className="cp-field">
                <label className="cp-label">Room No.</label>
                <input className="cp-input" type="text" placeholder="102" value={room}
                  onChange={e => setRoom(e.target.value)} required />
              </div>
            </div>
            <div className="cp-field">
              <label className="cp-label">Hostel Name</label>
              <input className="cp-input" type="text" placeholder="Tilak Hostel" value={hostel}
                onChange={e => setHostel(e.target.value)} required />
            </div>
            <div className="cp-field">
              <label className="cp-label">Complaint Description</label>
              <textarea className="cp-input" rows={5} placeholder="Describe the issue in detail..."
                value={message} onChange={e => setMessage(e.target.value)} required style={{ resize: 'vertical' }} />
            </div>
            <button type="submit" className="cp-btn"><Send size={16} /> Submit Complaint</button>
            {submitted && <div className="cp-success"><CheckCircle size={16} />Complaint submitted successfully!</div>}
            {error && <div className="cp-err">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
