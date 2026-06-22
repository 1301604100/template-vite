## Context

咨询 Tab `ConsultExpertCard` 已区分 `click` 与 `consult` 事件，但两者均跳转 IM。IM 聊天页顶部有达人信息卡片，消息气泡含达人头像，均无跳转。设计稿达人主页为独立全屏页，含三个 Tab 和底部连麦操作栏。

## Goals / Non-Goals

**Goals:**

- 实现 `/expert/:expertId` 达人主页，UI 对齐设计稿
- 统一导航：列表卡片/IM 头像 → 达人主页；「立即咨询」→ IM 聊天
- 达人主页展示连麦咨询（含 1v1 私密连麦）、文字套餐、服务、评价
- Mock 数据与现有 `expert_id` 对齐

**Non-Goals:**

- 真实关注、打赏、预约连麦、支付流程
- 进入直播间、语音试听播放
- 首页金刚位等其他入口跳转达人主页（本次仅咨询 Tab + 首页咨询区块 + IM）

## Decisions

### 1. 路由：`/expert/:expertId` 独立全屏页

**选择**: 与 `/im/chat/:expertId` 同级，独立全屏，`meta: { requiresAuth: true }`。

**理由**: 达人主页为完整页面，需隐藏 Tab 栏；返回使用 `router.back()`。

### 2. 导航规则

| 入口 | 点击区域 | 目标 |
|------|----------|------|
| 咨询 Tab / 首页咨询 | 卡片主体 | `/expert/:expertId` |
| 咨询 Tab / 首页咨询 | 「立即咨询」 | `/im/chat/:expertId` |
| IM 聊天 | 顶部达人信息区 | `/expert/:expertId` |
| IM 聊天 | 消息气泡达人头像 | `/expert/:expertId` |
| 达人主页 | 返回 | `router.back()` |
| 达人主页 | 「免费私聊」 | `/im/chat/:expertId` |

### 3. 页面结构

```
┌─────────────────────────────┐
│ ←  达人主页            □   │  van-nav-bar（透明/深色）
├─────────────────────────────┤
│ [封面背景]                   │
│ [头像] 感情咨询师  [+ 关注]  │  ExpertProfileHeader
│ 排行榜第4名 · 粉丝/好评/连麦  │
│ [标签] 治愈达人 星盘导师      │
├─────────────────────────────┤
│ 个人简介 | 服务 | 评价        │  van-tabs
├─────────────────────────────┤
│ （Tab 内容区，可滚动）         │
│  - 简介 + 连麦咨询区块         │
│  - 文字套餐 + 服务列表         │
│  - 评价列表                   │
├─────────────────────────────┤
│ 打赏 | 已预约连麦 | 免费私聊   │  底部固定操作栏
└─────────────────────────────┘
```

### 4. 数据模型：`ExpertProfile`

扩展字段（基于 `ExpertInfo`）：

```typescript
interface ExpertProfile {
  expert_id: string;
  expert_name: string;
  expert_avatar: string;
  cover_url: string;
  online_status: string;
  good_rate: number;
  follower_count: number;
  service_count: number;
  rank_label?: string;        // 实力老师排行榜第4名
  tags: string[];             // 治愈达人、星盘导师
  bio: string;
  is_followed: boolean;
  voice_call_price: number;     // 普通连麦
  private_call_price: number;   // 1v1私密连麦
  appointment_status?: string;  // 您已预约，预计等待12分钟
  appointment_time?: string;
  text_packages: TextPackage[];
  services: ExpertService[];
  reviews: ExpertReview[];
}
```

Mock 复用 `demo-expert-001` ~ `006` 的 ID。

### 5. ConsultExpertCard 事件语义

- `click` → 跳转达人主页（卡片主体点击，不含按钮）
- `consult` → 跳转 IM 聊天（「立即咨询」按钮，`@click.stop` 已有）

### 6. ChatMessageBubble 头像点击

新增 `avatar-click` 事件，仅达人侧头像可点击跳转。

## Risks / Trade-offs

- **[Risk] 卡片点击与按钮冲突** → 按钮已用 `@click.stop`，保持不变
- **[Risk] ExpertProfile Mock 数据量大** → 首版 1 套完整模板 + 按 expert_id 复用，差异仅名称/头像
- **[Risk] 从 IM 进入主页再点「免费私聊」循环** → 可接受，演示流程合理
