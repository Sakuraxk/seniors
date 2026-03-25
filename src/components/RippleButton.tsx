import { useState, useRef } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';

interface Ripple {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
}

interface RippleButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'danger' | 'outline' | 'ghost';
}

export default function RippleButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const radius = Math.max(rect.width, rect.height);
      const newRipple = {
        x: e.clientX - rect.left - radius / 2,
        y: e.clientY - rect.top - radius / 2,
        width: radius,
        height: radius,
        id: Date.now(),
      };
      
      setRipples((prev) => [...prev, newRipple]);
    }
    if (onClick) onClick(e);
  };

  const handleAnimationEnd = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  const baseClass = variant === 'primary' ? 'btn-primary' 
                  : variant === 'danger' ? 'btn-danger' 
                  : variant === 'outline' ? 'btn-outline' 
                  : 'btn-ghost';

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseClass} relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      {...props}
      style={{ ...props.style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => handleAnimationEnd(r.id)}
            style={{
              position: 'absolute',
              top: r.y,
              left: r.x,
              width: r.width,
              height: r.height,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.4)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
