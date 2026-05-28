## 1. 基础设施

- [x] 1.1 新增 `src/utils/storage.ts`：隐私协议同意状态的 localStorage 读写（isPrivacyAgreed / setPrivacyAgreed / clearPrivacyAgreed）
- [x] 1.2 扩展 Mock 层：在 `src/mock/login.ts` 新增 `mockGetMaskedPhone()` 和 `mockOneKeyLogin()` 函数
- [x] 1.3 扩展 API 层：在 `src/api/login.ts` 新增 `getMaskedPhone()` 和 `oneKeyLogin()` 方法
- [x] 1.4 新增公共样式变量：在 `src/assets/styles/variables.scss` 定义深色主题色值（背景 #1a1033、渐变按钮、链接色等）
- [x] 1.5 调整路由：根路径 redirect 改为 `/splash`，新增 `/splash`、`/login/one-key` 路由

## 2. 公共组件

- [x] 2.1 创建 `src/components/common/AppLogo.vue`：Logo 方块 + 「准准」名称 + Slogan 复用组件
- [x] 2.2 创建 `src/components/login/AgreementFooter.vue`：协议勾选 + 链接文案复用组件（支持一键登录/短信登录两种文案模式）
- [x] 2.3 创建 `src/components/splash/PrivacyAgreementSheet.vue`：隐私协议底部弹窗（标题、正文、拒绝/同意按钮）

## 3. 开屏页（demo-splash + demo-privacy）

- [x] 3.1 创建 `src/pages/splash/index.vue`：深色背景、AppLogo、版本号 V1.9.0
- [x] 3.2 实现开屏启动逻辑：已登录 → /home；已同意隐私 → 延迟跳转 /login/one-key；未同意 → 展示隐私弹窗
- [x] 3.3 集成 PrivacyAgreementSheet：同意 → 写 storage + 跳转；拒绝 → Toast 提示

## 4. 一键登录（demo-one-key-login）

- [x] 4.1 创建 `src/pages/login/one-key.vue`：深色主题、脱敏号码展示、一键登录按钮、其他手机号链接
- [x] 4.2 实现一键登录 Mock 流程：协议校验 → oneKeyLogin → Pinia 保存 → 跳转 /home 或 redirect
- [x] 4.3 实现「我先看看」跳过和「遇到问题？可点击这里」占位交互

## 5. 短信登录样式重构（demo-login）

- [x] 5.1 重构 `src/pages/login/index.vue` 为深色主题：背景、标题「验证码登录」、输入框、渐变按钮
- [x] 5.2 复用 AgreementFooter 组件替换现有协议区域
- [x] 5.3 调整返回按钮逻辑：返回 `/login/one-key` 而非 `/home`

## 6. 演示首页更新（demo-home）

- [x] 6.1 在 `src/pages/home/index.vue` 新增「开屏入口」卡片，点击清除隐私状态并跳转 `/splash`
- [x] 6.2 调整 IM 卡片未登录跳转目标为 `/login/one-key?redirect=目标路径`

## 7. 收尾与验证

- [x] 7.1 验证完整冷启动链路：/splash → 隐私弹窗 → 同意 → 一键登录 → 短信登录 → /home
- [x] 7.2 验证重复体验：首页「开屏入口」→ 重新触发隐私弹窗
- [x] 7.3 运行 `pnpm build` 确保 TypeScript 编译通过
