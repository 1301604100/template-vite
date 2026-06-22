## ADDED Requirements

### Requirement: 1v1 咨询区块展示

系统 MUST 在 App 首页在线直播区块下方展示 1v1 咨询达人列表，复刻 Android 首页推荐达人区域。

#### Scenario: 展示区块标题

- **WHEN** 用户查看 1v1 咨询区域
- **THEN** 系统展示「1v1咨询 | 私密解惑沟通」标题及「更多」入口

#### Scenario: 展示达人卡片列表

- **WHEN** 咨询达人数据加载完成
- **THEN** 系统以纵向列表展示达人卡片，每张含头像、在线状态、昵称、好评率、连麦次数、简介、价格和「立即咨询」按钮

#### Scenario: 达人在线状态

- **WHEN** 达人卡片渲染
- **THEN** 系统根据 online_status 展示「在线」「忙碌」或「休息」状态标识

#### Scenario: 点击立即咨询

- **WHEN** 用户点击某达人「立即咨询」按钮
- **THEN** 系统 Toast 提示该达人名称（演示占位，不进入连麦/支付流程）

#### Scenario: 点击咨询更多

- **WHEN** 用户点击 1v1 咨询「更多」
- **THEN** 系统 Toast 提示「1v1 咨询列表演示中」

### Requirement: 咨询 Mock 数据

系统 MUST 使用 Mock 数据模拟 1v1 咨询达人列表。

#### Scenario: Mock 数据加载

- **WHEN** 首页 Tab 初始化
- **THEN** 系统调用 Mock 接口获取达人列表，至少返回 3 条记录

#### Scenario: 数据字段

- **WHEN** Mock 返回达人数据
- **THEN** 每项包含 expert_id、expert_name、online_status、good_rate、service_count、price_per_minute 字段
