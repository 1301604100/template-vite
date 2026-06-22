## ADDED Requirements

### Requirement: 全部直播页展示

系统 MUST 提供「全部房间」直播列表页，复刻 App 全部直播列表界面。

#### Scenario: 页面路由与标题

- **WHEN** 用户访问 `/live/list`
- **THEN** 系统展示顶部导航栏，标题为「全部房间」，左侧返回按钮

#### Scenario: 纵向列表展示

- **WHEN** 直播数据加载完成
- **THEN** 系统以纵向滚动列表展示全部直播间卡片

#### Scenario: 直播间卡片内容

- **WHEN** 单张卡片渲染
- **THEN** 卡片展示封面图、标题、品类标签、连麦状态（空闲中/咨询中）、达人头像和昵称

#### Scenario: 品类标签颜色

- **WHEN** 卡片品类为「塔罗」「国学」或「占星」
- **THEN** 系统分别以紫色、橙棕色、蓝色样式展示品类标签

#### Scenario: 连麦状态样式

- **WHEN** 卡片 status 为「空闲中」
- **THEN** 状态文字以浅色展示
- **WHEN** 卡片 status 为「咨询中」
- **THEN** 状态文字以粉紫色展示

#### Scenario: 点击卡片

- **WHEN** 用户点击某张直播卡片
- **THEN** 系统 Toast 提示直播间标题（演示占位，不进入真实直播间）

#### Scenario: 返回导航

- **WHEN** 用户点击导航栏返回按钮
- **THEN** 系统返回上一页

#### Scenario: 加载状态

- **WHEN** 页面数据尚未加载完成
- **THEN** 系统展示加载中状态

### Requirement: 全部直播 Mock 数据

系统 MUST 使用 Mock 数据模拟全部直播列表。

#### Scenario: Mock 数据加载

- **WHEN** 全部直播页初始化
- **THEN** 系统调用 Mock 接口获取直播列表，至少返回 6 条记录

#### Scenario: 数据字段

- **WHEN** Mock 返回直播数据
- **THEN** 每项包含 id、title、cover_url、category、expert_name、expert_avatar、status 字段

#### Scenario: 数据多样性

- **WHEN** Mock 返回直播数据
- **THEN** 列表包含至少 2 种品类和 2 种连麦状态
