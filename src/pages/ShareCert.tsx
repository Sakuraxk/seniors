import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Download, QrCode } from 'lucide-react';
import './ShareCert.css';

export default function ShareCert() {
  const navigate = useNavigate();

  return (
    <div className="share-cert-page page-container">
      <div className="share-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ChevronLeft size={28} />
        </button>
        <h2>分享认证信息</h2>
        <div style={{ width: 28 }} />
      </div>

      <div className="share-content">
        <div className="qr-card">
          <div className="qr-placeholder">
            <QrCode size={120} color="var(--primary)" />
          </div>
          <h3>扫码查看我的认证档案</h3>
          <p>银盾安鉴为您守护每一份信任</p>
        </div>
        
        <div className="share-actions">
          <button className="btn-primary full-width">
            <Share2 size={18} /> 发送给微信好友
          </button>
          <button className="btn-outline full-width">
            <Download size={18} /> 保存分享海报
          </button>
        </div>
      </div>
    </div>
  );
}
