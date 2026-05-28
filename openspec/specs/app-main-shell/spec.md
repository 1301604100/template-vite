# app-main-shell Specification

## Purpose

定义 App 主框架（`/app`）的底部 Tab 导航与各 Tab 页内容规范，复刻 Android MainActivity 的四 Tab 结构。

## Requirements

### Requirement: App 主框架底部 Tab 导航

系统 MUST 提供 App 主框架页，复刻 Android MainActivity 的底部 Tab 导航结构。

#### Scenario: 展示主框架

- **WHEN** 已登录用户进入 `/app` 路径
- **THEN** 系统展示底部 Tab 栏，包含「首页」「问答」「消息」「我的」四个 Tab

#### Scenario: Tab 切换

- **WHEN** 用户点击底部 Tab 项
- **THEN** 系统切换至对应子路由（/app/home、/app/qa、/app/message、/app/mine），Tab 高亮状态同步更新

#### Scenario: 默认 Tab

- **WHEN** 用户首次进入 `/app`
- **THEN** 系统默认展示「首页」Tab（/app/home）

#### Scenario: 未登录访问主框架

- **WHEN** 未登录用户访问 `/app` 或其子路由
- **THEN** 系统拦截并导航至 `/login/one-key`，携带 redirect 参数

### Requirement: 首页 Tab 完整布局

系统 MUST 在首页 Tab 提供完整首页布局，包含顶部品牌区、金刚位和活动 Banner。

#### Scenario: 首页 Tab 展示

- **WHEN** 用户切换到「首页」Tab
- **THEN** 系统展示深色主题首页，包含顶部「准准」品牌 + 「准准日签」入口、可左右滑动的金刚位功能网格和活动轮播 Banner

#### Scenario: 顶部日签入口

- **WHEN** 用户查看首页顶部区域
- **THEN** 系统展示「准准日签」按钮及「免费」角标

#### Scenario: 点击日签入口

- **WHEN** 用户点击「准准日签」按钮
- **THEN** 系统 Toast 提示「准准日签演示中」

#### Scenario: 首页加载状态

- **WHEN** 首页 Tab 数据尚未加载完成
- **THEN** 系统展示加载中状态

### Requirement: 问答 Tab 占位

系统 MUST 在问答 Tab 提供占位内容。

#### Scenario: 问答 Tab 展示

- **WHEN** 用户切换到「问答」Tab
- **THEN** 系统展示问答模块占位说明页

### Requirement: 消息 Tab 集成 IM 列表

系统 MUST 在消息 Tab 嵌入 IM 消息列表功能。

#### Scenario: 消息 Tab 展示会话列表

- **WHEN** 用户切换到「消息」Tab
- **THEN** 系统展示 IM 会话列表（达人头像、昵称、最后消息、未读数）

#### Scenario: 从消息 Tab 进入聊天室

- **WHEN** 用户在消息 Tab 点击某个会话
- **THEN** 系统导航至 `/im/chat/:expertId` 全屏聊天室

#### Scenario: 聊天室返回消息 Tab

- **WHEN** 用户在聊天室点击返回
- **THEN** 系统导航回 `/app/message` 消息 Tab

### Requirement: 我的 Tab 用户中心

系统 MUST 在「我的」Tab 展示用户信息与操作入口。

#### Scenario: 展示用户信息

- **WHEN** 已登录用户切换到「我的」Tab
- **THEN** 系统展示用户头像、昵称和手机号

#### Scenario: 退出登录

- **WHEN** 用户点击「退出登录」
- **THEN** 系统清除登录态，导航至 `/splash` 重新进入冷启动流程

#### Scenario: 进入演示沙盒

- **WHEN** 用户点击「演示沙盒」入口
- **THEN** 系统导航至 `/home` 演示首页
