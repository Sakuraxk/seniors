import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Bell, Phone, AlertTriangle, ShieldCheck, Info,
  PhoneCall, Mic, CircleAlert, X
} from 'lucide-react';
import { familyGuardians, familyNotifications, callRecords, currentUser } from '../data/mockData';
import type { FamilyGuardian, Notification as NotificationType } from '../data/mockData';
import './FamilyGuard.css';

const notifIconMap: Record<string, { icon: React.ComponentType<{ className?: string }>, type: string }> = {
  alert: { icon: AlertTriangle, type: 'alert' },
  review: { icon: ShieldCheck, type: 'review' },
  info: { icon: Info, type: 'info' },
};

export default function FamilyGuard() {
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedGuardian, setSelectedGuardian] = useState<FamilyGuardian | null>(null);
  const [selectedNotif, setSelectedNotif] = useState<NotificationType | null>(null);

  // Helper for dynamically rendering notification icon in modal
  const ActiveNotifIcon = selectedNotif ? (notifIconMap[selectedNotif.type] || notifIconMap.info).icon : null;

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
        onClick={() => setSelectedUser(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="profile-header">
          <div className="profile-avatar">{currentUser.name.charAt(0)}</div>
          <div className="profile-info">
            <h2 className="profile-name">{currentUser.name}</h2>
            <p className="profile-meta">{currentUser.age}岁 | 银盾安鉴号：{currentUser.id}</p>
          </div>
        </div>
      </motion.div>

      {/* Guardian Cards */}
      <section className="guardian-section">
        <div className="guardian-section-title">
          <Users size={22} />
          已绑定家人
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

      {/* Notifications */}
      <section className="notif-section">
        <div className="notif-section-title">
          <Bell size={22} />
          安全通知
        </div>
        <div className="notif-list">
          {familyNotifications.map((notif, index) => {
            const iconInfo = notifIconMap[notif.type] || notifIconMap.info;
            const Icon = iconInfo.icon;
            return (
              <motion.div
                key={notif.id}
                className={`notif-card clickable-card ${!notif.isRead ? 'unread' : ''}`}
                onClick={() => setSelectedNotif(notif)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
              >
                <div className={`notif-icon ${iconInfo.type}`}>
                  <Icon />
                </div>
                <div className="notif-content">
                  <div className="notif-title">{notif.title}</div>
                  <div className="notif-desc">{notif.content}</div>
                </div>
                <span className="notif-time">{notif.time}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call Records */}
      <section className="call-section">
        <div className="call-section-title">
          <Phone size={22} />
          通话留痕
        </div>
        <div className="call-list">
          {callRecords.map((record, index) => (
            <motion.div
              key={record.id}
              className={`call-card ${record.riskFlag ? 'risk-flagged' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
            >
              <div className="call-avatar">
                <PhoneCall />
              </div>
              <div className="call-info">
                <div className="call-name">{record.contactName}</div>
                <div className="call-meta">{record.time} · 时长 {record.duration}</div>
              </div>
              <div className="call-badges">
                {record.hasRecording && (
                  <span className="call-badge recorded">
                    <Mic size={10} /> 已录音
                  </span>
                )}
                {record.riskFlag && (
                  <span className="call-badge risk">⚠ 风险</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOS Button */}
      <motion.div
        className="sos-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button className="sos-btn">
          <CircleAlert />
        </button>
        <div className="sos-label">一键求助</div>
        <div className="sos-desc">紧急情况下一键通知所有绑定家人</div>
      </motion.div>

      {/* Detail Modals */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">用户资料详情</h3>
              <button className="close-btn" onClick={() => setSelectedUser(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="cs-profile">
                <div className="cs-avatar">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="cs-name">{currentUser.name}</div>
                <div className="cs-role">银盾安鉴号：{currentUser.id}</div>
              </div>
              <div className="report-details-list">
                <div className="report-detail-item">
                  <span className="report-detail-label">年龄</span>
                  <span className="report-detail-value">{currentUser.age}岁</span>
                </div>
                <div className="report-detail-item">
                  <span className="report-detail-label">安全等级</span>
                  <span className="report-detail-value highlight">
                    {currentUser.certLevel === 'high' ? '高' : currentUser.certLevel === 'medium' ? '中' : '低'}
                  </span>
                </div>
              </div>
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

      {selectedNotif && (
        <div className="modal-overlay" onClick={() => setSelectedNotif(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">通知详情</h3>
              <button className="close-btn" onClick={() => setSelectedNotif(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className={`report-status-banner ${selectedNotif.type === 'info' ? 'blue' : ''}`} style={selectedNotif.type === 'alert' ? { background: 'rgba(255, 71, 87, 0.1)', color: '#FF4757' } : {}}>
                {ActiveNotifIcon && <ActiveNotifIcon />}
                <div>
                  <div className="report-status-text">{selectedNotif.title}</div>
                  <div className="report-status-sub">{selectedNotif.time}</div>
                </div>
              </div>
              <div style={{ lineHeight: 1.6, color: 'var(--text-primary)', fontSize: '15px' }}>
                {selectedNotif.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
