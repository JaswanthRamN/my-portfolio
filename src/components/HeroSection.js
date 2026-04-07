'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO, PERSONAL_INFO } from '@/utils/constants';
import { FaLinkedin, FaGithub, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import DataFlowCanvas from './DataFlowCanvas';

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
  const hasPlus = target.includes('+');
  const hasPercent = target.includes('%');
  const hasK = target.includes('K');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * numericTarget));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDone(true);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericTarget, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{hasK ? 'K' : ''}{hasPercent ? '%' : ''}{hasPlus ? '+' : ''}
    </span>
  );
}

function WordReveal({ text, delay = 0, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      animate={{
        x: [0, 80, -40, 60, 0],
        y: [0, -60, 40, -80, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 20 + delay * 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-dark-950" />

      {/* Aurora gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb className="top-[-20%] left-[-10%] w-[700px] h-[700px] bg-cyan-500/[0.07]" delay={0} />
        <FloatingOrb className="bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-purple-500/[0.06]" delay={2} />
        <FloatingOrb className="top-[40%] right-[20%] w-[400px] h-[400px] bg-pink-500/[0.04]" delay={4} />
        <FloatingOrb className="bottom-[30%] left-[10%] w-[350px] h-[350px] bg-green-500/[0.03]" delay={6} />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Radial vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 15, 30, 0.4) 70%, rgba(10, 15, 30, 0.8) 100%)' }} />

      {/* Data Flow Canvas */}
      <DataFlowCanvas />

      {/* Content */}
      <motion.div style={{ y: parallaxY, opacity }} className="container-custom relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Role Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-10 border border-cyan-500/20 backdrop-blur-sm"
            style={{ background: 'rgba(0, 212, 255, 0.06)' }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-cyan-300/80 tracking-wide">Available for opportunities</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white mb-3 leading-[1.05] tracking-tight">
              <span className="block">
                <WordReveal text="Turning" delay={0.5} />
                <span className="inline-block overflow-hidden mr-[0.3em]">
                  <motion.span
                    className="inline-block gradient-text"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.58, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    data
                  </motion.span>
                </span>
                <WordReveal text="into" delay={0.66} />
              </span>
              <span className="block mt-2">
                <WordReveal text="decisions that matter" delay={0.9} />
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="text-lg md:text-xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed"
          >
            {HERO.subheadline}
          </motion.p>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 max-w-4xl mx-auto"
          >
            {HERO.impactStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="stat-card group"
              >
                {/* Stat number with glow ring */}
                <div className="relative mb-3">
                  <div className="text-4xl md:text-5xl font-bold gradient-text-static tracking-tight">
                    <AnimatedCounter target={stat.value} />
                  </div>
                </div>
                <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors leading-snug">
                  {stat.label}
                </div>
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-3 right-3 w-6 h-[1px] bg-gradient-to-l from-cyan-500/40 to-transparent" />
                  <div className="absolute top-3 right-3 w-[1px] h-6 bg-gradient-to-t from-cyan-500/40 to-transparent" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(0, 212, 255, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary group"
            >
              <span>View My Work</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { href: PERSONAL_INFO.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
              { href: PERSONAL_INFO.github, icon: FaGithub, label: 'GitHub' },
              { href: `mailto:${PERSONAL_INFO.email}`, icon: FaEnvelope, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -4, scale: 1.15 }}
                className="social-icon-btn"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-600 hover:text-cyan-400 transition-colors group"
          >
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-600 group-hover:text-cyan-400 transition-colors">Explore</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-500/50 to-transparent" />
            <FaChevronDown className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
