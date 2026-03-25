import type { ComponentType } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Info, ChevronLeft, X } from 'lucide-react';
import { familyNotifications } from '../data/mockData';
import type { Notification as NotificationType } from '../data/mockData';
import './SafetyNotifications.css';

const notifIconMap: Record<string, { icon: ComponentType<{ className?: string }>, type: string }> = {
  alert: { icon: AlertTriangle, type: 'alert' },
  review: { icon: ShieldCheck, type: 'review' },
  info: { icon: Info, type: 'info' },
};

export default function SafetyNotifications() {
  const navigate = useNavigate();
  const [selectedNotif, setSelectedNotif] = useState<NotificationType | null>(null);

  const ActiveNotifIcon = selectedNotif ? (notifIconMap[selectedNotif.type] || notifIconMap.info).icon : null;

  return (
    <div className="notifications-page page-container" style={{ minHeight: '100vh', padding: '20px 20px calc(var(--nav-height) + 24px)' }}>
      {/* Header with Back Button */}
      <div className="page-header-nav" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
        <button className="back-btn" onClick={() => navigate(-1)} style={{ background: 'var(--bg-surface)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <ChevronLeft size={24} color="var(--text-primary)" />
        </button>
        <h1 style={{ fontSize: 'var(--font-xl)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>安全通知</h1>
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
              transition={{ delay: index * 0.08 }}
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
