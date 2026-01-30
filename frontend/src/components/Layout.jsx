import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <span className="font-heading text-xl md:text-2xl font-bold text-slate-900">
              Clarity Labs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.name.toLowerCase()}`}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              data-testid="nav-book-call-btn"
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 h-11 font-medium shadow-lg shadow-slate-900/20"
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-medium ${
                    isActive(link.path) ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                data-testid="mobile-book-call-btn"
                className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full h-11 font-medium"
              >
                Book a Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
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
      toast.error(error.response?.data?.detail || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block" data-testid="footer-logo">
              <span className="font-heading text-2xl font-bold text-slate-900">
                Clarity Labs
              </span>
            </Link>
            <p className="mt-4 text-slate-500 max-w-md">
              Premium video + distribution systems for SaaS & AI brands.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="mt-6">
              <p className="text-sm text-slate-600 mb-3">
                Weekly breakdowns on what makes SaaS videos convert.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="newsletter-email-input"
                  className="rounded-full h-11 px-4 flex-1"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="newsletter-submit-btn"
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-full h-11 px-6"
                >
                  {isSubmitting ? '...' : 'Subscribe'}
                </Button>
              </div>
            </form>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-slate-900 mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors" data-testid="footer-home-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-500 hover:text-slate-900 transition-colors" data-testid="footer-pricing-link">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 hover:text-slate-900 transition-colors" data-testid="footer-about-link">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-slate-900 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                data-testid="social-twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                data-testid="social-youtube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Clarity Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
