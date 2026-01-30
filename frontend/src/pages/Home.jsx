import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, ArrowRight, Play, Sparkles, Film, Zap, Users, Check } from 'lucide-react';
import { Layout } from '../components/Layout';

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
};

// Hero Section - Editorial Style
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden aurora-bg">
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-40 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Premium Video Studio</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-medium text-slate-900 leading-[0.95] tracking-tight">
              Video that makes
              <br />
              <span className="text-blue-600">SaaS click.</span>
            </h1>

            {/* Subhead */}
            <p className="mt-8 text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed">
              We turn complex products into clear, conversion-ready videos. 
              Built for launches, onboarding, and social distribution.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="hero-video-audit-btn"
                className="group flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full text-base font-medium shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all"
              >
                Get a Video Audit
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="hero-showreel-btn"
                className="group flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full text-base font-medium hover:bg-slate-50 transition-all"
              >
                <Play className="w-4 h-4" />
                Watch Showreel
              </motion.button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white" />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                Trusted by <span className="font-semibold text-slate-700">50+</span> SaaS founders
              </p>
            </div>
          </motion.div>

          {/* Right - Featured Video Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ y }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-floating bg-slate-100 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1559507628-40a52a5e7081?auto=format&fit=crop&w=800&q=80"
                alt="Video production"
                className="w-full h-full object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-xl">
                  <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-floating p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Demo requests</p>
                  <p className="text-sm text-green-600">+47% this month</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Client Logos
const ClientLogos = () => {
  const clients = ['AltEzza', 'hbm', 'SpatiumX', 'Classster', 'CustomGuide', 'Vemotion'];
  
  return (
    <section className="py-16 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <p className="text-sm font-medium text-slate-400 whitespace-nowrap">
            Trusted by
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {clients.map((client, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-xl font-heading font-medium text-slate-300"
                data-testid={`client-logo-${client.toLowerCase()}`}
              >
                {client}
              </motion.span>
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
    desc: 'Cinematic hero videos for your homepage. 45-90 seconds of pure clarity.',
    color: 'bg-blue-50 text-blue-600',
    size: 'large'
  },
  {
    icon: Zap,
    title: 'Feature Spotlights',
    desc: 'Quick videos that drive adoption.',
    color: 'bg-amber-50 text-amber-600',
    size: 'small'
  },
  {
    icon: Sparkles,
    title: 'Growth Clips',
    desc: 'Vertical content for LinkedIn, Twitter & TikTok.',
    color: 'bg-purple-50 text-purple-600',
    size: 'small'
  },
  {
    icon: Users,
    title: 'Customer Stories',
    desc: 'Documentary-style testimonials that build trust.',
    color: 'bg-emerald-50 text-emerald-600',
    size: 'small'
  }
];

const ServicesSection = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <motion.div 
        {...fadeUp}
        className="max-w-2xl mb-16"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
          What We Do
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-medium text-slate-900 leading-tight">
          Video formats built for
          <span className="text-blue-600"> SaaS growth.</span>
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Card */}
        <motion.div
          {...fadeUp}
          className="md:col-span-2 group relative bg-white rounded-3xl p-8 md:p-10 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
          data-testid="service-card-0"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 group-hover:opacity-10 transition-opacity">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500" />
          </div>
          <div className="relative">
            <div className={`w-14 h-14 rounded-2xl ${services[0].color} flex items-center justify-center mb-6`}>
              <Film className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-medium text-slate-900 mb-3">
              {services[0].title}
            </h3>
            <p className="text-slate-500 text-lg mb-6 max-w-md">
              {services[0].desc}
            </p>
            <ul className="flex flex-wrap gap-2">
              {['Product-led scripting', 'Sound design', 'Multi-platform'].map((tag) => (
                <li key={tag} className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Small Cards */}
        {services.slice(1).map((service, index) => (
          <motion.div
            key={index}
            {...fadeUp}
            transition={{ delay: 0.1 * (index + 1) }}
            className="group bg-white rounded-3xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all"
            data-testid={`service-card-${index + 1}`}
          >
            <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5`}>
              <service.icon className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-medium text-slate-900 mb-2">
              {service.title}
            </h3>
            <p className="text-slate-500">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Process Section
const processSteps = [
  { num: '01', title: 'Discovery', desc: 'Align on audience, goals, and the message that must land.' },
  { num: '02', title: 'Script & Story', desc: 'Craft the hook and structure for maximum clarity.' },
  { num: '03', title: 'Production', desc: 'Motion design, screen capture, and visual polish.' },
  { num: '04', title: 'Launch', desc: 'Exports optimized for every platform you need.' }
];

const ProcessSection = () => (
  <section className="py-24 md:py-32 bg-slate-50 rounded-[3rem] mx-4 md:mx-8">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div {...fadeUp} className="max-w-2xl mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
          Process
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-medium text-slate-900 leading-tight">
          From brief to launch
          <span className="text-slate-400"> in weeks.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            {...fadeUp}
            transition={{ delay: index * 0.1 }}
            className="relative"
            data-testid={`process-step-${index}`}
          >
            <span className="font-heading text-7xl font-medium text-slate-200">
              {step.num}
            </span>
            <h3 className="font-heading text-xl font-medium text-slate-900 mt-2 mb-2">
              {step.title}
            </h3>
            <p className="text-slate-500 text-sm">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Testimonials
const testimonials = [
  {
    quote: "Clarity Labs nailed the story in one pass. Demo requests jumped within the first week.",
    author: "Sarah Chen",
    role: "Founder",
    company: "B2B SaaS"
  },
  {
    quote: "They didn't just edit. They fixed the narrative. Our homepage finally makes sense.",
    author: "Michael Torres",
    role: "Head of Growth",
    company: "AI Startup"
  },
  {
    quote: "Fast turnaround, great structure, and clips we actually use for distribution.",
    author: "Emily Park",
    role: "Product Marketing",
    company: "Series B SaaS"
  }
];

const TestimonialsSection = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
          Testimonials
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-medium text-slate-900">
          Founders love our work.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            {...fadeUp}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-50 rounded-3xl p-8 hover-lift"
            data-testid={`testimonial-${index}`}
          >
            <p className="text-slate-700 text-lg leading-relaxed mb-8">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
              <div>
                <p className="font-semibold text-slate-900">{t.author}</p>
                <p className="text-sm text-slate-500">{t.role}, {t.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Final CTA
const FinalCTA = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        {...fadeUp}
        className="relative bg-slate-900 rounded-[2.5rem] p-12 md:p-20 overflow-hidden"
      >
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
            Ready to make your
            <br />
            product <span className="text-blue-400">click?</span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-lg">
            If your product is hard to explain, you're losing demos. 
            Let's fix that with video that converts.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="final-cta-btn"
            className="mt-10 group flex items-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
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
