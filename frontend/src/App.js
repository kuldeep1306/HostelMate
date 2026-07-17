import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { getToken, getRole } from './api';

// User Pages
import Home              from './components/pages/Home';
import Feedback          from './components/pages/Feedback';
import Complaint         from './components/pages/Complaint';
import Notices           from './components/pages/Notices';
import Navbar            from './components/Navbar';
import UserDashboard     from './components/pages/UserDashboard';
import UserSocietiesPage from './components/pages/UserSociety';

// Admin Pages
import AdminLayout       from './components/AdminDashboard/AdminLayout';
import DashboardContent  from './components/AdminDashboard/DashboardContent';
import AdminSocietiesPage from './components/AdminDashboard/AdminSociety';
import FeedbackPage      from './components/AdminDashboard/FeedbackPage';
import ComplaintsPage    from './components/AdminDashboard/ComplaintsPage';
import NoticesPage       from './components/AdminDashboard/NoticesPage';

// Auth Pages
import Login             from './pages/Login';
import Signup            from './pages/Signup';

// ─── Guards ──────────────────────────────────────────────────────────────────
const RequireAuth = ({ role }) => {
  const token = getToken();
  const userRole = getRole();
  if (!token) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/login" replace />;
  return <Outlet />;
};

// Layout for user pages
const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App = () => (
  <Router>
    <Routes>
      {/* AUTH */}
      <Route path="/"              element={<Signup />} />
      <Route path="/login"         element={<Login />} />

      {/* USER — requires login */}
      <Route element={<RequireAuth />}>
        <Route path="/user" element={<UserLayout />}>
          <Route path="home"      element={<Home />} />
          <Route path="feedback"  element={<Feedback />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="notices"   element={<Notices />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="societies" element={<UserSocietiesPage />} />
        </Route>
      </Route>

      {/* ADMIN — requires admin role */}
      <Route element={<RequireAuth role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index              element={<DashboardContent />} />
          <Route path="dashboard"  element={<DashboardContent />} />
          <Route path="societies"  element={<AdminSocietiesPage />} />
          <Route path="feedback"   element={<FeedbackPage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="notice"     element={<NoticesPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;
