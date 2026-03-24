# 🛡️ 银盾安鉴 — 银发社交安全守护

> 银发社交产品「银盾安鉴与安全风控」前端展示系统

## 📖 项目简介

本项目为银发社交产品打造**银盾安鉴与安全风控**功能的前端展示系统，围绕银发用户社交场景中**信息难辨、诈骗风险高、隐私泄露、子女难把关**四大核心痛点，构建了完整的安全体系前端界面。

### 核心功能模块

| 模块 | 说明 |
|------|------|
| 🏠 **首页 Landing** | 品牌宣传页，展示银盾安鉴核心价值与五大安全亮点 |
| 📋 **认证看板** | 资产极简认证展示：绿卡(身份健康)、金卡(经济底盘)、蓝盾(社交信用) |
| 🔒 **安心印认证** | 5步闭环认证流程可视化，支持交互推进步骤 |
| 💬 **聊天风险预警** | 模拟聊天界面，展示敏感词识别、风险高亮、四级风控机制 |
| 🛡️ **风险防护** | 防护罩模式、风险账号警示展示、异常访问监测面板 |
| 👨‍👩‍👧‍👦 **子女护航** | 家人绑定管理、安全通知、通话留痕、一键求助SOS |

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### 安装与启动

```bash
# 1. 克隆项目
git clone <仓库地址>
cd seniors

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

启动后访问 **http://localhost:5173** 即可查看项目。

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vite](https://vitejs.dev/) | 8.x | 构建工具，快速启动与热更新 |
| [React](https://react.dev/) | 18.x | UI 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | 类型安全 |
| [React Router](https://reactrouter.com/) | 6.x | SPA 路由管理 |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | 流畅页面动画与微交互 |
| [Lucide React](https://lucide.dev/) | — | 现代简洁图标库 |
| Vanilla CSS | — | 自定义样式，最大灵活性 |

---

## 📁 项目结构

```
seniors/
├── public/                   # 静态资源
├── src/
│   ├── components/           # 公共组件
│   │   ├── NavBar.tsx        # 底部Tab导航栏（首页/认证/消息/我的）
│   │   ├── NavBar.css
│   │   ├── CertBadge.tsx     # 认证标签组件（绿卡/金卡/蓝盾）
│   │   ├── CertBadge.css
│   │   ├── RiskBanner.tsx    # 风险警示条（红色横幅，可关闭）
│   │   ├── RiskBanner.css
│   │   ├── StepIndicator.tsx # 步骤指示器（5步流程可视化）
│   │   └── StepIndicator.css
│   ├── pages/                # 页面组件
│   │   ├── Landing.tsx       # 首页/品牌宣传页
│   │   ├── Landing.css
│   │   ├── CertDashboard.tsx # 资产极简认证看板
│   │   ├── CertDashboard.css
│   │   ├── TrustSeal.tsx     # 安心印认证流程
│   │   ├── TrustSeal.css
│   │   ├── ChatRisk.tsx      # 聊天风险预警
│   │   ├── ChatRisk.css
│   │   ├── RiskAlert.tsx     # 风险账号警示展示
│   │   ├── RiskAlert.css
│   │   ├── FamilyGuard.tsx   # 子女护航面板
│   │   └── FamilyGuard.css
│   ├── data/
│   │   └── mockData.ts       # 集中管理的模拟数据
│   ├── App.tsx               # 根组件 + 路由配置
│   ├── App.css
│   ├── main.tsx              # 入口文件
│   └── index.css             # 全局设计系统（主题变量/动画/通用样式）
├── index.html                # HTML 入口
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 设计系统

### 主题色板

| 颜色角色 | 色值 | 用途 |
|----------|------|------|
| 🟠 主色 | `#FF6B35` | 按钮、导航激活态、品牌主色 |
| 🟡 辅色 | `#FF8C42` | 渐变过渡、hover 状态 |
| 🌟 强调色 | `#FFB347` | 高亮、数据指标 |
| 🟢 绿卡色 | `#4CAF50` | 身份与健康认证 |
| 🥇 金卡色 | `#FFD700` | 经济底盘认证 |
| 🔵 蓝盾色 | `#2196F3` | 社交信用认证 |
| 🔴 危险色 | `#FF4757` | 风险警示、高风险标记 |
| ⬛ 深色背景 | `#0F0F1A` | 页面背景 |

### 适老化设计原则

- **基础字号 18px**，关键信息 22-28px
- **按钮最小高度 52px**，触摸目标充足
- **高对比度色彩**，避免灰色文字
- **图形化标签**（绿卡/金卡/蓝盾）替代复杂文字说明
- **大图标 + 简洁文案**，减少认知负担

---

## 🗺️ 路由表

| 路径 | 页面 | 导航Tab |
|------|------|---------|
| `/` | Landing 首页 | 首页 |
| `/cert-dashboard` | 认证看板 | 认证 |
| `/trust-seal` | 安心印认证流程 | — |
| `/chat-risk` | 聊天风险预警 | 消息 |
| `/risk-alert` | 风险账号警示 | — |
| `/family-guard` | 子女护航面板 | 我的 |

---

## 📦 模拟数据说明

所有模拟数据集中在 `src/data/mockData.ts`，包含：

| 数据 | 类型 | 说明 |
|------|------|------|
| `currentUser` | `UserProfile` | 当前用户（王阿姨）的完整认证信息 |
| `targetUser` | `UserProfile` | 对象用户（李伯伯）的认证信息 |
| `chatMessages` | `ChatMessage[]` | 7条模拟聊天消息，含3条风险消息 |
| `trustSealSteps` | `TrustSealStep[]` | 安心印5步流程状态 |
| `trustSealCertificate` | `object` | 认证凭证详情（编码/来源/时间） |
| `riskAccounts` | `RiskAccount[]` | 2个风险账号（高风险/中风险） |
| `familyGuardians` | `FamilyGuardian[]` | 2位已绑定家人 |
| `familyNotifications` | `Notification[]` | 4条安全通知 |
| `callRecords` | `CallRecord[]` | 3条通话留痕记录 |
| `productHighlights` | `object[]` | 5大产品亮点 |
| `abnormalAccessData` | `object[]` | 4类异常访问监测数据 |

---

## 🧑‍💻 开发指南

### 添加新页面

1. 在 `src/pages/` 下创建 `NewPage.tsx` 和 `NewPage.css`
2. 在 `src/App.tsx` 中添加路由：
   ```tsx
   import NewPage from './pages/NewPage';
   // 在 <Routes> 中添加
   <Route path="/new-page" element={<NewPage />} />
   ```
3. 如需在底部导航显示，修改 `src/components/NavBar.tsx` 中的 `navItems` 数组

### 修改主题色

全局 CSS 变量定义在 `src/index.css` 的 `:root` 选择器中，修改对应变量即可全局生效。

### 修改模拟数据

所有数据集中在 `src/data/mockData.ts`，修改对应数组/对象即可，页面会自动引用最新数据。

---

## 📄 功能策划文档

详细功能策划方案请参考项目根目录下的 `功能策划.docx`。

---

## 📝 License

Private — 仅供内部使用
