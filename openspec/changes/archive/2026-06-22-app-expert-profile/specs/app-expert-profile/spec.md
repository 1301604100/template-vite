## ADDED Requirements

### Requirement: 达人主页展示

系统 MUST 提供达人主页，复刻 App 达人详情页界面。

#### Scenario: 页面路由

- **WHEN** 用户访问 `/expert/:expertId`
- **THEN** 系统展示达人主页，含顶部导航栏和返回按钮

#### Scenario: 头部信息

- **WHEN** 达人数据加载完成
- **THEN** 系统展示封面背景、头像、昵称、排行榜标签、粉丝数、好评率、近期连麦数、达人标签和关注按钮

#### Scenario: Tab 切换

- **WHEN** 用户查看达人主页
- **THEN** 系统展示「个人简介」「服务」「评价」三个 Tab

#### Scenario: 个人简介 Tab

- **WHEN** 用户切换到「个人简介」Tab
- **THEN** 系统展示达人介绍文案和连麦咨询区块

#### Scenario: 连麦咨询区块

- **WHEN** 个人简介 Tab 渲染连麦咨询区域
- **THEN** 系统展示直播间卡片、普通连麦价格、1v1 私密连麦价格和预约状态按钮

#### Scenario: 服务 Tab

- **WHEN** 用户切换到「服务」Tab
- **THEN** 系统展示文字套餐列表和服务卡片列表

#### Scenario: 评价 Tab

- **WHEN** 用户切换到「评价」Tab
- **THEN** 系统展示用户评价列表（头像、昵称、评分、标签、内容）

#### Scenario: 底部操作栏

- **WHEN** 用户查看达人主页
- **THEN** 系统展示底部固定操作栏：打赏、已预约连麦、免费私聊

#### Scenario: 免费私聊（从聊天页返回）

- **WHEN** 用户点击「免费私聊」且页面 query 参数 from=chat
- **THEN** 系统通过 `router.back()` 返回已有聊天页，避免重复压栈

#### Scenario: 免费私聊（新开聊天）

- **WHEN** 用户点击「免费私聊」且无 from=chat 参数
- **THEN** 系统导航至 `/im/chat/:expertId`

#### Scenario: 其他操作占位

- **WHEN** 用户点击关注、打赏、预约连麦或服务「立即沟通」
- **THEN** 系统 Toast 提示演示占位

#### Scenario: 返回导航

- **WHEN** 用户点击返回
- **THEN** 系统通过 `router.back()` 返回上一页

### Requirement: 达人主页 Mock 数据

系统 MUST 使用 Mock 数据模拟达人主页详情。

#### Scenario: Mock 数据加载

- **WHEN** 达人主页初始化
- **THEN** 系统调用 Mock 接口获取达人详情，模拟 300ms 延迟

#### Scenario: 数据字段

- **WHEN** Mock 返回达人详情
- **THEN** 数据包含 expert_id、expert_name、expert_avatar、cover_url、bio、tags、voice_call_price、private_call_price、text_packages、services、reviews 字段

#### Scenario: ID 兼容

- **WHEN** expert_id 为咨询列表中的 demo-expert-001 ~ 006
- **THEN** Mock 均能返回完整达人详情
