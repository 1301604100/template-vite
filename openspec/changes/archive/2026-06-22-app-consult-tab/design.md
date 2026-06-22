## Context

当前 `/app/qa` 为浅色占位页，底部 Tab 显示「问答」。设计稿该 Tab 为深色「1v1咨询」列表，含排序 Tab 与筛选弹窗。首页 `HomeConsultSection` 已实现达人卡片 UI，但点击仅 Toast。IM 聊天页 `/im/chat/:expertId` 已可用，Mock 达人 ID 为 `demo-expert-001` 等，与首页咨询 Mock（`expert_1`）不一致，需对齐。

## Goals / Non-Goals

**Goals:**

- 实现咨询 Tab 完整列表 UI（对齐设计稿）
- 排序 Tab 切换与筛选弹窗交互（前端 Mock 过滤）
- 咨询 Tab / 首页「立即咨询」→ `/im/chat/:expertId`
- 首页「更多」→ `/app/qa` 咨询 Tab
- IM 聊天返回 → `router.back()` 回到来源页（首页/咨询 Tab/消息 Tab）
- 四个 Tab 页使用 keep-alive 缓存，切换 Tab 后返回保留滚动位置与页面状态
- 底部 Tab 文案改为「咨询」
- 抽取可复用 `ConsultExpertCard` 组件

**Non-Goals:**

- 真实搜索、连麦支付、语音试听播放
- 路由路径从 `/app/qa` 重命名为 `/app/consult`（保持现有路由，仅改展示文案）
- 底部 Tab 改为 5 个（设计稿中间「问」按钮不在本次范围）

## Decisions

### 1. 路由保持 `/app/qa`，Tab 文案改「咨询」

**选择**: 复用现有子路由 `/app/qa`，仅更新 `van-tabbar-item` 文案和页面内容。

**理由**: 最小改动，不影响已有路由守卫和 Tab 索引逻辑。

### 2. 组件复用：`ConsultExpertCard`

**选择**: 新建 `ConsultExpertCard.vue`，首页 `HomeConsultSection` 和咨询 Tab 共用。

**理由**: 卡片结构一致（头像、状态、好评率、价格、简介、立即咨询），避免重复。

### 3. expert_id 与 IM Mock 对齐

**选择**: 将 `MOCK_CONSULT_EXPERTS` 的 `expert_id` 改为 `demo-expert-001` ~ `demo-expert-006`，并在 `mock/im.ts` 补充对应 `ExpertInfo`。

**理由**: 点击「立即咨询」后 IM 聊天页需能加载达人信息和历史消息。

### 4. 排序与筛选：前端 Mock 实现

**选择**:

| 排序 Tab | 排序逻辑 |
|----------|----------|
| 综合 | 默认顺序 |
| 优选老师 | 有 badge 的排前 |
| 好评优先 | good_rate 降序 |
| 低价 | price_per_minute 升序 |
| 连麦多 | service_count 降序 |

筛选弹窗：
- 连麦状态：连麦中 → online_status「忙碌」；空闲中 →「在线」
- 性别：按 `gender` 字段过滤

**理由**: 演示项目无需后端，前端过滤足够展示交互。

### 5. 页面布局

```
┌─────────────────────────────────┐
│ 1v1咨询  [连麦咨询]        🔍   │  顶部
├─────────────────────────────────┤
│ 综合 | 优选老师 | 好评优先 | ... │  排序 Tab（van-tabs scrollable）
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ [头像] 暖暖咨询师    9.80/分 │ │  ConsultExpertCard × N
│ │  15s   好评90% · 连麦999    │ │
│ │        专业塔罗分析...       │ │
│ │              [立即咨询]      │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

筛选弹窗从底部弹出（`van-popup` position="bottom"），含连麦状态、性别选项和重置/确认按钮。

### 6. 导航流程

```
首页 1v1咨询「立即咨询」 ──→ /im/chat/:expertId
首页 1v1咨询「更多」     ──→ /app/qa
咨询 Tab 卡片/按钮       ──→ /im/chat/:expertId
IM 聊天返回             ──→ router.back()
```

### 7. IM 聊天返回策略

**选择**: `chat.vue` 返回按钮使用 `router.back()`；无历史记录时 fallback 至 `/app/message`。

**理由**: 聊天页可从首页、咨询 Tab、消息 Tab 等多处进入，固定返回消息 Tab 会破坏导航预期。

**替代方案**: 始终 `router.push('/app/message')` — 仅适用于从消息 Tab 进入的场景。

```
首页 / 咨询 Tab / 消息 Tab
        │
        ▼
   /im/chat/:expertId
        │ 返回 (router.back)
        ▼
     来源页
```

### 8. 四个 Tab keep-alive

**选择**: 在 `app/index.vue` 的 `<router-view>` 外包裹 `<keep-alive :include="['AppHome','AppQa','AppMessage','AppMine']">`；各 Tab 页通过 `defineOptions({ name })` 声明组件名与路由 name 一致。

**理由**: Tab 切换频繁，缓存可保留滚动位置、咨询 Tab 筛选/排序状态；从 IM 聊天返回后用户回到离开前的 Tab 状态。

**滚动隔离**: `app-shell` 禁止窗口滚动（`height: 100vh; overflow: hidden`）；每个 Tab 页内部使用独立 `overflow-y: auto` 滚动容器，避免多个 keep-alive 实例共用 `window` 滚动导致位置串台。

**替代方案**: 不使用 keep-alive — 每次切换 Tab 重新加载，体验接近原生但丢失状态。

## Risks / Trade-offs

- **[Risk] expert_id 不对齐导致聊天页空白** → 统一 Mock ID，apply 阶段验证跳转
- **[Risk] HomeConsultSection 重构影响首页样式** → 仅替换内部卡片为 ConsultExpertCard，保留 section header
- **[Risk] 筛选无数据** → Mock 数据覆盖多种 gender 和 online_status 组合
