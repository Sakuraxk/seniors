import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, MessageCircle, AlertCircle, EyeOff, ChevronLeft } from 'lucide-react';
import PrivacyOverlay from '../components/PrivacyOverlay';
import { riskAccounts } from '../data/mockData';
import './RiskProfile.css';

export default function RiskProfile() {
  const [showWarningInfo, setShowWarningInfo] = useState(false);
  const targetRiskAccount = riskAccounts[0]; // 张某某

  return (
    <PrivacyOverlay active={true}>
      <div className="risk-profile-page page-container" style={{ position: 'relative', paddingTop: '60px' }}>
        <button 
          onClick={() => window.history.back()} 
          style={{ position: 'absolute', left: '20px', top: '24px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', zIndex: 10 }}
        >
          <ChevronLeft size={28} />
        </button>
        
        {/* Protective Shield Mode Banner */}
        <motion.div 
          className="shield-mode-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="shield-icon-container">
            <ShieldAlert size={28} />
          </div>
          <div className="shield-content">
            <h3>防护罩模式已开启</h3>
            <p>该用户存在争议行为，银盾已向您开启全方位隐私与风险隔离保护。</p>
          </div>
        </motion.div>

        {/* Profile Info - Weakened */}
        <div className="risk-profile-card">
          <div className="risk-profile-header">
            <div className="risk-avatar">
              {targetRiskAccount.name.charAt(0)}
              <div className="risk-badge">
                <AlertTriangle size={14} color="white" />
              </div>
            </div>
            <div className="risk-name-info">
              <h2>{targetRiskAccount.name}</h2>
              <span className="platform-id">银盾安鉴号: 未知或已隐藏</span>
            </div>
          </div>

          <div className="risk-reasons-box">
            <div className="reason-title">
              <AlertCircle size={16} /> 风险提示项
            </div>
            <ul className="reason-list">
              {targetRiskAccount.riskReasons.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
            <div className="reason-footer">
              累计被举报 {targetRiskAccount.reportCount} 次 · 安全打分极低
            </div>
          </div>
        </div>

        {/* Disabled / Warning Actions */}
        <div className="risk-actions">
          <button className="chat-btn risk-btn" onClick={() => setShowWarningInfo(true)}>
            <MessageCircle size={20} />
            发起带警示框的聊天
          </button>
          
          <button className="hidden-btn disabled" disabled>
            <EyeOff size={20} />
            真实手机号已被隐藏
          </button>
        </div>

        {/* Mocking the Chat Warning specific to Risk Accounts */}
        {showWarningInfo && (
          <motion.div 
            className="grey-warning-box mt-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="grey-warning-header">系统异常提醒</div>
            <div className="grey-warning-body">
              该用户近期涉及多起金钱索要与谩骂纠纷。您与他的聊天记录已被最高级别加密存证。请勿轻信任何线下见面与资金请求。
            </div>
            <button className="cancel-chat-btn top-mt-4" onClick={() => setShowWarningInfo(false)}>
              暂缓联系
            </button>
          </motion.div>
        )}
      </div>
    </PrivacyOverlay>
  );
}
