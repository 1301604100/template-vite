## 1. 基础设施

- [x] 1.1 扩展 `src/types/home.ts`：`LiveRoomItem` 新增 `status: '空闲中' | '咨询中'` 字段
- [x] 1.2 扩充 `src/mock/home.ts`：Mock 直播数据增至 6+ 条，覆盖塔罗/国学/占星品类及两种状态
- [x] 1.3 新增路由 `src/router/index.ts`：`/live/list`，`meta: { requiresAuth: true }`

## 2. 组件开发

- [x] 2.1 创建 `src/components/live/LiveRoomListItem.vue`：纵向卡片（封面、标题、品类标签、状态、达人信息）
- [x] 2.2 实现品类标签分色（塔罗紫/国学橙/占星蓝）与状态文字分色（空闲中/咨询中）

## 3. 页面开发

- [x] 3.1 创建 `src/pages/live/list.vue`：导航栏「全部房间」+ 加载态 + 纵向列表
- [x] 3.2 页面调用 `getLiveRooms()` 加载数据，卡片点击 Toast 占位
- [x] 3.3 返回按钮使用 `router.back()` 回到上一页

## 4. 首页集成

- [x] 4.1 修改 `src/pages/app/tabs/home.vue`：`handleLiveMore()` 改为 `router.push('/live/list')`

## 5. 收尾与验证

- [x] 5.1 验证首页「更多」→ 全部直播页 → 返回流程
- [x] 5.2 运行 `pnpm build` 确保 TypeScript 编译通过
