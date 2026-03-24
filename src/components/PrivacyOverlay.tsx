import React, { useEffect, useState } from 'react';
import './PrivacyOverlay.css';
import { currentUser } from '../data/mockData';

interface PrivacyOverlayProps {
  children: React.ReactNode;
  active?: boolean;
}

export default function PrivacyOverlay({ children, active = true }: PrivacyOverlayProps) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Prevent PrintScreen key if possible (Not fully reliable in all browsers, but demonstrative)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }
    };

    // Prevent context menu (right click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };

    // Prevent copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
    };
  }, [active]);

  if (!active) return <>{children}</>;

  // Generate watermark pattern
  const watermarkText = `平台安全护航 · 银盾安鉴号: ${currentUser.id}`;

  return (
    <div className="privacy-container">
      {/* Watermark Base */}
      <div className="watermark-layer">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="watermark-text" style={{
            top: `${Math.floor(i / 4) * 20}%`,
            left: `${(i % 4) * 25}%`,
            transform: 'rotate(-30deg)'
          }}>
            {watermarkText}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="privacy-content">
        {children}
      </div>

      {/* Flash Warning on action */}
      {showWarning && (
        <div className="privacy-warning-toast bounce-in">
          🛡️ 涉及隐私信息，平台禁止复制或截图外传
        </div>
      )}
    </div>
  );
}
