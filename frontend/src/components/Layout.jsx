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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      {/* Floating Glass Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'top-4' : 'top-6'
        }`}
      >
        <div className="glass rounded-full px-2 py-2 shadow-floating">
          <div className="flex items-center gap-1">
            {/* Logo */}
            <Link 
              to="/" 
              className="px-5 py-2.5 font-heading text-lg font-semibold text-slate-900"
              data-testid="logo-link"
            >
              Clarity
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={`px-4 py-2.5 text-sm font-medium rounded-full transition-all ${
                    location.pathname === link.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <button
              data-testid="nav-book-call-btn"
              className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all hover:scale-105"
            >
              Book a Call
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-btn"
              className="md:hidden p-2.5 text-slate-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center md:hidden"
          >
            <motion.div className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={link.path}
                    data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="font-heading text-4xl font-medium text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                data-testid="mobile-book-call-btn"
                className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Book a Call
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API}/newsletter/subscribe`, { email });
      toast.success(response.data.message);
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-slate-50 overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Side */}
          <div>
            <h3 className="font-heading text-3xl md:text-4xl font-medium text-slate-900 mb-6">
              Let's create something<br />
              <span className="text-blue-600">worth watching.</span>
            </h3>
            
            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="mt-8">
              <p className="text-sm text-slate-500 mb-4">
                Weekly insights on SaaS video that converts.
              </p>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="newsletter-email-input"
                  className="flex-1 h-12 px-5 rounded-full border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="newsletter-submit-btn"
                  className="bg-slate-900 text-white px-6 h-12 rounded-full font-medium hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? '...' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Links */}
          <div className="grid grid-cols-2 gap-12 lg:justify-end">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-5">
                Navigation
              </p>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Pricing', path: '/pricing' },
                  { name: 'About', path: '/about' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                      data-testid={`footer-${link.name.toLowerCase()}-link`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-5">
                Connect
              </p>
              <ul className="space-y-3">
                {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                  <li key={social}>
                    <a 
                      href="#" 
                      className="text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
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

      {/* Massive Brand Text */}
      <div className="relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Clarity Labs
          </p>
          <p className="text-sm text-slate-400">
            Premium video for SaaS & AI
          </p>
        </div>
        
        {/* Giant Footer Text */}
        <div className="overflow-hidden py-8">
          <p className="font-heading text-[15vw] md:text-[12vw] font-medium text-slate-100 text-center leading-none select-none">
            CLARITY
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="noise" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
