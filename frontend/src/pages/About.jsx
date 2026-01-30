import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Target, Zap, Eye } from 'lucide-react';
import { Layout, useTheme } from '../components/Layout';

const values = [
  { icon: Target, title: 'Clarity Over Complexity', desc: 'The best videos don\'t just look good—they make complex products instantly clear.' },
  { icon: Zap, title: 'Speed Without Sacrifice', desc: 'Premium quality in days, not weeks. Our process is built for fast-moving teams.' },
  { icon: Eye, title: 'Founder-First', desc: 'Minimal meetings, async communication, maximum impact. We respect your time.' }
];

const About = () => {
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      <section className="pt-40 pb-32 relative overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'hero-gradient' : ''}`} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4">About</p>
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                We make products
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">click.</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <p className={`text-lg leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                Clarity Labs is a premium video studio for SaaS. We turn complex products 
                into clear, conversion-ready videos that work across every touchpoint.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className={`py-32 border-y ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4">Principles</p>
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>What drives us.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -8 }}
                className={`rounded-3xl p-8 group transition-all ${
                  isDark ? 'bg-white/5 border border-white/10 hover:border-white/20' : 'bg-white border border-slate-200 shadow-sm hover:shadow-xl'
                }`}
                data-testid={`value-card-${i}`}
              >
                <motion.div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    isDark ? 'bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/30' : 'bg-slate-100 group-hover:bg-blue-50'
                  }`}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <value.icon className={`w-6 h-6 ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-700 group-hover:text-blue-600'}`} strokeWidth={1.5} />
                </motion.div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{value.title}</h3>
                <p className={isDark ? 'text-white/50' : 'text-slate-500'}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={storyRef} className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4">Our Story</p>
              <h2 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Built by founders,
                <br />
                <span className={isDark ? 'text-white/30' : 'text-slate-300'}>for founders.</span>
              </h2>
              <div className={`space-y-6 leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                <p>We started Clarity Labs after watching too many great products struggle to explain themselves.</p>
                <p>The problem wasn't the product—it was the communication. So we built a video studio that actually understands SaaS.</p>
                <p>Today, we work with teams of all sizes—helping them turn complex products into clear, compelling videos that convert.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className={`aspect-[4/5] rounded-3xl overflow-hidden ${isDark ? 'bg-white/5 border border-white/10' : 'shadow-2xl'}`}>
                <img
                  src="https://images.unsplash.com/photo-1559507628-40a52a5e7081?auto=format&fit=crop&w=800&q=80"
                  alt="Studio"
                  className={`w-full h-full object-cover ${isDark ? 'opacity-80' : ''}`}
                />
              </div>
              <motion.div 
                className={`absolute -bottom-4 -right-4 w-full h-full rounded-3xl border -z-10 ${isDark ? 'border-blue-500/20' : 'border-blue-200'}`}
                animate={{ rotate: [0, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-900'
            }`}
          >
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let's make something
                <span className="text-blue-400"> worth watching.</span>
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
                If your product is hard to explain, you're leaving money on the table.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="about-cta-btn"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all"
              >
                Book a Strategy Call
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
