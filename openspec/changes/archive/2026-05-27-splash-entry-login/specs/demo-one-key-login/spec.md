## ADDED Requirements

### Requirement: 一键登录页展示

系统 MUST 提供一键登录页，复刻 App 闪验一键登录的核心 UI。

#### Scenario: 展示一键登录界面

- **WHEN** 用户进入 `/login/one-key` 页面
- **THEN** 系统展示 App Logo、脱敏本机号码（如 153****4578）、「本机号码一键登录」渐变按钮、「使用其他手机号登录」文字链接

#### Scenario: 顶部跳过入口

- **WHEN** 用户查看一键登录页
- **THEN** 页面右上角展示「我先看看」入口

#### Scenario: 协议勾选

- **WHEN** 用户查看一键登录页底部
- **THEN** 系统展示协议勾选框及「我已阅读并同意《中国移动认证服务条款》和《用户协议》、《隐私政策》」文案

#### Scenario: 深色主题

- **WHEN** 用户查看一键登录页
- **THEN** 页面使用与设计稿一致的深色背景主题

### Requirement: 一键登录 Mock 流程

系统 MUST 支持 Mock 一键登录交互。

#### Scenario: 一键登录成功

- **WHEN** 用户勾选协议并点击「本机号码一键登录」
- **THEN** 系统调用 Mock 一键登录接口，保存用户信息至 Pinia，Toast 提示登录成功，导航至 `/home` 或 redirect 目标页

#### Scenario: 协议未勾选

- **WHEN** 用户未勾选协议并点击「本机号码一键登录」
- **THEN** 系统提示需先同意协议，不执行登录

#### Scenario: 切换短信登录

- **WHEN** 用户点击「使用其他手机号登录」
- **THEN** 系统导航至 `/login` 短信验证码登录页

#### Scenario: 跳过登录

- **WHEN** 用户点击「我先看看」
- **THEN** 系统导航至 `/home`，不执行登录

#### Scenario: 遇到问题链接

- **WHEN** 用户查看一键登录页底部
- **THEN** 系统展示「遇到问题？可点击这里」帮助链接（占位，点击 Toast 提示）
