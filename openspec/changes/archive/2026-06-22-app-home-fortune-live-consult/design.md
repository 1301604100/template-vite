## Context

`/app/home` 当前已有：顶部 Header、金刚位（横向分页）、活动 Banner。设计稿在 Banner 下方还有三块内容区，对应 Android 首页 `NewHomeFragmentA` 的运势摘要、直播间列表和推荐达人（1v1 咨询）区域。

演示项目使用 Mock 数据，不对接真实运势/直播/达人接口，重点还原布局、信息层级和点击反馈。

## Goals / Non-Goals

**Goals:**
- 按设计稿还原 Banner 下方三个模块的视觉与信息结构
- 今日运势卡片：总分 + 五维进度条 + 摘要 + 「更多」
- 在线直播：区块标题 + 横向滚动卡片（2+ 条 Mock）
- 1v1 咨询：区块标题 + 纵向达人卡片（3+ 条 Mock），含在线状态与「立即咨询」
- 首页整体可纵向滚动，底部 Tab 不被遮挡
- 各模块点击 Toast 演示占位

**Non-Goals:**
- 不对接 `getDailyFortuneSummary`、直播间、推荐达人真实 API
- 不实现运势详情页、直播间、达人详情页跳转
- 不实现连麦/支付流程

## Decisions

### 1. 页面布局结构（Banner 以下）

```
┌─────────────────────────────┐
│ [活动轮播 Banner]            │
├─────────────────────────────┤
│ 冰冰哈哈          更多 >     │  ← 运势卡片
│ 今日运势 73 分               │
│ 单身的你今天可能会感到...     │
│ [爱情90↑][事业71][财富52↓]... │
├─────────────────────────────┤
│ 在线直播 | 在线连麦实时沟通 更多>│
│ ┌────┐ ┌────┐               │  ← 横向 scroll
│ │封面│ │封面│               │
│ └────┘ └────┘               │
├─────────────────────────────┤
│ 1v1咨询 | 私密解惑沟通   更多>│
│ ┌─────────────────────────┐ │
│ │[在线] 暖暖咨询师  9.80/分 │ │  ← 纵向列表
│ │ 好评90% · 连麦999        │ │
│ │ [立即咨询]               │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### 2. Mock 数据结构

```typescript
/** 今日运势 */
interface DailyFortune {
  nickname: string;
  total_score: number;
  summary: string;
  dimensions: {
    key: 'love' | 'career' | 'wealth' | 'social' | 'study';
    label: string;
    score: number;
    trend?: 'up' | 'down'; // 箭头方向
  }[];
}

/** 直播间 */
interface LiveRoomItem {
  id: string;
  title: string;
  cover_url: string;
  category: string;       // 塔罗 / 占星
  expert_name: string;
  expert_avatar: string;
}

/** 1v1 咨询达人 */
interface ConsultExpertItem {
  expert_id: string;
  expert_name: string;
  expert_avatar: string;
  online_status: '在线' | '忙碌' | '休息';
  good_rate: number;      // 0-100
  service_count: number;
  description: string;
  price_per_minute: number;
}
```

### 3. 组件拆分

| 组件 | 职责 |
|------|------|
| `HomeFortuneCard` | 展示运势卡片，emit `more` / `click` |
| `HomeLiveSection` | 区块标题 + 横向 scroll-snap 卡片列表，emit `more` / `item-click` |
| `HomeConsultSection` | 区块标题 + 纵向达人卡片列表，emit `more` / `consult-click` |

`home.vue` 负责并行加载 fortune + live + consult 数据，包裹在 `.home-scroll` 容器内。

### 4. 滚动与布局

- `.home-page` 改为 `display: flex; flex-direction: column; height: 100%`
- `.home-scroll` 使用 `flex: 1; overflow-y: auto` 承载 Banner 以下全部内容
- 金刚位保持在 scroll 外（固定顶部）或整体 scroll——**决策：整体 scroll**（Header + 金刚位 + Banner + 三模块一并滚动，对齐设计稿长页）

### 5. 视觉规范

- 运势卡片：深紫渐变背景 `#251845` → `#1a1033`，圆角 20px
- 五维条：竖向胶囊进度条，分数白色，趋势箭头绿色↑/红色↓
- 直播卡片：宽 280px，圆角 16px，封面 + 底部渐变遮罩
- 咨询卡片：头像左上角状态角标（在线绿/忙碌橙/休息灰），右侧紫色「立即咨询」按钮
- 区块标题：主标题白色 + 副标题灰色，右侧「更多 >」

### 6. 交互

- 运势「更多」→ Toast「今日运势详情演示中」
- 运势卡片点击 → Toast「查看今日运势」
- 直播卡片 → Toast「进入直播间：{title}」
- 直播「更多」→ Toast「在线直播列表演示中」
- 「立即咨询」→ Toast「咨询 {name} 演示中」
- 咨询「更多」→ Toast「1v1 咨询列表演示中」

## Risks / Trade-offs

- **[Risk] 无真实封面/头像** → 使用渐变色块 + emoji/占位图 URL
- **[Risk] 五维进度条 CSS 复杂** → 简化竖条高度映射 score/100，接受演示级精度
- **[Trade-off] 整体长 scroll** → 金刚位随页滚动，与部分 App 固定顶栏不同，但符合设计稿

## Migration Plan

1. 扩展 `types/home.ts` + `mock/home.ts` + `api/home.ts`
2. 创建三个 Section 组件
3. 重构 `home.vue` 滚动布局与数据加载
4. 验证 `/app/home` 完整首页演示链路

## Open Questions

- 金刚位是否应固定不滚动？当前按设计稿整体滚动实现，后续可按 PM 反馈调整
