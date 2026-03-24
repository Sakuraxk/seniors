import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneOff, MicOff, Volume2, ShieldAlert, 
  Ban, Flag, Phone, ShieldCheck
} from 'lucide-react';
import { targetUser } from '../data/mockData';
import './VoiceCall.css';

export default function VoiceCall() {
  const [callDuration, setCallDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showRiskMenu, setShowRiskMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Timer
  useEffect(() => {
    let interval: number | undefined;
    if (isConnected) {
      interval = window.setInterval(() => setCallDuration(c => c + 1), 1000);
    }
    return () => window.clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleHangUp = () => {
    setIsConnected(false);
    setTimeout(() => {
      window.history.back();
    }, 1500);
  };

  return (
    <div className="voice-call-page">
      {/* Background blur/gradient */}
      <div className="call-bg-overlay"></div>

      <div className="call-container">
        {/* Header: Safe Recording Indication */}
        <div className="call-header">
          <button 
            className={`recording-toggle ${isRecording ? 'active' : ''}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? (
              <>
                <motion.div 
                  className="recording-dot"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                /> 
                <span>安心留痕已开启</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} /> 
                <span>开启留痕保障</span>
              </>
            )}
          </button>
        </div>

        {/* Central Info: Avatar and Name */}
        <div className="call-info">
          {/* Audio Waves Animation */}
          {isConnected && isRecording && (
            <div className="audio-waves">
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="wave-circle"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                />
              ))}
            </div>
          )}

          <div className="call-avatar-container">
            <div className="call-avatar-letter">
              {targetUser.name.charAt(0)}
            </div>
            
            {isConnected && (
              <motion.div 
                className="activity-ring"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </div>
          
          <h2 className="caller-name">{targetUser.name}</h2>
          <div className="call-status">
            {isConnected ? formatTime(callDuration) : '通话已结束'}
          </div>
        </div>

        {/* Middle warning / banner area */}
        {showRiskMenu && (
          <motion.div 
            className="emergency-actions-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="emergency-header">
              <ShieldAlert size={18} />
              <span>发现风险？可快捷操作</span>
            </div>
            <div className="action-grid">
               <button className="action-item danger">
                  <div className="icon-wrapper"><Ban size={20} /></div>
                  <span>一键拉黑</span>
               </button>
               <button className="action-item warning">
                  <div className="icon-wrapper"><Flag size={20} /></div>
                  <span>恶意举报</span>
               </button>
               <button className="action-item support">
                  <div className="icon-wrapper"><Phone size={20} /></div>
                  <span>人工求助</span>
               </button>
            </div>
          </motion.div>
        )}

        {/* Bottom Controls */}
        <div className="call-controls">
          <button className="control-btn secondary">
            <MicOff size={24} />
            <span>静音</span>
          </button>

          <button className="control-btn hangup" onClick={handleHangUp}>
            <PhoneOff size={32} />
          </button>

          <button className="control-btn secondary">
            <Volume2 size={24} />
            <span>免提</span>
          </button>
        </div>

        {/* Emergency Risk Toggle */}
        <button 
          className="risk-toggle-btn"
          onClick={() => setShowRiskMenu(!showRiskMenu)}
        >
          <ShieldAlert size={20} />
          <span>风险求助</span>
        </button>

        {/* Info Text */}
        <div className="call-footer-text">
          通话中若感到不适，请随时点击下方风险求助按钮<br/>
          留痕信息仅用于纠纷处理及安全复核
        </div>
      </div>
    </div>
  );
}
