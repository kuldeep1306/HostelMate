import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clearAuth } from '../api';
import { 
  Home, MessageSquare, AlertTriangle, 
  Bell, Users, LogOut, Menu, X, 
} from 'lucide-react';

const navItems = [
  { name: 'Home',      path: '/user/home',      icon: Home },
  { name: 'Feedback',  path: '/user/feedback',  icon: MessageSquare },
  { name: 'Complaint', path: '/user/complaint', icon: AlertTriangle },
  { name: 'Notices',   path: '/user/notices',   icon: Bell },
  { name: 'Societies', path: '/user/societies', icon: Users },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <>
      {/* Top Gradient Mask: Isse upar wala part dark rahega */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none z-[999]" />

      <nav className={`fixed top-0 left-0 right-0 z-[1000] flex justify-center transition-all duration-500 ${
        scrolled ? 'pt-2 sm:pt-4' : 'pt-6 sm:pt-8'
      }`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between w-[95%] max-w-6xl h-16 px-4 sm:px-6 rounded-2xl border transition-all duration-500 ${
            scrolled 
            ? 'bg-slate-950/80 backdrop-blur-2xl border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.7)]' 
            : 'bg-white/[0.02] backdrop-blur-md border-white/5'
          }`}
        >
          {/* Brand Logo with Spotlight */}
          <div 
            className="flex items-center gap-3 cursor-pointer group relative"
            onClick={() => navigate('/user/home')}
          >
            <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 overflow-hidden">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,#f59e0b_50%,transparent_100%)] opacity-40"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tighter text-white leading-none uppercase">
                Hostel<span className="text-amber-500">Mate</span>
              </span>
              <span className="text-[8px] font-bold text-slate-500 tracking-[0.4em] uppercase">Secure Access</span>
            </div>
          </div>

          {/* Nav Links - Center Pill */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 ${
                    isActive ? 'text-slate-950' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={14} strokeWidth={3} />
                    <span>{item.name}</span>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 border border-white/5 hover:border-red-500/20 transition-all font-bold text-xs uppercase tracking-tighter"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu - Sidebar Style */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden z-[-1]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 h-full w-[280px] bg-slate-950 border-l border-white/10 p-6 flex flex-col gap-6 lg:hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-amber-500 font-black text-sm tracking-widest uppercase italic">Navigator</span>
                  <X className="text-slate-500" onClick={() => setIsOpen(false)} />
                </div>
                
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        location.pathname === item.path 
                        ? 'bg-amber-500 text-slate-950 font-bold' 
                        : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="text-sm uppercase tracking-wider">{item.name}</span>
                    </Link>
                  ))}
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-auto flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-red-600 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-red-900/40"
                >
                  <LogOut size={18} />
                  Terminate Session
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;