## ADDED Requirements

### Requirement: 在线直播区块展示

系统 MUST 在 App 首页运势卡片下方展示在线直播区块，复刻 Android 首页直播间列表区域。

#### Scenario: 展示区块标题

- **WHEN** 用户查看在线直播区域
- **THEN** 系统展示「在线直播 | 在线连麦实时沟通」标题及「更多」入口

#### Scenario: 展示直播卡片列表

- **WHEN** 直播数据加载完成
- **THEN** 系统以横向滚动方式展示直播间卡片，每张含封面、标题、品类标签和达人昵称

#### Scenario: 点击直播卡片

- **WHEN** 用户点击某张直播卡片
- **THEN** 系统 Toast 提示直播间标题（演示占位，不进入真实直播间）

#### Scenario: 点击直播更多

- **WHEN** 用户点击在线直播「更多」
- **THEN** 系统 Toast 提示「在线直播列表演示中」

### Requirement: 直播 Mock 数据

系统 MUST 使用 Mock 数据模拟在线直播列表。

#### Scenario: Mock 数据加载

- **WHEN** 首页 Tab 初始化
- **THEN** 系统调用 Mock 接口获取直播列表，至少返回 2 条记录

#### Scenario: 数据字段

- **WHEN** Mock 返回直播数据
- **THEN** 每项包含 id、title、cover_url、category、expert_name 字段
