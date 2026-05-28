## ADDED Requirements

### Requirement: 开屏页展示

系统 MUST 提供开屏页作为应用冷启动入口，展示 App 品牌信息。

#### Scenario: 展示开屏内容

- **WHEN** 用户访问 `/splash` 页面
- **THEN** 系统展示 App Logo（圆角渐变方块 + 图标）、应用名称「准准」、Slogan「你渴望倾诉的，这里都能找到答案」和版本号「V1.9.0」

#### Scenario: 深色主题背景

- **WHEN** 用户查看开屏页
- **THEN** 页面背景为深紫色（#1a1033），文字为白色

#### Scenario: 已登录用户进入开屏

- **WHEN** 已登录用户进入开屏页（完整 App 流程）
- **THEN** 系统延迟约 1 秒后自动导航至 `/app` 主框架

#### Scenario: 已同意隐私协议

- **WHEN** 未登录但已同意隐私协议的用户进入开屏页
- **THEN** 系统延迟约 1.5 秒后自动导航至 `/login/one-key`

#### Scenario: 未同意隐私协议

- **WHEN** 未同意隐私协议的用户进入开屏页
- **THEN** 系统展示开屏内容并在底部弹出隐私协议弹窗
