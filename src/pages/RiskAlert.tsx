import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Eye, AlertTriangle } from 'lucide-react';
import { riskAccounts, abnormalAccessData } from '../data/mockData';
import './RiskAlert.css';

export default function RiskAlert() {
  const [shieldOn, setShieldOn] = useState(true);

  return (
    <div className="risk-alert-page page-container">
      {/* Header */}
      <motion.div
        className="risk-alert-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🛡️ 风险防护</h1>
        <p>风险账号警示 & 隐私保护</p>
      </motion.div>

      {/* Shield Mode Toggle */}
      <motion.div
        className="shield-mode-toggle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="shield-mode-info">
          <div className="shield-mode-icon">
            <ShieldAlert />
          </div>
          <div>
            <div className="shield-mode-label">防护罩模式</div>
            <div className="shield-mode-desc">开启后风险账号消息会附带灰色警示</div>
          </div>
        </div>
        <button
          className={`shield-toggle ${shieldOn ? 'on' : 'off'}`}
          onClick={() => setShieldOn(!shieldOn)}
        />
      </motion.div>

      {/* Risk Accounts */}
      <section className="risk-accounts-section">
        <div className="risk-accounts-title">
          <AlertTriangle size={22} />
          风险账号警示
        </div>
        {riskAccounts.map((account, index) => (
          <motion.div
            key={account.id}
            className={`risk-account-card ${account.riskLevel}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="risk-account-top">
              <div className="risk-avatar">{account.name.charAt(0)}</div>
              <div>
                <div className="risk-account-name">{account.name}</div>
                <div className="risk-account-reports">被举报 {account.reportCount} 次</div>
              </div>
              <span className={`risk-level-badge ${account.riskLevel}`}>
                {account.riskLevel === 'high' ? '⚠ 高风险' : '⚡ 中风险'}
              </span>
            </div>
            <div className="risk-reasons">
              {account.riskReasons.map((reason, i) => (
                <div key={i} className="risk-reason">
                  <div className="risk-reason-dot" />
                  {reason}
                </div>
              ))}
            </div>
            {shieldOn && (
              <div className="shielded-message">
                <div className="msg-content">"你好呀，最近有个好项目…"</div>
              </div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Access Monitor */}
      <section className="access-monitor-section">
        <div className="access-monitor-title">
          <Eye size={22} />
          异常访问监测
        </div>
        <div className="access-grid">
          {abnormalAccessData.map((item, i) => (
            <motion.div
              key={i}
              className="access-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <span className={`access-count ${item.count > 0 ? 'active' : 'safe'}`}>
                {item.count}
              </span>
              <div className="access-type">{item.type}</div>
              <div className="access-desc">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
