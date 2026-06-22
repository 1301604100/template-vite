## 1. 基础设施

- [x] 1.1 扩展 `ConsultExpertItem`：新增 `gender`、`voice_duration` 字段
- [x] 1.2 对齐 Mock：consult expert_id 与 IM ExpertInfo 一致，扩充至 6+ 条
- [x] 1.3 扩展 `src/mock/im.ts`：补充新增 expert 的 ExpertInfo 和历史消息

## 2. 组件开发

- [x] 2.1 创建 `ConsultExpertCard.vue`：达人卡片（头像/状态/语音标识/信息/立即咨询）
- [x] 2.2 创建 `ConsultFilterPopup.vue`：筛选弹窗（连麦状态/性别/重置/确认）
- [x] 2.3 重构 `HomeConsultSection.vue`：复用 `ConsultExpertCard`

## 3. 咨询 Tab 页面

- [x] 3.1 重写 `src/pages/app/tabs/qa.vue`：顶部标题 + 排序 Tab + 列表 + 筛选弹窗
- [x] 3.2 实现排序逻辑（综合/优选/好评/低价/连麦多）与筛选过滤
- [x] 3.3 卡片/按钮点击导航至 `/im/chat/:expertId`

## 4. 首页与 Tab 集成

- [x] 4.1 修改 `home.vue`：`handleConsultClick` 跳转 IM，`handleConsultMore` 跳转 `/app/qa`
- [x] 4.2 修改 `app/index.vue`：Tab 文案「问答」→「咨询」
- [x] 4.3 修改 `chat.vue`：返回按钮使用 `router.back()` 回到来源页
- [x] 4.4 四个 Tab 页启用 keep-alive（app/index.vue + 各 Tab defineOptions name）

## 5. 收尾与验证

- [x] 5.1 验证首页「立即咨询」→ IM 聊天、首页「更多」→ 咨询 Tab 流程
- [x] 5.2 验证咨询 Tab 筛选/排序与进入 IM 聊天
- [x] 5.3 验证 IM 聊天返回来源页（首页/咨询 Tab/消息 Tab）
- [x] 5.4 验证 Tab 切换后 keep-alive 保留页面状态
- [x] 5.5 运行 `pnpm build` 确保 TypeScript 编译通过
