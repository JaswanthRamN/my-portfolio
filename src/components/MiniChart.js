'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated Bar Chart - for Baltimore Crime Analysis
export function BarChart({ width = 280, height = 180, color = '#00d4ff' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [progress, setProgress] = useState(0);

  const bars = [
    { value: 0.85, label: 'Q1' },
    { value: 0.65, label: 'Q2' },
    { value: 0.92, label: 'Q3' },
    { value: 0.45, label: 'Q4' },
    { value: 0.78, label: 'Q5' },
    { value: 0.58, label: 'Q6' },
    { value: 0.88, label: 'Q7' },
  ];

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const duration = 1200;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView]);

  const barWidth = width / (bars.length * 2);
  const maxBarHeight = height * 0.75;
  const baseY = height - 20;

  return (
    <motion.div ref={ref} className="relative">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
          <filter id="barGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((level, i) => (
          <line
            key={i}
            x1={10}
            y1={baseY - maxBarHeight * level}
            x2={width - 10}
            y2={baseY - maxBarHeight * level}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
        ))}

        {/* Bars */}
        {bars.map((bar, i) => {
          const barHeight = maxBarHeight * bar.value * progress;
          const x = (width / (bars.length + 1)) * (i + 1) - barWidth / 2;
          return (
            <g key={i}>
              <rect
                x={x}
                y={baseY - barHeight}
                width={barWidth}
                height={barHeight}
                rx={barWidth / 2}
                fill="url(#barGrad)"
                filter="url(#barGlow)"
              />
              {/* Top glow dot */}
              {progress > 0.5 && (
                <circle
                  cx={x + barWidth / 2}
                  cy={baseY - barHeight}
                  r={2}
                  fill="white"
                  opacity={0.6}
                />
              )}
            </g>
          );
        })}

        {/* Base line */}
        <line x1={10} y1={baseY} x2={width - 10} y2={baseY} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

// Animated Line Chart - for F1 Lap Prediction
export function LineChart({ width = 280, height = 180, color = '#7b61ff' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [progress, setProgress] = useState(0);

  const points = [0.3, 0.7, 0.45, 0.85, 0.55, 0.9, 0.6, 0.75, 0.95, 0.7, 0.82];
  const predPoints = [0.35, 0.68, 0.5, 0.82, 0.58, 0.87, 0.62, 0.78, 0.92, 0.72, 0.8];

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const duration = 1800;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView]);

  const padding = { top: 15, bottom: 25, left: 15, right: 15 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getCoords = (pts) =>
    pts.map((v, i) => ({
      x: padding.left + (i / (pts.length - 1)) * chartWidth,
      y: padding.top + (1 - v) * chartHeight,
    }));

  const toPath = (coords, prog) => {
    const visibleCount = Math.ceil(coords.length * prog);
    const visible = coords.slice(0, visibleCount);
    if (visible.length < 2) return '';
    return visible.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  };

  const toArea = (coords, prog) => {
    const path = toPath(coords, prog);
    if (!path) return '';
    const visibleCount = Math.ceil(coords.length * prog);
    const lastX = coords[visibleCount - 1]?.x || 0;
    const firstX = coords[0]?.x || 0;
    return `${path} L ${lastX} ${padding.top + chartHeight} L ${firstX} ${padding.top + chartHeight} Z`;
  };

  const actualCoords = getCoords(points);
  const predCoords = getCoords(predPoints);

  return (
    <motion.div ref={ref} className="relative">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="predAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid */}
        {[0.25, 0.5, 0.75].map((level, i) => (
          <line
            key={i}
            x1={padding.left}
            y1={padding.top + chartHeight * (1 - level)}
            x2={width - padding.right}
            y2={padding.top + chartHeight * (1 - level)}
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="3 3"
          />
        ))}

        {/* Actual data area */}
        <path d={toArea(actualCoords, progress)} fill="url(#lineAreaGrad)" />
        {/* Actual data line */}
        <path d={toPath(actualCoords, progress)} fill="none" stroke={color} strokeWidth="2" filter="url(#lineGlow)" strokeLinecap="round" />

        {/* Prediction area */}
        <path d={toArea(predCoords, progress)} fill="url(#predAreaGrad)" />
        {/* Prediction line */}
        <path d={toPath(predCoords, progress)} fill="none" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="5 3" strokeLinecap="round" opacity="0.7" />

        {/* Data points */}
        {actualCoords.slice(0, Math.ceil(actualCoords.length * progress)).map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={2.5} fill={color} filter="url(#lineGlow)" />
        ))}

        {/* Legend */}
        {progress > 0.8 && (
          <g opacity={Math.min((progress - 0.8) * 5, 1)}>
            <line x1={width - 90} y1={12} x2={width - 72} y2={12} stroke={color} strokeWidth="2" />
            <text x={width - 68} y={15} fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="sans-serif">Actual</text>
            <line x1={width - 90} y1={24} x2={width - 72} y2={24} stroke="#00ff88" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x={width - 68} y={27} fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="sans-serif">Predicted</text>
          </g>
        )}
      </svg>
    </motion.div>
  );
}

// Animated Scatter Plot - for Behavior Prediction
export function ScatterChart({ width = 280, height = 180, color = '#ff6b9d' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [progress, setProgress] = useState(0);

  const clusters = [
    // Engaged cluster
    ...Array.from({ length: 12 }, () => ({
      x: 0.2 + Math.random() * 0.25,
      y: 0.6 + Math.random() * 0.25,
      group: 0,
    })),
    // Disengaged cluster
    ...Array.from({ length: 10 }, () => ({
      x: 0.6 + Math.random() * 0.25,
      y: 0.15 + Math.random() * 0.3,
      group: 1,
    })),
    // Borderline
    ...Array.from({ length: 6 }, () => ({
      x: 0.35 + Math.random() * 0.3,
      y: 0.35 + Math.random() * 0.2,
      group: 2,
    })),
  ];

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const duration = 1500;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView]);

  const padding = { top: 15, bottom: 20, left: 15, right: 15 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const colors = [color, '#00d4ff', '#ffb347'];

  const visibleCount = Math.ceil(clusters.length * progress);

  return (
    <motion.div ref={ref} className="relative">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="scatterGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid */}
        {[0.25, 0.5, 0.75].map((level, i) => (
          <g key={i}>
            <line
              x1={padding.left + chartWidth * level}
              y1={padding.top}
              x2={padding.left + chartWidth * level}
              y2={padding.top + chartHeight}
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="3 3"
            />
            <line
              x1={padding.left}
              y1={padding.top + chartHeight * level}
              x2={padding.left + chartWidth}
              y2={padding.top + chartHeight * level}
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="3 3"
            />
          </g>
        ))}

        {/* Decision boundary (curved line) */}
        {progress > 0.6 && (
          <path
            d={`M ${padding.left} ${padding.top + chartHeight * 0.45} Q ${padding.left + chartWidth * 0.5} ${padding.top + chartHeight * 0.55} ${padding.left + chartWidth} ${padding.top + chartHeight * 0.35}`}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="6 4"
            opacity={Math.min((progress - 0.6) * 2.5, 1)}
          />
        )}

        {/* Data points */}
        {clusters.slice(0, visibleCount).map((point, i) => {
          const cx = padding.left + point.x * chartWidth;
          const cy = padding.top + (1 - point.y) * chartHeight;
          const c = colors[point.group];
          const delay = i / clusters.length;
          const pointProgress = Math.max(0, Math.min(1, (progress - delay * 0.5) * 2));

          return (
            <g key={i}>
              {/* Glow */}
              <circle cx={cx} cy={cy} r={8 * pointProgress} fill={c} opacity={0.08} filter="url(#scatterGlow)" />
              {/* Point */}
              <circle cx={cx} cy={cy} r={3.5 * pointProgress} fill={c} opacity={0.7 * pointProgress} />
              {/* Bright core */}
              <circle cx={cx} cy={cy} r={1.5 * pointProgress} fill="white" opacity={0.4 * pointProgress} />
            </g>
          );
        })}

        {/* Legend */}
        {progress > 0.8 && (
          <g opacity={Math.min((progress - 0.8) * 5, 1)}>
            <circle cx={width - 85} cy={12} r={3} fill={colors[0]} />
            <text x={width - 78} y={15} fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="sans-serif">Engaged</text>
            <circle cx={width - 85} cy={25} r={3} fill={colors[1]} />
            <text x={width - 78} y={28} fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="sans-serif">Off-task</text>
          </g>
        )}

        {/* Axes */}
        <line x1={padding.left} y1={padding.top + chartHeight} x2={padding.left + chartWidth} y2={padding.top + chartHeight} stroke="rgba(255,255,255,0.1)" />
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + chartHeight} stroke="rgba(255,255,255,0.1)" />
      </svg>
    </motion.div>
  );
}
