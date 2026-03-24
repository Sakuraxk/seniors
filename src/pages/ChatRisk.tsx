import { motion } from 'framer-motion';
import { Send, Ban, Flag, Phone, AlertTriangle, ShieldAlert } from 'lucide-react';
import RiskBanner from '../components/RiskBanner';
import CertBadge from '../components/CertBadge';
import { chatMessages, targetUser } from '../data/mockData';
import './ChatRisk.css';

const riskLevels = [
  { num: 'L1', label: 'AI打标' },
  { num: 'L2', label: '降权' },
  { num: 'L3', label: '人工复核' },
  { num: 'L4', label: '举报复查' },
];

export default function ChatRisk() {
  const hasHighRisk = chatMessages.some(m => m.riskLevel === 'high');

  return (
    <div className="chat-risk-page">
      {/* Chat header */}
      <div className="chat-header">
        <div className="chat-avatar">{targetUser.name.charAt(0)}</div>
        <div className="chat-user-info">
          <div className="chat-user-name">{targetUser.name}</div>
          <div className="chat-user-status">在线 · {targetUser.age}岁</div>
        </div>
        <div className="chat-header-badge">
          <CertBadge type="green" label="已认证" />
        </div>
      </div>

      {/* Risk Banner */}
      {hasHighRisk && (
        <div className="chat-warning-area">
          <RiskBanner
            title="⚠️ 风险预警"
            description="检测到对方发送涉及资金诱导和敏感信息索取的内容，请务必谨慎！"
          />
        </div>
      )}

      {/* 4 Level Risk Control */}
      <div className="risk-levels-section">
        <div className="risk-levels-title">🛡️ 四级风控机制</div>
        <div className="risk-levels">
          {riskLevels.map((level, i) => (
            <motion.div
              key={i}
              className="risk-level-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="level-num">{level.num}</span>
              <span className="level-label">{level.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <motion.div
            key={msg.id}
            className={`chat-bubble-wrapper ${msg.sender}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className={`chat-bubble ${msg.riskLevel !== 'none' ? `risk-${msg.riskLevel}` : ''}`}>
              {msg.content}
            </div>
            {msg.riskLevel && msg.riskLevel !== 'none' && (
              <span className={`risk-tag ${msg.riskLevel}`}>
                {msg.riskLevel === 'high' ? <ShieldAlert size={12} /> : <AlertTriangle size={12} />}
                {msg.riskType}
              </span>
            )}
            <span className="chat-time">{msg.time}</span>
          </motion.div>
        ))}
      </div>

      {/* Input & Actions */}
      <div className="chat-actions">
        <div className="chat-input-row">
          <input className="chat-input" placeholder="输入消息..." />
          <button className="chat-send-btn">
            <Send />
          </button>
        </div>
        <div className="quick-actions">
          <button className="quick-action-btn block">
            <Ban size={18} /> 拉黑
          </button>
          <button className="quick-action-btn report">
            <Flag size={18} /> 举报
          </button>
          <button className="quick-action-btn help">
            <Phone size={18} /> 求助
          </button>
        </div>
      </div>
    </div>
  );
}
