import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const location = useLocation();

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-50" data-testid="logo-link">
              <span className="text-sm font-medium text-white uppercase tracking-[0.2em]">
                Clarity
              </span>
            </Link>

            {/* Center - Time */}
            <div className="hidden md:block">
              <span className="text-xs text-white/50 font-mono">{time} LOCAL</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={`text-sm text-white hover-line pb-1 transition-opacity ${
                    location.pathname === link.path ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="nav-book-call-btn"
                className="text-sm text-black bg-white px-6 py-3 font-medium"
              >
                Book a Call
              </motion.button>
            </div>

            {/* Mobile Toggle */}
            <button
              data-testid="mobile-menu-btn"
              className="md:hidden relative z-50 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black flex items-center justify-center md:hidden"
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
                    className="text-5xl font-medium text-white hover:opacity-50 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
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
    <footer className="bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Top section */}
        <div className="py-24 md:py-32 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-6">Newsletter</p>
              <h3 className="text-3xl md:text-4xl font-medium mb-8">
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
                  className="flex-1 bg-transparent border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/30 focus:border-white"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="newsletter-submit-btn"
                  className="text-sm uppercase tracking-[0.1em] hover:opacity-50 transition-opacity disabled:opacity-30"
                >
                  {isSubmitting ? '...' : 'Subscribe →'}
                </button>
              </form>
            </div>

            <div className="grid grid-cols-2 gap-12 lg:justify-end">
              <div>
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-6">Pages</p>
                <ul className="space-y-4">
                  {['Home', 'Pricing', 'About'].map((link) => (
                    <li key={link}>
                      <Link 
                        to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                        className="text-white/60 hover:text-white transition-colors"
                        data-testid={`footer-${link.toLowerCase()}-link`}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-6">Social</p>
                <ul className="space-y-4">
                  {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                    <li key={social}>
                      <a 
                        href="#"
                        className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2"
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

        {/* Bottom */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Clarity Labs</p>
          <p className="text-xs text-white/30">Based in San Francisco</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
