import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, Users } from 'lucide-react';
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
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true }
};

const values = [
  {
    icon: Target,
    title: 'Clarity Over Complexity',
    description: 'We believe the best videos don\'t just look good—they make complex products instantly understandable. Every frame serves the message.'
  },
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    description: 'Fast turnaround doesn\'t mean cutting corners. Our streamlined process delivers premium quality in days, not weeks.'
  },
  {
    icon: Users,
    title: 'Founder-First Mindset',
    description: 'We\'ve worked with enough startups to know your time is precious. Minimal meetings, async communication, maximum impact.'
  }
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium tracking-wide uppercase text-sky-500 mb-4">
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              We help SaaS founders explain their products in seconds.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-500 leading-relaxed">
              Clarity Labs is a premium video studio built specifically for SaaS and AI companies. We turn complex products into clear, conversion-ready videos that work across your homepage, social feeds, and sales conversations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              What drives us
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Our principles shape every video we create.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
                data-testid={`value-card-${index}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-7 w-7 text-sky-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-sm font-medium tracking-wide uppercase text-sky-500 mb-4">
                Our Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6">
                Built by founders, for founders
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  We started Clarity Labs after seeing too many great products struggle to explain themselves. Founders would spend months building incredible software, then lose potential customers in the first 10 seconds of their homepage.
                </p>
                <p>
                  The problem wasn't the product—it was the communication. So we set out to build a video studio that actually understands SaaS. One that speaks the language of product-led growth, understands funnel stages, and knows that a homepage explainer is different from a feature drop on Twitter.
                </p>
                <p>
                  Today, we work with SaaS teams of all sizes—from bootstrapped startups to funded scale-ups—helping them turn complex products into clear, compelling videos that convert.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-100 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Ready to make your product click?
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
              Let's talk about how we can help you explain your product in seconds.
            </p>
            <Button
              data-testid="about-cta-btn"
              className="mt-8 bg-sky-500 text-white hover:bg-sky-600 rounded-full h-14 px-10 text-lg font-medium shadow-lg shadow-sky-500/30"
            >
              Book a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
