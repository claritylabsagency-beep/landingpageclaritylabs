import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { 
  Play, 
  Zap, 
  TrendingUp, 
  BookOpen, 
  Presentation, 
  Palette,
  ArrowRight,
  Check,
  Quote
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Layout } from '../components/Layout';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

// Hero Section
const HeroSection = () => (
  <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        className="max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="inline-block text-sm font-medium tracking-wide uppercase text-sky-500 mb-4">
          Video Production for SaaS
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
          Your growth-focused creative engine for SaaS & AI brands.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
          We turn complex products into clear, conversion-ready videos—built for launches, onboarding, and distribution across LinkedIn, X, and your website.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button 
            data-testid="hero-video-audit-btn"
            className="bg-slate-900 text-white hover:bg-slate-800 rounded-full h-12 px-8 text-base font-medium shadow-lg shadow-slate-900/20"
          >
            Get a Video Audit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            data-testid="hero-how-it-works-btn"
            className="border-2 border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 rounded-full h-12 px-8 text-base font-medium"
          >
            How it works
          </Button>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          Fast turnaround. Strategy-led. Built to convert—not just look good.
        </p>
      </motion.div>
    </div>
    
    {/* Decorative elements */}
    <div className="absolute top-20 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-50 -z-10" />
    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-50 -z-10" />
  </section>
);

// Client Logos Marquee
const ClientLogos = () => {
  const clients = ['AltEzza', 'hbm', 'SpatiumX', 'Classster', 'CustomGuide', 'Vemotion', 'Kitaboo', 'DSharp'];
  
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
        <p className="text-sm text-slate-400 text-center">
          Trusted by founders, growth teams, and product marketers building in public
        </p>
      </div>
      <Marquee gradient={true} gradientColor="#fafafa" gradientWidth={100} speed={40}>
        {clients.map((client, index) => (
          <span 
            key={index}
            className="mx-12 font-heading text-xl md:text-2xl font-bold text-slate-300 uppercase tracking-wider"
            data-testid={`client-logo-${client.toLowerCase()}`}
          >
            {client}
          </span>
        ))}
      </Marquee>
    </section>
  );
};

// Services Section
const services = [
  {
    icon: Play,
    title: 'Launch Films',
    description: 'Homepage hero videos and launch assets that explain your product in seconds.',
    features: ['45–90s flagship explainer', 'Product-led scripting & storyboard', 'Website, Product Hunt & social exports']
  },
  {
    icon: Zap,
    title: 'Feature Spotlights',
    description: 'Short videos that drive adoption and reduce repetitive "how do I…" questions.',
    features: ['30–60s feature walkthroughs', 'How-to & onboarding cuts', 'In-app / help-center friendly formats']
  },
  {
    icon: TrendingUp,
    title: 'Growth Clips',
    description: 'High-velocity short videos built for distribution.',
    features: ['10–15s hooks with punchy edits', 'Founder POV and product-first variants', 'Weekly drop-ready formats']
  },
  {
    icon: BookOpen,
    title: 'Product Education Library',
    description: 'A clean video knowledge base that trains users and builds trust.',
    features: ['Tutorials & workflows', 'Modular chapters', 'Reusable voice & visual system']
  },
  {
    icon: Presentation,
    title: 'Sales Enablement Videos',
    description: 'Make every pitch consistent and every demo easier to understand.',
    features: ['Use-case & objection-handling videos', '"Before the demo" explainers', 'Sales-ready exports']
  },
  {
    icon: Palette,
    title: 'Brand Systems',
    description: 'A repeatable motion and editing system so everything looks consistent.',
    features: ['Motion & caption templates', 'Typography & visual rules', 'Platform-specific export presets']
  }
];

const ServicesSection = () => (
  <section className="py-20 md:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        className="text-center mb-16"
        {...fadeInUp}
      >
        <span className="inline-block text-sm font-medium tracking-wide uppercase text-sky-500 mb-4">
          Service Tracks
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
          Services tuned for SaaS & AI growth
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          Pick a track based on what you're optimizing for—launch momentum, feature adoption, or consistent distribution.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            data-testid={`service-card-${index}`}
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors">
              <service.icon size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
              {service.title}
            </h3>
            <p className="text-slate-500 mb-4">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-sky-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Video Styles Section
const videoStyles = [
  'Product-led Explainer',
  'Founder POV Clip',
  'UI Walkthrough + Callouts',
  'Motion Teaser',
  'Feature Drop',
  'Onboarding Mini-Series',
  'Sales Enablement Video',
  'Education / How-To'
];

const VideoStylesSection = () => (
  <section className="py-20 md:py-32 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        className="text-center mb-16"
        {...fadeInUp}
      >
        <span className="inline-block text-sm font-medium tracking-wide uppercase text-sky-500 mb-4">
          Styles
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
          Formats we use to make SaaS products instantly clear
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          We adapt these styles based on your product, audience, and funnel stage.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        {videoStyles.map((style, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="rounded-xl bg-white border border-slate-100 p-6 text-center hover:border-sky-200 hover:bg-sky-50/30 transition-all duration-300 cursor-default"
            data-testid={`video-style-${index}`}
          >
            <span className="font-heading text-base md:text-lg font-medium text-slate-700">
              {style}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-12 text-center"
        {...fadeInUp}
      >
        <Button 
          data-testid="styles-video-audit-btn"
          className="bg-slate-900 text-white hover:bg-slate-800 rounded-full h-12 px-8 text-base font-medium shadow-lg shadow-slate-900/20"
        >
          Get a Video Audit
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  </section>
);

// Testimonials Section
const testimonials = [
  {
    quote: "Clarity Labs nailed the story in one pass. Our homepage finally makes sense—and demo requests jumped within the first week.",
    author: "Founder",
    company: "B2B SaaS"
  },
  {
    quote: "Fast turnaround, great structure, and clips that were genuinely usable for distribution.",
    author: "Head of Growth",
    company: "AI startup"
  },
  {
    quote: "They didn't just edit. They fixed the narrative.",
    author: "Product Marketing",
    company: "SaaS team"
  }
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        className="text-center mb-16"
        {...fadeInUp}
      >
        <span className="inline-block text-sm font-medium tracking-wide uppercase text-sky-500 mb-4">
          What Founders Care About
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
          Speed, clarity, and videos that actually explain the product.
        </h2>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="relative rounded-2xl bg-slate-50 p-8 md:p-10"
            data-testid={`testimonial-${index}`}
          >
            <Quote className="absolute top-6 left-6 text-sky-200 h-8 w-8" />
            <p className="relative text-lg text-slate-700 leading-relaxed pt-6">
              "{testimonial.quote}"
            </p>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="font-heading font-semibold text-slate-900">
                — {testimonial.author}
              </p>
              <p className="text-sm text-slate-500">
                {testimonial.company}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Process Section
const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We align on audience, funnel goal, and the one message that must land.',
    outputs: 'brief, references, success metric'
  },
  {
    number: '02',
    title: 'Content Alignment & Scripting',
    description: 'We craft the hook, structure the story, and write for clarity.',
    outputs: 'script, beats, CTA'
  },
  {
    number: '03',
    title: 'Storyboarding',
    description: 'Visuals mapped to the message—nothing extra, nothing missing.',
    outputs: 'storyboard, shot list'
  },
  {
    number: '04',
    title: 'Motion & Edit',
    description: 'Clean cuts, UI callouts, captions, and sound design.',
    outputs: 'V1 + variants'
  },
  {
    number: '05',
    title: 'Delivery & Optimization',
    description: 'Exports for web and social with fast feedback loops.',
    outputs: 'final pack + files'
  }
];

const ProcessSection = () => (
  <section className="py-20 md:py-32 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        className="text-center mb-16"
        {...fadeInUp}
      >
        <span className="inline-block text-sm font-medium tracking-wide uppercase text-sky-400 mb-4">
          Process
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          Built for speed. Powered by strategy.
        </h2>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          A simple workflow that keeps things moving—without sacrificing quality.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-5 gap-6"
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="relative"
            data-testid={`process-step-${index}`}
          >
            <span className="font-heading text-5xl md:text-6xl font-bold text-slate-800">
              {step.number}
            </span>
            <h3 className="font-heading text-lg md:text-xl font-semibold mt-4 mb-2">
              {step.title}
            </h3>
            <p className="text-slate-400 text-sm mb-3">
              {step.description}
            </p>
            <p className="text-xs text-sky-400">
              Outputs: {step.outputs}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Final CTA Section
const FinalCTASection = () => (
  <section className="py-20 md:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
          Grow with videos that convert.
        </h2>
        <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto">
          If your product is hard to explain, you're losing demos.
          Let's fix that—with a clean, fast video system.
        </p>
        <div className="mt-8">
          <Button 
            data-testid="final-cta-btn"
            className="bg-sky-500 text-white hover:bg-sky-600 rounded-full h-14 px-10 text-lg font-medium shadow-lg shadow-sky-500/30"
          >
            Book a Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
      <VideoStylesSection />
      <TestimonialsSection />
      <ProcessSection />
      <FinalCTASection />
    </Layout>
  );
};

export default Home;
