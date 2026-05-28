## ADDED Requirements

### Requirement: 全局路由登录守卫

系统 MUST 提供全局路由守卫，统一拦截未登录用户访问需登录页面。

#### Scenario: 未登录访问需登录路由

- **WHEN** 未登录用户访问 meta.requiresAuth 为 true 的路由
- **THEN** 系统导航至 `/login/one-key` 并携带 redirect 参数为原目标路径

#### Scenario: 已登录访问需登录路由

- **WHEN** 已登录用户访问需登录路由
- **THEN** 系统正常放行

#### Scenario: 登录后回跳

- **WHEN** 用户通过 redirect 参数完成登录
- **THEN** 系统导航至 redirect 指定的原始路径

### Requirement: 完整 App 冷启动链路

系统 MUST 支持从根路径开始的完整 App 冷启动流程。

#### Scenario: 根路径冷启动

- **WHEN** 用户访问根路径 `/`
- **THEN** 系统重定向至 `/splash` 开屏页

#### Scenario: 已登录冷启动

- **WHEN** 已登录用户进入开屏页
- **THEN** 系统延迟约 1 秒后自动导航至 `/app` 主框架

#### Scenario: 未登录冷启动

- **WHEN** 未登录用户完成隐私协议和登录
- **THEN** 系统导航至 `/app` 主框架（非演示沙盒 `/home`）

#### Scenario: 登录成功默认跳转

- **WHEN** 用户在完整 App 流程中登录成功且无 redirect 参数
- **THEN** 系统默认导航至 `/app` 主框架

### Requirement: 演示沙盒完整流程入口

系统 MUST 在演示沙盒提供一键重启完整 App 流程的入口。

#### Scenario: 完整 App 流程卡片

- **WHEN** 用户在演示沙盒点击「完整 App 流程」卡片
- **THEN** 系统清除隐私同意状态、退出登录，并导航至 `/splash` 开始完整冷启动

#### Scenario: 演示沙盒与完整流程分离

- **WHEN** 用户在演示沙盒点击「开屏入口」卡片
- **THEN** 系统仅清除隐私状态并导航至 `/splash`，不退出登录（保持独立演示模式）
