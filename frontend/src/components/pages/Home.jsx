import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Footer';
import {
  Phone, User, Shield, Search, Users, DoorOpen,
  Siren, Stethoscope, Flame, ShieldAlert, ChevronDown, KeyRound
} from 'lucide-react';

const hostels = [
  { name: 'Tilak Hostel', type: 'BOYS', room: 'T-01', description: 'Excellent amenities with 24/7 security. Wi-Fi & single occupancy rooms. Best for peace and privacy.',
    warden: 'Mr. Ramesh Kumar', wardenPhone: '+919812345678', caretaker: 'Mr. Anil Verma', caretakerPhone: '+919800123456' },
  { name: 'Shastri Hostel', type: 'BOYS', room: 'S-02', description: 'Single and double occupancy rooms with Wi-Fi, 24/7 security & mess for 2nd to 4th year students.',
    warden: 'Mrs. Sunita Sharma', wardenPhone: '+919876543210', caretaker: 'Ms. Rekha Gupta', caretakerPhone: '+919800654321' },
  { name: 'Sarojini Hostel', type: 'GIRLS', room: 'SJ-03', description: 'Modern facilities, peaceful environment with Wi-Fi, mess, and recreational area.',
    warden: 'Mr. Dinesh Mehta', wardenPhone: '+919998887766', caretaker: 'Mr. Rajat Singh', caretakerPhone: '+919800987654' },
  { name: 'Malviya Hostel', type: 'BOYS', room: 'M-04', description: 'Good environment with Wi-Fi, mess, and all essential amenities. Only for first year students.',
    warden: 'Mr. Dinesh Mehta', wardenPhone: '+919998887766', caretaker: 'Mr. Rajat Singh', caretakerPhone: '+919800987654' },
  { name: 'Vivekanand Hostel', type: 'BOYS', room: 'V-05', description: 'Good environment with Wi-Fi and all essential amenities. Biggest in size and capacity.',
    warden: 'Mr. Dinesh Mehta', wardenPhone: '+919998887766', caretaker: 'Mr. Rajat Singh', caretakerPhone: '+919800987654' },
  { name: 'Patel Hostel', type: 'BOYS', room: 'P-06', description: 'Good environment with Wi-Fi and all essential amenities. Only for first year students.',
    warden: 'Mr. Dinesh Mehta', wardenPhone: '+919998887766', caretaker: 'Mr. Rajat Singh', caretakerPhone: '+919800987654' },
];

const emergency = [
  { title: 'Director', name: 'Dr. Rajeev Malhotra', phone: '+911100112233', icon: ShieldAlert, urgent: false },
  { title: 'Dean of Student Welfare', name: 'Prof. Neha Bansal', phone: '+911100445566', icon: Users, urgent: false },
  { title: 'Medical Emergency', name: 'Campus Clinic', phone: '+911145678900', icon: Stethoscope, urgent: true },
  { title: 'Security Helpdesk', name: 'Main Gate Security', phone: '+911123456789', icon: Siren, urgent: false },
  { title: 'Fire Emergency', name: 'Fire Station (Local)', phone: '101', icon: Flame, urgent: true },
];

/** Reveals a section/card the moment it scrolls into view. */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

const HostelCard = ({ h, i }) => {
  const [ref, visible] = useReveal();
  const isGirls = h.type === 'GIRLS';
  return (
    <div
      ref={ref}
      className={`h-card ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${(i % 3) * 90}ms` }}
    >
      <div className="h-card-watermark">
        <DoorOpen size={72} strokeWidth={1} />
      </div>
      <div className="h-card-top">
        <span className={`h-card-badge ${isGirls ? 'badge-girls' : 'badge-boys'}`}>
          {isGirls ? 'Girls' : 'Boys'}
        </span>
        <span className="h-room-tag">
          <KeyRound size={11} /> {h.room}
        </span>
      </div>
      <h3>{h.name}</h3>
      <p>{h.description}</p>
      <div className="h-card-contacts">
        <div className="h-contact-row">
          <span className="h-contact-icon"><User size={13} /></span>
          <div className="h-contact-meta">
            <span className="h-contact-label">Warden</span>
            <span className="h-contact-name">{h.warden}</span>
          </div>
          <a className="h-call-pill" href={`tel:${h.wardenPhone}`}>
            <Phone size={12} /> Call
          </a>
        </div>
        <div className="h-contact-row">
          <span className="h-contact-icon"><Shield size={13} /></span>
          <div className="h-contact-meta">
            <span className="h-contact-label">Caretaker</span>
            <span className="h-contact-name">{h.caretaker}</span>
          </div>
          <a className="h-call-pill" href={`tel:${h.caretakerPhone}`}>
            <Phone size={12} /> Call
          </a>
        </div>
      </div>
    </div>
  );
};

const EmergencyCard = ({ e, i }) => {
  const [ref, visible] = useReveal();
  const Icon = e.icon;
  return (
    <div
      ref={ref}
      className={`h-emg-card ${e.urgent ? 'is-urgent' : ''} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${(i % 3) * 90}ms` }}
    >
      <div className="h-emg-icon"><Icon size={18} /></div>
      <div className="h-emg-body">
        <h4>{e.title}</h4>
        <p>{e.name}</p>
      </div>
      <a className="h-emg-call" href={`tel:${e.phone}`}>
        <Phone size={13} /> {e.phone}
      </a>
    </div>
  );
};

const Home = () => {
  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');
  const [heroIn, setHeroIn] = useState(false);
  const [heroRef, sectionVisible] = useReveal();
  const [emgRef, emgVisible] = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  const filtered = hostels.filter((h) => {
    const matchesType = filter === 'ALL' || h.type === filter;
    const matchesQuery = h.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes floatSlow { 0%,100% { transform:translateY(0) translateX(0); } 50% { transform:translateY(-18px) translateX(10px); } }
        @keyframes drift { 0% { transform:translateX(-6%); } 100% { transform:translateX(6%); } }
        @keyframes pulseRing { 0% { box-shadow:0 0 0 0 rgba(239,68,68,0.45); } 70% { box-shadow:0 0 0 10px rgba(239,68,68,0); } 100% { box-shadow:0 0 0 0 rgba(239,68,68,0); } }
        @keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(8px); } }

        /* ---------- Hero ---------- */
        .h-hero { position:relative; width:100%; min-height:560px; overflow:hidden;
          display:flex; align-items:center; justify-content:center; }
        .h-hero img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
          filter:brightness(30%) saturate(0.75); transform:scale(1.08);
          transition:transform 10s ease-out; }
        .h-hero.hero-in img { transform:scale(1); }
        .h-hero-mesh { position:absolute; inset:0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(212,175,55,0.16), transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 75%, rgba(147,197,253,0.10), transparent 60%),
            linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 65%, var(--bg-primary) 100%);
        }
        .h-orb { position:absolute; border-radius:50%; filter:blur(50px); opacity:0.35; pointer-events:none; }
        .h-orb-1 { width:260px; height:260px; background:var(--gold); top:8%; left:6%; animation:floatSlow 9s ease-in-out infinite; }
        .h-orb-2 { width:200px; height:200px; background:#93c5fd; bottom:10%; right:8%; animation:floatSlow 11s ease-in-out infinite reverse; }
        .h-hero-overlay { position:relative; z-index:2; display:flex; flex-direction:column;
          justify-content:center; align-items:center; text-align:center; padding:24px; max-width:760px; }
        .h-hero-tag { display:inline-flex; align-items:center; gap:8px; font-size:12px; letter-spacing:0.18em;
          text-transform:uppercase; color:var(--gold); font-weight:700; margin-bottom:20px;
          padding:6px 16px; border:1px solid rgba(212,175,55,0.35); border-radius:99px;
          background:rgba(212,175,55,0.06); opacity:0; animation:fadeUp 0.7s ease 0.1s forwards; }
        .h-hero h1 { font-family:var(--font-display); font-size:clamp(2.1rem, 5vw, 3.4rem); font-weight:700;
          color:#fff; margin:0 0 6px; line-height:1.14; opacity:0; animation:fadeUp 0.8s ease 0.28s forwards; }
        .h-hero h1.line-2 { animation-delay:0.42s; background:linear-gradient(90deg, #fff, var(--gold-light, #e8c766), #fff);
          background-size:200% auto; -webkit-background-clip:text; background-clip:text; color:transparent;
          animation:fadeUp 0.8s ease 0.42s forwards, shimmer 5s linear infinite 1.2s; }
        .h-hero p { color:rgba(255,255,255,0.68); font-size:1rem; max-width:480px; margin-top:16px;
          opacity:0; animation:fadeUp 0.8s ease 0.56s forwards; }
        .h-scroll-cue { position:absolute; bottom:22px; left:50%; transform:translateX(-50%); z-index:2;
          color:rgba(255,255,255,0.55); animation:bounce 2s ease-in-out infinite; }

        /* ---------- Sections ---------- */
        .h-section { max-width:1200px; margin:0 auto; padding:64px 32px 0; opacity:0; transform:translateY(16px);
          transition:opacity 0.6s ease, transform 0.6s ease; }
        .h-section.is-visible { opacity:1; transform:translateY(0); }
        .h-sec-head { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:20px; margin-bottom:30px; }
        .h-sec-title { font-family:var(--font-display); font-size:clamp(1.5rem,3vw,1.9rem); color:var(--text-primary); margin-bottom:6px; }
        .h-sec-sub { color:var(--text-secondary); font-size:14px; }
        .h-divider { width:48px; height:3px; background:var(--gold); margin-bottom:12px; border-radius:2px; }

        /* ---------- Filter / search bar ---------- */
        .h-controls { display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
        .h-chip { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600;
          padding:8px 16px; border-radius:99px; border:1px solid var(--border); color:var(--text-secondary);
          background:var(--bg-card); cursor:pointer; transition:all 0.2s; }
        .h-chip:hover { border-color:var(--border-accent); color:var(--text-primary); transform:translateY(-1px); }
        .h-chip.active { background:var(--gold); border-color:var(--gold); color:#1a1408; }
        .h-search { position:relative; display:flex; align-items:center; }
        .h-search svg { position:absolute; left:12px; color:var(--text-muted); pointer-events:none; }
        .h-search input { padding:9px 14px 9px 34px; border-radius:99px; border:1px solid var(--border);
          background:var(--bg-card); color:var(--text-primary); font-size:13px; outline:none; width:200px;
          transition:all 0.2s; }
        .h-search input:focus { border-color:var(--gold); width:230px; box-shadow:0 0 0 3px rgba(212,175,55,0.12); }

        /* ---------- Hostel grid ---------- */
        .h-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:20px; }
        .h-empty { color:var(--text-muted); font-size:14px; padding:40px 0; text-align:center; }
        .h-card { position:relative; overflow:hidden; background:var(--bg-card); border:1px solid var(--border);
          border-radius:var(--radius); padding:24px; cursor:default;
          opacity:0; transform:translateY(24px) scale(0.98);
          transition:opacity 0.55s ease, transform 0.55s ease, border-color 0.25s, box-shadow 0.25s; }
        .h-card.is-visible { opacity:1; transform:translateY(0) scale(1); }
        .h-card:hover { border-color:var(--border-accent); transform:translateY(-6px) scale(1.01);
          box-shadow:0 16px 36px rgba(0,0,0,0.35), var(--shadow-glow); }
        .h-card-watermark { position:absolute; top:-10px; right:-10px; color:var(--text-primary); opacity:0.04;
          transition:transform 0.4s ease, opacity 0.4s ease; }
        .h-card:hover .h-card-watermark { transform:rotate(-8deg) scale(1.1); opacity:0.07; }
        .h-card-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
        .h-card-badge { display:inline-block; font-size:10px; letter-spacing:0.1em;
          text-transform:uppercase; padding:4px 11px; border-radius:99px; font-weight:700; }
        .badge-boys { background:rgba(59,130,246,0.15); color:#93c5fd; border:1px solid rgba(59,130,246,0.3); }
        .badge-girls { background:rgba(244,114,182,0.15); color:#f9a8d4; border:1px solid rgba(244,114,182,0.3); }
        .h-room-tag { display:inline-flex; align-items:center; gap:4px; font-size:10.5px; font-weight:600;
          color:var(--gold); letter-spacing:0.04em; }
        .h-card h3 { font-family:var(--font-display); font-size:1.2rem; color:var(--text-primary); margin:0 0 8px; }
        .h-card p { color:var(--text-secondary); font-size:13.5px; line-height:1.6; margin:0 0 18px; }
        .h-card-contacts { border-top:1px solid var(--border); padding-top:14px; display:flex; flex-direction:column; gap:10px; }
        .h-contact-row { display:flex; align-items:center; gap:10px; }
        .h-contact-icon { display:flex; align-items:center; justify-content:center; width:26px; height:26px;
          border-radius:8px; background:rgba(212,175,55,0.08); color:var(--gold); flex-shrink:0; }
        .h-contact-meta { display:flex; flex-direction:column; min-width:0; flex:1; }
        .h-contact-label { color:var(--text-muted); font-size:10px; text-transform:uppercase; letter-spacing:0.05em; }
        .h-contact-name { color:var(--text-primary); font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .h-call-pill { display:inline-flex; align-items:center; gap:4px; font-size:11.5px; font-weight:600;
          color:var(--gold); border:1px solid rgba(212,175,55,0.3); padding:6px 11px; border-radius:99px;
          flex-shrink:0; transition:all 0.2s; }
        .h-call-pill:hover { background:var(--gold); color:#1a1408; transform:scale(1.05); }

        /* ---------- Emergency ---------- */
        .h-emg-card { position:relative; background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius);
          padding:20px; display:flex; align-items:center; gap:14px; transition:all 0.25s;
          opacity:0; transform:translateY(24px); }
        .h-emg-card.is-visible { opacity:1; transform:translateY(0); }
        .h-emg-card:hover { border-color:rgba(239,68,68,0.4); transform:translateY(-3px); }
        .h-emg-icon { display:flex; align-items:center; justify-content:center; width:38px; height:38px; flex-shrink:0;
          border-radius:10px; background:rgba(239,68,68,0.1); color:#f87171; }
        .h-emg-card.is-urgent .h-emg-icon { animation:pulseRing 2.2s infinite; }
        .h-emg-body { flex:1; min-width:0; }
        .h-emg-body h4 { color:var(--text-primary); font-size:14px; font-weight:600; margin:0 0 2px; }
        .h-emg-body p { color:var(--text-secondary); font-size:12.5px; margin:0; }
        .h-emg-call { display:flex; align-items:center; gap:5px; color:#f87171; font-weight:700; font-size:12.5px;
          flex-shrink:0; white-space:nowrap; }

        .h-bottom-space { height:64px; }

        @media (prefers-reduced-motion: reduce) {
          .h-hero img, .h-orb, .h-hero-tag, .h-hero h1, .h-hero p, .h-scroll-cue,
          .h-card, .h-emg-card, .h-section { animation:none !important; transition:none !important; }
          .h-hero-overlay * { opacity:1 !important; transform:none !important; }
        }

        @media (max-width:768px) {
          .h-hero { min-height:460px; }
          .h-section { padding:44px 18px 0; }
          .h-sec-head { align-items:flex-start; }
          .h-search input, .h-search input:focus { width:100%; }
          .h-controls { width:100%; }
        }
        @media (max-width:480px) {
          .h-hero h1 { font-size:1.7rem; }
          .h-hero p { font-size:0.9rem; }
          .h-grid { grid-template-columns:1fr; }
          .h-card, .h-emg-card { padding:18px; }
        }
      `}</style>

      {/* Hero */}
      <div className={`h-hero ${heroIn ? 'hero-in' : ''}`}>
        <img src="/college.jpg" alt="RKGIT Campus" />
        <div className="h-hero-mesh" />
        <div className="h-orb h-orb-1" />
        <div className="h-orb h-orb-2" />
        <div className="h-hero-overlay">
          <div className="h-hero-tag"><KeyRound size={13} /> RKGIT Hostel Portal</div>
          <h1>Raj Kumar Goel Institute of Technology</h1>
          <h1 className="line-2">(RKGIT)</h1>
          <p>Ghaziabad, Uttar Pradesh — your home away from home.</p>
        </div>
        <div className="h-scroll-cue"><ChevronDown size={22} /></div>
      </div>

      {/* Hostels */}
      <div ref={heroRef} className={`h-section ${sectionVisible ? 'is-visible' : ''}`}>
        <div className="h-divider" />
        <div className="h-sec-head">
          <div>
            <h2 className="h-sec-title">Our Hostels</h2>
            <p className="h-sec-sub">Comfortable living with modern amenities — find your block below.</p>
          </div>
          <div className="h-controls">
            <div className="h-search">
              <Search size={14} />
              <input
                type="text"
                placeholder="Search hostel..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {['ALL', 'BOYS', 'GIRLS'].map((f) => (
              <button
                key={f}
                type="button"
                className={`h-chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'ALL' ? 'All Hostels' : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="h-empty">No hostels match your search.</div>
        ) : (
          <div className="h-grid">
            {filtered.map((h, i) => (
              <HostelCard key={h.name} h={h} i={i} />
            ))}
          </div>
        )}
      </div>

      {/* Emergency */}
      <div ref={emgRef} className={`h-section ${emgVisible ? 'is-visible' : ''}`} style={{ paddingBottom: '0' }}>
        <div className="h-divider" style={{ background: '#ef4444' }} />
        <h2 className="h-sec-title">Emergency Contacts</h2>
        <p className="h-sec-sub" style={{ marginBottom: '30px' }}>Reach out immediately when needed.</p>
        <div className="h-grid">
          {emergency.map((e, i) => (
            <EmergencyCard key={e.title} e={e} i={i} />
          ))}
        </div>
      </div>

      <div className="h-bottom-space" />
      <Footer />
    </div>
  );
};

export default Home;