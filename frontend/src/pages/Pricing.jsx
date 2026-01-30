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
      'Script & storyboard included',
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

// FAQ
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
    answer: 'No. We focus on clarity and conversion—not vanity metrics. Our job is to make your product instantly understandable and compelling.'
  },
  {
    question: 'What if we\'re not sure what we need?',
    answer: 'Start with a free video audit. We\'ll review your current content and recommend the most impactful videos for your stage.'
  },
  {
    question: 'Do you support monthly retainers?',
    answer: 'Yes. Monthly is ideal for teams shipping consistently. You get a dedicated motion system, priority turnaround, and ongoing optimization.'
  }
];

// Pricing Card
const PricingCard = ({ plan, index }) => (
  <motion.div
    {...fadeUp}
    transition={{ delay: index * 0.1 }}
    className={`relative flex flex-col p-8 md:p-10 rounded-3xl transition-all hover-lift ${
      plan.highlighted
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
        : 'bg-white border border-slate-100 shadow-sm'
    }`}
    data-testid={`pricing-card-${index}`}
  >
    {plan.badge && (
      <span className="absolute -top-3 left-8 bg-slate-900 text-white text-xs font-medium px-4 py-1.5 rounded-full">
        {plan.badge}
      </span>
    )}
    
    <div className="mb-6">
      <h3 className={`font-heading text-2xl font-medium mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
        {plan.name}
      </h3>
      <p className={plan.highlighted ? 'text-blue-100' : 'text-slate-500'}>
        {plan.desc}
      </p>
    </div>
    
    <div className="mb-8">
      <span className={`font-heading text-5xl font-medium ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
        {plan.price}
      </span>
      {plan.price !== 'Custom' && (
        <span className={plan.highlighted ? 'text-blue-200' : 'text-slate-400'}> starting</span>
      )}
    </div>
    
    <ul className="space-y-4 mb-10 flex-1">
      {plan.features.map((feature, fIndex) => (
        <li key={fIndex} className={`flex items-start gap-3 ${plan.highlighted ? 'text-blue-100' : 'text-slate-600'}`}>
          <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'}`} />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div className={`mb-8 pt-6 border-t ${plan.highlighted ? 'border-blue-500' : 'border-slate-100'}`}>
      <p className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>
        Turnaround: {plan.turnaround}
      </p>
    </div>
    
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-testid={`pricing-cta-${index}`}
      className={`group w-full flex items-center justify-center gap-2 py-4 rounded-full font-medium transition-all ${
        plan.highlighted
          ? 'bg-white text-blue-600 hover:bg-blue-50'
          : 'bg-slate-900 text-white hover:bg-slate-800'
      }`}
    >
      {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.button>
  </motion.div>
);

// Main Pricing Component
const Pricing = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-20 aurora-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
              Pricing
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 leading-[0.95]">
              Simple pricing,
              <br />
              <span className="text-slate-400">no surprises.</span>
            </h1>
            <p className="mt-8 text-lg text-slate-500 max-w-xl">
              Choose a package based on your goal. Move to monthly when you want consistent output.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-32 bg-slate-50 rounded-[3rem] mx-4 md:mx-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
                What's Included
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-slate-900 leading-tight">
                Everything from ideas
                <span className="text-slate-400"> to impact.</span>
              </h2>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-6"
              {...fadeUp}
              transition={{ delay: 0.2 }}
            >
              {[
                'Messaging architecture',
                'Script & storyboards',
                'Motion design',
                'Voiceover (AI/human)',
                'Sound design',
                'Multi-platform exports'
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3"
                  data-testid={`included-feature-${index}`}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-slate-600">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
              FAQ
            </p>
            <h2 className="font-heading text-4xl font-medium text-slate-900">
              Questions? Answers.
            </h2>
          </motion.div>
          
          <motion.div {...fadeUp}>
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {faqData.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-slate-100"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-heading text-lg font-medium text-slate-900 hover:text-blue-600 py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 pb-6 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-slate-900 mb-4">
              Not sure which package?
            </h2>
            <p className="text-slate-500 mb-10">
              Get a free video audit. We'll recommend the best starting point.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="pricing-bottom-cta"
              className="group inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Get a Free Audit
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
