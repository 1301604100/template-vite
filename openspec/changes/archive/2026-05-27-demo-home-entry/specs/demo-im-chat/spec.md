## ADDED Requirements

### Requirement: IM 聊天室布局

系统 MUST 提供 1v1 聊天室演示页，复刻 App ChatActivity 的核心布局结构。

#### Scenario: 展示聊天室页面

- **WHEN** 已登录用户进入 `/im/chat/:expertId`
- **THEN** 系统展示顶部达人信息栏（头像、昵称、在线状态）、消息列表区域和底部输入栏

#### Scenario: 未登录访问聊天室

- **WHEN** 未登录用户直接访问聊天室 URL
- **THEN** 系统提示需要登录并导航至登录页，携带 redirect 参数

#### Scenario: 加载历史消息

- **WHEN** 用户进入聊天室
- **THEN** 系统调用 Mock 接口加载该达人的历史消息，按时间顺序展示消息气泡

### Requirement: 消息气泡展示

系统 MUST 以气泡形式展示文字消息，区分用户与达人消息。

#### Scenario: 用户消息气泡

- **WHEN** 消息 sender_role 为用户
- **THEN** 消息气泡右对齐，使用用户侧样式（如蓝色背景）

#### Scenario: 达人消息气泡

- **WHEN** 消息 sender_role 为达人
- **THEN** 消息气泡左对齐，展示达人头像，使用达人侧样式（如白色/灰色背景）

### Requirement: 发送文字消息

系统 MUST 支持在聊天室发送文字消息（Mock 模式）。

#### Scenario: 发送消息

- **WHEN** 用户在输入框输入文字并点击发送
- **THEN** 系统将消息立即插入消息列表（发送中状态），Mock 接口返回成功后更新为已发送状态

#### Scenario: 空消息不可发送

- **WHEN** 用户输入框为空时点击发送
- **THEN** 系统不执行发送操作

#### Scenario: 模拟达人回复

- **WHEN** 用户发送消息成功后
- **THEN** 系统在约 1 秒后自动插入一条 Mock 达人回复消息，模拟对话效果

### Requirement: 聊天室导航栏

系统 MUST 在聊天室提供顶部导航操作。

#### Scenario: 返回消息列表

- **WHEN** 用户点击聊天室返回按钮
- **THEN** 系统导航至 `/im/list`
