import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Play, Sparkles, Zap, Film, Users, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Hero Section - Cinematic Full Screen
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <img 
          src="https://images.unsplash.com/photo-1705107958696-a7f73c749ab3?q=80&w=2000&auto=format&fit=crop"
          alt="Cinematic background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#020408]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 w-full"
        style={{ opacity }}
      >
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-5xl"
        >
          {/* Label */}
          <motion.div 
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-12 h-[1px] bg-blue-500" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
              Video Production Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={fadeUp}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter"
          >
            We turn SaaS
            <br />
            <span className="text-white/40">into Cinema.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p 
            variants={fadeUp}
            className="mt-8 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
          >
            Premium video production for brands that refuse to be boring. 
            Launch films, product demos, and content that actually converts.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={fadeUp}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <button 
              data-testid="hero-video-audit-btn"
              className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-5 rounded-full text-base font-medium transition-all hover:scale-105 active:scale-95"
            >
              Get a Video Audit
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button 
              data-testid="hero-showreel-btn"
              className="group flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white px-8 py-5 rounded-full text-base font-medium transition-all hover:bg-white/10"
            >
              <Play className="w-5 h-5" />
              Watch Showreel
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
};

// Client Logos - Minimal Strip
const ClientLogos = () => {
  const clients = ['AltEzza', 'hbm', 'SpatiumX', 'Classster', 'CustomGuide', 'Vemotion', 'Kitaboo', 'DSharp'];
  
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 whitespace-nowrap">
            Trusted by
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {clients.map((client, index) => (
              <span 
                key={index}
                className="font-heading text-lg font-semibold text-white/20"
                data-testid={`client-logo-${client.toLowerCase()}`}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Services - Bento Grid
const services = [
  {
    icon: Film,
    title: 'Launch Films',
    desc: 'Cinematic hero videos that make your homepage unforgettable. 45-90 seconds of pure clarity.',
    size: 'large',
    features: ['Product-led scripting', 'Multi-platform exports', 'Sound design included']
  },
  {
    icon: Zap,
    title: 'Feature Spotlights',
    desc: 'Quick, punchy videos that drive feature adoption.',
    size: 'small',
    features: ['30-60s format', 'UI callouts']
  },
  {
    icon: Sparkles,
    title: 'Growth Clips',
    desc: 'Vertical content built for virality. LinkedIn, Twitter, TikTok ready.',
    size: 'tall',
    features: ['10-15s hooks', 'Weekly drops', 'Founder POV variants']
  },
  {
    icon: Users,
    title: 'Customer Stories',
    desc: 'Documentary-style testimonials that build trust.',
    size: 'small',
    features: ['Interview-based', 'B-roll included']
  }
];

const ServicesSection = () => (
  <section className="py-24 md:py-40">
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
      {/* Header */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
          What We Do
        </span>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Video that moves
          <br />
          <span className="text-white/30">products forward.</span>
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Large Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 md:row-span-2 group relative bg-[#0A0A0A] border border-white/10 p-8 md:p-12 overflow-hidden hover:border-white/20 transition-all duration-500"
          data-testid="service-card-0"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1586268659832-13b6a3be3b0d?q=80&w=600&auto=format&fit=crop" 
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <Film className="w-10 h-10 text-blue-400 mb-8" strokeWidth={1.5} />
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              {services[0].title}
            </h3>
            <p className="text-white/50 text-lg mb-8 max-w-md">
              {services[0].desc}
            </p>
            <ul className="flex flex-wrap gap-3">
              {services[0].features.map((f, i) => (
                <li key={i} className="text-xs font-mono uppercase tracking-wider text-white/30 bg-white/5 px-4 py-2">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Small Cards */}
        {services.slice(1).map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            className={`group bg-[#0A0A0A] border border-white/10 p-8 hover:border-white/20 transition-all duration-500 ${
              service.size === 'tall' ? 'md:row-span-2' : ''
            }`}
            data-testid={`service-card-${index + 1}`}
          >
            <service.icon className="w-8 h-8 text-blue-400 mb-6" strokeWidth={1.5} />
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
              {service.title}
            </h3>
            <p className="text-white/40 mb-6">
              {service.desc}
            </p>
            <ul className="space-y-2">
              {service.features.map((f, i) => (
                <li key={i} className="text-xs text-white/30">
                  → {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Process Section - Horizontal Steps
const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We align on your audience, goals, and the one message that must land.' },
  { num: '02', title: 'Scripting', desc: 'Craft the hook, structure the story, write for maximum clarity.' },
  { num: '03', title: 'Production', desc: 'Screen capture, motion design, and visual polish.' },
  { num: '04', title: 'Launch', desc: 'Exports optimized for every platform. Fast feedback loops.' }
];

const ProcessSection = () => (
  <section className="py-24 md:py-40 border-t border-white/5">
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
          Process
        </span>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          From brief to
          <br />
          <span className="text-white/30">launch in weeks.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
            data-testid={`process-step-${index}`}
          >
            {index < processSteps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            )}
            <span className="font-heading text-6xl md:text-7xl font-bold text-white/5">
              {step.num}
            </span>
            <h3 className="font-heading text-xl font-semibold text-white mt-4 mb-2">
              {step.title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Testimonials - Editorial Style
const testimonials = [
  {
    quote: "Clarity Labs nailed the story in one pass. Our homepage finally makes sense—demo requests jumped within the first week.",
    author: "Founder",
    company: "B2B SaaS"
  },
  {
    quote: "They didn't just edit. They fixed the narrative. Fast turnaround, great structure.",
    author: "Head of Growth",
    company: "AI Startup"
  },
  {
    quote: "Finally, videos we can actually use for distribution. Not just pretty—effective.",
    author: "Product Marketing",
    company: "Series B SaaS"
  }
];

const TestimonialsSection = () => (
  <section className="py-24 md:py-40 bg-[#0A0A0A]">
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
          Testimonials
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
          What founders say.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-t border-white/10 pt-8"
            data-testid={`testimonial-${index}`}
          >
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              "{t.quote}"
            </p>
            <div>
              <p className="font-heading font-semibold text-white">{t.author}</p>
              <p className="text-white/40 text-sm">{t.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Final CTA - Big Impact
const FinalCTA = () => (
  <section className="py-32 md:py-48 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#020408]" />
    
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
          Ready to make your
          <br />
          <span className="text-blue-400">product click?</span>
        </h2>
        <p className="mt-8 text-white/40 text-lg md:text-xl max-w-xl mx-auto">
          If your product is hard to explain, you're losing demos. 
          Let's fix that with video that converts.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            data-testid="final-cta-btn"
            className="group flex items-center justify-center gap-3 bg-blue-500 text-white px-10 py-6 rounded-full text-lg font-medium transition-all hover:bg-blue-400 hover:scale-105 glow"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

// Main Home Component
const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <ClientLogos />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FinalCTA />
    </Layout>
  );
};

export default Home;
