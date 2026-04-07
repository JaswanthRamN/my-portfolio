'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EXPERIENCE, EDUCATION } from '@/utils/constants';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { AnimatedSection, AnimatedItem } from './AnimatedSection';

function TimelineItem({ exp, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-12 md:pl-16 pb-14 last:pb-0 group"
    >
      {/* Timeline Line */}
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: '100%' } : { height: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="absolute left-[18px] md:left-[22px] top-12 w-[1px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.4), rgba(123, 97, 255, 0.15), transparent)',
          }}
        />
      )}

      {/* Timeline Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.15 }}
        className="absolute left-0 top-0 flex items-center justify-center"
      >
        <div className="relative">
          {/* Pulse ring */}
          {index === 0 && (
            <motion.div
              className="absolute inset-[-6px] rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}
            />
          )}
          <div className="w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-dark-900 border border-cyan-500/30" />
            <div className="absolute inset-0 rounded-full" style={{
              boxShadow: index === 0 ? '0 0 20px rgba(0, 212, 255, 0.25)' : '0 0 10px rgba(0, 212, 255, 0.1)',
            }} />
            <FaBriefcase className="w-3.5 h-3.5 text-cyan-400 relative z-10" />
          </div>
        </div>
      </motion.div>

      {/* Content Card */}
      <div className="experience-card">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
          <div>
            <h4 className="text-xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors duration-300">
              {exp.role}
            </h4>
            <p className="text-cyan-400/70 font-semibold text-sm tracking-wide">
              {exp.organization}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1.5">
            <span
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                color: index === 0 ? 'rgba(0, 255, 136, 0.9)' : 'rgba(156, 163, 175, 0.7)',
                background: index === 0 ? 'rgba(0, 255, 136, 0.08)' : 'rgba(156, 163, 175, 0.05)',
                borderColor: index === 0 ? 'rgba(0, 255, 136, 0.2)' : 'rgba(156, 163, 175, 0.1)',
              }}
            >
              {index === 0 && (
                <span className="relative flex h-1.5 w-1.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
              )}
              {exp.period}
            </span>
            <span className="text-xs text-gray-600 font-medium">{exp.location}</span>
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="space-y-3">
          {exp.responsibilities.map((resp, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-3 group/resp"
            >
              <span className="mt-2 flex-shrink-0">
                <span className="block w-1.5 h-1.5 rounded-full bg-cyan-400/30 group-hover/resp:bg-cyan-400/60 transition-colors" />
              </span>
              <span className="text-gray-400 text-sm leading-relaxed group-hover/resp:text-gray-300 transition-colors">{resp}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function EducationCard({ edu, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="education-card group">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-glow-sm"
            style={{
              background: 'rgba(123, 97, 255, 0.08)',
              border: '1px solid rgba(123, 97, 255, 0.15)',
            }}
          >
            <FaGraduationCap className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors duration-300">
              {edu.degree}
            </h4>
            <p className="text-gray-400 text-sm mb-1">{edu.institution}</p>
            <p className="text-gray-600 text-xs font-medium">{edu.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute bottom-[30%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-purple-500/[0.02] blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <AnimatedItem>
            <span className="section-label">Journey</span>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="section-title">
              Experience & <span className="gradient-text">Education</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="section-subtitle mx-auto">
              Building analytics systems and delivering data-driven insights across
              operational, sales, and strategic domains.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* Professional Experience */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-12"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.15)' }}
              >
                <FaBriefcase className="text-cyan-400 text-sm" />
              </div>
              <h3 className="text-xl font-bold text-white">Professional Experience</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
            </motion.div>

            <div>
              {EXPERIENCE.map((exp, index) => (
                <TimelineItem
                  key={index}
                  exp={exp}
                  index={index}
                  isLast={index === EXPERIENCE.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-12"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(123, 97, 255, 0.08)', border: '1px solid rgba(123, 97, 255, 0.15)' }}
              >
                <FaGraduationCap className="text-purple-400 text-sm" />
              </div>
              <h3 className="text-xl font-bold text-white">Education</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EDUCATION.map((edu, index) => (
                <EducationCard key={index} edu={edu} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
