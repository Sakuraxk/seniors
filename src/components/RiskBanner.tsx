import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './RiskBanner.css';

interface RiskBannerProps {
  title: string;
  description: string;
  onClose?: () => void;
}

export default function RiskBanner({ title, description, onClose }: RiskBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="risk-banner">
      <AlertTriangle className="risk-icon" />
      <div className="risk-content">
        <div className="risk-title">⚠️ {title}</div>
        <div className="risk-desc">{description}</div>
      </div>
      <X
        className="risk-close"
        onClick={(e) => {
          e.stopPropagation();
          setVisible(false);
          onClose?.();
        }}
      />
    </div>
  );
}
