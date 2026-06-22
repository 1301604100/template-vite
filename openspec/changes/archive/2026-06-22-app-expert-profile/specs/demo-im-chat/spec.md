## MODIFIED Requirements

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

### Requirement: 聊天室导航栏

系统 MUST 在聊天室提供顶部导航操作。

#### Scenario: 返回来源页

- **WHEN** 用户点击聊天室返回按钮
- **THEN** 系统通过 `router.back()` 返回进入聊天前的页面；无历史记录时 fallback 至 `/app/message`

#### Scenario: 点击达人头像进入主页

- **WHEN** 用户点击聊天室顶部达人信息区的头像
- **THEN** 系统导航至 `/expert/:expertId`，并携带 query 参数 from=chat

#### Scenario: 点击消息气泡达人头像

- **WHEN** 用户点击消息列表中达人消息的头像
- **THEN** 系统导航至 `/expert/:expertId`，并携带 query 参数 from=chat
