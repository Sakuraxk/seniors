import { useMemo } from 'react';
import { Shield, ShieldCheck, Leaf, Heart, Sun, Sparkles } from 'lucide-react';
import './ParticleField.css';

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

export default function ParticleField({ count = 30, className = '' }: ParticleFieldProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${5 + Math.random() * 6}s`,
        size: `${3 + Math.random() * 5}px`,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count]
  );

  const blobs = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        size: `${100 + Math.random() * 200}px`,
        delay: `${Math.random() * 4}s`,
        duration: `${8 + Math.random() * 6}s`,
      })),
    []
  );

  const themeIcons = useMemo(() => {
    const icons = [Shield, ShieldCheck, Leaf, Heart, Sun, Sparkles];
    return Array.from({ length: 12 }, (_, i) => {
      const Icon = icons[i % icons.length];
      const size = 30 + Math.random() * 40; // 30px to 70px
      return {
        id: `icon-${i}`,
        Icon,
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${20 + Math.random() * 15}s`,
        size,
        opacity: 0.04 + Math.random() * 0.08,
      };
    });
  }, []);

  return (
    <div className={`particle-field ${className}`}>
      {/* Warm gradient blobs */}
      {blobs.map((b) => (
        <div
          key={`blob-${b.id}`}
          className="pf-blob"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}
      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={`p-${p.id}`}
          className="pf-particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}
      {/* Theme Icons */}
      {themeIcons.map((t) => (
        <div
          key={t.id}
          className="pf-theme-icon"
          style={{
            left: t.left,
            top: t.top,
            animationDelay: t.delay,
            animationDuration: t.duration,
            opacity: t.opacity,
          }}
        >
          <t.Icon size={t.size} strokeWidth={1} color="rgba(255, 107, 53, 0.8)" />
        </div>
      ))}
      {/* Light rays */}
      <div className="pf-rays" />
    </div>
  );
}
