import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Brain, UserCheck, CheckCircle2, AlertTriangle, Clock,
  Upload, XCircle, AlertCircle, ChevronLeft
} from 'lucide-react';
import './VerificationReview.css';

interface ReviewItem {
  id: string;
  label: string;
  score: number | null;
  status: 'pending' | 'scanning' | 'pass' | 'warning' | 'rejected';
  detail: string;
  rejectReason?: string;
}

export default function VerificationReview() {
  const [phase, setPhase] = useState<'upload' | 'ai-review' | 'manual-review' | 'done'>('upload');
  const [progress, setProgress] = useState(0);
  
  const [items, setItems] = useState<ReviewItem[]>([
    { id: '1', label: '合规性筛查', score: null, status: 'pending', detail: '检查是否存在违规文字内容' },
    { id: '2', label: '风险词识别', score: null, status: 'pending', detail: '扫描借贷、投资、诱导类词汇' },
    { id: '3', label: '照片真实性', score: null, status: 'pending', detail: '基于AI模型判断照片是否为网图/过度精修' },
    { id: '4', label: '资料完整度', score: null, status: 'pending', detail: '评估核心资料填充率' },
  ]);

  useEffect(() => {
    if (phase === 'ai-review') {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        
        // Dynamically update statuses based on progress
        setItems(prev => prev.map((item, index) => {
          const triggerPoint = (index + 1) * 20;
          if (currentProgress >= triggerPoint) {
            const isWarning = item.id === '3';
            const isRejected = item.id === '2';
            if (isRejected) {
              return { 
                ...item, 
                status: 'warning',
                score: 62,
                detail: '检测到疑似诱导类敏感词',
                rejectReason: '资料中包含"高回报投资"等敏感词，请修改后重新提交'
              };
            }
            if (isWarning) {
              return { 
                ...item, 
                status: 'warning',
                score: 78,
                detail: '检测到轻微修图痕迹'
              };
            }
            return { 
              ...item, 
              status: 'pass',
              score: 95 + Math.floor(Math.random() * 5),
              detail: '未见异常，数据合规'
            };
          }
          if (currentProgress >= triggerPoint - 15) {
            return { ...item, status: 'scanning' };
          }
          return item;
        }));

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('manual-review'), 1000);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleSubmit = () => {
    setPhase('ai-review');
  };

  return (
    <div className="review-page page-container">
      <motion.div 
        className="review-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ position: 'relative' }}
      >
        <button 
          onClick={() => window.history.back()} 
          style={{ position: 'absolute', left: '20px', top: '24px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          <ChevronLeft size={28} />
        </button>
        <div className="review-header-icon">
          <ShieldCheck size={32} />
        </div>
        <h1>双层安全审核系统</h1>
        <p>系统正在对您的资料进行全方位保护性筛查</p>
      </motion.div>

      {/* Upload Phase */}
      {phase === 'upload' && (
        <motion.div
          className="upload-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Sensitive word auto-detect notice */}
          <div className="sensitive-notice">
            <AlertCircle size={18} />
            <span>系统将自动检测敏感词（如借贷、投资、诱导类词汇），请确保资料内容合规。</span>
          </div>

          <div className="upload-card">
            <div className="upload-icon">
              <Upload size={36} />
            </div>
            <h3>提交资料审核</h3>
            <p>上传个人资料，系统将依次进行 AI 智能初审和人工重点复核，确保信息真实可信。</p>
            <div className="upload-checklist">
              <div className="upload-check-item">✅ 合规性筛查</div>
              <div className="upload-check-item">✅ 风险词识别</div>
              <div className="upload-check-item">✅ 照片真实性检测</div>
              <div className="upload-check-item">✅ 资料完整度评估</div>
            </div>
            <button className="btn-primary full-width" onClick={handleSubmit}>
              提交资料开始审核
            </button>
          </div>
        </motion.div>
      )}

      {/* Status Banner */}
      {phase !== 'upload' && (
        <motion.div 
          className={`status-banner ${phase}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {phase === 'ai-review' && (
            <>
              <Brain className="spin-slow" />
              <div>
                <h3>AI 智能初审中</h3>
                <p>预计还需要 5 秒钟...</p>
              </div>
            </>
          )}
          {phase === 'manual-review' && (
            <>
              <UserCheck />
              <div>
                <h3>进入人工重点复核</h3>
                <p>由于部分资料涉及灰度内容，平台专属审核员正在为您把关</p>
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Progress Bar (AI Phase) */}
      {phase === 'ai-review' && (
        <div className="progress-section">
          <div className="progress-bar-bg">
            <motion.div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
          <div className="progress-text">{progress}%</div>
        </div>
      )}

      {/* Review Items */}
      {phase !== 'upload' && (
        <div className="review-items">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`review-item ${item.status}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="item-icon-wrapper">
                {item.status === 'pending' && <Clock className="text-gray-400" />}
                {item.status === 'scanning' && <Brain className="text-blue-500 pulse" />}
                {item.status === 'pass' && <CheckCircle2 className="text-green-500" />}
                {item.status === 'warning' && <AlertTriangle className="text-yellow-500" />}
                {item.status === 'rejected' && <XCircle className="text-red-500" />}
              </div>
              
              <div className="item-content">
                <div className="item-title-row">
                  <h4>{item.label}</h4>
                  {item.score !== null && (
                    <span className={`score-badge ${item.status}`}>
                      {item.score} 分
                    </span>
                  )}
                </div>
                <p className="item-detail">{item.detail}</p>
                {/* Rejection reason display */}
                {item.rejectReason && (
                  <div className="reject-reason">
                    <XCircle size={14} />
                    <span>{item.rejectReason}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Manual Review Phase details */}
      {phase === 'manual-review' && (
        <motion.div 
          className="manual-review-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="manual-info-header">
            <ShieldCheck size={20} /> 人工复核说明
          </div>
          <ul className="manual-info-list">
            <li><strong>触发原因：</strong>AI判定存在异常或难以判断的灰度内容（如照片修图痕迹）。</li>
            <li><strong>复核内容：</strong>将由受过专业培训的安全员对资料的真实性和规范性进行二次确认。</li>
            <li><strong>预计时间：</strong>约 10 分钟。复核期间您的资料暂不对外公开，保护隐私。</li>
          </ul>
        </motion.div>
      )}

      {/* Action Button */}
      {phase !== 'upload' && (
        <motion.div 
          className="review-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button 
            className="btn-primary full-width"
            disabled={phase === 'ai-review'}
            onClick={() => window.history.back()}
          >
            {phase === 'ai-review' ? '正在智能审核...' : '关闭返回'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
