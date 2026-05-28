## ADDED Requirements

### Requirement: IM 消息列表展示

系统 MUST 提供 IM 消息列表演示页，复刻 App 消息 Tab 的会话列表展示。

#### Scenario: 未登录访问消息列表

- **WHEN** 未登录用户直接访问 `/im/list`
- **THEN** 系统提示需要登录并导航至 `/login?redirect=/im/list`

#### Scenario: 展示会话列表

- **WHEN** 已登录用户进入 `/im/list`
- **THEN** 系统调用 Mock 接口获取会话列表，展示达人头像、昵称、最后一条消息、未读数和更新时间

#### Scenario: 空列表状态

- **WHEN** Mock 返回空会话列表
- **THEN** 系统展示空态提示「暂无消息」

#### Scenario: 点击会话进入聊天室

- **WHEN** 用户点击某个会话项
- **THEN** 系统导航至 `/im/chat/:expertId`，expertId 取自该会话的达人 ID

#### Scenario: 下拉刷新

- **WHEN** 用户在消息列表页执行下拉刷新
- **THEN** 系统重新加载 Mock 会话列表数据

### Requirement: 消息列表导航栏

系统 MUST 在消息列表页提供顶部导航栏。

#### Scenario: 返回演示首页

- **WHEN** 用户点击消息列表页返回按钮
- **THEN** 系统导航至 `/home`
