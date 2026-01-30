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
    desc: 'The best videos don\'t just look good—they make complex products instantly clear. Every frame serves the message.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    desc: 'Fast turnaround doesn\'t mean cutting corners. Premium quality in days, not weeks.',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    icon: Eye,
    title: 'Founder-First',
    desc: 'We know your time is precious. Minimal meetings, async communication, maximum impact.',
    color: 'bg-emerald-50 text-emerald-600'
  }
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-20 aurora-bg relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-40" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
                About
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 leading-[0.95]">
                We make products
                <br />
                <span className="text-blue-600">click.</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg text-slate-500 leading-relaxed">
                Clarity Labs is a premium video studio built specifically for SaaS and AI companies. 
                We turn complex products into clear, conversion-ready videos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-floating"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
              Principles
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-slate-900">
              What drives us.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                {...fadeUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover-lift"
                data-testid={`value-card-${index}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-medium text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 bg-slate-50 rounded-[3rem] mx-4 md:mx-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4">
                Our Story
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-slate-900 mb-8">
                Built by founders,
                <span className="text-slate-400"> for founders.</span>
              </h2>
              <div className="space-y-6 text-slate-500 leading-relaxed">
                <p>
                  We started Clarity Labs after seeing too many great products struggle to explain themselves. 
                  Founders would spend months building incredible software, then lose potential customers 
                  in the first 10 seconds of their homepage.
                </p>
                <p>
                  The problem wasn't the product—it was the communication. So we built a video studio 
                  that actually understands SaaS. One that speaks the language of product-led growth.
                </p>
                <p>
                  Today, we work with SaaS teams of all sizes—from bootstrapped startups to funded scale-ups—
                  helping them turn complex products into clear, compelling videos that convert.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-floating">
                <img
                  src="https://images.unsplash.com/photo-1559507628-40a52a5e7081?auto=format&fit=crop&w=800&q=80"
                  alt="Production"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-blue-200 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            {...fadeUp}
            className="relative bg-slate-900 rounded-[2.5rem] p-12 md:p-20 overflow-hidden text-center"
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-white mb-6">
                Let's make something
                <span className="text-blue-400"> worth watching.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10">
                If your product is hard to explain, you're leaving money on the table.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="about-cta-btn"
                className="group inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
              >
                Book a Consultation
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
