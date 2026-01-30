import { useState, useEffect, createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const MEETING_LINK = "https://meetings-na2.hubspot.com/claritylabs";

// Theme Context
export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('clarity-theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('clarity-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Work', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm ${isDark ? 'bg-gray-950/80' : 'bg-white/80'}`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="relative z-50" data-testid="logo-link">
              <motion.span 
                className={`text-sm font-medium uppercase tracking-[0.2em] ${isDark ? 'text-white' : 'text-black'}`}
                whileHover={{ opacity: 0.6 }}
              >
                Clarity
              </motion.span>
            </Link>

            <div className="hidden md:block">
              <span className={`text-xs font-mono ${isDark ? 'text-white/40' : 'text-black/40'}`}>{time} LOCAL</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={`text-sm transition-opacity ${
                    location.pathname === link.path 
                      ? isDark ? 'text-white' : 'text-black'
                      : isDark ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <button
                onClick={toggleTheme}
                data-testid="theme-toggle"
                className={`p-2 rounded-full transition-colors ${isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-black/60 hover:text-black hover:bg-black/5'}`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <motion.a
                href={MEETING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="nav-book-call-btn"
                className="text-sm bg-green-500 text-white px-6 py-3 font-medium hover:bg-green-600 transition-colors"
              >
                Book a Call
              </motion.a>
            </div>

            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={toggleTheme}
                data-testid="mobile-theme-toggle"
                className={isDark ? 'text-white' : 'text-black'}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                data-testid="mobile-menu-btn"
                className={`relative z-50 ${isDark ? 'text-white' : 'text-black'}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-40 flex items-center justify-center md:hidden ${isDark ? 'bg-gray-950' : 'bg-white'}`}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className={`text-5xl font-medium hover:text-green-500 transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={MEETING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 bg-green-500 text-white px-8 py-4 text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Book a Call
              </motion.a>
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
    <footer className={`border-t ${isDark ? 'bg-gray-900 border-white/10' : 'bg-gray-50 border-black/10'}`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className={`py-24 md:py-32 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm text-green-500 uppercase tracking-[0.2em] mb-6">Newsletter</p>
              <h3 className={`text-3xl md:text-4xl font-medium mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
                Weekly insights on
                <br />
                video that converts.
              </h3>
              <form onSubmit={handleSubmit} className="flex gap-4 max-w-md">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="newsletter-email-input"
                  className={`flex-1 bg-transparent border-b rounded-none px-0 h-12 focus:border-green-500 ${isDark ? 'border-white/20 text-white placeholder:text-white/30' : 'border-black/20 text-black placeholder:text-black/30'}`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="newsletter-submit-btn"
                  className={`text-sm uppercase tracking-[0.1em] hover:text-green-500 transition-colors disabled:opacity-30 ${isDark ? 'text-white' : 'text-black'}`}
                >
                  {isSubmitting ? '...' : 'Subscribe →'}
                </button>
              </form>
            </div>

            <div className="grid grid-cols-2 gap-12 lg:justify-end">
              <div>
                <p className="text-sm text-green-500 uppercase tracking-[0.2em] mb-6">Pages</p>
                <ul className="space-y-4">
                  {['Home', 'Pricing', 'About'].map((link) => (
                    <li key={link}>
                      <Link 
                        to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                        className={`hover:text-green-500 transition-colors ${isDark ? 'text-white/60' : 'text-black/60'}`}
                        data-testid={`footer-${link.toLowerCase()}-link`}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-green-500 uppercase tracking-[0.2em] mb-6">Social</p>
                <ul className="space-y-4">
                  {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                    <li key={social}>
                      <a 
                        href="#"
                        className={`hover:text-green-500 transition-colors inline-flex items-center gap-2 ${isDark ? 'text-white/60' : 'text-black/60'}`}
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

        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-xs ${isDark ? 'text-white/30' : 'text-black/40'}`}>© {new Date().getFullYear()} Clarity Labs</p>
          <p className={`text-xs ${isDark ? 'text-white/30' : 'text-black/40'}`}>Premium Video for SaaS</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
