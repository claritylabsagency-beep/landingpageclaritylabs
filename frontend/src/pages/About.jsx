import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, Eye } from 'lucide-react';
import { Layout } from '../components/Layout';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const values = [
  {
    icon: Target,
    title: 'Clarity Over Complexity',
    desc: 'The best videos don\'t just look good—they make complex products instantly clear. Every frame serves the message.'
  },
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    desc: 'Fast turnaround doesn\'t mean cutting corners. Our streamlined process delivers premium quality in days, not weeks.'
  },
  {
    icon: Eye,
    title: 'Founder-First',
    desc: 'We\'ve worked with enough startups to know your time is precious. Minimal meetings, async communication, maximum impact.'
  }
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
                About
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
                We make
                <br />
                products
                <br />
                <span className="text-white/30">click.</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-white/50 text-lg md:text-xl leading-relaxed">
                Clarity Labs is a premium video studio built specifically for SaaS and AI companies. 
                We turn complex products into clear, conversion-ready videos that work across 
                your homepage, social feeds, and sales conversations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1700241956172-1045342673ed?q=80&w=2000&auto=format&fit=crop"
            alt="Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-[#020408]/50 to-transparent" />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            className="mb-20"
            {...fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
              Principles
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
              What drives us.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-t border-white/10 pt-8"
                data-testid={`value-card-${index}`}
              >
                <value.icon className="w-8 h-8 text-blue-400 mb-6" strokeWidth={1.5} />
                <h3 className="font-heading text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-white/40 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-40 bg-[#0A0A0A]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            <motion.div {...fadeUp}>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 block">
                The Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
                Built by founders,
                <br />
                for founders.
              </h2>
              <div className="space-y-6 text-white/50 leading-relaxed">
                <p>
                  We started Clarity Labs after seeing too many great products struggle to explain themselves. 
                  Founders would spend months building incredible software, then lose potential customers 
                  in the first 10 seconds of their homepage.
                </p>
                <p>
                  The problem wasn't the product—it was the communication. So we set out to build 
                  a video studio that actually understands SaaS. One that speaks the language of 
                  product-led growth and knows that a homepage explainer is different from a 
                  feature drop on Twitter.
                </p>
                <p>
                  Today, we work with SaaS teams of all sizes—from bootstrapped startups to 
                  funded scale-ups—helping them turn complex products into clear, compelling 
                  videos that convert.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586268659832-13b6a3be3b0d?q=80&w=800&auto=format&fit=crop"
                  alt="Production"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-blue-500/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Let's make something
              <br />
              <span className="text-blue-400">worth watching.</span>
            </h2>
            <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto">
              If your product is hard to explain, you're leaving money on the table. 
              Let's fix that.
            </p>
            <button
              data-testid="about-cta-btn"
              className="group inline-flex items-center gap-3 bg-blue-500 text-white px-10 py-6 rounded-full text-lg font-medium transition-all hover:bg-blue-400 hover:scale-105 glow"
            >
              Book a Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
