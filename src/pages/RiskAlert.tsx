import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Eye, AlertTriangle, Camera, UserCheck, Ban, Clock, ChevronLeft } from 'lucide-react';
import { riskAccounts, abnormalAccessData, privacyAccessRecords, violationRecords } from '../data/mockData';
import './RiskAlert.css';

export default function RiskAlert() {
  const [shieldOn, setShieldOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'risk' | 'privacy' | 'violation'>('risk');

  return (
    <div className="risk-alert-page page-container">
      {/* Header */}
      <motion.div
        className="risk-alert-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ position: 'relative' }}
      >
        <button 
          onClick={() => window.history.back()} 
          style={{ position: 'absolute', left: '20px', top: '24px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          <ChevronLeft size={28} />
        </button>
        <h1>🛡️ 风险防护</h1>
        <p>风险账号警示 & 隐私保护</p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="risk-tabs">
        <button className={`risk-tab ${activeTab === 'risk' ? 'active' : ''}`} onClick={() => setActiveTab('risk')}>
          <AlertTriangle size={16} /> 风险账号
        </button>
        <button className={`risk-tab ${activeTab === 'privacy' ? 'active' : ''}`} onClick={() => setActiveTab('privacy')}>
          <Eye size={16} /> 隐私保护
        </button>
        <button className={`risk-tab ${activeTab === 'violation' ? 'active' : ''}`} onClick={() => setActiveTab('violation')}>
          <Ban size={16} /> 违规记录
        </button>
      </div>

      {/* Risk Accounts Tab */}
      {activeTab === 'risk' && (
        <>
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
                <div className="risk-account-actions">
                  <button className="ra-btn reduce">减少接触</button>
                  <button className="ra-btn report">举报</button>
                  <button className="ra-btn block">屏蔽</button>
                </div>
              </motion.div>
            ))}
          </section>
        </>
      )}

      {/* Privacy Protection Tab */}
      {activeTab === 'privacy' && (
        <>
          {/* Who Viewed My Profile */}
          <section className="privacy-section">
            <div className="privacy-section-title">
              <UserCheck size={20} /> 谁看了我的资料
            </div>
            <div className="access-list">
              {privacyAccessRecords.map((record, index) => (
                <motion.div
                  key={record.id}
                  className={`access-record ${record.isAbnormal ? 'abnormal' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="ar-avatar">{record.visitorName.charAt(0)}</div>
                  <div className="ar-info">
                    <div className="ar-name">
                      {record.visitorName}
                      {record.isAbnormal && <span className="ar-abnormal-tag">异常</span>}
                    </div>
                    <div className="ar-meta">查看了 {record.viewedSection} · {record.visitTime}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Screenshot Protection */}
          <section className="privacy-section">
            <div className="privacy-section-title">
              <Camera size={20} /> 截图保护
            </div>
            <div className="screenshot-protection-card">
              <div className="sp-icon"><Camera size={28} /></div>
              <div className="sp-info">
                <h3>截图保护已开启</h3>
                <p>他人无法截图您的隐私资料。如有截图行为，系统将自动记录并发出警告。</p>
              </div>
              <div className="sp-status">✅ 生效中</div>
            </div>
          </section>

          {/* Access Monitor */}
          <section className="privacy-section">
            <div className="privacy-section-title">
              <Eye size={20} /> 异常访问监测
            </div>
            <div className="access-grid">
              {abnormalAccessData.map((item, i) => (
                <motion.div
                  key={i}
                  className="access-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
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
        </>
      )}

      {/* Violation Records Tab */}
      {activeTab === 'violation' && (
        <section className="privacy-section">
          <div className="privacy-section-title">
            <Ban size={20} /> 违规处罚记录
          </div>
          {violationRecords.length === 0 ? (
            <div className="no-violation">
              <ShieldAlert size={32} />
              <p>恭喜！您没有任何违规记录</p>
            </div>
          ) : (
            <div className="violation-list">
              {violationRecords.map((vr, index) => (
                <motion.div
                  key={vr.id}
                  className={`violation-card ${vr.status}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="vr-header">
                    <span className="vr-type">{vr.type}</span>
                    <span className={`vr-status ${vr.status}`}>
                      {vr.status === 'resolved' ? '已处理' : '处罚中'}
                    </span>
                  </div>
                  <div className="vr-reason">{vr.reason}</div>
                  <div className="vr-penalty">
                    <Ban size={12} /> {vr.penalty}
                  </div>
                  <div className="vr-time"><Clock size={12} /> {vr.time}</div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
