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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link to="/" className="relative z-50" data-testid="logo-link">
              <span className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight">
                Clarity Labs
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                data-testid="nav-book-call-btn"
                className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Book a Call
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-btn"
              className="md:hidden relative z-50 p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex items-center justify-center md:hidden"
          >
            <motion.div 
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="font-heading text-4xl font-bold text-white hover:text-blue-400 transition-colors"
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
                className="mt-8 bg-white text-black px-8 py-4 rounded-full text-lg font-medium"
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
    <footer className="relative border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left - Brand & Newsletter */}
          <div>
            <Link to="/" data-testid="footer-logo">
              <span className="font-heading text-3xl md:text-4xl font-bold text-white">
                Clarity Labs
              </span>
            </Link>
            <p className="mt-6 text-white/40 text-lg max-w-md leading-relaxed">
              Premium video production for SaaS & AI brands that refuse to blend in.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="mt-10">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
                Weekly insights on video that converts
              </p>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="newsletter-email-input"
                  className="flex-1 bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/30 h-14 px-6"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="newsletter-submit-btn"
                  className="bg-white text-black px-8 h-14 font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? '...' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>

          {/* Right - Links */}
          <div className="grid grid-cols-2 gap-12 lg:justify-end">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-6">
                Navigation
              </p>
              <ul className="space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Pricing', path: '/pricing' },
                  { name: 'About', path: '/about' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-white/60 hover:text-white transition-colors"
                      data-testid={`footer-${link.name.toLowerCase()}-link`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-6">
                Connect
              </p>
              <ul className="space-y-4">
                {['Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                  <li key={social}>
                    <a 
                      href="#" 
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
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

        {/* Bottom */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Clarity Labs. All rights reserved.
          </p>
          <p className="text-white/30 text-sm">
            Crafted for brands that move fast.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#020408]">
      <div className="noise-overlay" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
