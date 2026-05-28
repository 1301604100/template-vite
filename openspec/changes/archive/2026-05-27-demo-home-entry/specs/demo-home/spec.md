## ADDED Requirements

### Requirement: 演示首页展示流程入口

系统 MUST 提供演示首页作为所有演示流程的统一入口，展示可点击的流程导航卡片。

#### Scenario: 进入演示首页

- **WHEN** 用户访问根路径 `/` 或 `/home`
- **THEN** 系统展示演示首页，包含项目标题和流程入口卡片列表

#### Scenario: 点击登录流程卡片

- **WHEN** 用户点击「短信验证码登录」卡片
- **THEN** 系统导航至 `/login` 登录演示页

#### Scenario: 未登录点击 IM 流程卡片

- **WHEN** 用户未登录状态下点击「IM 消息」或「IM 聊天」卡片
- **THEN** 系统导航至 `/login` 并携带 redirect 参数，登录成功后回跳至目标页

#### Scenario: 已登录点击 IM 流程卡片

- **WHEN** 用户已登录状态下点击「IM 消息」卡片
- **THEN** 系统导航至 `/im/list` 消息列表演示页

#### Scenario: 已登录点击 IM 聊天卡片

- **WHEN** 用户已登录状态下点击「IM 聊天」卡片
- **THEN** 系统导航至 `/im/chat/demo-expert-001` 聊天室演示页

### Requirement: 首页展示登录状态

系统 MUST 在演示首页展示当前登录状态，便于 PM 了解演示上下文。

#### Scenario: 未登录状态展示

- **WHEN** 用户未登录时访问演示首页
- **THEN** 首页顶部显示「未登录」提示

#### Scenario: 已登录状态展示

- **WHEN** 用户已登录时访问演示首页
- **THEN** 首页顶部显示用户昵称或手机号，并提供退出登录操作
