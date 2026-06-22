## MODIFIED Requirements

### Requirement: App 主框架底部 Tab 导航

系统 MUST 提供 App 主框架页，复刻 Android MainActivity 的底部 Tab 导航结构。

#### Scenario: 展示主框架

- **WHEN** 已登录用户进入 `/app` 路径
- **THEN** 系统展示底部 Tab 栏，包含「首页」「咨询」「消息」「我的」四个 Tab

#### Scenario: Tab 切换

- **WHEN** 用户点击底部 Tab 项
- **THEN** 系统切换至对应子路由（/app/home、/app/qa、/app/message、/app/mine），Tab 高亮状态同步更新

#### Scenario: Tab 页状态缓存

- **WHEN** 用户在某个 Tab 页滚动或操作后切换到其他 Tab，再切回
- **THEN** 系统通过 keep-alive 恢复该 Tab 页的滚动位置与页面状态，不重新初始化
- **AND** 各 Tab 页使用独立内部滚动容器，互不影响滚动位置

#### Scenario: 默认 Tab

- **WHEN** 用户首次进入 `/app`
- **THEN** 系统默认展示「首页」Tab（/app/home）

#### Scenario: 未登录访问主框架

- **WHEN** 未登录用户访问 `/app` 或其子路由
- **THEN** 系统拦截并导航至 `/login/one-key`，携带 redirect 参数

## REMOVED Requirements

### Requirement: 问答 Tab 占位

**Reason**: 问答 Tab 已替换为 1v1 咨询列表页

**Migration**: 原 `/app/qa` 路由保留，内容改为咨询 Tab 列表

## ADDED Requirements

### Requirement: 咨询 Tab 完整内容

系统 MUST 在咨询 Tab 提供 1v1 咨询达人列表完整功能。

#### Scenario: 咨询 Tab 展示

- **WHEN** 用户切换到「咨询」Tab
- **THEN** 系统展示 1v1 咨询达人列表页（含排序筛选与卡片列表），而非占位说明页

### Requirement: 消息 Tab 集成 IM 列表

系统 MUST 在消息 Tab 嵌入 IM 消息列表功能。

#### Scenario: 消息 Tab 展示会话列表

- **WHEN** 用户切换到「消息」Tab
- **THEN** 系统展示 IM 会话列表（达人头像、昵称、最后消息、未读数）

#### Scenario: 从消息 Tab 进入聊天室

- **WHEN** 用户在消息 Tab 点击某个会话
- **THEN** 系统导航至 `/im/chat/:expertId` 全屏聊天室

#### Scenario: 聊天室返回来源页

- **WHEN** 用户在聊天室点击返回
- **THEN** 系统通过 `router.back()` 返回进入聊天前的页面（首页、咨询 Tab 或消息 Tab）；无历史记录时 fallback 至 `/app/message`
