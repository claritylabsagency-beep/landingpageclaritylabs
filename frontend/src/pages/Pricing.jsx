import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

// Pricing Plans
const pricingPlans = [
  {
    name: 'Starter',
    price: '$1,499',
    desc: 'Homepage clarity & first impressions.',
    features: [
      '60–90s product explainer',
      'Script + storyboard',
      'Motion design + editing',
      'Voiceover + sound',
      '2 revision rounds'
    ],
    turnaround: '7–10 days',
    highlighted: false
  },
  {
    name: 'Growth',
    price: '$2,999',
    desc: 'Full funnel video system.',
    features: [
      '1 flagship video (45–90s)',
      '8–12 short clips (10–20s)',
      'Script + storyboard',
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
    desc: 'Ongoing video partnership.',
    features: [
      'Monthly content planning',
      '2–4 core videos',
      '20–40 short clips',
      'Dedicated motion system',
      'Priority turnaround',
      'Slack channel access'
    ],
    turnaround: 'Ongoing',
    highlighted: false
  }
];

// FAQ
const faqData = [
  {
    question: 'What does your process look like?',
    answer: 'We follow a 4-step process: Discovery → Script → Production → Launch. Everything is async-first to minimize your time investment. Typical turnaround is 7-14 days depending on the package.'
  },
  {
    question: 'How involved do we need to be?',
    answer: 'One kickoff call (30 min) and one review session. Everything else is async via Loom and docs. We respect your time.'
  },
  {
    question: 'Do you guarantee results?',
    answer: 'We guarantee clarity, not virality. Our job is to make your product instantly understandable. If you\'re not happy with the final video, we\'ll revise until you are.'
  },
  {
    question: 'What if we need revisions?',
    answer: 'All packages include 2 revision rounds. Additional revisions are $150/hour. Most clients nail it in the first round because we align heavily upfront.'
  },
  {
    question: 'Can you work with our brand guidelines?',
    answer: 'Absolutely. We\'ll match your existing brand, or help you develop a video-specific motion system if you don\'t have one.'
  }
];

// Pricing Card
const PricingCard = ({ plan, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className={`relative flex flex-col p-8 md:p-10 rounded-3xl transition-all ${
        plan.highlighted
          ? 'glass border border-blue-500/30 glow-blue'
          : 'glass'
      }`}
      data-testid={`pricing-card-${index}`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-8 bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
          {plan.badge}
        </span>
      )}
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-white/50 text-sm">{plan.desc}</p>
      </div>
      
      <div className="mb-8">
        <span className="text-5xl font-bold text-white">{plan.price}</span>
        {plan.price !== 'Custom' && <span className="text-white/40 ml-2">starting</span>}
      </div>
      
      <ul className="space-y-4 mb-10 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-blue-400' : 'text-white/30'}`} />
            <span className="text-white/70 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mb-8 pt-6 border-t border-white/10">
        <p className="text-xs font-mono text-white/40">
          Turnaround: {plan.turnaround}
        </p>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-testid={`pricing-cta-${index}`}
        className={`group w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold transition-all ${
          plan.highlighted
            ? 'bg-white text-black hover:bg-blue-400 hover:text-white'
            : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
        }`}
      >
        {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.button>
    </motion.div>
  );
};

const Pricing = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-20 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">Pricing</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] mb-6">
              Simple pricing.
              <br />
              <span className="text-white/30">Serious results.</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl">
              No hidden fees. No surprise charges. Just clear pricing for video that converts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={i} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-32 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">What's Included</p>
              <h2 className="text-4xl font-bold text-white mb-4">
                Everything from idea
                <br />
                <span className="text-white/30">to impact.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                'Messaging strategy',
                'Script + storyboard',
                'Motion design',
                'Voiceover (AI/human)',
                'Sound design',
                'Platform exports'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3" data-testid={`included-feature-${i}`}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-white/60">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">FAQ</p>
            <h2 className="text-4xl font-bold text-white">
              Questions? <span className="text-white/30">Answers.</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {faqData.map((item, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="border-b border-white/10"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-blue-400 py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/50 pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not sure which package?
          </h2>
          <p className="text-white/50 mb-10">
            Book a free strategy call. We'll recommend the best fit.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="pricing-bottom-cta"
            className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all"
          >
            Get a Free Audit
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
