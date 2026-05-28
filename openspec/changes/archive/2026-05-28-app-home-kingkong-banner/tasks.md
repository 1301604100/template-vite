## 1. 基础设施

- [x] 1.1 新增 `src/types/home.ts`：定义 HomeIconItem、HomeIconPage、HomeBannerItem 接口
- [x] 1.2 新增 `src/mock/home.ts`：mockGetHomeIcons()（2 页共 15 项）、mockGetHomeBanners()（3–4 条 Banner）
- [x] 1.3 新增 `src/api/home.ts`：getHomeIcons()、getHomeBanners() 调用 Mock

## 2. 首页组件

- [x] 2.1 创建 `src/components/home/HomeKingKongGrid.vue`：van-swipe 横向分页，每页 5 列 grid，底部分页指示器，emit click 事件
- [x] 2.2 创建 `src/components/home/HomeBannerSwipe.vue`：van-swipe 轮播，自动播放 3s，指示器，emit click 事件

## 3. 首页 Tab 重构（app-main-shell）

- [x] 3.1 重构 `src/pages/app/tabs/home.vue`：深色背景、顶部 Header（准准 + 日签）、集成金刚位和 Banner 组件
- [x] 3.2 实现数据加载：onMounted 并行请求 icons + banners，loading 状态
- [x] 3.3 实现交互：金刚位/Banner/日签点击 Toast 反馈

## 4. 样式还原

- [x] 4.1 对齐设计稿深色主题：背景 #1a1033、金刚位渐变色块、Banner 圆角卡片
- [x] 4.2 日签按钮：紫色渐变 pill + 「免费」黄色角标

## 5. 收尾与验证

- [x] 5.1 验证完整 App 流程：登录 → /app → 首页 Tab 展示金刚位 + Banner
- [x] 5.2 验证交互：金刚位左右滑动切换分页、点击金刚位/Banner/日签均有 Toast 反馈
- [x] 5.3 运行 `pnpm build` 确保 TypeScript 编译通过
