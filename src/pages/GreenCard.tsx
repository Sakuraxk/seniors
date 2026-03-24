import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, IdCard, HeartPulse, ArrowLeft, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../data/mockData';
import ReportModal from '../components/ReportModal';
import CustomerServiceModal from '../components/CustomerServiceModal';
import './CardStyles.css';

const iconMap: Record<string, React.ComponentType<any>> = {
  'id-card': IdCard,
  'shield-check': ShieldCheck,
  'heart-pulse': HeartPulse,
};

const statusLabel: Record<string, string> = {
  verified: '✅ 已验证',
  pending: '⏳ 验证中',
  unverified: '未验证',
};

export default function GreenCard() {
  const navigate = useNavigate();
  const data = currentUser.greenCard;
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);

  return (
    <div className="green-card-page page-container">
      <motion.button 
        className="back-button"
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginBottom: '16px' }}
      >
        <ArrowLeft size={20} /> 返回
      </motion.button>

      <motion.div
        className="card-page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1><span style={{color: '#4CAF50'}}>🟢</span> 绿卡 · 身份与健康</h1>
        <p>核验身份真实性和健康状况</p>
      </motion.div>

      <div className="detail-list">
        {data.map((item, index) => {
          const Icon = iconMap[item.icon] || ShieldCheck;
          return (
            <motion.div
              key={item.id}
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="detail-icon-wrapper green">
                <Icon size={24} />
              </div>
              <div className="detail-content">
                <div className="detail-label">{item.label}</div>
                <div className="detail-desc">{item.description}</div>
                <span className={`detail-status ${item.status}`}>
                  {statusLabel[item.status]}
                </span>

                <div className="card-extra-info">
                  {item.status === 'verified' ? (
                    <div className="verified-details">
                      <div className="info-row"><span>认证时间：</span><span>2026-03-24</span></div>
                      <div className="info-row"><span>流水编号：</span><span>AUTH-GC-{item.id.replace('gc-', '')}-892</span></div>
                      <button className="btn-action-small" onClick={() => setSelectedReportId(item.id)}>查看详细报告</button>
                    </div>
                  ) : (
                    <div className="progress-section">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: item.status === 'pending' ? '60%' : '10%'}}></div>
                      </div>
                      <div className="progress-text">
                        {item.status === 'pending' ? '资料审核中 (预计1-2工作日)' : '尚未提交认证资料'}
                      </div>
                      <button className="btn-action-small" onClick={() => setIsCustomerServiceOpen(true)}><Phone size={14} /> 联系专属跟进客服</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <CustomerServiceModal 
        isOpen={isCustomerServiceOpen} 
        onClose={() => setIsCustomerServiceOpen(false)} 
      />
      
      <ReportModal 
        isOpen={!!selectedReportId} 
        onClose={() => setSelectedReportId(null)} 
        title={data.find(d => d.id === selectedReportId)?.label || ''}
        items={selectedReportId ? [
          { label: '核验渠道', value: '官方权威数据库对接' },
          { label: '认证时间', value: '2026-03-24 14:30:12' },
          { label: '数据状态', value: '正常', highlight: true },
          { label: '流水单号', value: `AUTH-GC-${selectedReportId.replace('gc-', '')}-892` }
        ] : []}
        theme="green"
        statusText="身份有效、健康核验通过"
      />
    </div>
  );
}
