import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$1,499',
    desc: 'Perfect for homepage clarity.',
    features: ['60-90s explainer video', 'Script & storyboard', 'Motion design', 'Sound design', '2 revisions'],
    time: '7-10 days'
  },
  {
    name: 'Growth',
    price: '$2,999',
    desc: 'Full video system.',
    features: ['1 flagship video', '8-12 short clips', 'Multi-platform exports', 'Caption templates', 'Script included', '2 revisions'],
    time: '10-14 days',
    featured: true
  },
  {
    name: 'Agency',
    price: 'Custom',
    desc: 'Ongoing partnership.',
    features: ['Monthly planning', '2-4 core videos', '20-40 clips', 'Priority support', 'Dedicated system', 'Slack access'],
    time: 'Ongoing'
  }
];

const faqData = [
  { q: 'What does your process look like?', a: 'Discovery → Strategy → Production → Launch. 4 steps, 7 days. Everything async to respect your time.' },
  { q: 'How involved do we need to be?', a: 'One 30-min kickoff call and one review. Everything else is async via Loom.' },
  { q: 'Do you guarantee results?', a: 'We guarantee clarity and quality. If you\'re not happy, we revise until you are.' },
  { q: 'What about revisions?', a: 'All packages include 2 rounds. Additional revisions at $150/hour.' },
  { q: 'Can you match our brand?', a: 'Absolutely. We work within your guidelines or help create a video-specific system.' }
];

const Pricing = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-20 md:pb-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm text-black/40 uppercase tracking-[0.2em] mb-4">Pricing</p>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter">
              Simple
              <br />
              <span className="font-serif italic">pricing</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-black/50 max-w-xl">
              No hidden fees. No surprises. Just clear pricing for video that converts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section ref={cardsRef} className="pb-24 md:pb-40">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`p-8 md:p-10 border transition-colors duration-500 group ${
                  plan.featured 
                    ? 'bg-black text-white border-black' 
                    : 'border-black/10 hover:bg-black hover:text-white hover:border-black'
                }`}
                data-testid={`pricing-card-${i}`}
              >
                {plan.featured && (
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">Most Popular</p>
                )}
                <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.featured ? 'text-white/50' : 'text-black/50 group-hover:text-white/50'}`}>
                  {plan.desc}
                </p>
                <p className="text-4xl md:text-5xl font-medium mb-8">{plan.price}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check className={`w-4 h-4 ${plan.featured ? 'text-white/50' : 'text-black/30 group-hover:text-white/50'}`} />
                      <span className={plan.featured ? 'text-white/70' : 'text-black/70 group-hover:text-white/70'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className={`text-xs mb-6 ${plan.featured ? 'text-white/30' : 'text-black/30 group-hover:text-white/30'}`}>
                  Delivery: {plan.time}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`pricing-cta-${i}`}
                  className={`w-full py-4 font-medium flex items-center justify-center gap-2 transition-colors ${
                    plan.featured 
                      ? 'bg-white text-black' 
                      : 'bg-black text-white group-hover:bg-white group-hover:text-black'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-32 border-y border-black/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm text-black/40 uppercase tracking-[0.2em] mb-4">Included</p>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter">
                Everything you
                <br />
                <span className="font-serif italic">need</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {['Strategy & scripting', 'Motion design', 'Voiceover (AI/human)', 'Sound design', 'Multi-platform exports', 'Revision rounds'].map((item, i) => (
                <div key={i} className="flex items-center gap-3" data-testid={`included-feature-${i}`}>
                  <div className="w-1 h-1 bg-black rounded-full" />
                  <span className="text-black/60">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-40">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-sm text-black/40 uppercase tracking-[0.2em] mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter">
              Common
              <br />
              <span className="font-serif italic">questions</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {faqData.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-black/10" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:opacity-50">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-black/50 pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-black/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 text-center">
          <p className="text-black/50 mb-4">Not sure which package?</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="pricing-bottom-cta"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4"
          >
            Book a Free Call
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
