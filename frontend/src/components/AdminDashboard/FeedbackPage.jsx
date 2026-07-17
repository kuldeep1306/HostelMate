import React, { useEffect, useState } from 'react';
import { feedbackAPI } from '../../api';
import { MessageSquare } from 'lucide-react';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    feedbackAPI.getAll().then(setFeedbacks).catch(console.error);
  }, []);

  return (
      <div style={{ 
  background: 'var(--bg-primary)', 
  minHeight: '100vh', 
  padding: '110px 32px 52px'
}}>
      <style>{`
        .fp-wrap { max-width:1000px; margin:0 auto; }
        .fp-table-wrap { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; }
        .fp-table { width:100%; border-collapse:collapse; }
        .fp-thead tr { background:var(--bg-secondary); }
        .fp-thead th { padding:14px 20px; text-align:left; font-size:12px; font-weight:600;
          color:var(--text-muted); text-transform:uppercase; letter-spacing:0.07em; border-bottom:1px solid var(--border); }
        .fp-tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .fp-tbody tr:last-child { border-bottom:none; }
        .fp-tbody tr:hover { background:var(--bg-card-hover); }
        .fp-tbody td { padding:14px 20px; font-size:14px; color:var(--text-secondary); vertical-align:top; }
        .fp-tbody td:first-child { color:var(--text-primary); font-weight:500; }
        .fp-roll { display:inline-block; font-size:11px; padding:2px 8px; border-radius:99px;
          background:var(--gold-dim); color:var(--gold); border:1px solid var(--border-accent); font-weight:600; }
      `}</style>
      <div className="fp-wrap">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '3px', background: 'var(--gold)', borderRadius: '2px', marginBottom: '12px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '6px' }}>Student Feedback</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {feedbacks.length} feedback{feedbacks.length !== 1 ? 's' : ''} collected
          </p>
        </div>
        {feedbacks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <MessageSquare size={40} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
            <p>No feedback submitted yet.</p>
          </div>
        ) : (
          <div className="fp-table-wrap">
            <table className="fp-table">
              <thead className="fp-thead">
                <tr><th>Student Name</th><th>Roll Number</th><th>Feedback</th></tr>
              </thead>
              <tbody className="fp-tbody">
                {feedbacks.map(fb => (
                  <tr key={fb._id}>
                    <td>{fb.name}</td>
                    <td><span className="fp-roll">{fb.roll}</span></td>
                    <td>{fb.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
