import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Layout } from '../components/Layout';

const values = [
  { num: '01', title: 'Clarity First', desc: 'Every frame serves the message. No fluff, no filler.' },
  { num: '02', title: 'Speed Matters', desc: 'Premium quality in days, not weeks. Built for fast-moving teams.' },
  { num: '03', title: 'Founder-First', desc: 'Minimal meetings. Async communication. Maximum impact.' }
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
      <section className="pt-40 pb-20 md:pb-32 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm text-green-600 uppercase tracking-[0.2em] mb-4">About</p>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-black">
              We make
              <br />
              <span className="text-green-500 font-serif italic">products click</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-black/50 max-w-xl">
              Clarity Labs is a premium video studio for SaaS. We turn complex products into clear, conversion-ready videos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 md:py-40 border-y border-black/10 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="mb-20"
          >
            <p className="text-sm text-green-600 uppercase tracking-[0.2em] mb-4">Principles</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-black">
              What drives
              <br />
              <span className="text-green-500 font-serif italic">us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-black/10 pt-8 group"
                data-testid={`value-card-${i}`}
              >
                <span className="text-sm text-green-600 font-mono">{v.num}</span>
                <h3 className="text-2xl font-medium text-black mt-4 mb-3 group-hover:text-green-600 transition-colors">{v.title}</h3>
                <p className="text-black/50">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="py-24 md:py-40 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
            >
              <p className="text-sm text-green-600 uppercase tracking-[0.2em] mb-4">Story</p>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-black mb-8">
                Built by founders,
                <br />
                <span className="text-green-500 font-serif italic">for founders</span>
              </h2>
              <div className="space-y-6 text-black/60 leading-relaxed text-lg">
                <p>
                  We started Clarity Labs after watching too many great products struggle to explain themselves. Founders spending months building, then losing visitors in the first 10 seconds.
                </p>
                <p>
                  The problem wasn't the product. It was the communication. So we built a studio that actually understands SaaS—the language, the funnel, the conversion.
                </p>
                <p>
                  Today, we work with teams of all sizes. Bootstrapped startups to Series C. Helping them turn complex products into clear videos that convert.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-green-600 uppercase tracking-[0.2em] mb-8">Let's work</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-black mb-8">
              Ready to make
              <br />
              <span className="text-green-500 font-serif italic">something great?</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="about-cta-btn"
              className="inline-flex items-center gap-3 bg-green-500 text-white px-10 py-5 text-lg font-medium hover:bg-green-600 transition-colors"
            >
              Start a Project
              <ArrowUpRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
