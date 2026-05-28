## 1. 基础设施

- [x] 1.1 定义类型：在 `src/types/` 下新增 `login.ts`、`im.ts`，定义 UserInfo、LoginResponse、ChatSession、ChatMessage 等接口
- [x] 1.2 创建 Mock 层：在 `src/mock/` 下新增 `login.ts`、`im.ts`，提供 sendVerifyCode、login、getChatMessageList、getHistoryImRecord、sendMessage 等 Mock 函数（含 300–500ms 延迟）
- [x] 1.3 完善 API 层：新增 `src/api/login.ts`、`src/api/im.ts`，调用 Mock 函数；更新 `src/utils/Request.ts` 移除硬编码 token，改为从 Pinia 读取 session_token
- [x] 1.4 完善用户状态：更新 `src/store/user.ts`，实现 login/logout actions、isLoggedIn getter、localStorage 持久化
- [x] 1.5 配置路由：在 `src/router/index.ts` 添加 `/home`、`/login`、`/im/list`、`/im/chat/:expertId` 路由，根路径 redirect 至 `/home`

## 2. 演示首页（demo-home）

- [x] 2.1 创建 `src/components/demo/DemoEntryCard.vue` 流程入口卡片组件（图标、标题、描述、点击事件）
- [x] 2.2 创建 `src/pages/home/index.vue` 演示首页：展示项目标题、登录状态栏、流程卡片列表（登录、IM 消息、IM 聊天）
- [x] 2.3 实现登录态判断：未登录点击 IM 卡片跳转 `/login?redirect=目标路径`；已登录直接跳转；首页提供退出登录操作

## 3. 登录演示（demo-login）

- [x] 3.1 创建 `src/pages/login/index.vue` 短信验证码登录页：手机号/验证码输入、协议勾选、登录按钮、「我先看看」跳过
- [x] 3.2 实现验证码倒计时逻辑（60s）和手机号格式校验（11 位）
- [x] 3.3 实现登录流程：协议校验 → 调用 Mock login → 保存 Pinia → Toast 提示 → 按 redirect 参数或默认跳转 `/home`
- [x] 3.4 还原 App 登录页样式：顶部 NavBar（返回 + 「我先看看」）、表单布局、协议链接区域

## 4. IM 消息列表（demo-im-list）

- [x] 4.1 创建 `src/components/im/ChatSessionItem.vue` 会话列表项组件（达人头像、昵称、最后消息、未读角标、时间）
- [x] 4.2 创建 `src/pages/im/list.vue` 消息列表页：NavBar、van-pull-refresh 下拉刷新、会话列表渲染
- [x] 4.3 实现登录守卫：未登录访问时 Toast 提示并跳转登录页
- [x] 4.4 实现点击会话跳转 `/im/chat/:expertId` 和空态展示

## 5. IM 聊天室（demo-im-chat）

- [x] 5.1 创建 `src/components/im/ChatMessageBubble.vue` 消息气泡组件（区分用户/达人，左对齐/右对齐，文字类型）
- [x] 5.2 创建 `src/components/im/ChatInputBar.vue` 聊天输入栏组件（文字输入 + 发送按钮，空消息禁用发送）
- [x] 5.3 创建 `src/pages/im/chat.vue` 聊天室页：顶部达人信息栏、消息列表（加载 Mock 历史消息）、底部输入栏
- [x] 5.4 实现发送消息：本地插入气泡 → Mock sendMessage → 模拟 1s 后达人自动回复
- [x] 5.5 还原 App 聊天室样式：顶部栏布局、消息区背景、气泡颜色与间距

## 6. 收尾与验证

- [x] 6.1 验证完整演示路径：首页 → 登录 → 回首页 → IM 消息列表 → 进入聊天室 → 发送消息 → 返回
- [x] 6.2 验证未登录路径：首页 → 直接点 IM → 跳转登录 → 登录后回跳目标页
- [x] 6.3 运行 `pnpm build` 确保 TypeScript 编译通过
