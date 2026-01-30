import { motion } from 'framer-motion';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Layout } from '../components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

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

// Pricing Plans
const pricingPlans = [
  {
    name: 'Starter Explainer Pack',
    price: '$1,499',
    priceNote: 'from',
    description: 'Best for homepage clarity and first impressions.',
    features: [
      '60–90s product-led explainer',
      'Script cleanup & structure',
      'Screen recording + basic motion',
      'Captions & sound design',
      '2 revision rounds'
    ],
    turnaround: '7–10 days',
    highlighted: false
  },
  {
    name: 'Feature Launch Pack',
    price: '$1,999',
    priceNote: 'from',
    description: 'Best for feature updates and adoption.',
    features: [
      '30–60s feature launch video',
      '2 hook variations',
      'UI callouts & motion polish',
      'Social exports (3 formats)',
      '2 revision rounds'
    ],
    turnaround: '5–7 days',
    highlighted: false
  },
  {
    name: 'Growth Video Pack',
    price: '$2,999',
    priceNote: 'from',
    description: 'Best for distribution and pipeline growth.',
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
    name: 'Monthly Contract',
    price: 'Custom',
    priceNote: '',
    description: 'For teams shipping consistently.',
    features: [
      'Monthly content planning',
      '2–4 core videos',
      '20–40 short clips',
      'Dedicated motion system',
      'Priority turnaround',
      'Ongoing optimization'
    ],
    turnaround: 'Ongoing',
    highlighted: false,
    isCustom: true
  }
];

// Everything You Need Features
const includedFeatures = [
  'Messaging & scripting architecture',
  'Storyboarding & system alignment',
  'Product-led motion & editing',
  'Voiceover (AI or human)',
  'Music & sound design',
  'Clear revision boundaries'
];

// FAQ Data
const faqData = [
  {
    question: 'What does your process look like?',
    answer: 'A clear 5-step workflow from discovery to delivery. We start with alignment on your audience and goals, then move through scripting, storyboarding, production, and final delivery—all with async communication to minimize your time investment.'
  },
  {
    question: 'How involved do we need to be?',
    answer: 'One kickoff and one review—everything else is async. We\'ve designed our process to require minimal time from you while still ensuring the final product perfectly captures your product and message.'
  },
  {
    question: 'Do you support monthly work?',
    answer: 'Yes. Monthly is ideal for consistent distribution. Teams that ship regularly benefit from a dedicated motion system, priority turnaround, and ongoing optimization of your video content.'
  },
  {
    question: 'Do you guarantee views or virality?',
    answer: 'No. We focus on clarity and conversion—not vanity metrics. Our job is to make your product instantly understandable and compelling. Distribution strategy and viral success depend on many factors beyond video quality.'
  },
  {
    question: 'What if we\'re not sure what we need?',
    answer: 'We\'ll recommend the best format based on your funnel. Start with a free video audit—we\'ll review your current content and suggest the most impactful videos for your stage and goals.'
  }
];

// Pricing Card Component
const PricingCard = ({ plan, index }) => (
  <motion.div
    variants={fadeInUp}
    className={`relative rounded-2xl border p-8 transition-all duration-300 ${
      plan.highlighted
        ? 'border-sky-200 bg-sky-50/30 shadow-lg scale-[1.02]'
        : 'border-slate-100 bg-white shadow-sm hover:shadow-lg'
    }`}
    data-testid={`pricing-card-${index}`}
  >
    {plan.badge && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
        {plan.badge}
      </span>
    )}
    
    <div className="mb-6">
      <h3 className="font-heading text-xl font-semibold text-slate-900">
        {plan.name}
      </h3>
      <p className="text-slate-500 text-sm mt-1">
        {plan.description}
      </p>
    </div>
    
    <div className="mb-6">
      {plan.priceNote && (
        <span className="text-sm text-slate-400">{plan.priceNote} </span>
      )}
      <span className="font-heading text-4xl font-bold text-slate-900">
        {plan.price}
      </span>
    </div>
    
    <ul className="space-y-3 mb-8">
      {plan.features.map((feature, fIndex) => (
        <li key={fIndex} className="flex items-start gap-3 text-sm text-slate-600">
          <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-sky-500' : 'text-slate-400'}`} />
          {feature}
        </li>
      ))}
    </ul>
    
    <div className="mb-6 pt-4 border-t border-slate-100">
      <p className="text-sm text-slate-500">
        <span className="font-medium">Turnaround:</span> {plan.turnaround}
      </p>
    </div>
    
    <Button
      data-testid={`pricing-cta-${index}`}
      className={`w-full rounded-full h-12 font-medium ${
        plan.highlighted
          ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/30'
          : plan.isCustom
          ? 'bg-slate-900 text-white hover:bg-slate-800'
          : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
      }`}
    >
      {plan.isCustom ? 'Contact Us' : 'Get Started'}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </motion.div>
);

// Main Pricing Component
const Pricing = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
              Choose a package based on your goal. Move to monthly when you want consistent output.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Everything You Need */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Everything you need from ideas to impact
            </h2>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {includedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100"
                data-testid={`included-feature-${index}`}
              >
                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-sky-500" />
                </div>
                <span className="text-slate-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
          >
            <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-6 w-6 text-sky-500" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {faqData.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-slate-100"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-heading font-medium text-slate-900 hover:text-sky-500 py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white">
              Not sure which package is right for you?
            </h2>
            <p className="mt-4 text-slate-400">
              Get a free video audit and we'll recommend the best starting point.
            </p>
            <Button
              data-testid="pricing-bottom-cta"
              className="mt-8 bg-sky-500 text-white hover:bg-sky-600 rounded-full h-12 px-8 font-medium shadow-lg shadow-sky-500/30"
            >
              Get a Free Video Audit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
