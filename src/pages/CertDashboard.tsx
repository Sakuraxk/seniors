import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, CreditCard, Shield, IdCard, HeartPulse,
  Banknote, Home, PiggyBank, Users, Trophy, MessageCircle,
  ArrowRight, FileCheck
} from 'lucide-react';
import { currentUser, type CertItem } from '../data/mockData';
import './CertDashboard.css';

const certIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'id-card': IdCard,
  'shield-check': ShieldCheck,
  'heart-pulse': HeartPulse,
  'banknote': Banknote,
  'home': Home,
  'piggy-bank': PiggyBank,
  'users': Users,
  'trophy': Trophy,
  'message-circle': MessageCircle,
};

const statusLabel: Record<string, string> = {
  verified: '✅ 已验证',
  pending: '⏳ 验证中',
  unverified: '未验证',
};

function CertItemRow({ item }: { item: CertItem }) {
  const Icon = certIconMap[item.icon] || ShieldCheck;
  return (
    <motion.div
      className="cert-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="cert-item-icon">
        <Icon />
      </div>
      <div className="cert-item-content">
        <div className="cert-item-label">{item.label}</div>
        <div className="cert-item-desc">{item.description}</div>
      </div>
      <span className={`cert-item-status ${item.status}`}>
        {statusLabel[item.status]}
      </span>
    </motion.div>
  );
}

export default function CertDashboard() {
  const navigate = useNavigate();
  const user = currentUser;

  const verifiedCount = [
    ...user.greenCard,
    ...user.goldCard,
    ...user.blueShield,
  ].filter(i => i.status === 'verified').length;

  const totalCount = user.greenCard.length + user.goldCard.length + user.blueShield.length;

  return (
    <div className="cert-dashboard page-container">
      {/* Header */}
      <motion.div
        className="cert-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>📋 认证看板</h1>
        <p>您的信任资产概览</p>
      </motion.div>

      {/* User Profile Card */}
      <motion.div
        className="user-profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="user-avatar">
          {user.name.charAt(0)}
        </div>
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-age">{user.age}岁 · 已认证 {verifiedCount}/{totalCount} 项</div>
          <span className={`cert-level ${user.certLevel}`}>
            <ShieldCheck size={14} />
            {user.certLevel === 'high' ? '信用优秀' : '信用良好'}
          </span>
        </div>
        <div className="cert-action-row inline">
          <button className="btn-primary" onClick={() => navigate('/trust-seal')}>
            <FileCheck size={18} /> 安心印认证
          </button>
          <button className="btn-outline" onClick={() => navigate('/family-guard')}>
            子女护航 <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>

      {/* Cert Sections Grid */}
      <div className="cert-sections-wrapper">
        {/* Green Card Section */}
        <motion.section
          className="cert-section green"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/green-card')}
          style={{ cursor: 'pointer' }}
        >
          <div className="cert-section-header">
            <div className="cert-section-icon"><ShieldCheck /></div>
            <div>
              <div className="cert-section-title">绿卡 · 身份与健康</div>
              <div className="cert-section-subtitle">核验身份真实性和健康状况</div>
            </div>
          </div>
          <div className="cert-items">
            {user.greenCard.map(item => (
              <CertItemRow key={item.id} item={item} />
            ))}
          </div>
        </motion.section>

        {/* Gold Card Section */}
        <motion.section
          className="cert-section gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/gold-card')}
          style={{ cursor: 'pointer' }}
        >
          <div className="cert-section-header">
            <div className="cert-section-icon"><CreditCard /></div>
            <div>
              <div className="cert-section-title">金卡 · 经济底盘</div>
              <div className="cert-section-subtitle">仅显示安全认证标签，不公开具体金额</div>
            </div>
          </div>
          <div className="cert-items">
            {user.goldCard.map(item => (
              <CertItemRow key={item.id} item={item} />
            ))}
          </div>
        </motion.section>

        {/* Blue Shield Section */}
        <motion.section
          className="cert-section blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/blue-shield')}
          style={{ cursor: 'pointer' }}
        >
          <div className="cert-section-header">
            <div className="cert-section-icon"><Shield /></div>
            <div>
              <div className="cert-section-title">蓝盾 · 社交信用</div>
              <div className="cert-section-subtitle">社交行为与平台信用评估</div>
            </div>
          </div>
          <div className="cert-items">
            {user.blueShield.map(item => (
              <CertItemRow key={item.id} item={item} />
            ))}
          </div>
        </motion.section>
      </div>

    </div>
  );
}
