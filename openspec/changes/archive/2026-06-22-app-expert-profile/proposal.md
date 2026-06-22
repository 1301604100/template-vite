## Why

咨询 Tab 与 IM 聊天页已可进入达人服务流程，但缺少 App 核心的「达人主页」落地页，用户无法从列表/聊天进一步查看达人详情、连麦套餐与评价。同时咨询列表卡片和 IM 头像的点击目标不明确，需要统一导航规则：除「立即咨询」外进入达人主页，IM 内点头像也进入达人主页。

## What Changes

- 新增**达人主页**（`/expert/:expertId`）：复刻设计稿，含头部信息（封面、头像、昵称、排行榜、粉丝/好评/连麦数据、标签、关注）、Tab 切换（个人简介/服务/评价）
- **个人简介 Tab**：达人介绍文案 + **连麦咨询**区块（直播间卡片、普通连麦/1v1 私密连麦价格、预约状态按钮）
- **服务 Tab**：文字套餐、服务卡片列表（立即沟通占位）
- **评价 Tab**：用户评价列表
- **底部操作栏**：打赏、已预约连麦、免费私聊（演示 Toast）
- **咨询 Tab 导航调整**：点击达人卡片（非「立即咨询」）→ 达人主页；「立即咨询」仍 → IM 聊天
- **首页 1v1 咨询区块**：同上，卡片 → 达人主页，按钮 → IM 聊天
- **IM 聊天页**：点击顶部达人头像/信息区及消息气泡中的达人头像 → 达人主页
- 扩展 Mock/API：`ExpertProfile` 类型、`getExpertProfile()`、Mock 达人详情数据

## Capabilities

### New Capabilities

- `app-expert-profile`: 达人主页展示、Tab 内容、连麦咨询区块与 Mock 数据

### Modified Capabilities

- `app-consult-tab`: 卡片点击跳转达人主页，「立即咨询」跳转 IM
- `app-home-consult`: 卡片点击跳转达人主页，「立即咨询」跳转 IM
- `demo-im-chat`: 点击达人头像跳转达人主页

## Impact

- **新增页面**: `src/pages/expert/profile.vue`
- **新增组件**: `ExpertProfileHeader.vue`、`ExpertConsultSection.vue` 等
- **修改页面**: `src/pages/app/tabs/qa.vue`、`src/pages/app/tabs/home.vue`、`src/pages/im/chat.vue`
- **修改组件**: `ConsultExpertCard.vue`（区分 card/consult 事件）、`ChatMessageBubble.vue`（头像可点击）
- **扩展类型/Mock/API**: `src/types/expert.ts`（或扩展 `im.ts`）、`src/mock/expert.ts`、`src/api/expert.ts`
- **路由**: 新增 `/expert/:expertId`
