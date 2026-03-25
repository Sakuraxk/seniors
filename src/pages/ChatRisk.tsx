import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { toast } from 'react-toastify';
import { Ban, Flag, Phone, AlertTriangle, ShieldAlert, ChevronLeft, Volume2, PlusCircle, Smile, Search, UserPlus, CheckCircle, ShieldCheck, Award, Shield, X, Headphones, Bell } from 'lucide-react';
import RiskBanner from '../components/RiskBanner';
import CertBadge from '../components/CertBadge';
import { chatMessages, targetUser, conversationList, zhangChatMessages, systemMessages, friendsList } from '../data/mockData';
import type { ChatMessage } from '../data/mockData';
import './ChatRisk.css';

const riskLevels = [
  { num: 'L1', label: 'AI打标' },
  { num: 'L2', label: '降权' },
  { num: 'L3', label: '人工复核' },
  { num: 'L4', label: '举报复查' },
];

const sensitiveWords = ['转账', '借钱', '密码', '银行卡', '投资', '理财', '下载', '加群', '汇款'];

let globalConversations = [...conversationList];
let globalMessages: Record<string, ChatMessage[]> = {
  'conv-1': [...chatMessages],
  'conv-2': [...zhangChatMessages],
  'conv-3': [...systemMessages],
};

export default function ChatRisk() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialChatId = searchParams.get('chatId') || null;
  const [activeChatId, setActiveChatId] = useState<string | null>(initialChatId);

  const queryTab = searchParams.get('tab');
  let activeTab: 'messages' | 'friends' = 'messages';
  if (queryTab === 'friends' || queryTab === 'messages') {
    activeTab = queryTab;
  } else {
    const savedTab = sessionStorage.getItem('chatActiveTab');
    activeTab = savedTab === 'friends' ? 'friends' : 'messages';
  }

  useEffect(() => {
    sessionStorage.setItem('chatActiveTab', activeTab);
  }, [activeTab]);
  const [inputValue, setInputValue] = useState('');
  const initialUserId = searchParams.get('userId') || null;
  const [localConversations, setLocalConversations] = useState(globalConversations);
  const [dynamicMessages, setDynamicMessages] = useState<Record<string, ChatMessage[]>>(globalMessages);

  useEffect(() => {
    if (initialUserId) {
      const existingConv = localConversations.find(c => c.targetUserId === initialUserId);
      if (existingConv) {
        if (activeChatId !== existingConv.id) setActiveChatId(existingConv.id);
      } else {
        const friend = [targetUser, ...friendsList].find(f => f.id === initialUserId);
        if (friend) {
          const newConvId = `conv-new-${friend.id}`;
          const newConv = {
            id: newConvId,
            targetUserId: friend.id,
            targetUserName: friend.name,
            targetUserAvatar: friend.avatar || friend.name.charAt(0),
            lastMessage: '',
            time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
            unreadCount: 0,
            hasRisk: false,
          };
          setLocalConversations(prev => {
            if (prev.some(c => c.id === newConvId)) return prev;
            const next = [newConv, ...prev];
            globalConversations = next;
            return next;
          });
          setActiveChatId(newConvId);
        }
      }
    }
  }, [initialUserId]);

  // 添加好友
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [addSuccess, setAddSuccess] = useState(false);

  // 发送拦截弹窗
  const [showInterceptModal, setShowInterceptModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('');

  // 客服弹窗
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleSearchFriend = () => {
    const sId = searchId.trim().toUpperCase();
    const friend = friendsList.find(f => f.yinDunId === sId);
    if (friend) {
      setSearchResult(friend);
    } else if (sId === 'YD888888') {
      setSearchResult(targetUser);
    } else {
      setSearchResult('not_found');
    }
  };

  const [convListRef] = useAutoAnimate();
  const [msgListRef] = useAutoAnimate();

  const handleAddFriend = () => {
    setAddSuccess(true);
    toast.success('🎉 好友请求已发送！', { icon: false });
    setTimeout(() => {
      setShowAddFriend(false);
      setAddSuccess(false);
      setSearchId('');
      setSearchResult(null);
    }, 1500);
  };

  const attemptSend = () => {
    if (!inputValue.trim()) return;

    const hasRisk = sensitiveWords.some(w => inputValue.includes(w));

    if (hasRisk) {
      // Show interception modal + warning toast
      toast.warning('⚠️ 检测到敏感词汇，请谨慎发送', { icon: false });
      setPendingMessage(inputValue);
      setShowInterceptModal(true);
      return;
    }

    doSend(inputValue, false);
  };

  const doSend = (content: string, isRisk: boolean) => {
    if (!activeChatId) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'self',
      content,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      riskLevel: isRisk ? 'high' : 'none',
      riskType: isRisk ? '平台预警：涉及敏感词' : undefined,
    };

    setDynamicMessages(prev => {
      const next = {
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), newMsg]
      };
      globalMessages = next;
      return next;
    });
    
    setLocalConversations(prev => {
      const next = prev.map(c => 
        c.id === activeChatId 
          ? { ...c, lastMessage: content, time: newMsg.time } 
          : c
      );
      globalConversations = next;
      return next;
    });
    setInputValue('');
    setShowInterceptModal(false);
    setPendingMessage('');
  };

  const confirmSend = () => {
    doSend(pendingMessage, true);
  };

  const cancelSend = () => {
    setShowInterceptModal(false);
    setPendingMessage('');
  };

  // ===== Message List View =====
  if (!activeChatId) {
    return (
      <div className="chat-risk-page list-view">
        <div className="message-list-header">
          <h2>{activeTab === 'messages' ? '聊天' : '好友'}</h2>
          <button className="add-friend-btn" onClick={() => setShowAddFriend(true)}>
            <UserPlus size={20} />
            <span>加好友</span>
          </button>
        </div>
        
        <div className="protection-status-banner">
          <div className="psb-icon"><ShieldAlert size={16} /></div>
          <span className="psb-text">银盾安鉴实时护航聊天安全</span>
          <div className="psb-pulse" />
        </div>
        
        <div className="chat-tools-grid">
          <button 
            className="chat-tool-btn risk hover-lift" 
            onClick={() => navigate('/risk-alert')}
          >
            <AlertTriangle size={16} />
            <span>风险雷达</span>
          </button>
          <button 
            className="chat-tool-btn call hover-lift" 
            onClick={() => navigate('/call-records')}
          >
            <Phone size={16} />
            <span>通话留痕</span>
          </button>
        </div>
        
        <div className="conversation-list" ref={convListRef}>
          {activeTab === 'messages' ? (
            localConversations.map((conv, index) => (
              <motion.div 
                key={conv.id}
                className="conversation-item"
                onClick={() => setActiveChatId(conv.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`conv-avatar ${conv.isSystem ? 'system' : ''}`}>
                  {conv.isSystem ? <Bell size={24} /> : conv.targetUserAvatar}
                  {conv.unreadCount > 0 && (
                    <span className="unread-badge">{conv.unreadCount}</span>
                  )}
                </div>
                <div className="conv-content">
                  <div className="conv-top">
                    <span className="conv-name">
                      {conv.targetUserName}
                      {conv.hasRisk && <AlertTriangle size={14} color="#FF4757" style={{ marginLeft: 4, display: 'inline-block' }} />}
                    </span>
                    <span className="conv-time">{conv.time}</span>
                  </div>
                  <div className="conv-bottom">
                    {conv.hasRisk && <span className="conv-risk-text">[风险提示] </span>}
                    <span className="conv-last-msg">{conv.lastMessage}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            friendsList.map((friend, index) => (
              <motion.div 
                key={friend.id}
                className="conversation-item"
                onClick={() => {
                  // Ensure the current URL has tab=friends so navigate(-1) returns here
                  window.history.replaceState(null, '', '/chat-risk?tab=friends');
                  navigate(`/user-profile?userId=${friend.id}`);
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="conv-avatar">
                  {friend.avatar || friend.name.charAt(0)}
                </div>
                <div className="conv-content">
                  <div className="conv-top">
                    <span className="conv-name">
                      {friend.name}
                      <span className="age-tag" style={{ marginLeft: '8px' }}>{friend.age}岁</span>
                    </span>
                  </div>
                  <div className="conv-bottom">
                    <span className="conv-last-msg" style={{ fontSize: '12px' }}>安鉴号: {friend.yinDunId}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* 添加好友弹窗 */}
        {showAddFriend && (
          <div className="add-friend-overlay">
            <motion.div 
              className="add-friend-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header">
                <h3>添加好友</h3>
                <button className="close-btn" onClick={() => {
                  setShowAddFriend(false);
                  setSearchId('');
                  setSearchResult(null);
                  setAddSuccess(false);
                }}>✕</button>
              </div>
              
              <div className="search-box-container">
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="输入银盾安鉴号 (例如: YD888888)" 
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchFriend()}
                  />
                </div>
                <button className="search-action-btn" onClick={handleSearchFriend}>搜索</button>
              </div>

              <div className="search-result-area">
                {searchResult === 'not_found' && (
                  <div className="no-result">未找到该安鉴号对应的用户</div>
                )}

                {searchResult && searchResult !== 'not_found' && (
                  <div className="user-result-card">
                    <div className="user-info-row">
                      <div className="user-avatar">{searchResult.name.charAt(0)}</div>
                      <div className="user-details">
                        <div className="user-name">{searchResult.name} <span className="age-tag">{searchResult.age}岁</span></div>
                        <div className="user-id">安鉴号: {searchResult.yinDunId}</div>
                      </div>
                    </div>
                    <div className="cert-mini-dashboard">
                      <div className={`cert-mini-badge ${searchResult.greenCard?.some((c: any) => c.status === 'verified') ? 'green-active' : ''}`}>
                        <ShieldCheck size={14} /> 绿卡保障
                      </div>
                      <div className={`cert-mini-badge ${searchResult.goldCard?.some((c: any) => c.status === 'verified') ? 'gold-active' : ''}`}>
                        <Award size={14} /> 金卡底盘
                      </div>
                      <div className={`cert-mini-badge ${searchResult.blueShield?.some((c: any) => c.status === 'verified') ? 'blue-active' : ''}`}>
                        <Shield size={14} /> 蓝盾信用
                      </div>
                    </div>

                    {searchResult.isFriend ? (
                      <button 
                        className="do-add-btn" 
                        style={{ background: 'var(--bg-warm-2)', color: 'var(--text-secondary)' }}
                        onClick={() => {
                          setShowAddFriend(false);
                          navigate(`/user-profile?userId=${searchResult.id}`);
                        }}
                      >
                        已是好友
                      </button>
                    ) : addSuccess ? (
                      <div className="success-state">
                        <CheckCircle size={20} color="#4CAF50" />
                        <span>已发送请求</span>
                      </div>
                    ) : (
                      <button className="do-add-btn" onClick={handleAddFriend}>加为好友</button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  // ===== Chat Room View =====
  const activeConv = localConversations.find(c => c.id === activeChatId);
  const chatMsgs = activeChatId ? (dynamicMessages[activeChatId] || []) : [];
  
  const isTargetChat = activeChatId === 'conv-1';
  const isSystemChat = activeConv?.isSystem || false;
  const isUserChat = !isSystemChat;
  
  const hasHighRisk = chatMsgs.some((m: any) => m.riskLevel === 'high');
  const chatIsRiskAccount = activeConv?.hasRisk || false;
  
  const allUsers = [targetUser, ...friendsList];
  const chatUser = activeConv ? allUsers.find(u => u.id === activeConv.targetUserId) : null;

  return (
    <div className="chat-risk-page chat-room-view">
      {/* Risk Account Shield Warning */}
      {chatIsRiskAccount && (
        <motion.div
          className="risk-shield-warning"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShieldAlert size={18} />
          <span>该账号存在多次被举报风险，请谨慎聊天</span>
        </motion.div>
      )}

      {/* Chat header */}
      <div className="chat-header">
        <button className="back-btn" onClick={() => setActiveChatId(null)}>
          <ChevronLeft size={24} />
        </button>
        <div 
          className={`chat-avatar ${activeConv?.isSystem ? 'system' : ''}`}
          onClick={() => isUserChat && chatUser && navigate(`/user-profile?userId=${chatUser.id}`)}
          style={{ cursor: isUserChat ? 'pointer' : 'default', border: activeConv?.hasRisk ? '2px solid #FF4757' : 'none' }}
        >
          {activeConv?.isSystem ? <Bell size={20} /> : activeConv?.targetUserAvatar}
        </div>
        <div 
          className="chat-user-info"
          onClick={() => isUserChat && chatUser && navigate(`/user-profile?userId=${chatUser.id}`)}
          style={{ cursor: isUserChat ? 'pointer' : 'default' }}
        >
          <div className="chat-user-name">
            {activeConv?.targetUserName} 
            {activeConv?.hasRisk && <AlertTriangle size={14} color="#FF4757" style={{ display: 'inline-block', marginLeft: 4 }} />}
          </div>
          <div className="chat-user-status">
            {isSystemChat ? '官方通知' : `在线${chatUser ? ` · ${chatUser.age}岁` : ''}`}
          </div>
        </div>
        <div className="chat-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isUserChat && chatUser && (
            <div className="chat-header-badge">
              <CertBadge type="green" label="已认证" />
            </div>
          )}
          <button 
            onClick={() => navigate('/voice-call')}
            style={{ 
              background: 'none', border: 'none', color: 'var(--primary)', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.5rem', borderRadius: '50%', backgroundColor: 'rgba(255, 107, 53, 0.1)'
            }}
          >
            <Phone size={18} />
          </button>
        </div>
      </div>

      {/* Risk Banner */}
      {hasHighRisk && (
        <div className="chat-warning-area">
          <RiskBanner
            title="⚠️ 风险预警"
            description="检测到对方发送涉及资金诱导和敏感信息索取的内容，请务必谨慎！"
          />
        </div>
      )}

      {/* 4 Level Risk Control */}
      {isTargetChat && (
        <div className="risk-levels-section">
          <div className="risk-levels-title">🛡️ 四级风控机制</div>
          <div className="risk-levels">
            {riskLevels.map((level, i) => (
              <motion.div
                key={i}
                className="risk-level-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="level-num">{level.num}</span>
                <span className="level-label">{level.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages" ref={msgListRef}>
        {chatMsgs.map((msg: any, index: number) => (
          <motion.div
            key={msg.id}
            className={`chat-bubble-wrapper ${msg.sender}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className={`chat-bubble ${msg.riskLevel !== 'none' ? `risk-${msg.riskLevel}` : ''}`}>
              {msg.content}
            </div>
            {msg.riskLevel && msg.riskLevel !== 'none' && (
              <span className={`risk-tag ${msg.riskLevel}`}>
                {msg.riskLevel === 'high' ? <ShieldAlert size={12} /> : <AlertTriangle size={12} />}
                {msg.riskType}
              </span>
            )}
            <span className="chat-time">{msg.time}</span>
          </motion.div>
        ))}
      </div>

      {/* Input & Actions */}
      <div className="chat-actions">
        <div className="chat-input-row" style={{ alignItems: 'center' }}>
          <button className="chat-icon-btn"><Volume2 size={24} /></button>
          <input 
            className="chat-input" 
            placeholder="输入消息(试着发送'借钱')..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') attemptSend();
            }}
          />
          <button className="chat-icon-btn"><Smile size={24} /></button>
          {!inputValue ? (
            <button className="chat-icon-btn"><PlusCircle size={24} /></button>
          ) : (
            <button className="chat-send-btn-small" onClick={attemptSend}>
              发送
            </button>
          )}
        </div>
        {isUserChat && (
          <div className="quick-actions" style={{ marginTop: '12px' }}>
            <button className="quick-action-btn block">
              <Ban size={18} /> 拉黑
            </button>
            <button className="quick-action-btn report">
              <Flag size={18} /> 举报
            </button>
            <button className="quick-action-btn help" onClick={() => setShowSupportModal(true)}>
              <Headphones size={18} /> 人工客服
            </button>
          </div>
        )}
      </div>

      {/* Send Interception Modal */}
      <AnimatePresence>
        {showInterceptModal && (
          <motion.div
            className="intercept-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="intercept-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="intercept-icon">
                <ShieldAlert size={36} />
              </div>
              <h3>⚠️ 检测到敏感内容</h3>
              <p>您发送的消息包含敏感词汇，可能涉及资金安全风险。</p>
              <div className="intercept-msg-preview">
                "{pendingMessage}"
              </div>
              <div className="intercept-tip">
                平台建议您谨慎发送，避免因此遭受金钱损失。
              </div>
              <div className="intercept-actions">
                <button className="intercept-cancel" onClick={cancelSend}>
                  取消发送
                </button>
                <button className="intercept-confirm" onClick={confirmSend}>
                  仍然发送
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Service Modal */}
      <AnimatePresence>
        {showSupportModal && (
          <motion.div
            className="intercept-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSupportModal(false)}
          >
            <motion.div
              className="intercept-modal support-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close-x" onClick={() => setShowSupportModal(false)}><X size={20} /></button>
              <div className="intercept-icon" style={{ color: '#2196F3' }}>
                <Headphones size={36} />
              </div>
              <h3>联系人工客服</h3>
              <p>专业客服人员7×24小时在线，为您解答任何安全问题。</p>
              <div className="support-options">
                <button className="support-option-btn">
                  <Phone size={18} /> 电话求助 400-888-8888
                </button>
                <button className="support-option-btn primary">
                  <Headphones size={18} /> 在线客服即时连接
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
