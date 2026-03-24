import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stamp, ShieldCheck, Lock, Check, Clock, Eye, ArrowLeft, Copy, QrCode, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import { trustSealSteps, trustSealCertificate, certHistory, type TrustSealStep } from '../data/mockData';
import './TrustSeal.css';

export default function TrustSeal() {
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const [steps, setSteps] = useState<TrustSealStep[]>(trustSealSteps);
  const [showCert, setShowCert] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const cert = trustSealCertificate;

  const handleAdvanceStep = () => {
    const activeIndex = steps.findIndex(s => s.status === 'active');
    if (activeIndex === -1) return;

    const newSteps = steps.map((s, i) => {
      if (i === activeIndex) return { ...s, status: 'completed' as const };
      if (i === activeIndex + 1) return { ...s, status: 'active' as const };
      return s;
    });

    setSteps(newSteps);

    // If all steps completed, show certificate
    if (activeIndex === steps.length - 1 || newSteps.every(s => s.status === 'completed')) {
      setShowCert(true);
      setViewCount(1);
    }
  };

  const handleCopyLink = () => {
    const link = `https://yindun.safe/cert/${cert.verificationCode}`;
    navigator.clipboard?.writeText(link).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }).catch(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const handleQrCode = () => {
    setQrGenerated(true);
    setTimeout(() => setQrGenerated(false), 3000);
  };

  const allCompleted = steps.every(s => s.status === 'completed');
  const certExpired = viewCount >= cert.maxViews;

  // Status labels for cert history
  const historyStatusMap: Record<string, { label: string; color: string }> = {
    success: { label: '✅ 认证成功', color: '#4CAF50' },
    failed: { label: '❌ 认证失败', color: '#E53E3E' },
    expired: { label: '⏰ 已过期', color: '#FF9800' },
  };

  if (!hasStarted) {
    return (
      <div className="trust-seal-page page-container">
        <motion.button 
          className="back-button"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginBottom: '16px', fontSize: 'var(--font-base)', fontWeight: 600 }}
        >
          <ArrowLeft size={20} /> 返回
        </motion.button>

        <motion.div
          className="intro-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="intro-icon-wrapper">
            <ShieldCheck size={48} className="intro-icon" />
          </div>
          <h1>为什么需要「安心印」？</h1>
          <p className="intro-subtitle">告别虚假信息，守护银发社交安全</p>

          <div className="intro-features">
            <div className="intro-feature">
              <div className="feature-icon"><Stamp /></div>
              <div className="feature-text">
                <h3>权威数据源核验</h3>
                <p>摒弃手动填写，系统直接对接权威机构数据，从源头锁死真实信息。</p>
              </div>
            </div>
            <div className="intro-feature">
              <div className="feature-icon"><Lock /></div>
              <div className="feature-text">
                <h3>隐私绝对安全</h3>
                <p>不公开具体财产金额，仅展示认证标签，保护您的核心资产隐私。</p>
              </div>
            </div>
            <div className="intro-feature">
              <div className="feature-icon"><Eye /></div>
              <div className="feature-text">
                <h3>限时加密查看</h3>
                <p>生成的认证凭证24小时有效，防止信息被恶意截图或长期传播。</p>
              </div>
            </div>
          </div>

          <button className="btn-primary start-btn" onClick={() => setHasStarted(true)}>
            我已了解，开始认证
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="trust-seal-page page-container">
      <motion.button 
        className="back-button"
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginBottom: '16px', fontSize: 'var(--font-base)', fontWeight: 600 }}
      >
        <ArrowLeft size={20} /> 返回
      </motion.button>

      {/* Header */}
      <motion.div
        className="trust-seal-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🔒 安心印认证</h1>
        <p>5步闭环，源头锁真</p>
      </motion.div>

      {/* Step Flow */}
      <motion.section
        className="flow-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flow-section-title">
          <Clock size={22} />
          认证流程
        </div>
        <StepIndicator steps={steps} />

        {!allCompleted && (
          <button className="btn-primary trust-action-btn" onClick={handleAdvanceStep}>
            {steps.findIndex(s => s.status === 'active') === steps.length - 1
              ? '完成认证'
              : '推进下一步'}
          </button>
        )}
      </motion.section>

      {/* Certificate Preview */}
      <AnimatePresence>
        {(showCert || allCompleted) && (
          <motion.div
            className="cert-preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {certExpired ? (
              /* View-once expired state */
              <div className="cert-expired-notice">
                <Lock size={32} />
                <h3>凭证已查看</h3>
                <p>该凭证仅可查看 1 次，已达到查看上限。如需再次查看，请重新发起认证。</p>
              </div>
            ) : (
              <>
                <div className="cert-preview-header">
                  <div className="cert-stamp">
                    <Stamp />
                  </div>
                  <div className="cert-id-info">
                    <div className="cert-id">{cert.id}</div>
                    <div className="cert-time">签发于 {cert.issuedAt}</div>
                  </div>
                </div>

                <div className="cert-results">
                  {cert.items.map((item, i) => (
                    <motion.div
                      key={i}
                      className="cert-result-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div>
                        <div className="cert-result-label">{item.label}</div>
                        <div className="cert-result-source">数据来源：{item.source}</div>
                      </div>
                      <div className="cert-result-value">✅ {item.result}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="cert-verification-code">
                  <div className="code-label">验证编码</div>
                  <div className="code-value">{cert.verificationCode}</div>
                  <div className="code-tip">
                    <Lock size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> 可在官网核验 · 链接24小时有效 · 仅可查看1次
                  </div>
                </div>

                {/* Share Actions */}
                <div className="cert-share-actions">
                  <button className="cert-share-btn" onClick={handleCopyLink}>
                    {linkCopied ? <><CheckCircle size={18} /> 已复制</> : <><Copy size={18} /> 复制链接</>}
                  </button>
                  <button className="cert-share-btn" onClick={handleQrCode}>
                    {qrGenerated ? <><CheckCircle size={18} /> 已生成</> : <><QrCode size={18} /> 生成二维码</>}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cert History */}
      <motion.section
        className="cert-history-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="cert-history-title">
          <Clock size={20} /> 认证历史记录
        </h3>
        <div className="cert-history-list">
          {certHistory.map((record, index) => {
            const statusInfo = historyStatusMap[record.status] || historyStatusMap.success;
            return (
              <motion.div
                key={record.id}
                className={`cert-history-item ${record.status}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.08 }}
              >
                <div className="ch-left">
                  <div className="ch-name">{record.certName}</div>
                  <div className="ch-time">{record.time}</div>
                </div>
                <div className="ch-right">
                  <span className="ch-status" style={{ color: statusInfo.color }}>{statusInfo.label}</span>
                  <span className="ch-views">查看 {record.viewCount}/{record.maxViews} 次</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Safety Guarantee */}
      <motion.div
        className="safety-guarantee"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3><ShieldCheck size={20} /> 双重防造假保障</h3>
        <div className="safety-items">
          <div className="safety-item">
            <div className="safety-icon"><Check size={12} /></div>
            <span><strong>源头锁真</strong>：所有关键字段由系统对接权威数据源自动核验，不允许用户手动填写</span>
          </div>
          <div className="safety-item">
            <div className="safety-icon"><Check size={12} /></div>
            <span><strong>过程留痕</strong>：凭证含数据来源、生成时间、验证编码，所有操作可追溯</span>
          </div>
          <div className="safety-item">
            <div className="safety-icon"><Eye size={12} /></div>
            <span><strong>限时查看</strong>：访问链接24小时有效，仅可查看一次，防止信息泄露</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
