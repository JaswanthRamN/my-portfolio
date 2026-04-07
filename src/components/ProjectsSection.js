'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS } from '@/utils/constants';
import { FaGithub, FaChartLine, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { AnimatedSection, AnimatedItem } from './AnimatedSection';
import { BarChart, LineChart, ScatterChart } from './MiniChart';

const chartComponents = [BarChart, LineChart, ScatterChart];
const chartColors = ['#00d4ff', '#7b61ff', '#ff6b9d'];

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Chart = chartComponents[index % chartComponents.length];
  const accentColor = chartColors[index % chartColors.length];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <TiltCard className="perspective-[1000px]">
        <div className="project-card group" style={{ '--accent': accentColor }}>
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
            background: `linear-gradient(135deg, ${accentColor}15, transparent 50%, ${accentColor}10)`,
          }} />

          <div className="relative p-8 md:p-10">
            {/* Top row: Number + Title + GitHub */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: `${accentColor}99` }}>
                    Project {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, ${accentColor}40, transparent)` }} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.tagline}
                </p>
              </div>
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-dark-700/50 text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 flex-shrink-0"
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>
              )}
            </div>

            {/* Two-column layout: Visualization + Details */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
              {/* Visualization */}
              <div className="lg:col-span-2 flex items-center justify-center">
                <div className="relative w-full max-w-[300px] aspect-[280/180] rounded-xl overflow-hidden border border-dark-700/30" style={{ background: 'rgba(10, 15, 30, 0.6)' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Chart color={accentColor} />
                  </div>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Context & Approach */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-dark-800/30 border border-dark-700/20 hover:border-dark-700/40 transition-colors">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: `${accentColor}80` }}>
                    Context
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {project.context}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-dark-800/30 border border-dark-700/20 hover:border-dark-700/40 transition-colors">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-400/70 mb-3">
                    Approach
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {project.approach}
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Points */}
            <div className="mb-8">
              <h4 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/70 mb-4">
                <FaChartLine className="w-3.5 h-3.5" />
                Impact
              </h4>
              <ul className="space-y-3">
                {project.impact.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 group/item"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0 group-hover/item:bg-emerald-400 group-hover/item:shadow-[0_0_8px_rgba(0,255,136,0.4)] transition-all" />
                    <span className="text-gray-400 leading-relaxed text-sm group-hover/item:text-gray-300 transition-colors">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom: Metrics + Tech */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-6 border-t border-dark-700/20">
              {/* Metrics */}
              <div className="flex flex-wrap gap-10">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="group/metric">
                    <div className="text-xl font-bold gradient-text-static group-hover/metric:text-glow transition-all">{value}</div>
                    <div className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mt-1 font-medium">{key}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    className="tag"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <AnimatedItem>
            <span className="section-label">Portfolio</span>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="section-subtitle mx-auto">
              Analytics projects delivering measurable business impact through data pipelines,
              modeling, and interactive visualization.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        {/* Projects */}
        <div className="space-y-10 max-w-6xl mx-auto">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
