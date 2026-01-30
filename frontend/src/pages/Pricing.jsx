import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

// Pricing Plans
const pricingPlans = [
  {
    name: 'Starter',
    price: '$1,499',
    desc: 'Homepage clarity & first impressions.',
    features: [
      '60–90s product explainer',
      'Script cleanup & structure',
      'Screen recording + motion',
      'Captions & sound design',
      '2 revision rounds'
    ],
    turnaround: '7–10 days',
    highlighted: false
  },
  {
    name: 'Growth',
    price: '$2,999',
    desc: 'Distribution & pipeline growth.',
    features: [
      '1 flagship video (45–90s)',
      '8–12 short clips (10–20s)',
      'Script & storyboard',
      'Multi-platform exports',
      'Caption templates',
      '2 revision rounds'
    ],
    turnaround: '10–14 days',
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    name: 'Agency',
    price: 'Custom',
    desc: 'For teams shipping consistently.',
    features: [
      'Monthly content planning',
      '2–4 core videos',
      '20–40 short clips',
      'Dedicated motion system',
      'Priority turnaround',
      'Ongoing optimization'
    ],
    turnaround: 'Ongoing',
    highlighted: false
  }
];

// FAQ Data
const faqData = [
  {
    question: 'What does your process look like?',
    answer: 'A clear 4-step workflow from discovery to launch. We start with alignment on your audience and goals, then move through scripting, production, and delivery—all async to minimize your time investment.'
  },
  {
    question: 'How involved do we need to be?',
    answer: 'One kickoff call and one review—everything else is async. We\'ve designed our process to require minimal time from you while ensuring the final product nails your message.'
  },
  {
    question: 'Do you guarantee views or virality?',
    answer: 'No. We focus on clarity and conversion—not vanity metrics. Our job is to make your product instantly understandable and compelling. Distribution depends on many factors beyond video quality.'
  },
  {
    question: 'What if we\'re not sure what we need?',
    answer: 'Start with a free video audit. We\'ll review your current content and recommend the most impactful videos for your stage and goals.'
  },
  {
    question: 'Do you support monthly retainers?',
    answer: 'Yes. Monthly is ideal for teams shipping consistently. You get a dedicated motion system, priority turnaround, and ongoing optimization of your video content.'
  }
];

// Pricing Card
const PricingCard = ({ plan, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`relative flex flex-col p-8 md:p-10 border transition-all duration-500 ${
      plan.highlighted
        ? 'bg-blue-500/5 border-blue-500/30 glow'
        : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
    }`}
    data-testid={`pricing-card-${index}`}
  >
    {plan.badge && (
      <span className="absolute -top-3 left-8 bg-blue-500 text-white text-xs font-mono uppercase tracking-wider px-4 py-1">
        {plan.badge}
      </span>
    )}
    
    <div className="mb-8">
      <h3 className="font-heading text-2xl font-bold text-white mb-2">
        {plan.name}
      </h3>
      <p className="text-white/40 text-sm">
        {plan.desc}
      </p>
    </div>
    
    <div className="mb-8">
      <span className="font-heading text-5xl font-bold text-white">
        {plan.price}
      </span>
      {plan.price !== 'Custom' && (
        <span className="text-white/30 ml-2">starting</span>
      )}
    </div>
    
    <ul className="space-y-4 mb-10 flex-1">
      {plan.features.map((feature, fIndex) => (
        <li key={fIndex} className="flex items-start gap-3 text-white/60">
          <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-blue-400' : 'text-white/30'}`} />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div className="mb-8 pt-6 border-t border-white/10">
      <p className="text-xs font-mono uppercase tracking-wider text-white/30">
        Turnaround: {plan.turnaround}
      </p>
    </div>
    
    <button
      data-testid={`pricing-cta-${index}`}
      className={`group w-full flex items-center justify-center gap-2 py-4 font-medium transition-all ${
        plan.highlighted
          ? 'bg-blue-500 text-white hover:bg-blue-400'
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
    >
      {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  </motion.div>
);

// Main Pricing Component
const Pricing = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
              Pricing
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
              Simple pricing.
              <br />
              <span className="text-white/30">No surprises.</span>
            </h1>
            <p className="mt-8 text-white/50 text-lg md:text-xl max-w-xl">
              Choose a package based on your goal. Move to monthly when you want consistent output.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 md:pb-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
                What's Included
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight">
                Everything from
                <br />
                ideas to impact.
              </h2>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                'Messaging architecture',
                'Scripting & storyboards',
                'Motion design & editing',
                'Voiceover (AI or human)',
                'Music & sound design',
                'Multi-platform exports'
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3"
                  data-testid={`included-feature-${index}`}
                >
                  <div className="w-2 h-2 bg-blue-500" />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            className="mb-16"
            {...fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight">
              Questions? Answers.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {faqData.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-white/10"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-heading font-medium text-white hover:text-blue-400 py-6 text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/50 pb-6 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Not sure which package?
            </h2>
            <p className="text-white/40 mb-10">
              Get a free video audit. We'll recommend the best starting point.
            </p>
            <button
              data-testid="pricing-bottom-cta"
              className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-medium transition-all hover:scale-105"
            >
              Get a Free Audit
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
