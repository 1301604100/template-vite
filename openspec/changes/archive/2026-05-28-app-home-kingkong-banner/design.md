## Context

`/app/home` 当前为欢迎占位页。Android 端首页（`NewHomeFragmentA`）包含：
- 顶部品牌 + 日签入口
- 金刚位（`getAppHomeIconInfo` 接口，10 个功能 pkey）
- 活动 Banner（ZCC 活动配置轮播）

演示项目使用 Mock 数据，不对接真实接口，重点还原布局与交互。

## Goals / Non-Goals

**Goals:**
- 按设计稿还原首页深色主题布局
- 展示金刚位功能入口（每页 2 行 5 列），支持左右滑动切换多页
- 展示底部活动轮播 Banner（自动播放 + 指示器）
- 点击金刚位/Banner 有 Toast 反馈（演示占位）

**Non-Goals:**
- 不对接 `/v2/api/app/getAppHomeIconInfo` 和 ZCC 活动配置接口
- 不实现各功能模块的实际跳转页面
- 不实现日签弹窗完整业务

## Decisions

### 1. 页面布局结构

```
┌─────────────────────────────┐
│ 准准          [准准日签 免费] │  ← 顶部 Header
├─────────────────────────────┤
│  🃏  🎲  ⭐  💕  🔮         │  ← 金刚位 Page 1 Row 1
│ 塔罗 骰子 星盘 合盘 星盘问答  │
│  📋  🌙  💬  ✋  ⭐         │  ← 金刚位 Page 1 Row 2
│ 测试 解梦 倾诉 手相 星宿      │
│         ● ○                 │  ← 金刚位分页指示器
│  ← 左右滑动切换 Page 2 →    │
├─────────────────────────────┤
│  [活动轮播 Banner]           │  ← van-swipe
│         ● ○ ○ ○             │  ← Banner 指示器
└─────────────────────────────┘
```

### 2. Mock 金刚位数据

对齐 Android `HomeIconInfoBean`，支持分页：

```typescript
interface HomeIconPage {
  page: number;
  icons_per_row: number;  // 5
  icons: HomeIconItem[];
}
```

**第 1 页（10 项，2 行 × 5 列）：**

| pkey | 标题 | 说明 |
|------|------|------|
| tarot | 塔罗 | 塔罗问答 |
| dice | 骰子 | 占星骰子 |
| astro_solve | 星盘 | 星盘解读 |
| astro_couple | 合盘 | 缘分合盘 |
| ask_astro | 星盘问答 | 星盘问答 |
| report_voice | 测试报告 | 测试报告 |
| dream_voice | 解梦 | 大师解梦 |
| talk_voice | 倾诉 | 情感倾诉 |
| palm | 手相 | 手相预测 |
| xingxiu | 星宿 | 星宿关系 |

**第 2 页（5 项，1 行 × 5 列）：**

| pkey | 标题 | 说明 |
|------|------|------|
| paizhen | 牌阵 | 牌阵解读 |
| astro_luck | 运势 | 星座运势 |
| voice_chat | 连麦 | 语音咨询 |
| ai_bot | AI占卜 | AI 机器人 |
| more | 更多 | 更多功能 |

每项含：`pkey`、`title`、`icon`（emoji 或渐变色块占位）、`position`

### 3. Mock Banner 数据

```typescript
interface HomeBannerItem {
  id: string;
  title: string;        // 如 "2025星盘 年运报告"
  subtitle?: string;    // 如 "查看详情"
  image_url?: string;   // 背景图占位
  link_url?: string;
  priority: number;
}
```

Mock 返回 3–4 条 Banner，按 priority 排序。使用 `van-swipe` 实现自动轮播（3s 间隔）。

### 4. 组件拆分

| 组件 | 职责 |
|------|------|
| `HomeKingKongGrid` | 接收分页 icons 数据，van-swipe 横向滑动，每页 5 列 grid，底部分页指示器，emit click |
| `HomeBannerSwipe` | 接收 banners 数组，van-swipe 轮播，emit click |

`home.vue` 负责：加载 Mock 数据、顶部 Header、组合子组件。

### 5. 视觉规范

- 背景：深色 `#1a1033`（与登录页一致）
- 金刚位图标：圆角方块 + 渐变色背景 + emoji/icon 占位
- 文字：白色标题 + 灰色副标题
- Banner：圆角卡片，渐变背景模拟活动图，底部 indicator 白色
- 日签按钮：紫色渐变 pill + 「免费」黄色角标

### 6. 交互

- 金刚位左右滑动 → 切换分页，指示器同步高亮
- 金刚位点击 → Toast「{title} 功能演示中」
- Banner 点击 → Toast「查看活动：{title}」
- 日签点击 → Toast「准准日签演示中」

## Risks / Trade-offs

- **[Risk] 无真实图标资源** → 使用 emoji + 渐变色块占位，后续可替换为图片 URL
- **[Risk] Banner 与设计稿视觉偏差** → 使用 CSS 渐变 + 文字模拟，接受演示级还原
- **[Trade-off] 功能点击仅 Toast** → 演示项目不跳转子模块，符合现有约定

## Migration Plan

1. 新增类型 + Mock + API
2. 创建 HomeKingKongGrid、HomeBannerSwipe 组件
3. 重构 home.vue 页面
4. 验证在完整 App 流程中首页 Tab 展示正常

## Open Questions

- Banner 是否需要对接真实 ZCC 接口？当前 Mock，后续 change 可扩展
