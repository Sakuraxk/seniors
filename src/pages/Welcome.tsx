import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldPlus, ArrowRight, Heart, Users, ShieldCheck, Sparkles } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import './Welcome.css';

const taglines = [
  '让每一次社交都安心可信',
  '权威数据 · 源头锁真',
  '子女安心 · 温暖守护',
];

const features = [
  { icon: ShieldCheck, title: '三重认证', desc: '身份·经济·社交全面核验', color: '#FF6B35' },
  { icon: Heart, title: '安心社交', desc: '实时风控，预警诈骗风险', color: '#FF8C42' },
  { icon: Users, title: '家人护航', desc: '子女一键绑定，全程守护', color: '#FFB347' },
];

export default function Welcome() {
  const navigate = useNavigate();
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoReady(true), 400);
    const t2 = setTimeout(() => setShowContent(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!showContent) return;
    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showContent]);

  return (
    <div className="welcome-page">
      <ThemeToggle />
      {/* Animated warm background */}
      <div className="welcome-bg">
        <div className="welcome-orb welcome-orb-1" />
        <div className="welcome-orb welcome-orb-2" />
        <div className="welcome-orb welcome-orb-3" />
        <div className="welcome-orb welcome-orb-4" />
        {/* Floating decorative circles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="welcome-dot"
            style={{
              left: `${8 + Math.random() * 84}%`,
              top: `${5 + Math.random() * 90}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Logo reveal */}
      <motion.div
        className="welcome-logo-area"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={logoReady ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      >
        <div className="welcome-logo">
          <div className="welcome-logo-ring" />
          <div className="welcome-logo-ring welcome-logo-ring-2" />
          <div className="welcome-logo-ring welcome-logo-ring-3" />
          <div className="welcome-logo-icon">
            <ShieldPlus />
          </div>
        </div>
        <motion.div
          className="welcome-brand"
          initial={{ opacity: 0, y: 20 }}
          animate={logoReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="welcome-title">银盾安鉴</h1>
          <div className="welcome-subtitle-line" />
          <p className="welcome-subtitle">银发社交安全守护平台</p>
        </motion.div>
      </motion.div>

      {/* Tagline carousel */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            className="welcome-tagline-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIdx}
                className="welcome-tagline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles size={16} className="tagline-sparkle" />
                {taglines[taglineIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature showcase cards */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="welcome-features"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="welcome-feature-card"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.15, type: 'spring', damping: 20 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <div className="wf-icon" style={{ background: `linear-gradient(135deg, ${feat.color}, ${feat.color}CC)` }}>
                  <feat.icon size={24} color="white" />
                </div>
                <div className="wf-text">
                  <div className="wf-title">{feat.title}</div>
                  <div className="wf-desc">{feat.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA button */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="welcome-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.button
              className="welcome-enter-btn"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>进入平台</span>
              <ArrowRight size={20} />
              <div className="btn-shine" />
            </motion.button>
            <p className="welcome-version">v1.0 · 银发安心守护</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
