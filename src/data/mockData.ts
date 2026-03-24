// ============================
// 银发社交 — 全局模拟数据
// ============================

export interface CertItem {
  id: string;
  label: string;
  status: 'verified' | 'pending' | 'unverified';
  icon: string;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  certLevel: 'high' | 'medium' | 'low';
  isFriend?: boolean;
  yinDunId?: string; // 加入银盾安鉴号
  greenCard: CertItem[];
  goldCard: CertItem[];
  blueShield: CertItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'self' | 'other';
  content: string;
  time: string;
  riskLevel?: 'none' | 'low' | 'medium' | 'high';
  riskType?: string;
}

export interface RiskAccount {
  id: string;
  name: string;
  avatar: string;
  riskReasons: string[];
  reportCount: number;
  riskLevel: 'medium' | 'high';
}

export interface TrustSealStep {
  step: number;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  icon: string;
}

export interface FamilyGuardian {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  isLinked: boolean;
  lastActive: string;
}

export interface Notification {
  id: string;
  type: 'review' | 'alert' | 'info';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
}

export interface CallRecord {
  id: string;
  contactName: string;
  duration: string;
  time: string;
  hasRecording: boolean;
  riskFlag: boolean;
}

// ===== 用户资料 =====
export const currentUser: UserProfile = {
  id: 'user-001',
  name: '王阿姨',
  age: 62,
  avatar: '',
  certLevel: 'high',
  yinDunId: 'YD666666',
  greenCard: [
    { id: 'gc-1', label: '身份证核验', status: 'verified', icon: 'id-card', description: '已通过公安人口库实名认证' },
    { id: 'gc-2', label: '无犯罪记录', status: 'verified', icon: 'shield-check', description: '已通过公安局无犯罪记录查询' },
    { id: 'gc-3', label: '体检认证', status: 'pending', icon: 'heart-pulse', description: '等待医院HIS系统数据核验' },
  ],
  goldCard: [
    { id: 'gk-1', label: '退休金验证', status: 'verified', icon: 'banknote', description: '已通过社保系统核验退休金发放记录' },
    { id: 'gk-2', label: '不动产验证', status: 'verified', icon: 'home', description: '已通过不动产登记中心核验' },
    { id: 'gk-3', label: '存款验证', status: 'unverified', icon: 'piggy-bank', description: '尚未申请银行存款核验' },
  ],
  blueShield: [
    { id: 'bs-1', label: '子女护航', status: 'verified', icon: 'users', description: '已绑定子女账号，启用护航功能' },
    { id: 'bs-2', label: '履约率', status: 'verified', icon: 'trophy', description: '约会履约率 96%，信用优良' },
    { id: 'bs-3', label: '良好互动', status: 'verified', icon: 'message-circle', description: '收到 28 个好评，互动记录良好' },
  ],
};

// ===== 目标对象（被查看方）=====
export const targetUser: UserProfile = {
  id: 'user-002',
  name: '李伯伯',
  age: 65,
  avatar: '',
  certLevel: 'medium',
  isFriend: false,
  yinDunId: 'YD888888',
  greenCard: [
    { id: 'gc-1', label: '身份证核验', status: 'verified', icon: 'id-card', description: '已通过公安人口库实名认证' },
    { id: 'gc-2', label: '无犯罪记录', status: 'verified', icon: 'shield-check', description: '已通过公安局无犯罪记录查询' },
    { id: 'gc-3', label: '体检认证', status: 'verified', icon: 'heart-pulse', description: '已通过三甲医院体检报告核验' },
  ],
  goldCard: [
    { id: 'gk-1', label: '退休金验证', status: 'verified', icon: 'banknote', description: '已通过社保系统核验退休金发放记录' },
    { id: 'gk-2', label: '不动产验证', status: 'pending', icon: 'home', description: '不动产核验进行中' },
    { id: 'gk-3', label: '存款验证', status: 'unverified', icon: 'piggy-bank', description: '尚未申请银行存款核验' },
  ],
  blueShield: [
    { id: 'bs-1', label: '子女护航', status: 'unverified', icon: 'users', description: '尚未绑定子女账号' },
    { id: 'bs-2', label: '履约率', status: 'verified', icon: 'trophy', description: '约会履约率 89%' },
    { id: 'bs-3', label: '良好互动', status: 'verified', icon: 'message-circle', description: '收到 15 个好评' },
  ],
};

// ===== 张阿姨（好友） =====
export const zhangAuntie: UserProfile = {
  id: 'user-003',
  name: '张阿姨',
  age: 60,
  avatar: '',
  certLevel: 'high',
  isFriend: true,
  yinDunId: 'YD777777',
  greenCard: [
    { id: 'gc-1', label: '身份证核验', status: 'verified', icon: 'id-card', description: '已通过公安人口库实名认证' },
    { id: 'gc-2', label: '无犯罪记录', status: 'verified', icon: 'shield-check', description: '已通过公安局无犯罪记录查询' },
    { id: 'gc-3', label: '体检认证', status: 'verified', icon: 'heart-pulse', description: '已通过三甲医院体检报告核验' },
  ],
  goldCard: [
    { id: 'gk-1', label: '退休金验证', status: 'verified', icon: 'banknote', description: '已通过社保系统核验退休金发放记录' },
    { id: 'gk-2', label: '不动产验证', status: 'verified', icon: 'home', description: '已通过不动产登记中心核验' },
    { id: 'gk-3', label: '存款验证', status: 'unverified', icon: 'piggy-bank', description: '尚未申请银行存款核验' },
  ],
  blueShield: [
    { id: 'bs-1', label: '子女护航', status: 'verified', icon: 'users', description: '已绑定子女账号，启用护航功能' },
    { id: 'bs-2', label: '履约率', status: 'verified', icon: 'trophy', description: '约会履约率 98%，信用优秀' },
    { id: 'bs-3', label: '良好互动', status: 'verified', icon: 'message-circle', description: '收到 42 个好评，互动记录良好' },
  ],
};

// ===== 好友列表 =====
export const friendsList: UserProfile[] = [
  zhangAuntie,
  {
    id: 'user-004',
    name: '周大爷',
    age: 68,
    avatar: '',
    certLevel: 'medium',
    yinDunId: 'YD333333',
    isFriend: true,
    greenCard: [
      { id: 'gc-1', label: '身份证核验', status: 'verified', icon: 'id-card', description: '已通过公安人口库实名认证' },
      { id: 'gc-2', label: '无犯罪记录', status: 'verified', icon: 'shield-check', description: '已通过公安局无犯罪记录查询' },
      { id: 'gc-3', label: '体检认证', status: 'unverified', icon: 'heart-pulse', description: '尚未实名验证' },
    ],
    goldCard: [
      { id: 'gk-1', label: '退休金验证', status: 'verified', icon: 'banknote', description: '已通过社保系统核验' },
      { id: 'gk-2', label: '不动产验证', status: 'unverified', icon: 'home', description: '尚未申请' },
      { id: 'gk-3', label: '存款验证', status: 'unverified', icon: 'piggy-bank', description: '尚未申请' },
    ],
    blueShield: [
      { id: 'bs-1', label: '子女护航', status: 'unverified', icon: 'users', description: '尚未绑定' },
      { id: 'bs-2', label: '履约率', status: 'verified', icon: 'trophy', description: '约会履约率 100%' },
      { id: 'bs-3', label: '良好互动', status: 'verified', icon: 'message-circle', description: '收到 8 个好评' },
    ],
  },
  {
    ...targetUser,
    id: 'user-005',
    name: '王小芬',
    avatar: '芬',
    isFriend: true,
    yinDunId: 'YD555555',
  }
];

// ===== 聊天消息（含风险消息） =====
export const chatMessages: ChatMessage[] = [
  { id: 'm1', sender: 'other', content: '王阿姨你好呀，看了你的资料，感觉我们很合适呢！', time: '09:15', riskLevel: 'none' },
  { id: 'm2', sender: 'self', content: '你好李伯伯，我也觉得咱们兴趣爱好挺相似的。', time: '09:16', riskLevel: 'none' },
  { id: 'm3', sender: 'other', content: '是啊，我也喜欢跳广场舞和下棋。你平时都在哪个公园？', time: '09:18', riskLevel: 'none' },
  { id: 'm4', sender: 'self', content: '朝阳公园那边，你呢？', time: '09:20', riskLevel: 'none' },
  { id: 'm5', sender: 'other', content: '我就住附近！对了，方便把你的微信号给我吗？在这上面聊不太方便。', time: '09:22', riskLevel: 'medium', riskType: '诱导离开平台' },
  { id: 'm6', sender: 'other', content: '我最近在做一个理财项目，回报率特别高，要不要一起参加？先投个两万试试？', time: '09:25', riskLevel: 'high', riskType: '资金诱导' },
  { id: 'm7', sender: 'other', content: '你把银行卡号发给我，我帮你操作，很简单的。', time: '09:26', riskLevel: 'high', riskType: '敏感信息索取' },
];

// ===== 张阿姨聊天消息 =====
export const zhangChatMessages: ChatMessage[] = [
  { id: 'zm1', sender: 'other', content: '王姐，好久不见！最近身体怎么样？', time: '昨天 08:30', riskLevel: 'none' },
  { id: 'zm2', sender: 'self', content: '挺好的，每天都去公园锻炼。你呢？', time: '昨天 08:32', riskLevel: 'none' },
  { id: 'zm3', sender: 'other', content: '我也是，最近学了太极拳，感觉比广场舞还好！', time: '昨天 08:35', riskLevel: 'none' },
  { id: 'zm4', sender: 'self', content: '是吗？下次教教我呀！', time: '昨天 08:38', riskLevel: 'none' },
  { id: 'zm5', sender: 'other', content: '没问题！明天早上九点公园门口见。', time: '昨天 08:40', riskLevel: 'none' },
];

// ===== 系统通知消息 =====
export const systemMessages: ChatMessage[] = [
  { id: 'sm1', sender: 'other', content: '欢迎使用银盾安鉴平台，我们将全力保障您的社交安全。', time: '上周五', riskLevel: 'none' },
  { id: 'sm2', sender: 'other', content: '您已成功绑定子女护航功能，家人将实时关注您的安全动态。', time: '上周六', riskLevel: 'none' },
  { id: 'sm3', sender: 'other', content: '您的安心印认证已更新，当前认证完成度 78%。建议尽快完成剩余认证项目。', time: '星期一', riskLevel: 'none' },
];

// ===== 会话列表 =====
export const conversationList = [
  {
    id: 'conv-1',
    targetUserId: targetUser.id,
    targetUserName: targetUser.name,
    targetUserAvatar: targetUser.name.charAt(0),
    lastMessage: '你把银行卡号发给我，我帮你操作，很简单的。',
    time: '09:26',
    unreadCount: 3,
    hasRisk: true,
  },
  {
    id: 'conv-2',
    targetUserId: 'user-003',
    targetUserName: '张阿姨',
    targetUserAvatar: '张',
    lastMessage: '明天早上九点公园门口见。',
    time: '昨天',
    unreadCount: 0,
    hasRisk: false,
  },
  {
    id: 'conv-3',
    targetUserId: 'system-001',
    targetUserName: '系统通知',
    targetUserAvatar: '系',
    lastMessage: '您的安心印认证已更新',
    time: '星期一',
    unreadCount: 0,
    hasRisk: false,
    isSystem: true,
  }
];

// ===== 安心印认证流程 =====
export const trustSealSteps: TrustSealStep[] = [
  { step: 1, title: '发起认证请求', description: '向对方发起安心印认证请求', status: 'completed', icon: 'send' },
  { step: 2, title: '对方授权确认', description: '等待对方同意授权查看认证信息', status: 'completed', icon: 'check-circle' },
  { step: 3, title: '系统自动核验', description: '系统对接第三方权威数据源核验', status: 'active', icon: 'search' },
  { step: 4, title: '生成安心凭证', description: '核验通过后生成含验证编码的电子凭证', status: 'pending', icon: 'file-badge' },
  { step: 5, title: '限时安全查看', description: '凭证链接24小时有效，仅可查看一次', status: 'pending', icon: 'eye' },
];

// ===== 安心凭证 =====
export const trustSealCertificate = {
  id: 'CERT-2026032401',
  targetName: '李伯伯',
  issuedAt: '2026-03-24 14:30',
  expiresAt: '2026-03-25 14:30',
  verificationCode: 'AX-8K2M-P9R3',
  dataSource: '公安人口库 / 社保系统',
  items: [
    { label: '实名认证', result: '通过', source: '公安人口库' },
    { label: '无犯罪记录', result: '通过', source: '公安局' },
    { label: '退休金核验', result: '通过', source: '社保系统' },
  ],
  viewCount: 0,
  maxViews: 1,
};

// ===== 风险账号 =====
export const riskAccounts: RiskAccount[] = [
  {
    id: 'risk-001',
    name: '张某某',
    avatar: '',
    riskReasons: ['频繁向多位用户索要红包', '被举报 5 次', '新注册账号频繁私信'],
    reportCount: 5,
    riskLevel: 'high',
  },
  {
    id: 'risk-002',
    name: '刘某某',
    avatar: '',
    riskReasons: ['反复索要联系方式', '诱导用户转移到其他平台'],
    reportCount: 3,
    riskLevel: 'medium',
  },
];

// ===== 子女护航 =====
export const familyGuardians: FamilyGuardian[] = [
  {
    id: 'fg-001',
    name: '王小明',
    relation: '儿子',
    avatar: '',
    isLinked: true,
    lastActive: '2026-03-24 10:30',
  },
  {
    id: 'fg-002',
    name: '王小红',
    relation: '女儿',
    avatar: '',
    isLinked: true,
    lastActive: '2026-03-24 08:15',
  },
];

// ===== 子女通知列表 =====
export const familyNotifications: Notification[] = [
  { id: 'n1', type: 'alert', title: '风险预警', content: '检测到有人向妈妈索要银行卡信息', time: '09:26', isRead: false },
  { id: 'n2', type: 'review', title: '认证审核', content: '妈妈收到了来自「李伯伯」的安心印请求', time: '09:00', isRead: false },
  { id: 'n3', type: 'info', title: '每周报告', content: '本周妈妈社交活跃，与3位用户有良好互动', time: '昨天', isRead: true },
  { id: 'n4', type: 'alert', title: '异常访问', content: '有用户5分钟内浏览妈妈资料超过10次', time: '前天', isRead: true },
];

// ===== 通话记录 =====
export const callRecords: CallRecord[] = [
  { id: 'cr-1', contactName: '李伯伯', duration: '15:32', time: '今天 09:30', hasRecording: true, riskFlag: false },
  { id: 'cr-2', contactName: '张某某', duration: '03:45', time: '昨天 16:20', hasRecording: true, riskFlag: true },
  { id: 'cr-3', contactName: '赵阿姨', duration: '22:10', time: '昨天 10:00', hasRecording: false, riskFlag: false },
];

// ===== 产品亮点数据 =====
export const productHighlights = [
  {
    id: 'h1',
    title: '权威验证',
    description: '对接公安、社保、银行等权威数据源，从源头杜绝信息造假',
    icon: 'shield-check',
    color: '#4CAF50',
  },
  {
    id: 'h2',
    title: '全流程风控',
    description: '从资料审核到聊天通话，全环节动态风险识别与干预',
    icon: 'scan-eye',
    color: '#FF6B35',
  },
  {
    id: 'h3',
    title: '适老化设计',
    description: '大字体、大按钮、图形化标签，让复杂信息一看就懂',
    icon: 'accessibility',
    color: '#FFB347',
  },
  {
    id: 'h4',
    title: '子女护航',
    description: '支持子女绑定参与审核，风险实时通知家人安心',
    icon: 'heart-handshake',
    color: '#E91E63',
  },
  {
    id: 'h5',
    title: '事中预警',
    description: '在转账、借钱等高风险节点及时打断，而非事后亡羊补牢',
    icon: 'bell-ring',
    color: '#FF4757',
  },
];

// ===== 异常访问监测 =====
export const abnormalAccessData = [
  { type: '频繁查看资料', count: 3, description: '5分钟内重复访问同一用户10次以上' },
  { type: '批量下载照片', count: 1, description: '短时间内保存多张用户照片' },
  { type: '深夜异常活跃', count: 2, description: '凌晨2-5点密集发送消息' },
  { type: '多设备同时登录', count: 0, description: '同一账号在不同地区同时登录' },
];

// ===== 谁看了我的资料 =====
export interface PrivacyAccessRecord {
  id: string;
  visitorName: string;
  visitTime: string;
  viewedSection: string;
  isAbnormal: boolean;
}

export const privacyAccessRecords: PrivacyAccessRecord[] = [
  { id: 'pa-1', visitorName: '李伯伯', visitTime: '今天 09:15', viewedSection: '基本资料', isAbnormal: false },
  { id: 'pa-2', visitorName: '未知用户', visitTime: '今天 03:22', viewedSection: '认证信息', isAbnormal: true },
  { id: 'pa-3', visitorName: '张某某', visitTime: '昨天 16:45', viewedSection: '全部资料', isAbnormal: true },
  { id: 'pa-4', visitorName: '赵阿姨', visitTime: '昨天 10:30', viewedSection: '基本资料', isAbnormal: false },
  { id: 'pa-5', visitorName: '未知用户', visitTime: '前天 22:10', viewedSection: '照片', isAbnormal: true },
];

// ===== 违规记录 =====
export interface ViolationRecord {
  id: string;
  type: string;
  reason: string;
  penalty: string;
  time: string;
  status: 'active' | 'resolved';
}

export const violationRecords: ViolationRecord[] = [
  { id: 'vr-1', type: '盗图', reason: '使用网络图片作为个人照片', penalty: '信用分-10，照片已移除', time: '2026-03-20', status: 'resolved' },
  { id: 'vr-2', type: '骚扰', reason: '频繁向不相识用户发送消息', penalty: '限制消息发送3天', time: '2026-03-15', status: 'resolved' },
];

// ===== 认证历史记录 =====
export interface CertHistoryRecord {
  id: string;
  certType: string;
  certName: string;
  time: string;
  status: 'success' | 'failed' | 'expired';
  viewCount: number;
  maxViews: number;
}

export const certHistory: CertHistoryRecord[] = [
  { id: 'ch-1', certType: 'identity', certName: '身份认证', time: '2026-03-24 14:30', status: 'success', viewCount: 1, maxViews: 1 },
  { id: 'ch-2', certType: 'finance', certName: '财产认证', time: '2026-03-23 10:00', status: 'success', viewCount: 0, maxViews: 1 },
  { id: 'ch-3', certType: 'health', certName: '健康认证', time: '2026-03-20 16:00', status: 'expired', viewCount: 1, maxViews: 1 },
  { id: 'ch-4', certType: 'identity', certName: '身份认证', time: '2026-03-18 09:00', status: 'failed', viewCount: 0, maxViews: 1 },
];

// ===== 通话存证详情 =====
export interface EvidenceDetail {
  callRecordId: string;
  evidenceId: string;
  encryptionStatus: 'encrypted' | 'pending';
  timestamp: string;
  storageExpiry: string;
  canDownload: boolean;
  canReport: boolean;
}

export const evidenceDetails: EvidenceDetail[] = [
  { callRecordId: 'cr-1', evidenceId: 'EV-20260324-001', encryptionStatus: 'encrypted', timestamp: '2026-03-24 09:30:00', storageExpiry: '2026-06-24', canDownload: true, canReport: true },
  { callRecordId: 'cr-2', evidenceId: 'EV-20260323-002', encryptionStatus: 'encrypted', timestamp: '2026-03-23 16:20:00', storageExpiry: '2026-06-23', canDownload: true, canReport: true },
  { callRecordId: 'cr-3', evidenceId: 'EV-20260323-003', encryptionStatus: 'pending', timestamp: '2026-03-23 10:00:00', storageExpiry: '2026-06-23', canDownload: false, canReport: false },
];

// ===== 安全中心FAQ =====
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FaqItem[] = [
  { id: 'faq-1', question: '什么是安心印认证？', answer: '安心印是银盾安鉴平台提供的权威身份核验凭证。通过对接公安、社保、银行等权威数据源，自动核验用户的真实信息，生成限时有效的加密凭证，确保您的社交对象身份真实可信。', category: '认证中心' },
  { id: 'faq-2', question: '我的资产信息会被泄露吗？', answer: '绝对不会。平台仅显示"已认证"标签，不会公开任何具体金额或账号信息。所有认证数据均经过加密处理，且凭证仅限24小时查看一次后自动失效。', category: '隐私安全' },
  { id: 'faq-3', question: '子女护航功能如何使用？', answer: '在个人中心绑定子女手机号，经子女确认后即可开启护航功能。子女将实时收到您的风险预警信息，可远程协助您处理可疑情况。', category: '子女护航' },
  { id: 'faq-4', question: '遇到可疑用户怎么办？', answer: '立即点击聊天界面的"举报"按钮，平台将在2小时内进行人工核查。严重情况可使用"一键求助"按钮直接联系家人和客服。', category: '风险预警' },
  { id: 'faq-5', question: '通话留痕数据保存多久？', answer: '通话留痕数据加密存储90天，期间您可随时申请下载举证凭证。过期后数据将自动销毁，确保隐私安全。', category: '留痕存证' },
  { id: 'faq-6', question: '如何提高我的信用等级？', answer: '完成三大认证（绿卡、金卡、蓝盾）、保持良好的社交行为记录、绑定子女护航功能都可以提升您的信用等级。', category: '认证中心' },
];

// ===== 系统公告 =====
export interface SystemAnnouncement {
  id: string;
  title: string;
  content: string;
  type: 'warning' | 'info' | 'update';
  time: string;
}

export const systemAnnouncements: SystemAnnouncement[] = [
  { id: 'sa-1', title: '近期诈骗高发预警', content: '近期出现冒充"投资顾问"的诈骗手段，请勿轻信任何高回报投资承诺。', type: 'warning', time: '2026-03-24' },
  { id: 'sa-2', title: '安心印功能升级', content: '安心印认证现已支持健康体检报告在线核验，认证更全面。', type: 'update', time: '2026-03-23' },
  { id: 'sa-3', title: '春季社交安全提醒', content: '与新朋友见面请选择公共场所，首次通话建议开启留痕功能。', type: 'info', time: '2026-03-22' },
];

// ===== 风险同步记录 =====
export interface RiskSyncRecord {
  id: string;
  content: string;
  time: string;
  notifiedTo: string;
  isHandled: boolean;
}

export const riskSyncRecords: RiskSyncRecord[] = [
  { id: 'rs-1', content: '检测到高风险聊天：对方索要银行卡信息', time: '2026-03-24 09:26', notifiedTo: '王小明（儿子）', isHandled: true },
  { id: 'rs-2', content: '收到风险账号张某某的好友请求', time: '2026-03-23 16:30', notifiedTo: '王小红（女儿）', isHandled: true },
  { id: 'rs-3', content: '异常访问：未知用户凌晨多次查看资料', time: '2026-03-23 03:22', notifiedTo: '王小明（儿子）', isHandled: false },
];
