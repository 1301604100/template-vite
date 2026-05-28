## Context

zhunzhun-process 已完成：
- 冷启动链路：开屏 → 隐私协议 → 一键登录 → 短信登录
- 演示沙盒：`/home` 流程卡片入口（各模块可独立体验）
- IM 模块：消息列表 + 聊天室

缺失：登录后进入 App 主框架的体验。Android 端登录成功后进入 `MainActivity`，底部 4 Tab 切换（星座/问答/消息/我的）。

## Goals / Non-Goals

**Goals:**
- 建立完整 App 流程入口，登录态驱动路由跳转
- 复刻 MainActivity 底部 Tab 主框架结构
- 消息 Tab 对接现有 IM 消息列表
- 全局路由守卫统一处理未登录拦截
- 保留 `/home` 演示沙盒，与完整 App 流程并存

**Non-Goals:**
- 不实现星座/问答 Tab 的完整业务（占位页即可）
- 不改造 IM 聊天室内部逻辑
- 不接入真实后端或 Tab 角标推送

## Decisions

### 1. 双入口模式

| 入口 | 路径 | 用途 |
|------|------|------|
| 完整 App 流程 | `/` → `/splash` → 登录 → `/app` | 还原真实 App 体验，有登录态判断 |
| 演示沙盒 | `/home` | PM 独立体验各模块，开屏入口不判断登录态 |

### 2. 路由结构

```
/                    → redirect /splash
/splash              → 开屏（已登录 → /app）
/login/one-key       → 一键登录（成功 → /app）
/login               → 短信登录（成功 → /app）
/app                 → App 主框架（需登录）
  /app/home          → 首页 Tab（占位）
  /app/qa            → 问答 Tab（占位）
  /app/message       → 消息 Tab（复用 IM 列表组件）
  /app/mine          → 我的 Tab（用户信息 + 退出登录）
/im/chat/:expertId   → 聊天室（需登录，从消息 Tab 跳入）
/home                → 演示沙盒（不需登录）
```

`/app` 默认 redirect 至 `/app/home`。

### 3. App 主框架实现

使用 `pages/app/index.vue` 作为 Tab 壳：
- 顶部：当前 Tab 内容区（`<router-view />`）
- 底部：`van-tabbar` 四个 Tab，对齐 App 图标与文案

| Tab | 路由 | 内容 |
|-----|------|------|
| 首页 | `/app/home` | 占位欢迎页 |
| 问答 | `/app/qa` | 占位说明页 |
| 消息 | `/app/message` | 嵌入 `ChatSessionItem` 列表逻辑 |
| 我的 | `/app/mine` | 头像、昵称、退出登录、跳转演示沙盒 |

聊天室 `/im/chat/:id` 保持独立全屏页，从消息 Tab 点击会话进入，返回回到消息 Tab。

### 4. 全局路由守卫

`router.beforeEach` 逻辑：
```typescript
if (to.meta.requiresAuth && !userStore.isLoggedIn) {
  next({ path: '/login/one-key', query: { redirect: to.fullPath } });
  return;
}
```

需登录路由：`/app/*`、`/im/*`

### 5. 开屏页登录态恢复

`/splash` onMounted：
```
已登录 → 延迟 1s → /app
未登录 + 已同意隐私 → /login/one-key
未登录 + 未同意隐私 → 隐私弹窗
```

与演示沙盒「开屏入口」区分：沙盒入口仍清除隐私、不判断登录态，用于独立体验冷启动 UI。

### 6. 演示首页「完整 App 流程」卡片

点击后：
1. 清除隐私同意状态
2. 退出登录（模拟全新用户）
3. 导航至 `/splash`

这样 PM 可从沙盒一键重启完整 App 链路。

### 7. redirect 参数兼容

登录页已有 redirect 支持，完整 App 流程中：
- 未登录访问 `/app/message` → 登录后回跳 `/app/message`
- 默认无 redirect → `/app`

## Risks / Trade-offs

- **[Risk] Tab 壳与独立 IM 路由重复** → 消息 Tab 复用组件而非 iframe，聊天室仍走 `/im/chat`
- **[Risk] /home 与 /app 概念混淆** → 演示沙盒标题明确标注「演示沙盒」，我的 Tab 提供入口
- **[Trade-off] 首页/问答 Tab 仅占位** → 满足框架演示，后续 change 填充

## Migration Plan

1. 新增路由守卫 + App Tab 壳
2. 调整 splash/login 跳转目标
3. 消息 Tab 接入 IM 列表
4. 演示首页新增完整流程卡片
5. 验证：完整链路 + 沙盒独立入口均可用

## Open Questions

- Tab 图标是否需对齐 App 设计稿？当前使用 Vant 内置 icon 占位
- 退出登录后跳转 `/splash` 还是 `/login/one-key`？建议 `/splash` 模拟 App 退出后重启
