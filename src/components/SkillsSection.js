'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { SKILLS } from '@/utils/constants';
import { AnimatedSection, AnimatedItem } from './AnimatedSection';
import RadarChart from './RadarChart';

const categoryConfig = {
  'Data Analysis & Reporting': {
    color: '#00d4ff',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-8 4 4 5-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  'Data Engineering': {
    color: '#7b61ff',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  'Databases & Platforms': {
    color: '#00ff88',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  'Statistical Methods': {
    color: '#ff6b9d',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 20V4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  'Machine Learning': {
    color: '#ffb347',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeLinecap="round" />
      </svg>
    ),
  },
};

function SkillPill({ skill, color, index, isInView }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 20px ${color}30`,
        borderColor: `${color}50`,
      }}
      className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm border transition-all duration-300 cursor-default"
      style={{
        color: `${color}cc`,
        background: `${color}08`,
        borderColor: `${color}20`,
      }}
    >
      {skill}
    </motion.span>
  );
}

function SkillCategory({ category, skills, config, delay, isActive, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onClick={onClick}
      className={`skill-category-card group cursor-pointer ${isActive ? 'active' : ''}`}
      style={{ '--cat-color': config.color }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeSkill"
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
          style={{ borderColor: `${config.color}40` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: `${config.color}10`,
            border: `1px solid ${config.color}20`,
            color: config.color,
          }}
        >
          {config.icon}
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{category}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <SkillPill key={skill} skill={skill} color={config.color} index={i} isInView={isInView} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-purple-500/[0.03] blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <AnimatedItem>
            <span className="section-label">Expertise</span>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="section-title">
              Technical <span className="gradient-text">Arsenal</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="section-subtitle mx-auto">
              A comprehensive toolkit spanning the full analytics pipeline — from data extraction
              and transformation to modeling, visualization, and insight delivery.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        {/* Two-column layout: Radar Chart + Skills Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Radar Chart */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-[-30px] rounded-full bg-gradient-to-br from-cyan-500/[0.03] to-purple-500/[0.03] blur-xl" />
              <RadarChart size={400} />
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-5 order-1 lg:order-2">
            {Object.entries(SKILLS).map(([category, skills], index) => (
              <SkillCategory
                key={category}
                category={category}
                skills={skills}
                config={categoryConfig[category]}
                delay={index * 0.08}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
