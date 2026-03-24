import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, Mic, ChevronLeft, Lock, Download, FileText, Flag, Users, ShieldCheck, ChevronDown } from 'lucide-react';
import { callRecords, evidenceDetails } from '../data/mockData';
import './CallRecords.css';

export default function CallRecords() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getEvidence = (recordId: string) => {
    return evidenceDetails.find(e => e.callRecordId === recordId);
  };

  return (
    <div className="records-page page-container" style={{ minHeight: '100vh', padding: '20px 20px calc(var(--nav-height) + 24px)' }}>
      {/* Header with Back Button */}
      <div className="page-header-nav" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
        <button className="back-btn" onClick={() => navigate(-1)} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <ChevronLeft size={24} color="var(--text-primary)" />
        </button>
        <h1 style={{ fontSize: 'var(--font-xl)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>通话留痕</h1>
      </div>

      <div className="call-list">
        {callRecords.map((record, index) => {
          const evidence = getEvidence(record.id);
          const isExpanded = expandedId === record.id;

          return (
            <motion.div
              key={record.id}
              className={`call-card-wrapper ${record.riskFlag ? 'risk-flagged' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="call-card" onClick={() => record.hasRecording && toggleExpand(record.id)}>
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
                      <Mic size={10} /> 已存证
                    </span>
                  )}
                  {record.riskFlag && (
                    <span className="call-badge risk">⚠ 风险</span>
                  )}
                  {record.hasRecording && (
                    <ChevronDown
                      size={16}
                      className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}
                    />
                  )}
                </div>
              </div>

              {/* Evidence Details Expandable */}
              <AnimatePresence>
                {isExpanded && evidence && (
                  <motion.div
                    className="evidence-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="evidence-header">
                      <ShieldCheck size={16} color="#4CAF50" />
                      <span>存证详情</span>
                    </div>
                    <div className="evidence-rows">
                      <div className="evidence-row">
                        <span className="ev-label">存证编号</span>
                        <span className="ev-value">{evidence.evidenceId}</span>
                      </div>
                      <div className="evidence-row">
                        <span className="ev-label">加密状态</span>
                        <span className={`ev-value ${evidence.encryptionStatus === 'encrypted' ? 'ev-safe' : 'ev-pending'}`}>
                          <Lock size={12} />
                          {evidence.encryptionStatus === 'encrypted' ? '已加密' : '加密中'}
                        </span>
                      </div>
                      <div className="evidence-row">
                        <span className="ev-label">存证时间</span>
                        <span className="ev-value">{evidence.timestamp}</span>
                      </div>
                      <div className="evidence-row">
                        <span className="ev-label">保存期限</span>
                        <span className="ev-value">至 {evidence.storageExpiry}</span>
                      </div>
                    </div>
                    <div className="evidence-actions">
                      <button
                        className="ev-btn primary"
                        disabled={!evidence.canReport}
                      >
                        <FileText size={16} /> 申请举证
                      </button>
                      <button
                        className="ev-btn secondary"
                        disabled={!evidence.canDownload}
                      >
                        <Download size={16} /> 下载凭证
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Emergency Quick Actions */}
      <motion.div
        className="emergency-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="emergency-title">紧急操作</div>
        <div className="emergency-btns">
          <button className="emergency-btn danger">
            <Flag size={22} />
            <span>一键举报</span>
          </button>
          <button className="emergency-btn family" onClick={() => navigate('/family-guard')}>
            <Users size={22} />
            <span>联系子女</span>
          </button>
          <button className="emergency-btn sos">
            <PhoneCall size={22} />
            <span>客服求助</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
