'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const CATEGORIES = [
  { name: 'Data Analysis', shortName: 'Analysis', value: 92 },
  { name: 'Data Engineering', shortName: 'Engineering', value: 85 },
  { name: 'Databases', shortName: 'Databases', value: 88 },
  { name: 'Statistics', shortName: 'Statistics', value: 80 },
  { name: 'Machine Learning', shortName: 'ML', value: 78 },
];

const COLORS = {
  primary: '#00d4ff',
  secondary: '#7b61ff',
  accent: '#00ff88',
  grid: 'rgba(255, 255, 255, 0.06)',
  gridHighlight: 'rgba(0, 212, 255, 0.12)',
  text: 'rgba(255, 255, 255, 0.6)',
  textActive: 'rgba(255, 255, 255, 0.9)',
};

export default function RadarChart({ size = 380 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [animProgress, setAnimProgress] = useState(0);

  const center = size / 2;
  const maxRadius = size * 0.38;
  const levels = 4;
  const angleStep = (Math.PI * 2) / CATEGORIES.length;
  const startAngle = -Math.PI / 2;

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const duration = 1500;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setAnimProgress(eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView]);

  const getPoint = (index, value) => {
    const angle = startAngle + index * angleStep;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  };

  const gridLevels = Array.from({ length: levels }, (_, i) => {
    const levelRadius = maxRadius * ((i + 1) / levels);
    const points = CATEGORIES.map((_, idx) => {
      const angle = startAngle + idx * angleStep;
      return `${center + Math.cos(angle) * levelRadius},${center + Math.sin(angle) * levelRadius}`;
    }).join(' ');
    return points;
  });

  const dataPoints = CATEGORIES.map((cat, idx) =>
    getPoint(idx, cat.value * animProgress)
  );
  const dataPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  const axisLines = CATEGORIES.map((_, idx) => {
    const angle = startAngle + idx * angleStep;
    return {
      x2: center + Math.cos(angle) * maxRadius,
      y2: center + Math.sin(angle) * maxRadius,
    };
  });

  const labelPositions = CATEGORIES.map((cat, idx) => {
    const angle = startAngle + idx * angleStep;
    const labelRadius = maxRadius + 32;
    return {
      x: center + Math.cos(angle) * labelRadius,
      y: center + Math.sin(angle) * labelRadius,
      name: cat.shortName,
      value: cat.value,
    };
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-2xl"
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.15" />
            <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.25" />
            <stop offset="50%" stopColor={COLORS.secondary} stopOpacity="0.15" />
            <stop offset="100%" stopColor={COLORS.accent} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.primary} />
            <stop offset="50%" stopColor={COLORS.secondary} />
            <stop offset="100%" stopColor={COLORS.accent} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx={center} cy={center} r={maxRadius * 1.2} fill="url(#radarGlow)" />

        {/* Grid levels */}
        {gridLevels.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke={i === levels - 1 ? COLORS.gridHighlight : COLORS.grid}
            strokeWidth={i === levels - 1 ? 1 : 0.5}
            strokeDasharray={i < levels - 1 ? '4 4' : 'none'}
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={line.x2}
            y2={line.y2}
            stroke={hoveredIndex === i ? 'rgba(0, 212, 255, 0.4)' : COLORS.grid}
            strokeWidth={hoveredIndex === i ? 1.5 : 0.5}
            className="transition-all duration-300"
          />
        ))}

        {/* Data polygon fill */}
        {animProgress > 0 && (
          <>
            <polygon
              points={dataPath}
              fill="url(#radarFill)"
              stroke="url(#radarStroke)"
              strokeWidth="2"
              filter="url(#softGlow)"
              className="transition-all duration-300"
            />
            <polygon
              points={dataPath}
              fill="none"
              stroke="url(#radarStroke)"
              strokeWidth="2"
              filter="url(#glow)"
            />
          </>
        )}

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <g
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(-1)}
            className="cursor-pointer"
          >
            {/* Hit area */}
            <circle cx={point.x} cy={point.y} r={15} fill="transparent" />
            {/* Outer glow */}
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === i ? 12 : 8}
              fill={`rgba(0, 212, 255, ${hoveredIndex === i ? 0.15 : 0.08})`}
              className="transition-all duration-300"
            />
            {/* Dot */}
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === i ? 5 : 3.5}
              fill={COLORS.primary}
              filter="url(#glow)"
              className="transition-all duration-300"
            />
            {/* Inner bright */}
            <circle
              cx={point.x}
              cy={point.y}
              r={1.5}
              fill="white"
              opacity={hoveredIndex === i ? 1 : 0.6}
              className="transition-all duration-300"
            />
          </g>
        ))}

        {/* Labels */}
        {labelPositions.map((label, i) => (
          <g key={i}>
            <text
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={hoveredIndex === i ? COLORS.textActive : COLORS.text}
              fontSize="12"
              fontWeight={hoveredIndex === i ? '600' : '500'}
              className="transition-all duration-300 font-sans select-none"
            >
              {label.name}
            </text>
            {hoveredIndex === i && (
              <text
                x={label.x}
                y={label.y + 16}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={COLORS.primary}
                fontSize="11"
                fontWeight="700"
                className="font-mono"
              >
                {label.value}%
              </text>
            )}
          </g>
        ))}

        {/* Center dot */}
        <circle cx={center} cy={center} r={3} fill="rgba(255, 255, 255, 0.2)" />
      </svg>
    </motion.div>
  );
}
