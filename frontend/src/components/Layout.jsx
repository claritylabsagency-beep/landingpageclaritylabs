import { useState, useEffect, createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Theme Context
export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex items-center justify-between transition-all duration-500 rounded-full px-4 md:px-6 py-2 ${
            scrolled 
              ? isDark 
                ? 'bg-black/60 backdrop-blur-xl border border-white/10' 
                : 'bg-white/60 backdrop-blur-xl border border-black/10 shadow-lg'
              : ''
          }`}>
            {/* Logo */}
            <Link to="/" className="relative z-50" data-testid="logo-link">
              <motion.span 
                className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
                whileHover={{ scale: 1.05 }}
              >
                CLARITY
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    location.pathname === link.path
                      ? isDark ? 'text-white bg-white/10' : 'text-slate-900 bg-slate-100'
                      : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                data-testid="theme-toggle"
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="nav-book-call-btn"
                className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  isDark 
                    ? 'bg-white text-black hover:bg-blue-400 hover:text-white' 
                    : 'bg-slate-900 text-white hover:bg-blue-600'
                }`}
              >
                Book a Call
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              {/* Mobile Toggle */}
              <button
                data-testid="mobile-menu-btn"
                className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-slate-900'}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 backdrop-blur-xl flex items-center justify-center md:hidden ${
              isDark ? 'bg-black/95' : 'bg-white/95'
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to={link.path}
                    data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-bold transition-colors ${
                      isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                data-testid="mobile-book-call-btn"
                className={`mt-8 px-10 py-4 rounded-full text-lg font-semibold ${
                  isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Book a Call
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API}/newsletter/subscribe`, { email });
      toast.success(res.data.message);
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`relative border-t ${isDark ? 'border-white/10 bg-black' : 'border-slate-200 bg-slate-50'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Let's create something
              <br />
              <span className="text-blue-500">worth watching.</span>
            </h3>
            <p className={`mb-8 max-w-md ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
              Weekly insights on video that converts. No spam, just value.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="newsletter-email-input"
                className={`flex-1 h-12 px-5 rounded-full ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="newsletter-submit-btn"
                className={`px-8 h-12 rounded-full font-semibold transition-colors disabled:opacity-50 ${
                  isDark 
                    ? 'bg-white text-black hover:bg-blue-400 hover:text-white' 
                    : 'bg-slate-900 text-white hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-12 lg:justify-end">
            <div>
              <p className={`text-xs font-mono uppercase tracking-widest mb-4 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>Navigate</p>
              <ul className="space-y-3">
                {['Home', 'Pricing', 'About'].map((link) => (
                  <li key={link}>
                    <Link 
                      to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                      className={`transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                      data-testid={`footer-${link.toLowerCase()}-link`}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`text-xs font-mono uppercase tracking-widest mb-4 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>Connect</p>
              <ul className="space-y-3">
                {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                  <li key={social}>
                    <a 
                      href="#"
                      className={`transition-colors inline-flex items-center gap-1 ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                      data-testid={`social-${social.toLowerCase()}`}
                    >
                      {social}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t overflow-hidden ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="py-8 flex justify-between items-center max-w-[1400px] mx-auto px-6 md:px-12">
          <p className={`text-xs ${isDark ? 'text-white/30' : 'text-slate-400'}`}>© {new Date().getFullYear()} Clarity Labs</p>
          <p className={`text-xs ${isDark ? 'text-white/30' : 'text-slate-400'}`}>Premium Video for SaaS</p>
        </div>
        <div className="pb-8">
          <p className={`text-[15vw] font-bold text-center leading-none select-none tracking-tighter ${isDark ? 'text-white/[0.02]' : 'text-slate-200'}`}>
            CLARITY
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
      <div className="noise" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
