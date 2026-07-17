import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Sparkles,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kuldeepkh1305/', label: 'LinkedIn', color: 'hover:text-[#0077b5]' },
    { icon: Github, href: 'https://github.com/kuldeep1306', label: 'GitHub', color: 'hover:text-white' },
    { icon: Mail, href: 'mailto:kuldeepkh1305@gmail.com', label: 'Email', color: 'hover:text-amber-400' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative mt-24 overflow-hidden border-t border-white/5 bg-[#030712]"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-amber-500/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 group cursor-pointer w-fit"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-900/20">
                <Sparkles size={24} className="text-slate-900 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white uppercase italic">
                  Hostel<span className="text-amber-500">Mate</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Ultimate Management
                </span>
              </div>
            </motion.div>
            
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Revolutionizing the way hostels are managed with a focus on speed, 
              security, and student convenience.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 transition-all ${social.color}`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-amber-500">
              Get in Touch
            </h5>
            <div className="space-y-4">
              <a href="mailto:kuldeepkh1305@gmail.com" className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-amber-500/20 transition-colors">
                  <Mail size={14} className="group-hover:text-amber-400" />
                </div>
                <span className="text-sm font-medium">kuldeepkh1305@gmail.com</span>
              </a>
              <a href="tel:+918433202325" className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-amber-500/20 transition-colors">
                  <Phone size={14} className="group-hover:text-amber-400" />
                </div>
                <span className="text-sm font-medium">+91-8433202325</span>
              </a>
              <div className="group flex items-center gap-3 text-slate-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <MapPin size={14} />
                </div>
                <span className="text-sm font-medium">RKGIT, Ghaziabad, UP</span>
              </div>
            </div>
          </div>

          {/* Developer Section */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8">
            <div>
              <h5 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-200">
                Developer Profile
              </h5>
              <div className="space-y-2">
                <p className="text-lg font-bold text-white leading-tight">
                  Kuldeep Sharma
                </p>
                <p className="text-sm text-slate-400 font-medium">
                  Full Stack Developer | Fresher
                </p>
              </div>
            </div>
            
            <motion.a 
              href="https://thekuldeepsays.vercel.app"
              target="_blank"
              rel="noreferrer"
              whileHover={{ gap: '12px' }}
              className="mt-8 flex items-center gap-2 text-sm font-bold text-amber-500 group"
            >
              VIEW PORTFOLIO 
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-xs font-medium text-slate-500">
            © {currentYear} HostelMate. Built with precision for the future.
          </p>
          
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2">
            <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
              Made with
            </span>
            <Heart size={12} className="text-red-500 animate-pulse fill-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              by Kuldeep Sharma
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;