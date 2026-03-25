import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, ShieldPlus, Shield, CreditCard,
  ScanEye, Accessibility, HeartHandshake, BellRing, ArrowRight,
  FileBadge, MessageSquareWarning, AlertTriangle, Users,
  PhoneCall, UserMinus, SearchCheck, X, ShieldAlert,
  Megaphone, Info, RefreshCw, Lock
} from 'lucide-react';
import { productHighlights, currentUser, systemAnnouncements, familyGuardians } from '../data/mockData';
import AnimatedCounter from '../components/AnimatedCounter';
import RippleButton from '../components/RippleButton';
import MagneticButton from '../components/MagneticButton';
import TiltCard from '../components/TiltCard';
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
  const [showCertGuide, setShowCertGuide] = useState(false);

  // Calculate cert stats
  const allCerts = [...currentUser.greenCard, ...currentUser.goldCard, ...currentUser.blueShield];
  const verifiedCount = allCerts.filter(c => c.status === 'verified').length;
  const totalCount = allCerts.length;
  const certPercent = Math.round((verifiedCount / totalCount) * 100);
  const hasUnverified = verifiedCount < totalCount;

  // Risk level
  const riskLevel: 'safe' | 'warn' | 'danger' = certPercent >= 80 ? 'safe' : certPercent >= 50 ? 'warn' : 'danger';
  const riskLabelMap = { safe: '安全', warn: '提醒', danger: '警惕' };
  const riskColorMap = { safe: '#4CAF50', warn: '#FF9800', danger: '#F44336' };

  // Family guard status
  const hasGuardian = familyGuardians.some(g => g.isLinked);

  // Simulate high risk (for demo)
  const isHighRisk = false;
  const todayInterceptions = 2;

  // Auto-trigger cert guide for users with unverified items (first load)
  useEffect(() => {
    if (hasUnverified) {
      const timer = setTimeout(() => setShowCertGuide(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const announcementIcon = (type: string) => {
    if (type === 'warning') return <AlertTriangle size={16} color="#FF4757" />;
    if (type === 'update') return <RefreshCw size={16} color="#2196F3" />;
    return <Info size={16} color="#FF9800" />;
  };

  return (
    <div className="landing-page">
      {/* High Risk Warning Banner */}
      {isHighRisk && (
        <motion.div
          className="high-risk-banner"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShieldAlert size={20} />
          <span>您的账号存在高风险行为，请立即前往安全中心处理</span>
          <button onClick={() => navigate('/safety-center')}>去处理 →</button>
        </motion.div>
      )}

      {/* Child Guardian Badge */}
      {hasGuardian && (
        <motion.div
          className="guardian-active-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/family-guard')}
        >
          <Users size={14} />
          <span>子女护航中</span>
        </motion.div>
      )}

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
        <h1 className="hero-title text-reveal">银盾安鉴</h1>
        <p className="hero-subtitle">银发社交安全守护</p>
        <p className="hero-desc">
          权威数据源验证 · 全流程风险预警 · 子女安心护航<br />
          让每一次社交都安心可信
        </p>
        <div style={{ display: 'inline-block' }}>
          <MagneticButton>
            <RippleButton
              className="btn-primary"
              onClick={() => navigate('/cert-dashboard')}
            >
              立即体验 <ArrowRight size={20} />
            </RippleButton>
          </MagneticButton>
        </div>
      </motion.section>

      {/* Safety Status Dashboard Cards */}
      <motion.section
        className="safety-dashboard"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="dashboard-title">🛡️ 安全状态总览</h2>
        <div className="dashboard-cards">
          <motion.div
            className="dashboard-card card-neu scroll-fade"
            onClick={() => navigate('/cert-dashboard')}
            whileHover={{ y: -6, boxShadow: '0 8px 28px rgba(76, 175, 80, 0.18)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <div className="dc-icon" style={{ background: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}>
              <ShieldCheck size={24} />
            </div>
            <div className="dc-value">{certPercent}%</div>
            <div className="dc-label">认证完成度</div>
            <div className="dc-progress">
              <div className="dc-progress-fill" style={{ width: `${certPercent}%`, background: '#4CAF50' }} />
            </div>
          </motion.div>

          <motion.div
            className="dashboard-card card-neu scroll-fade"
            whileHover={{ y: -6, boxShadow: `0 8px 28px ${riskColorMap[riskLevel]}28` }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <div className="dc-icon" style={{ background: `${riskColorMap[riskLevel]}18`, color: riskColorMap[riskLevel] }}>
              <ShieldAlert size={24} />
            </div>
            <div className="dc-value" style={{ color: riskColorMap[riskLevel] }}>{riskLabelMap[riskLevel]}</div>
            <div className="dc-label">当前风险等级</div>
            <div className="dc-status-dot" style={{ background: riskColorMap[riskLevel] }} />
          </motion.div>

          <motion.div
            className="dashboard-card card-neu scroll-fade"
            onClick={() => navigate('/risk-alert')}
            whileHover={{ y: -6, boxShadow: '0 8px 28px rgba(255, 107, 53, 0.18)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <div className="dc-icon" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
              <Lock size={24} />
            </div>
            <div className="dc-value">{todayInterceptions}</div>
            <div className="dc-label">今日风险拦截</div>
          </motion.div>
        </div>
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

      {/* System Announcements */}
      <motion.section
        className="announcements-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <div className="announcements-header">
          <Megaphone size={18} />
          <span>安全公告</span>
        </div>
        <div className="announcements-list">
          {systemAnnouncements.map((a) => (
            <div key={a.id} className={`announcement-item ${a.type}`}>
              {announcementIcon(a.type)}
              <div className="announcement-content">
                <span className="announcement-title">{a.title}</span>
                <span className="announcement-text">{a.content}</span>
              </div>
              <span className="announcement-time">{a.time}</span>
            </div>
          ))}
        </div>
      </motion.section>

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
                className="highlight-card card-neu scroll-fade"
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

      {/* Cert Type Preview Cards */}
      <motion.section
        className="cert-preview-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="cert-preview-title">三大认证体系</h2>
        <div className="cert-cards-row">
          <TiltCard
            className="cert-preview-card green-card glass-card-premium"
            onClick={() => navigate('/cert-dashboard')}
            style={{ padding: '24px 16px', borderRadius: '16px' }}
          >
            <div className="card-icon green-icon">
              <ShieldCheck />
            </div>
            <div className="card-label green-label">绿卡</div>
            <div className="card-sublabel">身份健康</div>
          </TiltCard>

          <TiltCard
            className="cert-preview-card gold-card glass-card-premium"
            onClick={() => navigate('/cert-dashboard')}
            style={{ padding: '24px 16px', borderRadius: '16px' }}
          >
            <div className="card-icon gold-icon">
              <CreditCard />
            </div>
            <div className="card-label gold-label">金卡</div>
            <div className="card-sublabel">经济底盘</div>
          </TiltCard>

          <TiltCard
            className="cert-preview-card blue-card glass-card-premium"
            onClick={() => navigate('/cert-dashboard')}
            style={{ padding: '24px 16px', borderRadius: '16px' }}
          >
            <div className="card-icon blue-icon">
              <Shield />
            </div>
            <div className="card-label blue-label">蓝盾</div>
            <div className="card-sublabel">社交信用</div>
          </TiltCard>
        </div>
      </motion.section>

      {/* Quick Access Buttons */}
      <section className="quick-access-section">
        <h2 className="section-title">快捷入口</h2>
        <div className="quick-access-grid">
          <motion.button
            className="quick-btn"
            onClick={() => navigate('/cert-dashboard')}
            whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(255, 107, 53, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <ShieldCheck size={28} />
            <span>去认证</span>
          </motion.button>
          <motion.button
            className="quick-btn"
            onClick={() => navigate('/trust-seal')}
            whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(33, 150, 243, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <FileBadge size={28} />
            <span>安心印</span>
          </motion.button>
          <motion.button
            className="quick-btn"
            onClick={() => navigate('/safety-center')}
            whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(255, 152, 0, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <ShieldAlert size={28} />
            <span>安全中心</span>
          </motion.button>
          <motion.button
            className="quick-btn"
            onClick={() => navigate('/family-guard')}
            whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(233, 30, 99, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Users size={28} />
            <span>子女护航</span>
          </motion.button>
        </div>
      </section>

      {/* Core Features Navigation */}
      <section className="core-features-section">
        <h2 className="section-title">核心功能体验</h2>
        <div className="features-grid">
          <motion.div className="feature-nav-card" onClick={() => navigate('/cert-dashboard')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(76, 175, 80, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <div className="fn-icon" style={{ color: '#4CAF50', backgroundImage: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
              <ShieldCheck size={28} />
            </div>
            <div className="fn-content"><h3>认证中心</h3><p>管理三大安全认证，全方位展示用户真实背景</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div className="feature-nav-card" onClick={() => navigate('/trust-seal')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(33, 150, 243, 0.15)' }}>
            <div className="fn-icon" style={{ color: '#2196F3', backgroundImage: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
              <FileBadge size={28} />
            </div>
            <div className="fn-content"><h3>安心凭证</h3><p>生成专属安心印，权威数据源核验，支持限时分享</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div className="feature-nav-card" onClick={() => navigate('/chat-risk')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(255, 152, 0, 0.15)' }}>
            <div className="fn-icon" style={{ color: '#FF9800', backgroundImage: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' }}>
              <MessageSquareWarning size={28} />
            </div>
            <div className="fn-content"><h3>聊天预警</h3><p>智能识别聊天敏感词与资金诱导，实时守护安全</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div className="feature-nav-card" onClick={() => navigate('/risk-alert')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(244, 67, 54, 0.15)' }}>
            <div className="fn-icon" style={{ color: '#F44336', backgroundImage: 'linear-gradient(135deg, #ffebee, #ffcdd2)' }}>
              <AlertTriangle size={28} />
            </div>
            <div className="fn-content"><h3>风险雷达</h3><p>全局监测异常访问被举报用户，预警潜在诈骗行为</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div className="feature-nav-card" onClick={() => navigate('/family-guard')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(233, 30, 99, 0.15)' }}>
            <div className="fn-icon" style={{ color: '#E91E63', backgroundImage: 'linear-gradient(135deg, #fce4ec, #f8bbd0)' }}>
              <Users size={28} />
            </div>
            <div className="fn-content"><h3>亲情守护</h3><p>支持子女账号绑定，风险情况实时通知家人协同护航</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div className="feature-nav-card" onClick={() => navigate('/verification-review')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(156, 39, 176, 0.15)' }}>
            <div className="fn-icon" style={{ color: '#9C27B0', backgroundImage: 'linear-gradient(135deg, #f3e5f5, #e1bee7)' }}>
              <SearchCheck size={28} />
            </div>
            <div className="fn-content"><h3>双层审核</h3><p>AI智能初审结合人工复核，保障资料真实性</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div className="feature-nav-card" onClick={() => navigate('/call-records')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0, 188, 212, 0.15)' }}>
            <div className="fn-icon" style={{ color: '#00BCD4', backgroundImage: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)' }}>
              <PhoneCall size={28} />
            </div>
            <div className="fn-content"><h3>通话留痕</h3><p>语音通话安全留痕与快捷风险求助机制</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div className="feature-nav-card" onClick={() => navigate('/risk-profile')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(121, 85, 72, 0.15)' }}>
            <div className="fn-icon" style={{ color: '#795548', backgroundImage: 'linear-gradient(135deg, #efebe9, #d7ccc8)' }}>
              <UserMinus size={28} />
            </div>
            <div className="fn-content"><h3>风险防护</h3><p>异常账号预警展示与隐私全局水印防截图机制</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>

          <motion.div className="feature-nav-card" onClick={() => navigate('/safety-center')}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(96, 125, 139, 0.15)' }}>
            <div className="fn-icon" style={{ color: '#607D8B', backgroundImage: 'linear-gradient(135deg, #eceff1, #cfd8dc)' }}>
              <ShieldPlus size={28} />
            </div>
            <div className="fn-content"><h3>安全中心</h3><p>汇总所有安全功能、常见问题和客服支持</p></div>
            <ArrowRight className="fn-arrow" size={20} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div
          className="cta-card glass-card-premium scroll-fade"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3>开启安心社交之旅</h3>
          <p>三步认证，全面守护您的每一次相遇</p>
          <div style={{ display: 'inline-block' }}>
            <MagneticButton>
              <RippleButton
                className="btn-primary"
                onClick={() => navigate('/cert-dashboard')}
              >
                查看我的认证 <ArrowRight size={20} />
              </RippleButton>
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* Uncertified User Guidance Modal */}
      <AnimatePresence>
        {hasUnverified && showCertGuide && (
          <motion.div
            className="cert-guide-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCertGuide(false)}
          >
            <motion.div
              className="cert-guide-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="guide-close" onClick={() => setShowCertGuide(false)}>
                <X size={20} />
              </button>
              <div className="guide-icon"><ShieldCheck size={48} /></div>
              <h3>完善认证，提升信任度</h3>
              <p>您还有 {totalCount - verifiedCount} 项认证未完成，完成认证可大幅提升社交安全等级。</p>
              <div className="guide-progress">
                <div className="guide-progress-bar">
                  <div className="guide-progress-fill" style={{ width: `${certPercent}%` }} />
                </div>
                <span>{certPercent}%</span>
              </div>
              <button className="btn-primary" onClick={() => { setShowCertGuide(false); navigate('/cert-dashboard'); }}>
                立即去认证 <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating cert guide trigger */}
      {hasUnverified && !showCertGuide && (
        <motion.button
          className="cert-guide-trigger"
          onClick={() => setShowCertGuide(true)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShieldCheck size={20} />
          <span>完善认证</span>
        </motion.button>
      )}
    </div>
  );
}
