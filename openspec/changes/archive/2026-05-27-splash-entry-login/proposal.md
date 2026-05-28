## Why

当前演示项目从 `/home` 直接进入流程导航，缺少 App 真实的启动入口体验。产品经理无法演示「开屏 → 隐私协议 → 一键登录 → 短信登录」的完整冷启动路径。需要按设计稿补全开屏入口链路，使 H5 演示更贴近 App 实际上线流程。

## What Changes

- 新增开屏页（`/splash`），展示 App Logo、名称「准准」、Slogan 和版本号，作为应用冷启动入口
- 新增隐私协议弹窗，首次启动时在开屏页底部弹出「用户协议及隐私条款」，支持「拒绝」和「同意」操作
- 新增一键登录页（`/login/one-key`），展示脱敏本机号码、「本机号码一键登录」按钮、「使用其他手机号登录」入口及协议勾选
- 调整应用入口路由：根路径 `/` 重定向至 `/splash`，替代原先直接进入 `/home`
- 重构现有短信验证码登录页样式，对齐设计稿深色主题与「验证码登录」布局
- 演示首页新增「开屏入口」流程卡片，便于 PM 从首页重新体验完整启动链路
- 使用 Mock 模拟一键登录（login_type=ol）和隐私协议同意状态（localStorage 持久化）

## Capabilities

### New Capabilities

- `demo-splash`: 开屏页展示与启动跳转逻辑
- `demo-privacy`: 首次启动隐私协议弹窗交互
- `demo-one-key-login`: 一键登录页展示与 Mock 登录流程

### Modified Capabilities

- `demo-login`: 登录入口链路变更（从开屏/一键登录进入），页面样式对齐设计稿深色主题
- `demo-home`: 新增「开屏入口」演示卡片，支持重新体验启动流程

## Impact

- **新增页面**: `src/pages/splash/index.vue`、`src/pages/login/one-key.vue`
- **新增组件**: `PrivacyAgreementSheet.vue`（隐私协议底部弹窗）、`AgreementFooter.vue`（协议勾选复用组件）
- **修改页面**: `src/pages/login/index.vue`（样式重构）、`src/pages/home/index.vue`（新增入口卡片）
- **路由**: 调整根路径重定向，新增 `/splash`、`/login/one-key` 路由
- **状态/存储**: localStorage 记录隐私协议同意状态 `privacy_agreed`
- **Mock/API**: 新增 `mockOneKeyLogin` 模拟一键登录接口
- **参考来源**: tarot-android `SplashActivity`、`LoginManager.OneKeyLogin`、设计稿（开屏/隐私/一键登录/验证码登录）
