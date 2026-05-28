## MODIFIED Requirements

### Requirement: 一键登录 Mock 流程

系统 MUST 支持 Mock 一键登录交互。

#### Scenario: 一键登录成功

- **WHEN** 用户勾选协议并点击「本机号码一键登录」
- **THEN** 系统调用 Mock 一键登录接口，保存用户信息至 Pinia，Toast 提示登录成功，导航至 `/app` 或 redirect 目标页

#### Scenario: 协议未勾选

- **WHEN** 用户未勾选协议并点击「本机号码一键登录」
- **THEN** 系统提示需先同意协议，不执行登录

#### Scenario: 切换短信登录

- **WHEN** 用户点击「使用其他手机号登录」
- **THEN** 系统导航至 `/login` 短信验证码登录页

#### Scenario: 跳过登录

- **WHEN** 用户点击「我先看看」
- **THEN** 系统导航至 `/home` 演示沙盒，不执行登录
