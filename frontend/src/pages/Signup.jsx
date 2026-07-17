import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, saveAuth } from '../api';

const Signup = () => {
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    try {
      const data = await authAPI.signup(email, password, adminCode);
      saveAuth(data.token, data.role);
      if (data.role === 'admin') navigate('/admin');
      else navigate('/user/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.bg}>
      <div style={s.glow} />
      <div style={s.card}>
        <div style={s.logo}>
          <span style={s.logoIcon}>⬡</span>
          <span style={s.logoText}>HostelMate</span>
        </div>
        <h2 style={s.heading}>Create account</h2>
        <p style={s.sub}>Join the RKGIT Hostel Portal</p>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleSignup}>
          <div style={s.field}>
            <label style={s.label}>Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" required style={s.input}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(min. 6 characters)</span></label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required style={s.input}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Admin Access Code <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(leave blank if student)</span></label>
            <input type="text" value={adminCode} onChange={e => setAdminCode(e.target.value)}
              placeholder="Optional — for admin registration only" style={s.input}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
          </div>

          <button type="submit" style={s.btn} disabled={loading}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={s.link}>Already have an account?{' '}
          <span style={s.linkSpan} onClick={() => navigate('/login')}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

const s = {
  bg:       { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-primary)', padding: '20px', position: 'relative', overflow: 'hidden' },
  glow:     { position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
              width: '600px', height: '400px',
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)',
              pointerEvents: 'none' },
  card:     { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px',
              padding: '48px 44px', width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow-card)',
              animation: 'fadeUp 0.5s ease', position: 'relative', zIndex: 1 },
  logo:     { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', justifyContent: 'center' },
  logoIcon: { fontSize: '28px', color: 'var(--gold)' },
  logoText: { fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--gold)' },
  heading:  { fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '600', marginBottom: '6px', textAlign: 'center' },
  sub:      { color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '28px', fontSize: '14px' },
  error:    { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: '#fca5a5',
              fontSize: '13px', marginBottom: '20px' },
  field:    { marginBottom: '18px' },
  label:    { display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)',
              marginBottom: '7px', letterSpacing: '0.03em' },
  input:    { width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)', fontSize: '15px', outline: 'none',
              transition: 'border-color 0.2s', boxSizing: 'border-box' },
  btn:      { width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff', fontWeight: '700', fontSize: '15px', border: 'none',
              borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'opacity 0.2s',
              letterSpacing: '0.03em', marginTop: '6px' },
  link:     { textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' },
  linkSpan: { color: 'var(--gold)', cursor: 'pointer', fontWeight: '500' },
};

export default Signup;
