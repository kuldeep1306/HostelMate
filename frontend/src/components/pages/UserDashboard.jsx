import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, AlertTriangle, Bell, Users, ArrowRight } from 'lucide-react';

const cards = [
  { title: 'Submit Feedback', desc: 'Share your experience about hostel facilities and services.', icon: MessageSquare, path: '/user/feedback', color: '#3b82f6' },
  { title: 'File a Complaint', desc: 'Report any issues or problems you are facing in the hostel.', icon: AlertTriangle, path: '/user/complaint', color: '#ef4444' },
  { title: 'View Notices', desc: 'Stay updated with the latest announcements from administration.', icon: Bell, path: '/user/notices', color: '#d4af37' },
  { title: 'Societies', desc: 'Explore college societies and student organizations.', icon: Users, path: '/user/societies', color: '#10b981' },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '110px 52px 32px' }}>
      <style>{`
        .ud-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
          gap:20px; max-width:960px; margin:0 auto; }
        .ud-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius);
          padding:28px; cursor:pointer; transition:all 0.25s; animation:fadeUp 0.5s ease both;
          display:flex; flex-direction:column; gap:12px; }
        .ud-card:hover { transform:translateY(-4px); border-color:var(--border-accent);
          box-shadow:0 12px 32px rgba(0,0,0,0.3); }
        .ud-icon { width:44px; height:44px; border-radius:10px; display:flex;
          align-items:center; justify-content:center; }
        .ud-card h3 { font-size:17px; font-weight:600; color:var(--text-primary); }
        .ud-card p { font-size:13.5px; color:var(--text-secondary); line-height:1.6; flex:1; }
        .ud-arrow { display:flex; align-items:center; gap:6px; font-size:13px; font-weight:500;
          margin-top:4px; transition:gap 0.2s; }
        .ud-card:hover .ud-arrow { gap:10px; }
        @media(max-width:600px) { div[style*="padding: 52px 32px"] { padding:32px 16px !important; } }
      `}</style>
      <div style={{ maxWidth: '960px', margin: '0 auto 40px' }}>
        <div style={{ width: '40px', height: '3px', background: 'var(--gold)', borderRadius: '2px', marginBottom: '12px' }} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '8px' }}>Student Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Welcome! Use the portal to manage your hostel experience.</p>
      </div>
      <div className="ud-grid">
        {cards.map(({ title, desc, icon: Icon, path, color }, i) => (
          <div key={path} className="ud-card" style={{ animationDelay: `${i * 0.1}s` }} onClick={() => navigate(path)}>
            <div className="ud-icon" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
              <Icon size={20} color={color} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className="ud-arrow" style={{ color }}>
              Go to {title.split(' ')[1] || title} <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
