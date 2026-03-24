import { useRef, type ReactNode, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import './GlowCard.css';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  delay?: number;
  glowColor?: string;
}

export default function GlowCard({
  children,
  className = '',
  style,
  onClick,
  delay = 0,
  glowColor,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glow-card ${className}`}
      style={{ ...style, '--glow-color': glowColor || 'rgba(255, 107, 53, 0.25)' } as CSSProperties}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      <div className="glow-card-highlight" />
      <div className="glow-card-content">{children}</div>
    </motion.div>
  );
}
