import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ShieldAlert, FileBadge, PhoneCall, Users,
  AlertTriangle, Eye, MessageSquareWarning, ChevronDown,
  ChevronUp, Headphones, ArrowLeft, HelpCircle, Lock,
  CreditCard, Shield, Search
} from 'lucide-react';
import { faqItems } from '../data/mockData';
import './SafetyCenter.css';

const featureEntries = [
  { label: '认证中心', desc: '管理三大安全认证', icon: ShieldCheck, color: '#4CAF50', path: '/cert-dashboard' },
  { label: '安心凭证', desc: '权威身份核验凭证', icon: FileBadge, color: '#2196F3', path: '/trust-seal' },
  { label: '聊天预警', desc: '敏感词与资金诱导防护', icon: MessageSquareWarning, color: '#FF9800', path: '/chat-risk' },
  { label: '风险雷达', desc: '异常访问与风险账号', icon: AlertTriangle, color: '#F44336', path: '/risk-alert' },
  { label: '通话留痕', desc: '安心留痕与存证', icon: PhoneCall, color: '#00BCD4', path: '/call-records' },
  { label: '子女护航', desc: '家人绑定与风险同步', icon: Users, color: '#E91E63', path: '/family-guard' },
  { label: '双层审核', desc: 'AI初审+人工复核', icon: Search, color: '#9C27B0', path: '/verification-review' },
  { label: '隐私保护', desc: '截图防护与访问监测', icon: Eye, color: '#795548', path: '/risk-alert' },
];

export default function SafetyCenter() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="safety-center-page page-container">
      {/* Header */}
      <motion.button
        className="back-button"
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginBottom: '16px', fontSize: 'var(--font-base)', fontWeight: 600 }}
      >
        <ArrowLeft size={20} /> 返回
      </motion.button>

      <motion.div
        className="sc-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="sc-header-icon">
          <ShieldAlert size={36} />
        </div>
        <h1>安全中心</h1>
        <p>您的一站式安全管理总控</p>
      </motion.div>

      {/* Security Status Summary */}
      <motion.div
        className="security-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="ss-icon-ring">
          <ShieldCheck size={32} />
        </div>
        <div className="ss-info">
          <div className="ss-status safe">账号安全</div>
          <div className="ss-desc">您的账号处于安全状态，已开启多项防护</div>
        </div>
      </motion.div>

      {/* Feature Entry Grid */}
      <section className="sc-features-section">
        <h2 className="sc-section-title">
          <Lock size={18} /> 安全功能
        </h2>
        <div className="sc-features-grid">
          {featureEntries.map((entry, index) => (
            <motion.div
              key={entry.label}
              className="sc-feature-card"
              onClick={() => navigate(entry.path)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              whileHover={{ y: -4, boxShadow: `0 8px 24px ${entry.color}20` }}
            >
              <div className="sc-feature-icon" style={{ background: `${entry.color}14`, color: entry.color }}>
                <entry.icon size={24} />
              </div>
              <div className="sc-feature-label">{entry.label}</div>
              <div className="sc-feature-desc">{entry.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Account Security Quick Actions */}
      <section className="sc-actions-section">
        <h2 className="sc-section-title">
          <Shield size={18} /> 账号安全
        </h2>
        <div className="sc-action-list">
          <div className="sc-action-item" onClick={() => navigate('/cert-dashboard')}>
            <div className="sc-action-icon"><CreditCard size={20} /></div>
            <div className="sc-action-info">
              <div className="sc-action-label">认证管理</div>
              <div className="sc-action-desc">查看和管理您的三大认证</div>
            </div>
            <ChevronDown size={16} className="sc-action-arrow" style={{ transform: 'rotate(-90deg)' }} />
          </div>
          <div className="sc-action-item" onClick={() => navigate('/verification-review')}>
            <div className="sc-action-icon"><Search size={20} /></div>
            <div className="sc-action-info">
              <div className="sc-action-label">资料审核</div>
              <div className="sc-action-desc">提交资料进行AI+人工双层审核</div>
            </div>
            <ChevronDown size={16} className="sc-action-arrow" style={{ transform: 'rotate(-90deg)' }} />
          </div>
          <div className="sc-action-item" onClick={() => navigate('/risk-alert')}>
            <div className="sc-action-icon"><Eye size={20} /></div>
            <div className="sc-action-info">
              <div className="sc-action-label">隐私保护</div>
              <div className="sc-action-desc">查看访问记录和截图保护设置</div>
            </div>
            <ChevronDown size={16} className="sc-action-arrow" style={{ transform: 'rotate(-90deg)' }} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="sc-faq-section">
        <h2 className="sc-section-title">
          <HelpCircle size={18} /> 常见问题
        </h2>
        <div className="sc-faq-list">
          {faqItems.map((faq, index) => (
            <motion.div
              key={faq.id}
              className={`sc-faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <button className="sc-faq-question" onClick={() => toggleFaq(faq.id)}>
                <span className="faq-category">{faq.category}</span>
                <span className="faq-text">{faq.question}</span>
                {expandedFaq === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedFaq === faq.id && (
                <motion.div
                  className="sc-faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <motion.section
        className="sc-support-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="sc-support-card">
          <Headphones size={28} />
          <div className="sc-support-info">
            <h3>联系客服</h3>
            <p>遇到问题？专业客服 7×24 小时在线帮您解答</p>
          </div>
          <button className="btn-primary sc-support-btn">
            在线客服
          </button>
        </div>
        <div className="sc-support-hotline">
          <span>紧急求助热线：</span>
          <strong>400-888-8888</strong>
        </div>
      </motion.section>
    </div>
  );
}
