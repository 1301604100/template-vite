## Why

完整 App 流程的主框架已就绪，但首页 Tab（`/app/home`）仍为占位页，无法向 PM 演示 App 真实首页的核心布局。设计稿展示了深色主题下的顶部品牌区、金刚位功能入口网格和活动轮播 Banner，需要补全这两块核心 UI，使完整流程进入主框架后具备可演示的首页体验。

## What Changes

- 重构 `/app/home` 首页 Tab，替换占位内容为真实首页布局（深色主题）
- 新增首页顶部区域：App 名称「准准」+ 「准准日签」入口（含「免费」角标）
- 新增金刚位（King Kong Grid）：每页 2 行 × 5 列功能图标网格，支持左右滑动分页展示多页入口（对齐 Android `ConstellationFunctionsView`）
- 新增活动轮播 Banner：底部横向轮播，支持自动播放、指示器和点击交互
- 新增 Mock 数据层：`mockHomeIcons()`、`mockHomeBanners()` 模拟金刚位与 Banner 配置
- 新增可复用组件：`HomeKingKongGrid.vue`、`HomeBannerSwipe.vue`

## Capabilities

### New Capabilities

- `app-home-kingkong`: App 首页金刚位功能入口网格展示、左右滑动分页与点击交互
- `app-home-banner`: App 首页活动轮播 Banner 展示与点击交互

### Modified Capabilities

- `app-main-shell`: 首页 Tab 从占位页升级为完整首页布局（含金刚位 + Banner）

## Impact

- **修改页面**: `src/pages/app/tabs/home.vue`
- **新增组件**: `src/components/home/HomeKingKongGrid.vue`、`src/components/home/HomeBannerSwipe.vue`
- **新增类型**: `src/types/home.ts`（HomeIconItem、HomeBannerItem）
- **新增 Mock/API**: `src/mock/home.ts`、`src/api/home.ts`
- **样式**: 复用 `variables.scss` 深色主题，对齐设计稿
- **参考来源**: tarot-android `NewHomeFragmentA`、`AppHomeIconAdapter`、`首页金刚位逻辑文档.md`、`首页Banner逻辑文档.md`
