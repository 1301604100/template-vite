## 1. 基础设施

- [x] 1.1 扩展 `src/types/home.ts`：新增 DailyFortune、LiveRoomItem、ConsultExpertItem 接口
- [x] 1.2 扩展 `src/mock/home.ts`：mockGetDailyFortune()、mockGetLiveRooms()、mockGetConsultExperts()
- [x] 1.3 扩展 `src/api/home.ts`：getDailyFortune()、getLiveRooms()、getConsultExperts()

## 2. 首页组件

- [x] 2.1 创建 `src/components/home/HomeFortuneCard.vue`：运势卡片（总分、摘要、五维条、「更多」），emit click/more
- [x] 2.2 创建 `src/components/home/HomeLiveSection.vue`：区块标题 + 横向滚动直播卡片，emit more/item-click
- [x] 2.3 创建 `src/components/home/HomeConsultSection.vue`：区块标题 + 纵向达人卡片（状态/价格/立即咨询），emit more/consult-click

## 3. 首页 Tab 集成（app-main-shell）

- [x] 3.1 重构 `src/pages/app/tabs/home.vue`：整体可滚动布局，Banner 下集成运势 + 直播 + 咨询
- [x] 3.2 扩展数据加载：onMounted 并行请求 fortune + live + consult（与现有 icons/banners 合并）
- [x] 3.3 实现交互：各模块点击/更多/立即咨询 Toast 反馈

## 4. 样式还原

- [x] 4.1 运势卡片：深紫渐变背景、五维竖条、趋势箭头
- [x] 4.2 直播区块：横向 scroll-snap 卡片、封面渐变遮罩
- [x] 4.3 咨询区块：在线状态角标、价格展示、紫色「立即咨询」按钮

## 5. 收尾与验证

- [x] 5.1 验证完整 App 流程：登录 → /app → 首页展示运势 + 直播 + 咨询
- [x] 5.2 验证首页纵向滚动与各模块点击 Toast
- [x] 5.3 运行 `pnpm build` 确保 TypeScript 编译通过
