import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Target, Zap, Eye } from 'lucide-react';
import { Layout } from '../components/Layout';

const values = [
  {
    icon: Target,
    title: 'Clarity Over Complexity',
    desc: 'The best videos don\'t just look good—they make complex products instantly clear.'
  },
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    desc: 'Premium quality in days, not weeks. Our process is built for fast-moving teams.'
  },
  {
    icon: Eye,
    title: 'Founder-First',
    desc: 'Minimal meetings, async communication, maximum impact. We respect your time.'
  }
];

const About = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">About</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95]">
                We make products
                <br />
                <span className="gradient-text">click.</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-white/50 leading-relaxed">
                Clarity Labs is a premium video studio for SaaS. We turn complex products 
                into clear, conversion-ready videos that work across every touchpoint.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-32 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">Principles</p>
            <h2 className="text-4xl font-bold text-white">
              What drives us.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="glass rounded-3xl p-8 group hover:border-white/20 transition-all"
                data-testid={`value-card-${i}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                  <value.icon className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/50">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">Our Story</p>
              <h2 className="text-4xl font-bold text-white mb-8">
                Built by founders,
                <br />
                <span className="text-white/30">for founders.</span>
              </h2>
              <div className="space-y-6 text-white/50 leading-relaxed">
                <p>
                  We started Clarity Labs after watching too many great products struggle 
                  to explain themselves. Founders would spend months building incredible 
                  software, then lose potential customers in the first 10 seconds.
                </p>
                <p>
                  The problem wasn't the product—it was the communication. So we built 
                  a video studio that actually understands SaaS. One that speaks the 
                  language of product-led growth.
                </p>
                <p>
                  Today, we work with teams of all sizes—from bootstrapped startups to 
                  Series B scale-ups—helping them turn complex products into clear, 
                  compelling videos that convert.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden glass">
                <img
                  src="https://images.unsplash.com/photo-1559507628-40a52a5e7081?auto=format&fit=crop&w=800&q=80"
                  alt="Studio"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-blue-500/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="glass rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 hero-gradient opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let's make something
                <br />
                <span className="text-blue-400 text-glow">worth watching.</span>
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
                If your product is hard to explain, you're leaving money on the table.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="about-cta-btn"
                className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all"
              >
                Book a Strategy Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
