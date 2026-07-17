// Central API service — replaces Firebase completely
// All requests go to Express backend at localhost:5000

const BASE_URL = process.env.REACT_APP_API_URL || 'https://hostelmate-1-owit.onrender.com';

// ─── Token helpers ────────────────────────────────────────────────────────────
export const getToken  = ()           => localStorage.getItem('hm_token');
export const getRole   = ()           => localStorage.getItem('hm_role');
export const saveAuth  = (token, role) => { localStorage.setItem('hm_token', token); localStorage.setItem('hm_role', role); };
export const clearAuth = ()           => { localStorage.removeItem('hm_token'); localStorage.removeItem('hm_role'); };
export const isLoggedIn = ()          => !!getToken();

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
async function api(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  signup: (email, password, adminCode = '', name = '') =>
    api('/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, adminCode, name }) }),

  login: (email, password) =>
    api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
};

// ─── Feedback ─────────────────────────────────────────────────────────────────
export const feedbackAPI = {
  getAll:  ()                        => api('/feedback'),
  submit:  (name, roll, feedback)    => api('/feedback',   { method: 'POST', body: JSON.stringify({ name, roll, feedback }) }),
  delete:  (id)                      => api(`/feedback/${id}`, { method: 'DELETE' }),
};

// ─── Complaints ───────────────────────────────────────────────────────────────
export const complaintsAPI = {
  getAll:  ()                              => api('/complaints'),
  submit:  (name, hostel, room, message)   => api('/complaints', { method: 'POST', body: JSON.stringify({ name, hostel, room, message }) }),
  delete:  (id)                            => api(`/complaints/${id}`, { method: 'DELETE' }),
};

// ─── Notices ──────────────────────────────────────────────────────────────────
export const noticesAPI = {
  getAll:  ()          => api('/notices'),
  create:  (message)   => api('/notices', { method: 'POST', body: JSON.stringify({ message }) }),
  delete:  (id)        => api(`/notices/${id}`, { method: 'DELETE' }),
};

// ─── Societies ────────────────────────────────────────────────────────────────
export const societiesAPI = {
  getAll:  ()       => api('/societies'),
  create:  (data)   => api('/societies',      { method: 'POST',   body: JSON.stringify(data) }),
  update:  (id, data) => api(`/societies/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:  (id)     => api(`/societies/${id}`, { method: 'DELETE' }),
};
