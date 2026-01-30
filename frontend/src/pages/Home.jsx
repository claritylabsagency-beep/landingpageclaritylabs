import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Play, Zap, Film, Users, TrendingUp, Sparkles, X } from 'lucide-react';
import { Layout, useTheme } from '../components/Layout';

// ============ ANIMATED BACKGROUND ============
const AnimatedBackground = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-10'}`}
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.2)'} 1px, transparent 1px), 
                           linear-gradient(90deg, ${isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.2)'} 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Animated Orbs */}
      <motion.div
        className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/30'}`}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '-10%', left: '20%' }}
      />
      <motion.div
        className={`absolute w-[400px] h-[400px] rounded-full blur-[100px] ${isDark ? 'bg-purple-500/10' : 'bg-purple-400/20'}`}
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: '10%', right: '10%' }}
      />
      <motion.div
        className={`absolute w-[300px] h-[300px] rounded-full blur-[80px] ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/20'}`}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '40%', left: '5%' }}
      />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-slate-400/30'}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// ============ ANIMATED COUNTER ============
const Counter = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration,
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ============ MAGNETIC BUTTON ============
const MagneticButton = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
    }
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ============ VIDEO MODAL ============
const VideoModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          data-testid="close-video-modal"
        >
          <X size={24} />
        </button>
        {/* Video Embed - Using a sample video */}
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="Showreel"
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
};

// ============ HERO SECTION ============
const HeroSection = () => {
  const { isDark } = useTheme();
  const [showVideo, setShowVideo] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Text reveal animation
  const words = ["Your", "product", "deserves", "clarity."];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <motion.div 
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center pt-24"
        style={{ opacity, scale, y }}
      >
        {/* Availability Badge - Fixed at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div 
            className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <motion.span 
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
              Now booking February projects
            </span>
          </motion.div>
        </motion.div>

        {/* Animated Headline */}
        <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`inline-block mr-4 md:mr-6 ${
                i === 3 
                  ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent' 
                  : isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline with typing effect */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 ${isDark ? 'text-white/50' : 'text-slate-500'}`}
        >
          We turn complex SaaS products into videos that make people say 
          <motion.span 
            className={isDark ? 'text-white' : 'text-slate-900'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          > "I get it now."</motion.span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <MagneticButton
            data-testid="hero-video-audit-btn"
            className={`group flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg font-semibold transition-all shadow-lg ${
              isDark 
                ? 'bg-white text-black hover:bg-blue-400 hover:text-white shadow-white/10' 
                : 'bg-slate-900 text-white hover:bg-blue-600 shadow-slate-900/20'
            }`}
          >
            Get a Video Audit
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.span>
          </MagneticButton>
          
          <MagneticButton
            onClick={() => setShowVideo(true)}
            data-testid="hero-showreel-btn"
            className={`group flex items-center justify-center gap-3 px-10 py-5 rounded-full text-lg font-medium transition-all ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' 
                : 'bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200'
            }`}
          >
            <motion.div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? 'bg-white/10' : 'bg-white shadow'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <Play className="w-4 h-4 ml-0.5" fill={isDark ? "white" : "currentColor"} />
            </motion.div>
            Watch Showreel
          </MagneticButton>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: 47, suffix: '%', label: 'Avg. demo increase' },
            { value: 7, suffix: ' days', label: 'Avg. turnaround' },
            { value: 50, suffix: '+', label: 'SaaS brands served' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <motion.p 
                className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}
                whileHover={{ scale: 1.05 }}
              >
                <Counter end={stat.value} suffix={stat.suffix} />
              </motion.p>
              <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${
            isDark ? 'border-white/20' : 'border-slate-300'
          }`}
        >
          <motion.div 
            className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white' : 'bg-slate-400'}`}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </section>
  );
};

// ============ CLIENT LOGOS ============
const ClientLogos = () => {
  const { isDark } = useTheme();
  const logos = ['AltEzza', 'hbm', 'SpatiumX', 'Classster', 'CustomGuide', 'Vemotion', 'Kitaboo', 'DSharp'];

  return (
    <section className={`py-16 border-y overflow-hidden ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
      <div className="flex animate-marquee">
        {[...logos, ...logos].map((logo, i) => (
          <motion.span 
            key={i}
            className={`mx-12 text-2xl font-bold whitespace-nowrap ${isDark ? 'text-white/10' : 'text-slate-200'}`}
            whileHover={{ scale: 1.1, color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
            data-testid={i < logos.length ? `client-logo-${logo.toLowerCase()}` : undefined}
          >
            {logo}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

// ============ PROBLEM SECTION ============
const ProblemSection = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    { icon: '😵', title: 'Confused visitors', desc: 'They land on your homepage and leave in 8 seconds.' },
    { icon: '📉', title: 'Lost demos', desc: 'Great product, but nobody books because they don\'t get it.' },
    { icon: '💸', title: 'Wasted ad spend', desc: 'Driving traffic to pages that don\'t convert.' },
  ];

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4">The problem</p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Your product is great.
            <br />
            <span className={isDark ? 'text-white/30' : 'text-slate-300'}>Your video isn't.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative rounded-3xl p-8 transition-all duration-500 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08]' 
                  : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200'
              }`}
              data-testid={`problem-card-${i}`}
            >
              <motion.span 
                className="text-5xl mb-6 block"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {problem.icon}
              </motion.span>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{problem.title}</h3>
              <p className={isDark ? 'text-white/50' : 'text-slate-500'}>{problem.desc}</p>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className={`text-2xl md:text-3xl ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
            We fix that. <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>In weeks, not months.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============ VIDEO EXPLAINER SECTION ============
const VideoExplainerSection = () => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className={`py-32 ${isDark ? 'bg-gradient-to-b from-transparent via-blue-500/5 to-transparent' : 'bg-slate-50'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4">See The Difference</p>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Before vs After
            <span className={isDark ? 'text-white/30' : 'text-slate-300'}> Clarity</span>
          </h2>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className={`relative aspect-video rounded-3xl overflow-hidden ${
            isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-2xl'
          }`}>
            {/* Video Thumbnail */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1559507628-40a52a5e7081?auto=format&fit=crop&w=1600&q=80"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-black/20'}`} />
            </div>
            
            {/* Play Button */}
            <motion.button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
              whileHover="hover"
              data-testid="video-play-btn"
            >
              <motion.div 
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-white/90' : 'bg-white shadow-2xl'
                }`}
                variants={{
                  hover: { scale: 1.1 }
                }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(59, 130, 246, 0.4)',
                    '0 0 0 20px rgba(59, 130, 246, 0)',
                    '0 0 0 0 rgba(59, 130, 246, 0.4)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="w-10 h-10 text-slate-900 ml-1" fill="currentColor" />
              </motion.div>
            </motion.button>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl -z-10 ${
              isDark ? 'bg-blue-500/10' : 'bg-blue-100'
            }`}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className={`absolute -top-6 -left-6 w-24 h-24 rounded-full -z-10 ${
              isDark ? 'bg-purple-500/10' : 'bg-purple-100'
            }`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isPlaying} onClose={() => setIsPlaying(false)} />
    </section>
  );
};

// ============ SERVICES SECTION ============
const services = [
  { icon: Film, title: 'Launch Films', desc: 'Hero videos that make your homepage unforgettable.', stats: '45-90s', color: 'from-blue-500/20' },
  { icon: Zap, title: 'Feature Spotlights', desc: 'Quick hits that drive adoption.', stats: '30-60s', color: 'from-amber-500/20' },
  { icon: TrendingUp, title: 'Growth Clips', desc: 'Vertical content built for virality.', stats: '10-15s', color: 'from-emerald-500/20' },
  { icon: Users, title: 'Customer Stories', desc: 'Testimonials that build trust.', stats: '2-3min', color: 'from-purple-500/20' },
];

const ServicesSection = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4">What we make</p>
            <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Video that moves
              <br />
              <span className={isDark ? 'text-white/30' : 'text-slate-300'}>products forward.</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:border-white/20' 
                  : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl'
              } ${i === 0 ? 'md:col-span-2' : ''}`}
              data-testid={`service-card-${i}`}
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${service.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100'
                    }`}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <service.icon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-700'}`} strokeWidth={1.5} />
                  </motion.div>
                  <span className={`text-xs font-mono ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{service.stats}</span>
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                <p className={isDark ? 'text-white/50' : 'text-slate-500'}>{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ PROCESS SECTION ============
const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We learn your product, audience, and goals.', time: 'Day 1' },
  { num: '02', title: 'Script + Story', desc: 'We craft the narrative that converts.', time: 'Day 2-3' },
  { num: '03', title: 'Production', desc: 'Motion design, voiceover, sound design.', time: 'Day 4-6' },
  { num: '04', title: 'Launch', desc: 'Optimized exports for every platform.', time: 'Day 7' },
];

const ProcessSection = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4">Process</p>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            From brief to launch
            <span className={isDark ? 'text-white/30' : 'text-slate-300'}> in 7 days.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className={`hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent`} />
          
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="relative text-center md:text-left"
              data-testid={`process-step-${i}`}
            >
              <motion.div 
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 ${
                  isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-sm font-mono text-blue-500">{step.num}</span>
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
              <p className={`text-sm mb-3 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{step.desc}</p>
              <span className="text-xs font-mono text-blue-500/60">{step.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ TESTIMONIALS SECTION ============
const testimonials = [
  { quote: "Clarity Labs nailed the story in one pass. Demo requests jumped 47% in the first week.", author: "Sarah Chen", role: "Founder, B2B SaaS", metric: "+47% demos" },
  { quote: "They didn't just edit. They fixed the narrative. Best investment we made.", author: "Michael Torres", role: "Head of Growth", metric: "3x conversion" },
  { quote: "Fast, professional, and actually understood our product. Rare combination.", author: "Emily Park", role: "Product Marketing", metric: "7-day delivery" },
];

const TestimonialsSection = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4">Proof</p>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Founders love
            <span className={isDark ? 'text-white/30' : 'text-slate-300'}> the results.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -8 }}
              className={`rounded-3xl p-8 relative overflow-hidden ${
                isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-100 shadow-sm'
              }`}
              data-testid={`testimonial-${i}`}
            >
              <motion.div 
                className={`absolute top-6 right-6 px-3 py-1 rounded-full ${
                  isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xs font-mono text-blue-500">{t.metric}</span>
              </motion.div>
              <p className={`text-lg leading-relaxed mb-8 mt-4 ${isDark ? 'text-white/80' : 'text-slate-700'}`}>"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.author}</p>
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ FINAL CTA ============
const FinalCTA = () => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className={`rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden ${
            isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-900'
          }`}
        >
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.p 
              className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Limited Spots
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Ready to make your
              <br />
              product <span className="text-blue-400">click?</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
              We take on 4 new projects per month. If your product is hard to explain, let's fix that.
            </p>
            <MagneticButton
              data-testid="final-cta-btn"
              className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all shadow-lg"
            >
              Book Your Strategy Call
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <p className="mt-6 text-sm text-white/30">Free 30-min call • No obligation</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============ MAIN HOME ============
const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <ClientLogos />
      <ProblemSection />
      <VideoExplainerSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FinalCTA />
    </Layout>
  );
};

export default Home;
