'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PERSONAL_INFO } from '@/utils/constants';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { AnimatedSection, AnimatedItem } from './AnimatedSection';

const contactItems = [
  {
    icon: FaEnvelope,
    label: 'Email',
    color: '#00d4ff',
    isLink: true,
    getHref: (info) => `mailto:${info.email}`,
    getValue: (info) => info.email,
  },
  {
    icon: FaPhone,
    label: 'Phone',
    color: '#7b61ff',
    isLink: true,
    getHref: (info) => `tel:${info.phone}`,
    getValue: (info) => info.phone,
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    color: '#00ff88',
    isLink: false,
    getValue: (info) => info.location,
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    color: '#ff6b9d',
    isLink: true,
    getHref: (info) => info.linkedin,
    getValue: () => 'linkedin.com/in/jaswanth-ram-nagabhyrava-0740151b3',
    external: true,
  },
];

function ContactCard({ item, index }) {
  const { icon: Icon, label, color, isLink, getHref, getValue, external } = item;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="contact-card group"
    >
      <div className="flex items-center gap-5">
        <div
          className="w-13 h-13 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110"
          style={{
            width: '52px',
            height: '52px',
            background: `${color}0a`,
            border: `1px solid ${color}18`,
            boxShadow: `0 0 0 0 ${color}00`,
          }}
        >
          <Icon className="w-5 h-5 transition-all duration-300" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-1">{label}</div>
          <div className="text-white font-medium text-sm truncate group-hover:text-cyan-300 transition-colors duration-300">
            {getValue(PERSONAL_INFO)}
          </div>
        </div>
        {isLink && (
          <FaArrowRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-cyan-400 group-hover:translate-x-1.5 transition-all duration-300 flex-shrink-0" />
        )}
      </div>

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${color}06, transparent 60%)` }}
      />
    </motion.div>
  );

  return isLink ? (
    <a
      href={getHref(PERSONAL_INFO)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[150px]"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.04] blur-[130px]"
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.95, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[50%] left-[50%] w-[400px] h-[400px] rounded-full bg-pink-500/[0.02] blur-[120px]"
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <span className="section-label">Connect</span>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="section-title">
                Let's Build Something <span className="gradient-text">Together</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="section-subtitle mx-auto">
                Interested in collaborating on data analytics projects or discussing opportunities?
                I'd be happy to hear from you.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {contactItems.map((item, index) => (
              <ContactCard key={item.label} item={item} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(0, 212, 255, 0.35)' }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg px-10 py-4 group"
            >
              <FaEnvelope className="w-5 h-5" />
              <span>Send me an email</span>
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-12"
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
      </div>
    </section>
  );
}
