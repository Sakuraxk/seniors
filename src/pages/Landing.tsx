import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ShieldPlus, Shield, CreditCard,
  ScanEye, Accessibility, HeartHandshake, BellRing, ArrowRight,
  FileBadge, MessageSquareWarning, AlertTriangle, Users
} from 'lucide-react';
import { productHighlights } from '../data/mockData';
import AnimatedCounter from '../components/AnimatedCounter';
import GlowCard from '../components/GlowCard';
import './Landing.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield-check': ShieldCheck,
  'scan-eye': ScanEye,
  'accessibility': Accessibility,
  'heart-handshake': HeartHandshake,
  'bell-ring': BellRing,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-shield">
          <div className="shield-ring" />
          <div className="shield-ring-2" />
          <div className="shield-main">
            <ShieldPlus />
          </div>
        </div>
        <h1 className="hero-title">银盾安鉴</h1>
        <p className="hero-subtitle">银发社交安全守护</p>
        <p className="hero-desc">
          权威数据源验证 · 全流程风险预警 · 子女安心护航<br />
          让每一次社交都安心可信
        </p>
        <button className="btn-primary" onClick={() => navigate('/cert-dashboard')}>
          立即体验 <ArrowRight size={20} />
        </button>
      </motion.section>

      {/* Stats Bar with AnimatedCounter */}
      <motion.div
        className="stats-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="stat-item">
          <AnimatedCounter end={99.8} decimals={1} suffix="%" />
          <span className="stat-label">认证准确率</span>
        </div>
        <div className="stat-item">
          <AnimatedCounter end={50} suffix="万+" />
          <span className="stat-label">已认证用户</span>
        </div>
        <div className="stat-item">
          <AnimatedCounter end={0} suffix="" />
          <span className="stat-label">诈骗事件</span>
        </div>
      </motion.div>

      {/* Cert Type Preview Cards */}
      <motion.section
        className="cert-preview-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="cert-preview-title">三大认证体系</h2>
        <div className="cert-cards-row">
          <GlowCard
            className="cert-preview-card green-card"
            onClick={() => navigate('/cert-dashboard')}
            delay={0.5}
            glowColor="rgba(76, 175, 80, 0.2)"
          >
            <div className="card-icon green-icon">
              <ShieldCheck />
            </div>
            <div className="card-label green-label">绿卡</div>
            <div className="card-sublabel">身份健康</div>
          </GlowCard>

          <GlowCard
            className="cert-preview-card gold-card"
            onClick={() => navigate('/cert-dashboard')}
            delay={0.6}
            glowColor="rgba(245, 166, 35, 0.2)"
          >
            <div className="card-icon gold-icon">
              <CreditCard />
            </div>
            <div className="card-label gold-label">金卡</div>
            <div className="card-sublabel">经济底盘</div>
          </GlowCard>

          <GlowCard
            className="cert-preview-card blue-card"
            onClick={() => navigate('/cert-dashboard')}
            delay={0.7}
            glowColor="rgba(33, 150, 243, 0.2)"
          >
            <div className="card-icon blue-icon">
              <Shield />
            </div>
            <div className="card-label blue-label">蓝盾</div>
            <div className="card-sublabel">社交信用</div>
          </GlowCard>
        </div>
      </motion.section>

      {/* Core Features Navigation */}
      <section className="core-features-section">
        <h2 className="section-title">核心功能体验</h2>
        <div className="features-grid">
          <motion.div 
            className="feature-nav-card" 
            onClick={() => navigate('/cert-dashboard')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(76, 175, 80, 0.15)' }}
          >
            <div className="fn-icon" style={{ color: '#4CAF50', backgroundImage: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
              <ShieldCheck size={28} />
            </div>
            <div className="fn-content">
              <h3>认证中心</h3>
              <p>管理三大安全认证，全方位展示用户真实背景</p>
            </div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div 
            className="feature-nav-card" 
            onClick={() => navigate('/trust-seal')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(33, 150, 243, 0.15)' }}
          >
            <div className="fn-icon" style={{ color: '#2196F3', backgroundImage: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
              <FileBadge size={28} />
            </div>
            <div className="fn-content">
              <h3>安心凭证</h3>
              <p>生成专属安心印，权威数据源核验，支持限时分享</p>
            </div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div 
            className="feature-nav-card" 
            onClick={() => navigate('/chat-risk')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(255, 152, 0, 0.15)' }}
          >
            <div className="fn-icon" style={{ color: '#FF9800', backgroundImage: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' }}>
              <MessageSquareWarning size={28} />
            </div>
            <div className="fn-content">
              <h3>聊天预警</h3>
              <p>智能识别聊天敏感词与资金诱导，实时守护安全</p>
            </div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div 
            className="feature-nav-card" 
            onClick={() => navigate('/risk-alert')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(244, 67, 54, 0.15)' }}
          >
            <div className="fn-icon" style={{ color: '#F44336', backgroundImage: 'linear-gradient(135deg, #ffebee, #ffcdd2)' }}>
              <AlertTriangle size={28} />
            </div>
            <div className="fn-content">
              <h3>风险雷达</h3>
              <p>全局监测异常访问被举报用户，预警潜在诈骗行为</p>
            </div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div 
            className="feature-nav-card" 
            onClick={() => navigate('/family-guard')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(233, 30, 99, 0.15)' }}
          >
            <div className="fn-icon" style={{ color: '#E91E63', backgroundImage: 'linear-gradient(135deg, #fce4ec, #f8bbd0)' }}>
              <Users size={28} />
            </div>
            <div className="fn-content">
              <h3>亲情守护</h3>
              <p>支持子女账号绑定，风险情况实时通知家人协同护航</p>
            </div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="highlights-section">
        <h2 className="highlights-title">五大安全亮点</h2>
        <motion.div
          className="highlight-cards"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {productHighlights.map((hl) => {
            const Icon = iconMap[hl.icon] || ShieldCheck;
            return (
              <motion.div
                className="highlight-card"
                key={hl.id}
                variants={item}
              >
                <div className="hl-icon" style={{ background: `linear-gradient(135deg, ${hl.color}, ${hl.color}CC)` }}>
                  <Icon />
                </div>
                <div className="hl-content">
                  <div className="hl-title">{hl.title}</div>
                  <div className="hl-desc">{hl.description}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3>开启安心社交之旅</h3>
          <p>三步认证，全面守护您的每一次相遇</p>
          <button className="btn-primary" onClick={() => navigate('/cert-dashboard')}>
            查看我的认证 <ArrowRight size={20} />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
