import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserRound, Phone, MessageSquare, Check, Copy } from 'lucide-react';
import './ModalStyles.css';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerServiceModal({ isOpen, onClose }: CustomerServiceModalProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    });
  };

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
              <div className="modal-title">专属随访客服</div>
              <button className="close-btn" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="cs-profile">
                <div className="cs-avatar">
                  <UserRound size={40} />
                </div>
                <div className="cs-name">小安</div>
                <div className="cs-role">您的专属安全认证专员</div>
              </div>

              <div className="cs-contact-list">
                <div className="cs-contact-card">
                  <div className="cs-contact-info">
                    <div className="cs-contact-icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="cs-contact-label">服务热线</div>
                      <div className="cs-contact-value">400-888-9999</div>
                    </div>
                  </div>
                  <button 
                    className={`btn-copy ${copiedType === 'phone' ? 'copied' : ''}`}
                    onClick={() => handleCopy('400-888-9999', 'phone')}
                  >
                    {copiedType === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedType === 'phone' ? '已复制' : '复制'}
                  </button>
                </div>

                <div className="cs-contact-card">
                  <div className="cs-contact-info">
                    <div className="cs-contact-icon" style={{ background: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}>
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <div className="cs-contact-label">客服微信</div>
                      <div className="cs-contact-value">YdAnJian_001</div>
                    </div>
                  </div>
                  <button 
                    className={`btn-copy ${copiedType === 'wechat' ? 'copied' : ''}`}
                    onClick={() => handleCopy('YdAnJian_001', 'wechat')}
                  >
                    {copiedType === 'wechat' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedType === 'wechat' ? '已复制' : '复制'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
