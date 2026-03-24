import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, Home, PiggyBank, ArrowLeft, ShieldAlert, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../data/mockData';
import ReportModal from '../components/ReportModal';
import CustomerServiceModal from '../components/CustomerServiceModal';
import './CardStyles.css';

const iconMap: Record<string, React.ComponentType<any>> = {
  'banknote': Banknote,
  'home': Home,
  'piggy-bank': PiggyBank,
};

const statusLabel: Record<string, string> = {
  verified: '✅ 已验证',
  pending: '⏳ 验证中',
  unverified: '未验证',
};

export default function GoldCard() {
  const navigate = useNavigate();
  const data = currentUser.goldCard;
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);

  return (
    <div className="gold-card-page page-container">
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
        <h1><span style={{color: '#F5A623'}}>🟡</span> 金卡 · 经济底盘</h1>
        <p>个人资产与支付能力核验</p>
      </motion.div>

      <motion.div 
        className="gold-privacy-notice"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ShieldAlert size={16} />
        仅显示安全认证标签，不公开具体金额，守护您的隐私安全
      </motion.div>

      <div className="detail-list">
        {data.map((item, index) => {
          const Icon = iconMap[item.icon] || CreditCard;
          return (
            <motion.div
              key={item.id}
              className="detail-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="detail-icon-wrapper gold">
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
                      <div className="info-row"><span>流水编号：</span><span>AUTH-GD-{item.id.replace('gk-', '')}-451</span></div>
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
          { label: '数据脱敏', value: '具体金额已隐藏', highlight: true },
          { label: '核验渠道', value: '社保系统及官方登记中心' },
          { label: '核验结论', value: '资产及退休记录真实有效' },
          { label: '流水单号', value: `AUTH-GD-${selectedReportId.replace('gk-', '')}-451` }
        ] : []}
        theme="gold"
        statusText="经济底盘认证有效"
        statusSub="隐私内容不予外泄"
      />
    </div>
  );
}
