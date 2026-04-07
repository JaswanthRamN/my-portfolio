'use client';

import { useEffect, useRef } from 'react';

export default function DataFlowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const STREAM_COUNT = 7;
    const DOTS_PER_STREAM = 18;
    const NODE_COUNT = 12;
    let streams = [];
    let nodes = [];

    class DataStream {
      constructor(index, w, h) {
        this.index = index;
        this.color = index % 3 === 0 ? [0, 212, 255] : index % 3 === 1 ? [123, 97, 255] : [0, 255, 136];
        const yBase = (h / (STREAM_COUNT + 1)) * (index + 1);
        const variation = h * 0.2;
        this.points = {
          start: { x: -100, y: yBase + (Math.random() - 0.5) * variation },
          cp1: { x: w * 0.2 + Math.random() * w * 0.1, y: yBase + (Math.random() - 0.5) * variation * 2 },
          cp2: { x: w * 0.6 + Math.random() * w * 0.2, y: yBase + (Math.random() - 0.5) * variation * 2 },
          end: { x: w + 100, y: yBase + (Math.random() - 0.5) * variation },
        };
        this.dots = Array.from({ length: DOTS_PER_STREAM }, () => ({
          t: Math.random(),
          speed: 0.0002 + Math.random() * 0.0006,
          size: 0.8 + Math.random() * 1.8,
          alpha: 0.2 + Math.random() * 0.5,
          trail: [],
        }));
      }

      getPoint(t) {
        const { start, cp1, cp2, end } = this.points;
        const mt = 1 - t, mt2 = mt * mt, mt3 = mt2 * mt;
        const t2 = t * t, t3 = t2 * t;
        return {
          x: mt3 * start.x + 3 * mt2 * t * cp1.x + 3 * mt * t2 * cp2.x + t3 * end.x,
          y: mt3 * start.y + 3 * mt2 * t * cp1.y + 3 * mt * t2 * cp2.y + t3 * end.y,
        };
      }

      draw(ctx, mouse) {
        // Draw stream path
        ctx.beginPath();
        ctx.moveTo(this.points.start.x, this.points.start.y);
        ctx.bezierCurveTo(
          this.points.cp1.x, this.points.cp1.y,
          this.points.cp2.x, this.points.cp2.y,
          this.points.end.x, this.points.end.y
        );
        ctx.strokeStyle = `rgba(${this.color.join(',')}, 0.04)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw flowing dots with trails
        this.dots.forEach(dot => {
          dot.t += dot.speed;
          if (dot.t > 1) dot.t = 0;

          const pos = this.getPoint(dot.t);

          // Store trail positions
          dot.trail.push({ x: pos.x, y: pos.y });
          if (dot.trail.length > 8) dot.trail.shift();

          // Mouse proximity
          const dx = mouse.x - pos.x;
          const dy = mouse.y - pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseFactor = dist < 250 ? (250 - dist) / 250 : 0;

          // Draw trail
          if (dot.trail.length > 1) {
            for (let i = 1; i < dot.trail.length; i++) {
              const trailAlpha = (i / dot.trail.length) * dot.alpha * 0.3;
              ctx.beginPath();
              ctx.arc(dot.trail[i].x, dot.trail[i].y, dot.size * 0.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${this.color.join(',')}, ${trailAlpha})`;
              ctx.fill();
            }
          }

          const alpha = dot.alpha + mouseFactor * 0.5;
          const size = dot.size + mouseFactor * 3;

          // Glow
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, size * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color.join(',')}, ${alpha * 0.08})`;
          ctx.fill();

          // Dot
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color.join(',')}, ${alpha})`;
          ctx.fill();
        });
      }
    }

    class FloatingNode {
      constructor(w, h) {
        this.baseX = Math.random() * w;
        this.baseY = Math.random() * h;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = 2 + Math.random() * 4;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = 0.002 + Math.random() * 0.004;
        this.amplitude = 25 + Math.random() * 40;
        this.color = [
          [0, 212, 255],
          [123, 97, 255],
          [0, 255, 136],
          [255, 107, 157],
        ][Math.floor(Math.random() * 4)];
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.ringSize = 0;
        this.ringAlpha = 0;
      }

      update(time) {
        this.x = this.baseX + Math.sin(time * this.speed + this.phase) * this.amplitude;
        this.y = this.baseY + Math.cos(time * this.speed * 0.7 + this.phase) * this.amplitude * 0.6;
      }

      draw(ctx, time, mouse) {
        const pulse = 0.5 + Math.sin(time * 0.002 + this.pulsePhase) * 0.5;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseFactor = dist < 300 ? (300 - dist) / 300 : 0;

        // Expanding ring effect on mouse proximity
        if (mouseFactor > 0.5 && this.ringSize === 0) {
          this.ringSize = this.size;
          this.ringAlpha = 0.4;
        }
        if (this.ringSize > 0) {
          this.ringSize += 1.5;
          this.ringAlpha *= 0.96;
          if (this.ringAlpha < 0.01) {
            this.ringSize = 0;
            this.ringAlpha = 0;
          }
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.ringSize, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${this.color.join(',')}, ${this.ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        const glowSize = this.size * (8 + pulse * 5 + mouseFactor * 8);
        const alpha = 0.06 + pulse * 0.06 + mouseFactor * 0.15;

        // Outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
        gradient.addColorStop(0, `rgba(${this.color.join(',')}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${this.color.join(',')}, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${this.color.join(',')}, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (1 + mouseFactor * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.join(',')}, ${0.5 + pulse * 0.5})`;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + pulse * 0.4 + mouseFactor * 0.3})`;
        ctx.fill();
      }
    }

    const init = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      streams = Array.from({ length: STREAM_COUNT }, (_, i) => new DataStream(i, w, h));
      nodes = Array.from({ length: NODE_COUNT }, () => new FloatingNode(w, h));
    };

    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      streams.forEach(s => s.draw(ctx, mouse));
      nodes.forEach(n => {
        n.update(elapsed);
        n.draw(ctx, elapsed, mouse);
      });

      // Node connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const alpha = (1 - dist / 220) * 0.06;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    resize();
    init();
    animationId = requestAnimationFrame(animate);

    const handleResize = () => { resize(); init(); };
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}
