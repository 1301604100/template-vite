## Why

当前项目已有开屏、登录、IM 等独立演示模块，但缺少串联完整 App 体验的入口。根路径虽指向 `/splash`，但登录成功后仍跳转演示卡片首页 `/home`，未还原 App 登录后进入主框架（底部 Tab）的真实路径。需要建立「完整 App 流程」入口，使 PM 能体验：冷启动 → 隐私协议 → 登录 → 主框架 Tab → 消息/聊天 的连贯链路。

## What Changes

- 新增 App 主框架页（`/app`），复刻 Android `MainActivity` 底部 Tab 结构（首页、问答、消息、我的）
- 新增全局路由守卫，对需登录页面统一拦截并跳转登录（携带 redirect）
- 调整开屏页启动逻辑：已登录用户自动进入 `/app` 主框架
- 调整登录成功默认跳转目标：从 `/home` 改为 `/app`
- 消息 Tab 嵌入现有 IM 消息列表，聊天室从 Tab 内正常跳转
- 演示首页 `/home` 保留为 PM 沙盒，新增「完整 App 流程」卡片（重置状态后进入真实冷启动链路）
- 首页/问答/我的 Tab 提供占位内容，后续 change 可逐步填充

## Capabilities

### New Capabilities

- `app-main-shell`: App 主框架底部 Tab 导航与子页面容器
- `app-flow-routing`: 完整 App 流程的路由守卫与启动跳转逻辑

### Modified Capabilities

- `demo-splash`: 已登录用户开屏后跳转 `/app` 而非继续登录流程
- `demo-home`: 新增「完整 App 流程」入口卡片，明确与 `/app` 主框架的分工
- `demo-one-key-login`: 登录成功默认跳转 `/app`
- `demo-login`: 登录成功默认跳转 `/app`

## Impact

- **新增页面**: `src/pages/app/index.vue`（Tab 壳）、`src/pages/app/tabs/` 下 4 个 Tab 页
- **新增组件**: `AppTabBar.vue` 底部导航栏
- **路由**: 新增 `/app` 嵌套路由，调整 redirect 与守卫逻辑
- **修改页面**: `splash/index.vue`、`login/one-key.vue`、`login/index.vue`、`home/index.vue`
- **新增工具**: `src/router/guards.ts` 全局 beforeEach 守卫
- **参考来源**: tarot-android `MainActivity` 四 Tab 结构（1001 星座/1002 问答/1003 消息/1004 我的）
