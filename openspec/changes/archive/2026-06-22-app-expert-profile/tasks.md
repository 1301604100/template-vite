## 1. 基础设施

- [x] 1.1 新增 `src/types/expert.ts`：`ExpertProfile`、`TextPackage`、`ExpertService`、`ExpertReview` 等类型
- [x] 1.2 新增 `src/mock/expert.ts`：达人主页 Mock 数据（对齐 demo-expert-001 ~ 006）
- [x] 1.3 新增 `src/api/expert.ts`：`getExpertProfile(expertId)` API
- [x] 1.4 新增路由 `/expert/:expertId`

## 2. 达人主页组件

- [x] 2.1 创建 `ExpertProfileHeader.vue`：封面、头像、统计、标签、关注
- [x] 2.2 创建 `ExpertConsultSection.vue`：连麦咨询区块（1v1 私密连麦、预约状态）
- [x] 2.3 创建文字套餐、服务卡片、评价列表子组件

## 3. 达人主页

- [x] 3.1 创建 `src/pages/expert/profile.vue`：Tab 切换 + 底部操作栏
- [x] 3.2 实现个人简介/服务/评价三个 Tab 内容
- [x] 3.3 「免费私聊」跳转 IM，其他按钮 Toast 占位；返回 `router.back()`

## 4. 导航集成

- [x] 4.1 咨询 Tab：卡片点击 → 达人主页，「立即咨询」→ IM
- [x] 4.2 首页 1v1 咨询：卡片点击 → 达人主页，「立即咨询」→ IM
- [x] 4.3 IM 聊天：顶部达人头像 + 消息气泡达人头像 → 达人主页

## 5. 收尾与验证

- [x] 5.1 验证 咨询列表 → 达人主页 → 免费私聊 → IM 完整链路
- [x] 5.2 验证 IM 点头像 → 达人主页 → 返回
- [x] 5.3 运行 `pnpm build` 确保 TypeScript 编译通过
