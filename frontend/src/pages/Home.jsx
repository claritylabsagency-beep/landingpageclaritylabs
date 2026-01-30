import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown, Play, X } from 'lucide-react';
import { Layout } from '../components/Layout';

// ============ ANIMATED NUMBER ============
const AnimatedNumber = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * value));
        
        if (progress < 1) requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref} className="number">{count}{suffix}</span>;
};

// ============ VIDEO MODAL ============
const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:opacity-50 transition-opacity"
        data-testid="close-video-modal"
      >
        <X size={32} />
      </button>
      <div className="w-full max-w-6xl aspect-video bg-white/10">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          className="w-full h-full"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    </motion.div>
  );
};

// ============ HERO ============
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden">
      <motion.div 
        className="max-w-[1800px] mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center"
        style={{ y, opacity }}
      >
        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-black/50">Available for February</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12vw] md:text-[10vw] font-medium leading-[0.85] tracking-tighter"
          >
            Video for
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12vw] md:text-[10vw] font-medium leading-[0.85] tracking-tighter font-serif italic"
          >
            SaaS brands
          </motion.h1>
        </div>

        {/* Subtext & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="text-lg md:text-xl text-black/50 max-w-md">
            We turn complex products into clear, conversion-ready videos. Built for launches, onboarding, and growth.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="hero-video-audit-btn"
            className="group flex items-center gap-4 bg-black text-white px-8 py-5 text-lg"
          >
            Start a Project
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-black/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============ SHOWREEL ============
const ShowreelSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-4 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[16/9] md:aspect-[21/9] bg-black overflow-hidden cursor-pointer group"
        onClick={() => setShowVideo(true)}
        data-testid="showreel-container"
      >
        <img 
          src="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=2000&q=80"
          alt="Showreel"
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="black" />
          </motion.div>
        </div>

        {/* Label */}
        <div className="absolute bottom-8 left-8">
          <p className="text-white text-sm uppercase tracking-[0.2em]">Play Showreel</p>
        </div>
        <div className="absolute bottom-8 right-8">
          <p className="text-white/50 text-sm">01:24</p>
        </div>
      </motion.div>

      <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </section>
  );
};

// ============ STATS ============
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 47, suffix: '%', label: 'Average demo increase' },
    { value: 7, suffix: '', label: 'Day turnaround' },
    { value: 50, suffix: '+', label: 'Brands served' },
    { value: 4.9, suffix: '/5', label: 'Client rating' },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 border-y border-black/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <p className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-black/40 mt-2 uppercase tracking-[0.1em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ SERVICES ============
const services = [
  { num: '01', title: 'Launch Films', desc: 'Cinematic hero videos for your homepage. Make visitors understand in seconds.', time: '45-90s' },
  { num: '02', title: 'Product Demos', desc: 'Clear, engaging walkthroughs that drive adoption and reduce support tickets.', time: '2-5min' },
  { num: '03', title: 'Social Clips', desc: 'Vertical content built for LinkedIn, Twitter, and TikTok growth.', time: '15-60s' },
  { num: '04', title: 'Customer Stories', desc: 'Authentic testimonials that build trust and credibility.', time: '2-3min' },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-40">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div>
            <p className="text-sm text-black/40 uppercase tracking-[0.2em] mb-4">Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">
              What we
              <br />
              <span className="font-serif italic">create</span>
            </h2>
          </div>
          <p className="text-black/50 max-w-md text-lg">
            From homepage heroes to social clips. Every video built to convert.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="border-t border-black/10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group border-b border-black/10 py-8 md:py-12 cursor-pointer"
              data-testid={`service-card-${i}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <span className="text-sm text-black/30 font-mono">{service.num}</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight flex-1 group-hover:translate-x-4 transition-transform">
                  {service.title}
                </h3>
                <p className="text-black/50 max-w-sm hidden md:block">{service.desc}</p>
                <span className="text-sm text-black/30">{service.time}</span>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ PROCESS ============
const processSteps = [
  { num: '01', title: 'Discovery', desc: 'Deep dive into your product, audience, and goals. One call, full alignment.' },
  { num: '02', title: 'Strategy', desc: 'We craft the story, script, and visual direction. You approve.' },
  { num: '03', title: 'Production', desc: 'Motion design, voiceover, sound. Premium quality, fast.' },
  { num: '04', title: 'Launch', desc: 'Optimized exports for every platform. Ready to convert.' },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-40 bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-4">Process</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">
            Brief to launch
            <br />
            <span className="font-serif italic">in 7 days</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              data-testid={`process-step-${i}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl md:text-7xl font-medium text-white/10">{step.num}</span>
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ TESTIMONIALS ============
const testimonials = [
  { quote: 'Clarity Labs understood our product better than we did. The video transformed our homepage.', author: 'Sarah Chen', role: 'CEO, Metric', metric: '+47% demos' },
  { quote: 'Fast, professional, zero hand-holding. Exactly what we needed.', author: 'James Miller', role: 'Head of Growth', metric: '7 days' },
  { quote: 'Our best-performing content ever. Period.', author: 'Ana Rodriguez', role: 'CMO, Baseline', metric: '3.2M views' },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-40">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <p className="text-sm text-black/40 uppercase tracking-[0.2em] mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">
            Founders
            <br />
            <span className="font-serif italic">love it</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="border border-black/10 p-8 md:p-10 group hover:bg-black hover:text-white transition-colors duration-500"
              data-testid={`testimonial-${i}`}
            >
              <p className="text-sm text-black/40 group-hover:text-white/40 mb-6 transition-colors">{t.metric}</p>
              <p className="text-xl md:text-2xl font-medium leading-snug mb-8">"{t.quote}"</p>
              <div>
                <p className="font-medium">{t.author}</p>
                <p className="text-sm text-black/40 group-hover:text-white/40 transition-colors">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ CLIENTS MARQUEE ============
const ClientsMarquee = () => {
  const clients = ['AltEzza', 'hbm', 'SpatiumX', 'Classster', 'CustomGuide', 'Vemotion', 'Kitaboo', 'DSharp'];

  return (
    <section className="py-12 border-y border-black/10 overflow-hidden">
      <div className="flex animate-marquee">
        {[...clients, ...clients].map((client, i) => (
          <span 
            key={i}
            className="mx-12 text-2xl md:text-3xl font-medium text-black/10 whitespace-nowrap hover:text-black/30 transition-colors"
            data-testid={i < clients.length ? `client-logo-${client.toLowerCase()}` : undefined}
          >
            {client}
          </span>
        ))}
      </div>
    </section>
  );
};

// ============ FINAL CTA ============
const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 md:py-48">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-sm text-black/40 uppercase tracking-[0.2em] mb-8">Start a project</p>
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter mb-8">
            Let's make
            <br />
            <span className="font-serif italic">something great</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="final-cta-btn"
            className="group inline-flex items-center gap-4 bg-black text-white px-12 py-6 text-lg"
          >
            Book a Call
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
          <p className="mt-6 text-sm text-black/40">Free 30-min strategy session</p>
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
      <ShowreelSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <ClientsMarquee />
      <TestimonialsSection />
      <FinalCTA />
    </Layout>
  );
};

export default Home;
