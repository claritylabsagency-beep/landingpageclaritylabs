import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { pricingConfig } from '../config/pricing.config';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const Pricing = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-20 md:pb-32 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm text-green-600 uppercase tracking-[0.2em] mb-4">Pricing</p>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-black">
              {pricingConfig.pageTitle}
              <br />
              <span className="text-green-500 font-serif italic">{pricingConfig.pageTitleHighlight}</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-black/50 max-w-xl">
              {pricingConfig.pageSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section ref={cardsRef} className="pb-24 md:pb-40 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingConfig.plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`p-8 md:p-10 border transition-all duration-500 ${
                  plan.featured 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-black/10 hover:border-green-300 hover:bg-green-50'
                }`}
                data-testid={`pricing-card-${i}`}
              >
                {plan.featured && plan.featuredLabel && (
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-4">{plan.featuredLabel}</p>
                )}
                <h3 className={`text-2xl font-medium mb-2 ${plan.featured ? 'text-white' : 'text-black'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.featured ? 'text-white/70' : 'text-black/50'}`}>{plan.description}</p>
                <p className={`text-4xl md:text-5xl font-medium mb-8 ${plan.featured ? 'text-white' : 'text-black'}`}>{plan.price}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check className={`w-4 h-4 ${plan.featured ? 'text-white/70' : 'text-green-500'}`} />
                      <span className={plan.featured ? 'text-white/90' : 'text-black/70'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className={`text-xs mb-6 ${plan.featured ? 'text-white/50' : 'text-black/40'}`}>
                  Delivery: {plan.deliveryTime}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`pricing-cta-${i}`}
                  className={`w-full py-4 font-medium flex items-center justify-center gap-2 transition-colors ${
                    plan.featured 
                      ? 'bg-white text-green-600 hover:bg-gray-100' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-32 border-y border-black/10 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm text-green-600 uppercase tracking-[0.2em] mb-4">Included</p>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-black">
                {pricingConfig.includedTitle}
                <br />
                <span className="text-green-500 font-serif italic">{pricingConfig.includedTitleHighlight}</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {pricingConfig.includedFeatures.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`included-feature-${i}`}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-black/70">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-sm text-green-600 uppercase tracking-[0.2em] mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-black">
              {pricingConfig.faqTitle}
              <br />
              <span className="text-green-500 font-serif italic">{pricingConfig.faqTitleHighlight}</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {pricingConfig.faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-black/10" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-medium py-6 text-black hover:text-green-600">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-black/50 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-black/10 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 text-center">
          <p className="text-black/50 mb-4">{pricingConfig.bottomCtaText}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="pricing-bottom-cta"
            className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 font-medium hover:bg-green-600 transition-colors"
          >
            {pricingConfig.bottomCtaButton}
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
