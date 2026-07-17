import React, { useState, useEffect } from 'react';
import { feedbackAPI } from '../../api';
import { Send, Trash2, CheckCircle } from 'lucide-react';

const Feedback = () => {
  const [name,      setName]      = useState('');
  const [roll,      setRoll]      = useState('');
  const [feedback,  setFeedback]  = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error,     setError]     = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setFeedbacks(await feedbackAPI.getAll()); } catch { /* non-admin won't see list */ }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await feedbackAPI.submit(name, roll, feedback);
      setSubmitted(true); setName(''); setRoll(''); setFeedback('');
      load();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) { setError(err.message); }
  };

  const handleDelete = async (id) => {
    try { await feedbackAPI.delete(id); setFeedbacks(feedbacks.filter(fb => fb._id !== id)); }
    catch (err) { setError(err.message); }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '110px 52px 32px' }}>
      <style>{`
        .fb-wrap { max-width:680px; margin:0 auto; }
        .fb-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius); padding:36px; margin-bottom:32px; }
        .fb-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .fb-field { margin-bottom:20px; }
        .fb-label { display:block; font-size:13px; font-weight:500; color:var(--text-secondary); margin-bottom:7px; letter-spacing:0.03em; }
        .fb-input { width:100%; padding:12px 14px; background:var(--bg-secondary); border:1px solid var(--border);
          border-radius:var(--radius-sm); color:var(--text-primary); font-size:15px; outline:none;
          transition:border-color 0.2s; font-family:var(--font-body); box-sizing:border-box; }
        .fb-input:focus { border-color:var(--gold); }
        .fb-btn { display:flex; align-items:center; gap:8px; padding:13px 28px;
          background:linear-gradient(135deg, var(--gold), #b8962e); color:#0a0e1a;
          font-weight:700; font-size:15px; border:none; border-radius:var(--radius-sm);
          cursor:pointer; transition:opacity 0.2s; }
        .fb-btn:hover { opacity:0.88; }
        .fb-success { display:flex; align-items:center; gap:8px; margin-top:16px; padding:12px 16px;
          background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3);
          border-radius:var(--radius-sm); color:#6ee7b7; font-size:13px; }
        .fb-err { margin-top:16px; padding:12px 16px; background:rgba(239,68,68,0.1);
          border:1px solid rgba(239,68,68,0.3); border-radius:var(--radius-sm); color:#fca5a5; font-size:13px; }
        .fb-item { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius);
          padding:22px; margin-bottom:14px; display:flex; justify-content:space-between;
          align-items:flex-start; gap:16px; animation:fadeUp 0.4s ease both; }
        .fb-del { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25);
          color:#f87171; padding:8px 12px; border-radius:var(--radius-sm); cursor:pointer; transition:all 0.2s; }
        .fb-del:hover { background:rgba(239,68,68,0.2); }
        @media(max-width:550px) { .fb-grid { grid-template-columns:1fr; } }
      `}</style>
      <div className="fb-wrap">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '3px', background: 'var(--gold)', borderRadius: '2px', marginBottom: '12px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '6px' }}>Student Feedback</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Share your thoughts to help improve hostel services</p>
        </div>
        <div className="fb-card">
          <form onSubmit={handleSubmit}>
            <div className="fb-grid">
              <div className="fb-field">
                <label className="fb-label">Full Name</label>
                <input className="fb-input" type="text" placeholder="Your name" value={name}
                  onChange={e => setName(e.target.value)} required />
              </div>
              <div className="fb-field">
                <label className="fb-label">Roll Number</label>
                <input className="fb-input" type="text" placeholder="21IT123" value={roll}
                  onChange={e => setRoll(e.target.value)} required />
              </div>
            </div>
            <div className="fb-field">
              <label className="fb-label">Your Feedback</label>
              <textarea className="fb-input" rows={4} placeholder="Write your feedback..."
                value={feedback} onChange={e => setFeedback(e.target.value)} required style={{ resize: 'vertical' }} />
            </div>
            <button type="submit" className="fb-btn"><Send size={16} /> Submit Feedback</button>
            {submitted && <div className="fb-success"><CheckCircle size={16} />Feedback submitted successfully!</div>}
            {error && <div className="fb-err">{error}</div>}
          </form>
        </div>

        {feedbacks.length > 0 && (
          <>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>
              All Feedbacks
            </h3>
            {feedbacks.map((fb, i) => (
              <div key={fb._id} className="fb-item" style={{ animationDelay: `${i * 0.05}s` }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {fb.name} <span style={{ color: 'var(--text-muted)', fontWeight: '400', fontSize: '13px' }}>({fb.roll})</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>{fb.feedback}</p>
                </div>
                <button className="fb-del" onClick={() => handleDelete(fb._id)}><Trash2 size={15} /></button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Feedback;
