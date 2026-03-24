import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import './ModalStyles.css';

export interface ReportItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: ReportItem[];
  statusText?: string;
  statusSub?: string;
  theme?: 'green' | 'gold' | 'blue';
}

export default function ReportModal({ 
  isOpen, 
  onClose, 
  title, 
  items, 
  statusText = '已通过官方核验', 
  statusSub = '数据来源真实有效', 
  theme = 'green' 
}: ReportModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-header">
              <div className="modal-title">
                <ShieldCheck size={20} color={theme === 'green' ? '#4CAF50' : theme === 'blue' ? '#2196F3' : '#F5A623'} />
                {title}
              </div>
              <button className="close-btn" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className={`report-status-banner ${theme}`}>
                <ShieldCheck size={28} />
                <div>
                  <div className="report-status-text">{statusText}</div>
                  <div className="report-status-sub">{statusSub}</div>
                </div>
              </div>

              <div className="report-details-list">
                {items.map((item, index) => (
                  <div key={index} className="report-detail-item">
                    <div className="report-detail-label">{item.label}</div>
                    <div className={`report-detail-value ${item.highlight ? 'highlight' : ''}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
