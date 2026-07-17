import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { clearAuth } from '../../api';
import { LayoutDashboard, MessageSquare, AlertTriangle, Bell, Users, LogOut, Menu, X, Hexagon } from 'lucide-react';

const navItems = [
  { name: 'Dashboard',  path: '/admin/dashboard',  icon: LayoutDashboard },
  { name: 'Feedback',   path: '/admin/feedback',   icon: MessageSquare },
  { name: 'Complaints', path: '/admin/complaints', icon: AlertTriangle },
  { name: 'Notices',    path: '/admin/notice',     icon: Bell },
  { name: 'Societies',  path: '/admin/societies',  icon: Users },
];

const AdminLayout = () => {
  const location   = useLocation();
  const navigate   = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer automatically whenever the route changes
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => { clearAuth(); navigate('/login'); };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes al-fadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes al-slideIn { from { opacity:0; transform:translateY(-10px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes al-glow { 0%,100% { filter:drop-shadow(0 0 3px rgba(212,175,55,0.35)); } 50% { filter:drop-shadow(0 0 9px rgba(212,175,55,0.7)); } }
        @keyframes al-sweep { 0% { background-position:-160% 0; } 100% { background-position:160% 0; } }

        .al-nav { display:flex; justify-content:space-between; align-items:center;
          padding:0 32px; height:64px; background:rgba(8,14,26,0.95);
          backdrop-filter:blur(16px); border-bottom:1px solid var(--border);
          position:sticky; top:0; z-index:1000; transition:box-shadow 0.3s ease, border-color 0.3s ease; }
        .al-nav.is-scrolled { box-shadow:0 8px 24px rgba(0,0,0,0.35); border-bottom-color:var(--border-accent); }

        .al-logo { display:flex; align-items:center; gap:10px; animation:al-fadeDown 0.5s ease both; }
        .al-logo-icon { display:flex; color:var(--gold); animation:al-glow 3.2s ease-in-out infinite; }
        .al-logo-text { font-family:var(--font-display); font-size:19px; font-weight:700; color:var(--gold);
          background:linear-gradient(90deg, var(--gold) 20%, #f3dfa0 40%, var(--gold) 60%);
          background-size:250% auto; -webkit-background-clip:text; background-clip:text;
          animation:al-sweep 6s linear infinite; }
        .al-badge { font-size:11px; padding:2px 8px; background:var(--gold-dim);
          border:1px solid var(--border-accent); color:var(--gold); border-radius:99px;
          font-weight:600; letter-spacing:0.06em; margin-left:4px; }

        .al-links { display:flex; align-items:center; gap:4px; }
        .al-link { position:relative; display:flex; align-items:center; gap:7px; padding:8px 14px;
          border-radius:8px; font-size:14px; font-weight:500; color:var(--text-secondary);
          transition:all 0.2s ease; cursor:pointer; animation:al-fadeDown 0.5s ease both; }
        .al-link svg { width:15px; height:15px; transition:transform 0.2s ease; }
        .al-link:hover  { background:var(--gold-dim); color:var(--text-primary); transform:translateY(-1px); }
        .al-link:hover svg { transform:scale(1.1); }
        .al-link.active { background:var(--gold-dim); color:var(--gold); border:1px solid var(--border-accent); }
        .al-link.active::after { content:''; position:absolute; left:14px; right:14px; bottom:-1px; height:2px;
          background:var(--gold); border-radius:2px; animation:al-fadeDown 0.3s ease both; }

        .al-logout { display:flex; align-items:center; gap:7px; padding:8px 16px;
          background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25);
          color:#f87171; border-radius:8px; font-size:14px; font-weight:500;
          cursor:pointer; transition:all 0.2s ease; margin-left:8px; }
        .al-logout:hover { background:rgba(239,68,68,0.85); color:#fff; transform:translateY(-1px);
          box-shadow:0 6px 16px rgba(239,68,68,0.25); }
        .al-logout:active { transform:translateY(0) scale(0.97); }

        .al-hamburger { display:none; align-items:center; justify-content:center; width:36px; height:36px;
          border-radius:8px; cursor:pointer; color:var(--gold); transition:background 0.2s ease, transform 0.15s ease; }
        .al-hamburger:hover { background:var(--gold-dim); }
        .al-hamburger:active { transform:scale(0.92); }
        .al-hamburger svg { transition:transform 0.25s ease; }

        .al-mobile { display:none; flex-direction:column; overflow:hidden; max-height:0;
          background:var(--bg-secondary); border-bottom:1px solid var(--border);
          transition:max-height 0.35s ease; }
        .al-mobile.open { display:flex; max-height:480px; }
        .al-mobile-inner { padding:12px 24px 20px; display:flex; flex-direction:column; gap:4px;
          animation:al-slideIn 0.3s ease both; }
        .al-mobile .al-link { width:100%; animation:none; }
        .al-mobile .al-link.active::after { display:none; }
        .al-mobile .al-link.active { border-left:3px solid var(--gold); border-radius:6px; padding-left:11px; }

        @media(max-width:900px) {
          .al-links { display:none; }
          .al-hamburger { display:flex; }
        }
        @media(max-width:480px) {
          .al-nav { padding:0 16px; }
          .al-logo-text { font-size:17px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .al-nav, .al-logo, .al-logo-icon, .al-logo-text, .al-link, .al-logout,
          .al-hamburger svg, .al-mobile, .al-mobile-inner { animation:none !important; transition:none !important; }
        }
      `}</style>

      <nav className={`al-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="al-logo">
          <span className="al-logo-icon"><Hexagon size={22} fill="currentColor" fillOpacity={0.12} /></span>
          <span className="al-logo-text">HostelMate</span>
          <span className="al-badge">ADMIN</span>
        </div>

        <div className="al-links">
          {navItems.map(({ name, path, icon: Icon }, i) => (
            <Link key={path} to={path}
              style={{ animationDelay: `${i * 0.05}s` }}
              className={`al-link${location.pathname === path ? ' active' : ''}`}>
              <Icon /> {name}
            </Link>
          ))}
          <button className="al-logout" onClick={handleLogout}><LogOut size={14} /> Logout</button>
        </div>

        <div className="al-hamburger" onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </div>
      </nav>

      <div className={`al-mobile${mobileOpen ? ' open' : ''}`}>
        <div className="al-mobile-inner">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link key={path} to={path}
              className={`al-link${location.pathname === path ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}>
              <Icon /> {name}
            </Link>
          ))}
          <button className="al-logout" style={{ marginLeft: 0, marginTop: '8px' }}
            onClick={() => { handleLogout(); setMobileOpen(false); }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <main style={{ flex: 1 }}><Outlet /></main>
    </div>
  );
};

export default AdminLayout;