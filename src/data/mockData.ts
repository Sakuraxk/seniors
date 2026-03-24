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
