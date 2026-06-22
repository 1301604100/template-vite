## Why

首页 Tab 已完成顶部品牌区、金刚位和活动 Banner，但 Banner 下方仍缺少设计稿中的核心内容区：今日运势入口、在线直播和 1v1 咨询。这三块是 App 首页向 PM 演示「内容消费 + 达人服务」的关键模块，需要补全以使首页体验接近真实 App。

## What Changes

- 在 `/app/home` Banner 下方新增**今日运势入口卡片**：展示用户昵称、今日运势总分、摘要文案、五维运势条（爱情/事业/财富/社交/学业）及「更多」入口
- 新增**在线直播区块**：标题「在线直播 | 在线连麦实时沟通」+ 横向卡片列表（封面、标题、品类标签、达人昵称）
- 新增**1v1 咨询区块**：标题「1v1咨询 | 私密解惑沟通」+ 纵向达人列表（头像、在线状态、好评率、连麦次数、简介、价格、「立即咨询」按钮）
- 首页改为可滚动布局，在金刚位 + Banner 之下依次堆叠上述三个模块
- 扩展 Mock/API 层：`mockGetDailyFortune()`、`mockGetLiveRooms()`、`mockGetConsultExperts()`
- 新增组件：`HomeFortuneCard.vue`、`HomeLiveSection.vue`、`HomeConsultSection.vue`

## Capabilities

### New Capabilities

- `app-home-fortune`: App 首页今日运势入口卡片展示与点击交互
- `app-home-live`: App 首页在线直播列表展示与点击交互
- `app-home-consult`: App 首页 1v1 咨询达人列表展示与点击交互

### Modified Capabilities

- `app-main-shell`: 首页 Tab 布局扩展，Banner 下新增运势、直播、咨询三个内容模块

## Impact

- **修改页面**: `src/pages/app/tabs/home.vue`（滚动布局 + 集成新模块）
- **扩展类型**: `src/types/home.ts`（DailyFortune、LiveRoomItem、ConsultExpertItem）
- **扩展 Mock/API**: `src/mock/home.ts`、`src/api/home.ts`
- **新增组件**: `src/components/home/HomeFortuneCard.vue`、`HomeLiveSection.vue`、`HomeConsultSection.vue`
- **样式**: 延续深色主题 `#1a1033`，卡片圆角 + 紫色渐变按钮
- **参考来源**: 设计稿、tarot-android `NewHomeFragmentA`、推荐达人列表与直播间逻辑
