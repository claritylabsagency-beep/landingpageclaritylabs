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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
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
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'glass rounded-full px-6 py-3' : ''
          }`}>
            {/* Logo */}
            <Link to="/" className="relative z-50" data-testid="logo-link">
              <motion.span 
                className="text-xl font-bold text-white tracking-tight"
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
                  className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                    location.pathname === link.path
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="nav-book-call-btn"
              className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-400 hover:text-white transition-colors"
            >
              Book a Call
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>

            {/* Mobile Toggle */}
            <button
              data-testid="mobile-menu-btn"
              className="md:hidden relative z-50 p-2 text-white"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
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
                    className="text-4xl font-bold text-white hover:text-blue-400 transition-colors"
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
                className="mt-8 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold"
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
    <footer className="relative border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's create something
              <br />
              <span className="text-blue-400">worth watching.</span>
            </h3>
            <p className="text-white/50 mb-8 max-w-md">
              Weekly insights on video that converts. No spam, just value.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="newsletter-email-input"
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 px-5 rounded-full"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="newsletter-submit-btn"
                className="bg-white text-black px-8 h-12 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-12 lg:justify-end">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Navigate</p>
              <ul className="space-y-3">
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
              <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Connect</p>
              <ul className="space-y-3">
                {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                  <li key={social}>
                    <a 
                      href="#"
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
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

      {/* Giant Brand */}
      <div className="border-t border-white/5 overflow-hidden">
        <div className="py-8 flex justify-between items-center max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Clarity Labs</p>
          <p className="text-xs text-white/30">Premium Video for SaaS</p>
        </div>
        <div className="pb-12">
          <p className="text-[18vw] font-bold text-white/[0.03] text-center leading-none select-none tracking-tighter">
            CLARITY
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="noise" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
