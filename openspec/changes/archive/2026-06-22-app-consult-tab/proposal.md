## Why

App 主框架第二个 Tab 目前为「问答」占位页，设计稿中该 Tab 应为「1v1 咨询」达人列表，含排序筛选与筛选弹窗。同时首页 1v1 咨询区块的「立即咨询」和「更多」仍为 Toast 占位，无法演示「浏览达人 → 进入 IM 聊天」的核心流程。需要补全咨询 Tab 并打通首页与 IM 的导航链路。

## What Changes

- 将 `/app/qa` Tab 从占位页替换为**1v1 咨询列表页**，复刻设计稿：顶部标题 + 连麦咨询入口 + 搜索图标、横向排序 Tab（综合/优选老师/好评优先/低价/连麦多/筛选）、达人卡片列表
- 新增**筛选弹窗**：连麦状态（连麦中/空闲中）、性别（男/女），支持重置与确认
- 咨询 Tab 点击达人卡片或「立即咨询」→ 导航至 `/im/chat/:expertId`
- 首页 1v1 咨询区块：点击「立即咨询」→ 进入 IM 聊天页；点击「更多」→ 切换至咨询 Tab（`/app/qa`）
- **IM 聊天页返回**：使用 `router.back()` 返回来源页（首页/咨询 Tab/消息 Tab），不再固定跳转消息 Tab
- **四个 Tab 页 keep-alive**：切换 Tab 时缓存页面状态（滚动位置、筛选条件等），返回时恢复
- 底部 Tab 文案「问答」改为「咨询」，对齐设计稿
- 扩展 Mock 数据：咨询达人列表扩充至 6+ 条，expert_id 与 IM Mock 对齐以确保聊天页可加载
- 新增组件：`ConsultExpertCard.vue`（可复用于首页与咨询 Tab）、`ConsultFilterPopup.vue`

## Capabilities

### New Capabilities

- `app-consult-tab`: App 咨询 Tab 达人列表、排序筛选与进入 IM 聊天

### Modified Capabilities

- `app-main-shell`: 问答 Tab 占位替换为咨询 Tab 完整内容，Tab 文案更新；聊天室返回改为来源页；四个 Tab keep-alive
- `app-home-consult`: 首页咨询区块点击跳转 IM 聊天，「更多」跳转咨询 Tab

## Impact

- **重写页面**: `src/pages/app/tabs/qa.vue` → 咨询 Tab 列表页
- **修改页面**: `src/pages/app/index.vue`（Tab 文案、keep-alive 包裹 router-view）
- **修改页面**: `src/pages/app/tabs/*.vue`（四个 Tab 页添加 `defineOptions({ name })` 供 keep-alive 匹配）
- **修改页面**: `src/pages/im/chat.vue`（返回按钮改为 `router.back()`，fallback 消息 Tab）
- **扩展类型**: `src/types/home.ts`（ConsultExpertItem 增加 gender、voice_duration 等字段）
- **扩展 Mock/API**: `src/mock/home.ts`、`src/mock/im.ts`（expert_id 对齐）
- **新增组件**: `src/components/consult/ConsultExpertCard.vue`、`ConsultFilterPopup.vue`
- **复用**: `/im/chat/:expertId` 现有 IM 聊天页，无需新建
