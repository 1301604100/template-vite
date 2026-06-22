## Why

首页「在线直播」区块已实现横向卡片预览，但点击「更多」目前仅 Toast 占位，无法进入 App 的「全部房间」列表页。该页面是 PM 演示直播内容浏览与达人状态展示的关键入口，需要补全以打通首页 → 全部直播的完整流程。

## What Changes

- 新增**全部直播页面**（`/live/list`）：顶部导航栏标题「全部房间」，深色背景，纵向滚动展示直播间卡片列表
- 直播间卡片复刻设计稿：左侧封面图、右侧标题、品类标签（塔罗/国学/占星，不同颜色）、连麦状态（空闲中/咨询中）、达人头像与昵称
- 扩展 `LiveRoomItem` 类型：新增 `status`（空闲中/咨询中）字段；Mock 数据扩充为至少 6 条，覆盖不同品类与状态
- 首页「在线直播」区块「更多」按钮改为路由跳转至全部直播页
- 新增 `LiveRoomListItem.vue` 卡片组件；点击卡片 Toast 演示占位（不进入真实直播间）

## Capabilities

### New Capabilities

- `app-live-list`: 全部直播列表页展示、导航与 Mock 数据

### Modified Capabilities

- `app-home-live`: 首页在线直播「更多」入口由 Toast 改为跳转全部直播页

## Impact

- **新增页面**: `src/pages/live/list.vue`
- **新增组件**: `src/components/live/LiveRoomListItem.vue`
- **修改页面**: `src/pages/app/tabs/home.vue`（「更多」跳转逻辑）
- **扩展类型**: `src/types/home.ts`（LiveRoomItem 增加 status）
- **扩展 Mock/API**: `src/mock/home.ts`、`src/api/home.ts`（扩充直播列表 Mock 数据）
- **路由**: `src/router/index.ts` 新增 `/live/list` 路由（需登录）
- **样式**: 延续深色主题 `#1a1033`，品类标签分色（塔罗紫/国学橙/占星蓝），状态文字分色（空闲中灰/咨询中粉紫）
