## Context

zhunzhun-process 是一个面向产品经理的 H5 流程演示项目，技术栈为 Vue 3 + Vant 4 + Pinia + Vue Router（Hash 模式）。当前项目仅有脚手架：`router` 路由为空、`store/user` 无状态、`api/user.ts` 为占位接口。

参考来源：
- **客户端** tarot-android：`SmsLoginActivity`（短信登录）、`AdvisoryMessageFragment`（消息列表）、`ChatActivity`（1v1 聊天室）
- **服务端** taluo-app-backend：H5 登录接口 `/api/h5/*`、IM 接口 `/v2/api/app/*`

演示项目约束：不接入真实后端与 Agora RTM，使用 Mock 数据模拟 API 响应，重点还原交互流程与视觉布局。

## Goals / Non-Goals

**Goals:**
- 建立统一演示首页，作为所有流程的入口导航
- 复刻 App 短信登录流程的核心交互（输入、验证码倒计时、协议、登录成功）
- 复刻 IM 消息列表与 1v1 聊天室的核心 UI 与交互
- 演示流程间可跳转，登录态在 Pinia 中持久化并在 IM 模块中体现

**Non-Goals:**
- 不接入闪验一键登录、微信登录
- 不接入 Agora RTM 实时消息推送（发送消息仅本地 Mock + 模拟延迟）
- 不实现图片/语音/塔罗/骰子等 IM 扩展功能
- 不对接真实后端 API（保留 Mock 层，后续可切换）

## Decisions

### 1. 页面路由结构

```
/              → redirect → /home
/home          → 演示首页（流程入口卡片）
/login         → 短信验证码登录
/im/list       → IM 消息列表
/im/chat/:id   → IM 聊天室（:id 为达人 expert_id）
```

**理由**：Hash 模式兼容 App WebView 嵌入；`/im/chat/:id` 与 App `ChatActivity.launch(expert_id)` 参数对齐。

### 2. Mock 数据层

在 `src/mock/` 目录维护 Mock 数据与拦截逻辑，API 模块（`src/api/login.ts`、`src/api/im.ts`）统一调用 Mock 函数，返回 Promise 模拟网络延迟（300–500ms）。

**替代方案**：axios-mock-adapter 拦截真实请求 —— 演示项目数据量小，直接 Mock 函数更简单可控。

Mock 数据结构对齐后端响应格式：
- 登录：`{ user_id, session_token, user_info: { nickname, avatar, phone_num } }`
- 会话列表：`{ list: [{ expert_id, expert_name, expert_avatar, last_message, unread_count, update_time }] }`
- 历史消息：`{ list: [{ message_id, type, content, sender_role, create_time }] }`

### 3. 组件拆分

| 组件 | 路径 | 职责 |
|------|------|------|
| `DemoEntryCard` | `components/demo/DemoEntryCard.vue` | 首页流程入口卡片 |
| `ChatSessionItem` | `components/im/ChatSessionItem.vue` | 会话列表单项 |
| `ChatMessageBubble` | `components/im/ChatMessageBubble.vue` | 消息气泡（文字） |
| `ChatInputBar` | `components/im/ChatInputBar.vue` | 聊天输入栏 |

页面组件仅负责数据编排与路由跳转，UI 细节下沉到子组件。

### 4. 用户状态管理

`src/store/user.ts` 存储：
- `userId`、`sessionToken`、`userInfo`（nickname/avatar/phone）
- `isLoggedIn` getter
- `login()` / `logout()` actions
- 登录成功后写入 `localStorage`，刷新页面保持登录态

IM 模块进入前检查 `isLoggedIn`，未登录则 Toast 提示并跳转 `/login?redirect=当前路径`。

### 5. UI 还原策略

- 使用 Vant 4 组件：`van-nav-bar`、`van-field`、`van-button`、`van-cell`、`van-checkbox`、`van-toast`
- 750px 设计稿，样式用 px 编写（postcss px2rem 自动转换）
- 登录页参考 `activity_sms_login.xml` 布局：顶部返回 + 「我先看看」、手机号/验证码输入、协议勾选
- 聊天室参考 `activity_chat.xml`：顶部达人信息栏、倒置消息列表、底部输入区

### 6. 演示首页流程卡片

| 卡片 | 标题 | 跳转 | 前置条件 |
|------|------|------|----------|
| 登录 | 短信验证码登录 | `/login` | 无 |
| IM 消息 | 消息列表 | `/im/list` | 需登录 |
| IM 聊天 | 与达人聊天 | `/im/chat/demo-expert-001` | 需登录 |

未登录点击 IM 相关卡片时，跳转登录页并携带 `redirect` 参数，登录成功后自动回跳。

## Risks / Trade-offs

- **[Risk] Mock 数据与真实 API 字段不一致** → Mock 结构参考 taluo-app-backend Controller 响应定义，类型定义放在 `src/types/`
- **[Risk] 无 RTM 导致聊天无实时感** → 发送消息后本地立即插入气泡并模拟 1s 后收到达人自动回复，满足演示需求
- **[Risk] 样式与 App 存在偏差** → 演示项目以流程还原为主，接受一定程度的视觉简化
- **[Trade-off] 不实现注册流程** → H5 登录 Mock 直接返回成功，简化演示路径；后续可扩展 `demo-register` capability

## Migration Plan

1. 按 tasks.md 顺序实现：基础设施 → 首页 → 登录 → IM 列表 → IM 聊天
2. 每完成一个模块即可独立演示，无破坏性变更
3. 无需数据迁移或部署回滚策略（纯前端演示项目）

## Open Questions

- 是否需要接入真实后端 API（开发环境 `.env.development` 已配置 `VITE_BASE_URL`）？当前方案为 Mock，后续可通过环境变量切换
- 是否需要增加更多演示流程（注册、达人详情、连麦咨询）？可在首页扩展卡片，作为后续 change 处理
