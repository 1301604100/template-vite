## 1. 路由与守卫

- [x] 1.1 新增 `src/router/guards.ts`：实现 beforeEach 全局守卫，未登录访问 requiresAuth 路由时跳转 `/login/one-key?redirect=`
- [x] 1.2 在 `src/router/index.ts` 注册守卫，新增 `/app` 嵌套路由及 4 个 Tab 子路由，默认 redirect `/app/home`
- [x] 1.3 为 `/app/*` 和 `/im/*` 路由添加 `meta.requiresAuth: true`

## 2. App 主框架（app-main-shell）

- [x] 2.1 创建 `src/pages/app/index.vue`：Tab 壳布局（router-view + van-tabbar 四 Tab）
- [x] 2.2 创建 `src/pages/app/tabs/home.vue`：首页 Tab 占位页
- [x] 2.3 创建 `src/pages/app/tabs/qa.vue`：问答 Tab 占位页
- [x] 2.4 创建 `src/pages/app/tabs/message.vue`：消息 Tab，复用 IM 会话列表逻辑
- [x] 2.5 创建 `src/pages/app/tabs/mine.vue`：我的 Tab（用户信息、退出登录、演示沙盒入口）

## 3. 完整 App 流程路由（app-flow-routing）

- [x] 3.1 更新 `src/pages/splash/index.vue`：已登录用户延迟跳转 `/app`
- [x] 3.2 更新 `src/pages/login/one-key.vue`：登录成功默认跳转 `/app`，「我先看看」跳转 `/home`
- [x] 3.3 更新 `src/pages/login/index.vue`：登录成功默认跳转 `/app`，「我先看看」跳转 `/home`
- [x] 3.4 更新 `src/pages/im/chat.vue`：返回按钮导航至 `/app/message`
- [x] 3.5 移除 IM 列表/聊天页内重复的 onMounted 登录守卫（改由全局守卫处理）

## 4. 演示沙盒更新（demo-home）

- [x] 4.1 更新 `src/pages/home/index.vue`：标题改为「演示沙盒」，新增「完整 App 流程」卡片（清除隐私 + 退出登录 + 跳转 /splash）
- [x] 4.2 保持「开屏入口」卡片行为不变（仅清除隐私，不退出登录）

## 5. 收尾与验证

- [x] 5.1 验证完整 App 链路：/ → 开屏 → 隐私 → 登录 → /app Tab → 消息 → 聊天 → 返回
- [x] 5.2 验证演示沙盒：完整 App 流程卡片重启链路 + 开屏入口独立演示
- [x] 5.3 运行 `pnpm build` 确保 TypeScript 编译通过
