import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Users, Bell, Phone, CircleAlert, X, ChevronRight,
  UserPlus, Send, ShieldCheck, Eye, AlertTriangle, Check, ShieldPlus
} from 'lucide-react';
import { familyGuardians, currentUser, riskSyncRecords } from '../data/mockData';
import type { FamilyGuardian, RiskSyncRecord } from '../data/mockData';
import './FamilyGuard.css';

export default function FamilyGuard() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedGuardian, setSelectedGuardian] = useState<FamilyGuardian | null>(null);
  const [showRiskSyncModal, setShowRiskSyncModal] = useState(false);
  const [selectedRiskRecord, setSelectedRiskRecord] = useState<RiskSyncRecord | null>(null);

  // Profile Verification Sync State
  const userProfile = currentUser;
  const [isVerifyingProfile, setIsVerifyingProfile] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  // Binding form
  const [showBindForm, setShowBindForm] = useState(false);
  const [bindPhone, setBindPhone] = useState('');
  const [bindSent, setBindSent] = useState(false);

  // Permission switches
  const [allowViewRisk, setAllowViewRisk] = useState(true);
  const [allowAlerts, setAllowAlerts] = useState(true);

  const handleSendInvite = () => {
    if (!bindPhone.trim() || bindPhone.length < 11) return;
    setBindSent(true);
    toast.success('🎉 绑定邀请已发送！', { icon: false });
    setTimeout(() => {
      setBindSent(false);
      setShowBindForm(false);
      setBindPhone('');
    }, 2000);
  };

  return (
    <div className="family-guard-page page-container">
      {/* Header */}
      <motion.div
        className="family-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>👤 个人中心</h1>
        <p>您的账号与安全中心</p>
      </motion.div>

      {/* User Profile Section */}
      <motion.div
        className="profile-section clickable-card"
        onClick={() => { setSelectedUser(true); setIsVerifyingProfile(false); setVerificationStep(0); }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="profile-header">
          <div className="profile-avatar">{userProfile.name.charAt(0)}</div>
          <div className="profile-info">
            <h2 className="profile-name">{userProfile.name}</h2>
            <p className="profile-meta">{userProfile.age}岁 | 银盾安鉴号：{userProfile.id}</p>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
        </div>
      </motion.div>

      {/* Guardian Cards */}
      <section className="guardian-section">
        <div className="guardian-section-title">
          <Users size={22} />
          已绑定家人
          <button className="add-guardian-btn" onClick={() => setShowBindForm(true)}>
            <UserPlus size={16} /> 绑定
          </button>
        </div>
        <div className="guardian-cards">
          {familyGuardians.map((guardian, index) => (
            <motion.div
              key={guardian.id}
              className="guardian-card clickable-card"
              onClick={() => setSelectedGuardian(guardian)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="guardian-avatar-small">{guardian.name.charAt(0)}</div>
              <div className="guardian-name">{guardian.name}</div>
              <div className="guardian-relation">{guardian.relation}</div>
              <span className={`guardian-status ${guardian.isLinked ? 'linked' : ''}`}>
                {guardian.isLinked ? '✅ 已绑定' : '未绑定'}
              </span>
              <div className="guardian-last-active">最近活跃：{guardian.lastActive}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Permission Settings */}
      <section className="permission-section">
        <div className="guardian-section-title">
          <ShieldCheck size={22} /> 权限设置
        </div>
        <div className="permission-list">
          <div className="permission-item">
            <div className="perm-icon"><Eye size={18} /></div>
            <div className="perm-info">
              <div className="perm-label">允许子女查看风险</div>
              <div className="perm-desc">子女可查看您的风险预警详情</div>
            </div>
            <button
              className={`perm-toggle ${allowViewRisk ? 'on' : 'off'}`}
              onClick={() => setAllowViewRisk(!allowViewRisk)}
            />
          </div>
          <div className="permission-item">
            <div className="perm-icon"><Bell size={18} /></div>
            <div className="perm-info">
              <div className="perm-label">允许子女收到预警</div>
              <div className="perm-desc">高风险行为自动通知绑定子女</div>
            </div>
            <button
              className={`perm-toggle ${allowAlerts ? 'on' : 'off'}`}
              onClick={() => setAllowAlerts(!allowAlerts)}
            />
          </div>
        </div>
      </section>



      {/* Navigation Buttons for Details */}
      <section className="detail-nav-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        <motion.div
          className="nav-btn-card clickable-card"
          onClick={() => setShowRiskSyncModal(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(255,140,66,0.1)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,140,66,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>风险同步记录</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>查看风险记录及处理进度</div>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </motion.div>

        <motion.div
          className="nav-btn-card clickable-card"
          onClick={() => navigate('/safety-notifications')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(255,140,66,0.1)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,140,66,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>安全通知</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>查看所有安全提醒与风险阻断记录</div>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </motion.div>

        <motion.div
          className="nav-btn-card clickable-card"
          onClick={() => navigate('/call-records')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(255,140,66,0.1)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,140,66,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>通话留痕</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>查看可疑通话记录与风险预警</div>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </motion.div>

        <motion.div
          className="nav-btn-card clickable-card"
          onClick={() => navigate('/cert-dashboard')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(255,140,66,0.1)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,140,66,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>认证中心</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>管理三大安全认证，全方位展示真实背景</div>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </motion.div>

        <motion.div
          className="nav-btn-card clickable-card"
          onClick={() => navigate('/safety-center')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(255,140,66,0.1)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,140,66,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldPlus size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>安全中心</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>汇总所有安全功能、常见问题和客服支持</div>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </motion.div>
      </section>

      {/* SOS Button */}
      <motion.div
        className="sos-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          className="sos-btn"
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(229, 62, 62, 0.4)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          onClick={() => toast.error('🚨 紧急求助已发送至所有绑定家人！', { icon: false, autoClose: 5000 })}
        >
          <CircleAlert />
        </motion.button>
        <div className="sos-label">一键求助</div>
        <div className="sos-desc">紧急情况下一键通知所有绑定家人</div>
      </motion.div>

      {/* Bind Child Form Modal */}
      {showBindForm && (
        <div className="modal-overlay" onClick={() => { setShowBindForm(false); setBindSent(false); setBindPhone(''); }}>
          <div className="modal-content bind-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">绑定子女</h3>
              <button className="close-btn" onClick={() => { setShowBindForm(false); setBindSent(false); setBindPhone(''); }}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="bind-instruction">
                输入子女的手机号码，发送绑定邀请。子女确认后即可开启护航功能。
              </div>
              <div className="bind-input-row">
                <input
                  type="tel"
                  placeholder="请输入子女手机号"
                  value={bindPhone}
                  onChange={(e) => setBindPhone(e.target.value)}
                  maxLength={11}
                  className="bind-input"
                />
              </div>
              {bindSent ? (
                <div className="bind-success">
                  <Check size={20} />
                  邀请已发送，等待子女确认
                </div>
              ) : (
                <button className="btn-primary bind-send-btn" onClick={handleSendInvite} disabled={bindPhone.length < 11}>
                  <Send size={18} /> 发送邀请
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modals */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{isVerifyingProfile ? '权威数据核验' : '用户资料详情'}</h3>
              <button className="close-btn" onClick={() => setSelectedUser(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {isVerifyingProfile ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
                  <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={32} />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                      资料防篡改保护中
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify' }}>
                      遵循平台《真实社交风控规范》，您的核心身份数据（姓名、年龄等）直接对接<strong>公安人口库</strong>及<strong>社保系统</strong>，不支持手动修改。<br/><br/>
                      如您的真实身份资料发生变更，需重新授权发起核验。
                    </div>
                  </div>
                  
                  {verificationStep === 0 && (
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <button className="btn-secondary" style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-md)' }} onClick={() => setIsVerifyingProfile(false)}>返回</button>
                      <button className="btn-primary" style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-md)' }} onClick={() => {
                        setVerificationStep(1);
                        setTimeout(() => setVerificationStep(2), 2000); // Simulate verification done
                      }}>重新授权核验</button>
                    </div>
                  )}

                  {verificationStep === 1 && (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <div className="loader" style={{ margin: '0 auto 16px', border: '3px solid #f3f3f3', borderTop: '3px solid var(--primary)', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite' }}></div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '14px' }}>正在从权威数据库同步更新...</div>
                      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                  )}

                  {verificationStep === 2 && (
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e8f5e9', color: '#4CAF50', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={24} />
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>核验完成</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>您的实名信息已是最新状态，且被安心系统保护。</div>
                      <button className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)' }} onClick={() => { setIsVerifyingProfile(false); setVerificationStep(0); }}>
                        知道了
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="cs-profile">
                    <div className="cs-avatar">{userProfile.name.charAt(0)}</div>
                    <div className="cs-name">{userProfile.name}</div>
                    <div className="cs-role">银盾安鉴号：{userProfile.id}</div>
                  </div>
                  <div className="report-details-list">
                    <div className="report-detail-item">
                      <span className="report-detail-label">年龄</span>
                      <span className="report-detail-value">{userProfile.age}岁</span>
                    </div>
                    <div className="report-detail-item">
                      <span className="report-detail-label">安全等级</span>
                      <span className="report-detail-value highlight">
                        {userProfile.certLevel === 'high' ? '高' : userProfile.certLevel === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                    <div className="report-detail-item">
                      <span className="report-detail-label">数据来源</span>
                      <span className="report-detail-value" style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: '#4CAF50' }}>
                        <ShieldCheck size={14} /> 公安/社保核验
                      </span>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '24px', background: 'var(--primary-light)', color: 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => {
                    setIsVerifyingProfile(true);
                    setVerificationStep(0);
                  }}>
                    <ShieldCheck size={16} />同步权威最新资料
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedGuardian && (
        <div className="modal-overlay" onClick={() => setSelectedGuardian(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">家人详情</h3>
              <button className="close-btn" onClick={() => setSelectedGuardian(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="cs-profile">
                <div className="cs-avatar" style={{ background: 'var(--primary-light)' }}>
                  {selectedGuardian.name.charAt(0)}
                </div>
                <div className="cs-name">{selectedGuardian.name}</div>
                <div className="cs-role">{selectedGuardian.relation}</div>
              </div>
              <div className="report-details-list">
                <div className="report-detail-item">
                  <span className="report-detail-label">绑定状态</span>
                  <span className={`report-detail-value ${selectedGuardian.isLinked ? 'highlight' : ''}`}>
                    {selectedGuardian.isLinked ? '✅ 已绑定' : '未绑定'}
                  </span>
                </div>
                <div className="report-detail-item">
                  <span className="report-detail-label">最近活跃</span>
                  <span className="report-detail-value">{selectedGuardian.lastActive}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Risk Sync Modal */}
      {showRiskSyncModal && (
        <div className="modal-overlay" onClick={() => setShowRiskSyncModal(false)}>
          <div className="modal-content" style={{ width: '90%', maxWidth: '400px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">风险同步记录</h3>
              <button className="close-btn" onClick={() => setShowRiskSyncModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body" style={{ overflowY: 'auto', padding: '16px', flex: 1 }}>
              <div className="sync-list">
                {riskSyncRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    className={`sync-card ${record.isHandled ? 'handled clickable-card' : 'pending'}`}
                    onClick={() => { if (record.isHandled) setSelectedRiskRecord(record); }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    style={{ marginBottom: '12px', padding: '16px', borderRadius: '12px', border: '1px solid #eee', background: record.isHandled ? '#fdfdfd' : '#fff5f5' }}
                  >
                    <div className="sync-content" style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 500 }}>{record.content}</div>
                    <div className="sync-meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      <span className="sync-time">{record.time}</span>
                      <span className="sync-to">→ {record.notifiedTo}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className={`sync-status ${record.isHandled ? 'handled' : 'pending'}`} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', color: record.isHandled ? '#4CAF50' : '#FF4757', fontWeight: 'bold' }}>
                        {record.isHandled ? <><Check size={14} /> 已处理 (点击查看详情)</> : <><CircleAlert size={14} /> 待处理</>}
                      </span>
                      {record.isHandled && <ChevronRight size={16} color="#ccc" />}
                    </div>
                    {!record.isHandled && (
                      <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)', background: 'rgba(229, 62, 62, 0.1)', padding: '8px 12px', borderRadius: '6px' }}>
                        家人正在处理中，请耐心等待或主动联系 {record.notifiedTo.split('（')[0]}。
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Risk Record Detail Modal */}
      {selectedRiskRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRiskRecord(null)} style={{ zIndex: 1001 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">处理详情</h3>
              <button className="close-btn" onClick={() => setSelectedRiskRecord(null)}><X size={20} /></button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', background: '#e8f5e9', color: '#4CAF50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <ShieldCheck size={28} />
                </div>
                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>风险已阻断</h3>
                <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>家人已介入处理该风险</p>
              </div>
              <div className="report-details-list">
                <div className="report-detail-item">
                  <span className="report-detail-label">触发时间</span>
                  <span className="report-detail-value">{selectedRiskRecord.time}</span>
                </div>
                <div className="report-detail-item">
                  <span className="report-detail-label">风险内容</span>
                  <span className="report-detail-value" style={{ maxWidth: '60%', textAlign: 'right' }}>{selectedRiskRecord.content}</span>
                </div>
                <div className="report-detail-item">
                  <span className="report-detail-label">通知家人</span>
                  <span className="report-detail-value highlight">{selectedRiskRecord.notifiedTo}</span>
                </div>
                <div className="report-detail-item">
                  <span className="report-detail-label">处理结果</span>
                  <span className="report-detail-value" style={{ color: '#4CAF50', fontWeight: 'bold' }}>已确认安全并解除警报</span>
                </div>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={() => setSelectedRiskRecord(null)}>
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
