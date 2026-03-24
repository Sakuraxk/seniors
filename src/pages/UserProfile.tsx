import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserPlus, Check, MessageCircle, FileCheck, 
  ShieldCheck, CreditCard, Shield, IdCard, HeartPulse,
  Banknote, Home, PiggyBank, Users, Trophy, ArrowLeft
} from 'lucide-react';
import { targetUser, friendsList, conversationList, type CertItem } from '../data/mockData';
import './UserProfile.css';

const certIconMap: Record<string, React.ComponentType<{ className?: string, size?: number }>> = {
  'id-card': IdCard,
  'shield-check': ShieldCheck,
  'heart-pulse': HeartPulse,
  'banknote': Banknote,
  'home': Home,
  'piggy-bank': PiggyBank,
  'users': Users,
  'trophy': Trophy,
  'message-circle': MessageCircle,
};

const statusLabel: Record<string, string> = {
  verified: '以验证',
  pending: '验证中',
  unverified: '未验证',
};

function CertRow({ item }: { item: CertItem }) {
  const Icon = certIconMap[item.icon] || ShieldCheck;
  return (
    <div className="cert-card-item">
      <div className="cert-card-icon">
        <Icon size={18} />
      </div>
      <div className="cert-card-info">
        <div className="cert-card-name">{item.label}</div>
        <div className="cert-card-desc">{item.description}</div>
      </div>
      <div className={`cert-card-status ${item.status}`}>
        {item.status === 'verified' && <Check size={14} />}
        {statusLabel[item.status]}
      </div>
    </div>
  );
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  
  const allUsers = [targetUser, ...friendsList];
  const user = (userId ? allUsers.find(u => u.id === userId) : null) || targetUser;
  
  // Check friend status from friendsList membership
  const isInFriendsList = friendsList.some(f => f.id === user.id);
  const [isFriend, setIsFriend] = useState(isInFriendsList || user.isFriend || false);

  const handleAddFriend = () => {
    setIsFriend(true);
  };

  // Find the conversation for this user to enable direct chat navigation
  const conv = conversationList.find(c => c.targetUserId === user.id);

  return (
    <div className="user-profile-page page-container">
      <motion.button 
        className="back-button"
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ 
          background: 'none', border: 'none', color: 'var(--text-secondary)', 
          display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', 
          margin: '16px 20px 0', fontSize: 'var(--font-base)', fontWeight: 600 
        }}
      >
        <ArrowLeft size={20} /> 返回
      </motion.button>

      {/* Header Info */}
      <motion.div 
        className="user-profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-avatar">{user.name.charAt(0)}</div>
        <h1 className="profile-name">{user.name}</h1>
        <div className="profile-meta">
          <span>{user.age}岁</span>
          <span>·</span>
          <span>距您 2.5km</span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="profile-actions"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {!isFriend ? (
          <button className="profile-action-btn primary" onClick={handleAddFriend}>
            <UserPlus size={18} /> 加为好友
          </button>
        ) : (
          <button className="profile-action-btn primary added" disabled>
            <Check size={18} /> 已是好友
          </button>
        )}
        <button className="profile-action-btn secondary" onClick={() => {
          if (conv) {
            navigate(`/chat-risk?chatId=${conv.id}`);
          } else {
            navigate('/chat-risk');
          }
        }}>
          <MessageCircle size={18} /> 发消息
        </button>
        <button className="profile-action-btn trust-seal-action" onClick={() => navigate('/trust-seal')}>
          <FileCheck size={18} /> 请求查看安心印
        </button>
      </motion.div>

      {/* Verification Cards */}
      <motion.div 
        className="profile-cards-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Green Card */}
        <div className="cert-card-group">
          <div className="cert-card-group-title">
            <ShieldCheck color="#4CAF50" /> 绿卡 · 身份与健康
          </div>
          {user.greenCard.map(item => (
            <CertRow key={item.id} item={item} />
          ))}
        </div>

        {/* Gold Card */}
        <div className="cert-card-group">
          <div className="cert-card-group-title">
            <CreditCard color="#FF9800" /> 金卡 · 经济底盘
          </div>
          {user.goldCard.map(item => (
            <CertRow key={item.id} item={item} />
          ))}
        </div>

        {/* Blue Shield */}
        <div className="cert-card-group">
          <div className="cert-card-group-title">
            <Shield color="#2196F3" /> 蓝盾 · 社交信用
          </div>
          {user.blueShield.map(item => (
            <CertRow key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
