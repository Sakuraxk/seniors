import { useMemo } from 'react';
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
      {/* Light rays */}
      <div className="pf-rays" />
    </div>
  );
}
