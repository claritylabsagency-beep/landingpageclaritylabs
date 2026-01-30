import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Play, Check, Zap, Film, Users, TrendingUp, Clock, Award } from 'lucide-react';
import { Layout } from '../components/Layout';

// Animated Counter Component
const Counter = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ============ HERO SECTION ============
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <motion.div 
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center"
        style={{ opacity, scale, y }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-sm text-white/70">Now booking February projects</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] mb-8"
        >
          <span className="text-white">Your product</span>
          <br />
          <span className="gradient-text">deserves clarity.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12"
        >
          We turn complex SaaS products into videos that make people say 
          <span className="text-white"> "I get it now."</span> Launch films, demos, and social clips built to convert.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="hero-video-audit-btn"
            className="group flex items-center justify-center gap-2 bg-white text-black px-10 py-5 rounded-full text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all shadow-lg shadow-white/10"
          >
            Get a Video Audit
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="hero-showreel-btn"
            className="group flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white/10 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Play className="w-4 h-4 ml-0.5" fill="white" />
            </div>
            Watch Showreel
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: 47, suffix: '%', label: 'Avg. demo increase' },
            { value: 7, suffix: ' days', label: 'Avg. turnaround' },
            { value: 50, suffix: '+', label: 'SaaS brands served' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                <Counter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============ PROBLEM SECTION ============
const ProblemSection = () => {
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">The problem</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Your product is great.
            <br />
            <span className="text-white/30">Your video isn't.</span>
          </h2>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group relative glass rounded-3xl p-8 hover:bg-white/[0.08] transition-all duration-500"
              data-testid={`problem-card-${i}`}
            >
              <span className="text-5xl mb-6 block">{problem.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
              <p className="text-white/50">{problem.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Transition Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-2xl md:text-3xl text-white/60">
            We fix that. <span className="text-white font-semibold">In weeks, not months.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============ SERVICES SECTION ============
const services = [
  { 
    icon: Film, 
    title: 'Launch Films', 
    desc: 'Hero videos that make your homepage unforgettable.',
    stats: '45-90s',
    color: 'from-blue-500/20 to-transparent'
  },
  { 
    icon: Zap, 
    title: 'Feature Spotlights', 
    desc: 'Quick hits that drive adoption.',
    stats: '30-60s',
    color: 'from-amber-500/20 to-transparent'
  },
  { 
    icon: TrendingUp, 
    title: 'Growth Clips', 
    desc: 'Vertical content built for virality.',
    stats: '10-15s',
    color: 'from-emerald-500/20 to-transparent'
  },
  { 
    icon: Users, 
    title: 'Customer Stories', 
    desc: 'Testimonials that build trust.',
    stats: '2-3min',
    color: 'from-purple-500/20 to-transparent'
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">What we make</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Video that moves
              <br />
              <span className="text-white/30">products forward.</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md">
            From homepage heroes to TikTok hooks. We create the video content your funnel needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`group relative glass rounded-3xl p-8 md:p-10 overflow-hidden hover:border-white/20 transition-all duration-500 ${i === 0 ? 'md:col-span-2' : ''}`}
              data-testid={`service-card-${i}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-white/40">{service.stats}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/50">{service.desc}</p>
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">Process</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            From brief to launch
            <span className="text-white/30"> in 7 days.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="relative text-center md:text-left"
              data-testid={`process-step-${i}`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
                <span className="text-sm font-mono text-blue-400">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm mb-3">{step.desc}</p>
              <span className="text-xs font-mono text-blue-400/60">{step.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ TESTIMONIALS SECTION ============
const testimonials = [
  {
    quote: "Clarity Labs nailed the story in one pass. Demo requests jumped 47% in the first week.",
    author: "Sarah Chen",
    role: "Founder, B2B SaaS",
    metric: "+47% demos"
  },
  {
    quote: "They didn't just edit. They fixed the narrative. Best investment we made.",
    author: "Michael Torres",
    role: "Head of Growth",
    metric: "3x conversion"
  },
  {
    quote: "Fast, professional, and actually understood our product. Rare combination.",
    author: "Emily Park",
    role: "Product Marketing",
    metric: "7-day delivery"
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">Proof</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Founders love
            <span className="text-white/30"> the results.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="glass rounded-3xl p-8 relative overflow-hidden group"
              data-testid={`testimonial-${i}`}
            >
              {/* Metric Badge */}
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="text-xs font-mono text-blue-400">{t.metric}</span>
              </div>
              
              <p className="text-white/80 text-lg leading-relaxed mb-8 mt-4">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                <div>
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-sm text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ CLIENT LOGOS ============
const ClientLogos = () => {
  const logos = ['AltEzza', 'hbm', 'SpatiumX', 'Classster', 'CustomGuide', 'Vemotion', 'Kitaboo', 'DSharp'];

  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <div className="flex animate-marquee">
        {[...logos, ...logos].map((logo, i) => (
          <span 
            key={i}
            className="mx-12 text-2xl font-bold text-white/10 whitespace-nowrap"
            data-testid={i < logos.length ? `client-logo-${logo.toLowerCase()}` : undefined}
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
};

// ============ FINAL CTA ============
const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Decorative Lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
          
          <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-6">Limited Spots</p>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Ready to make your
            <br />
            product <span className="text-glow text-blue-400">click?</span>
          </h2>
          
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            We take on 4 new projects per month. If your product is hard to explain, 
            let's fix that—before your competitors do.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="final-cta-btn"
            className="group inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all shadow-lg shadow-white/10"
          >
            Book Your Strategy Call
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
          
          <p className="mt-6 text-sm text-white/30">
            Free 30-min call • No obligation
          </p>
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
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FinalCTA />
    </Layout>
  );
};

export default Home;
