import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Trophy, MessageCircle, ArrowLeft, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../data/mockData';
import ReportModal from '../components/ReportModal';
import CustomerServiceModal from '../components/CustomerServiceModal';
import './CardStyles.css';

const iconMap: Record<string, React.ComponentType<any>> = {
  'users': Users,
  'trophy': Trophy,
  'message-circle': MessageCircle,
};

const statusLabel: Record<string, string> = {
  verified: '✅ 已验证',
  pending: '⏳ 验证中',
  unverified: '未验证',
};

export default function BlueShield() {
  const navigate = useNavigate();
  const data = currentUser.blueShield;
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);

  return (
    <div className="blue-shield-page page-container">
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
        <h1><span style={{color: '#2196F3'}}>🔵</span> 蓝盾 · 社交信用</h1>
        <p>社交行为与平台信用评估</p>
      </motion.div>

      <div className="detail-list">
        {data.map((item, index) => {
          const Icon = iconMap[item.icon] || Shield;
          return (
            <motion.div
              key={item.id}
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="detail-icon-wrapper blue">
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
                      <div className="info-row"><span>最新评估：</span><span>2026-03-24</span></div>
                      <div className="info-row"><span>信用流水：</span><span>AUTH-BS-{item.id.replace('bs-', '')}-712</span></div>
                      <button className="btn-action-small" onClick={() => setSelectedReportId(item.id)}>查看评估明细</button>
                    </div>
                  ) : (
                    <div className="progress-section">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: item.status === 'pending' ? '60%' : '10%'}}></div>
                      </div>
                      <div className="progress-text">
                        {item.status === 'pending' ? '评估数据收集中 (预计1-2工作日)' : '暂无充足评估数据'}
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
          { label: '信用等级', value: '优良 (A+)', highlight: true },
          { label: '记录起始', value: '2025-01-10' },
          { label: '评估周期', value: '近 30 个工作日' },
          { label: '流水单号', value: `AUTH-BS-${selectedReportId.replace('bs-', '')}-712` }
        ] : []}
        theme="blue"
        statusText="社交行为表现优良"
        statusSub="基于平台互动数据动态评估"
      />
    </div>
  );
}
