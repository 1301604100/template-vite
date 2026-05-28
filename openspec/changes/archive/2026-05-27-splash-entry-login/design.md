## Context

zhunzhun-process 已完成演示首页、短信登录、IM 聊天等模块，但应用入口仍为 `/` → `/home`，缺少 App 冷启动链路。设计稿提供了 5 个关键界面：开屏页、隐私协议弹窗、一键登录、其他手机号登录、验证码登录。

参考 tarot-android：
- `SplashActivity`：开屏展示、首次安装引导、隐私协议
- `LoginManager.OneKeyLogin`：闪验 SDK 一键登录，失败降级短信登录

演示约束：不接入闪验 SDK 和真实运营商取号，使用 Mock 脱敏号码和 Mock 一键登录接口。

## Goals / Non-Goals

**Goals:**
- 复刻设计稿深色主题的开屏 → 隐私协议 → 一键登录 → 短信登录完整链路
- 根路径改为冷启动入口 `/splash`
- 隐私协议同意状态 localStorage 持久化，非首次启动跳过弹窗
- 一键登录 Mock 成功后进入 `/home` 或 redirect 目标页
- 短信登录页样式对齐设计稿深色主题

**Non-Goals:**
- 不接入闪验 SDK / 运营商认证
- 不实现开屏广告、引导页轮播
- 不实现协议 H5 详情页跳转（链接可占位）
- 不实现「拒绝隐私协议后退出 App」（H5 演示保留在开屏页）

## Decisions

### 1. 路由与启动流程

```
/                → redirect → /splash
/splash          → 开屏页（Logo + Slogan + 版本号）
/login/one-key   → 一键登录页
/login           → 短信验证码登录（其他手机号）
/home            → 演示首页（不变）
```

**启动逻辑（`/splash` onMounted）：**

```
已登录 → /home（或 redirect）
未登录 + 未同意隐私 → 展示隐私弹窗
未登录 + 已同意隐私 → 延迟 1.5s → /login/one-key
```

**隐私同意后：** 写入 `localStorage.privacy_agreed = '1'`，跳转 `/login/one-key`

### 2. 页面视觉规范（对齐设计稿）

| 元素 | 值 |
|------|-----|
| 背景色 | `#1a1033`（深紫黑） |
| 主按钮 | 紫色渐变 `linear-gradient(135deg, #7B5EA7, #9B6FD0)` |
| 主文字 | `#FFFFFF` |
| 次要文字 | `#999999` / `#666666` |
| Logo | 圆角方形 + 渐变背景 + 鲸鱼图标（CSS/SVG 占位） |
| 协议链接 | 紫色 `#9B6FD0` |

所有登录相关页面统一深色主题，与现有浅色首页形成对比（首页为流程导航，不需改动主题）。

### 3. 组件拆分

| 组件 | 路径 | 职责 |
|------|------|------|
| `PrivacyAgreementSheet` | `components/splash/PrivacyAgreementSheet.vue` | 隐私协议底部弹窗（拒绝/同意） |
| `AgreementFooter` | `components/login/AgreementFooter.vue` | 协议勾选 + 链接文案（一键登录/短信登录复用） |
| `AppLogo` | `components/common/AppLogo.vue` | Logo + 名称 + Slogan 复用块 |

### 4. Mock 一键登录

`src/mock/login.ts` 新增 `mockOneKeyLogin()`：
- 模拟预取号返回脱敏号码 `153****4578`
- 一键登录直接返回 LoginResponse（login_type=ol）
- 延迟 500ms

`src/api/login.ts` 新增 `oneKeyLogin()` 和 `getMaskedPhone()`

### 5. 隐私协议存储

```typescript
// src/utils/storage.ts
const PRIVACY_AGREED_KEY = 'zhunzhun_privacy_agreed';
export function isPrivacyAgreed(): boolean
export function setPrivacyAgreed(): void
export function clearPrivacyAgreed(): void  // 供演示首页重置用
```

### 6. 演示首页扩展

新增「开屏入口」卡片：
- 点击 → 清除隐私同意状态 → 导航至 `/splash`
- 便于 PM 重复体验完整冷启动流程

IM 卡片未登录时的跳转目标从 `/login` 改为 `/login/one-key`（更符合 App 实际路径）。

## Risks / Trade-offs

- **[Risk] 根路径变更影响已有书签** → 演示项目无生产用户，可接受；`/home` 仍可直接访问
- **[Risk] 深色主题与现有浅色登录页不一致** → 本 change 统一重构 `/login` 为深色主题
- **[Risk] 无真实取号，脱敏号码固定** → Mock 固定 `153****4578`，满足演示需求
- **[Trade-off] 拒绝隐私协议不退出** → H5 无法退出 App，拒绝后保持开屏页并 Toast 提示

## Migration Plan

1. 新增 storage 工具 + Mock 接口
2. 新增开屏页 + 隐私弹窗组件
3. 新增一键登录页
4. 重构短信登录页样式
5. 调整路由 + 演示首页卡片
6. 验证完整链路：`/splash` → 隐私 → 一键登录 → 短信登录 → `/home`

## Open Questions

- 协议详情页是否需要 WebView 跳转？当前方案为链接占位，不跳转
- 登录成功后默认跳转 `/home` 还是保留 redirect？保持现有 redirect 逻辑
