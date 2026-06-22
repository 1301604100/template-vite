## MODIFIED Requirements

### Requirement: 咨询 Tab 列表展示

系统 MUST 在 App 咨询 Tab（/app/qa）展示 1v1 咨询达人列表，复刻设计稿界面。

#### Scenario: 页面顶部

- **WHEN** 用户切换到咨询 Tab
- **THEN** 系统展示深色主题页面，顶部含「1v1咨询」标题、「连麦咨询」入口和搜索图标

#### Scenario: 排序 Tab 栏

- **WHEN** 用户查看咨询 Tab
- **THEN** 系统展示横向排序 Tab：综合、优选老师、好评优先、低价、连麦多、筛选

#### Scenario: 达人卡片列表

- **WHEN** 咨询达人数据加载完成
- **THEN** 系统以纵向列表展示达人卡片，每张含头像、在线状态、语音时长标识、昵称、好评率、连麦次数、简介、价格和「立即咨询」按钮

#### Scenario: 排序切换

- **WHEN** 用户点击不同排序 Tab（综合/优选老师/好评优先/低价/连麦多）
- **THEN** 系统按对应规则重新排列达人列表

#### Scenario: 筛选弹窗

- **WHEN** 用户点击「筛选」
- **THEN** 系统从底部弹出筛选面板，含连麦状态（连麦中/空闲中）和性别（男/女）选项

#### Scenario: 筛选确认

- **WHEN** 用户选择筛选条件并点击「确认」
- **THEN** 系统按条件过滤列表并关闭弹窗

#### Scenario: 筛选重置

- **WHEN** 用户在筛选面板点击「重置」
- **THEN** 系统清空筛选条件

#### Scenario: 点击达人卡片

- **WHEN** 用户点击咨询 Tab 中达人卡片（非「立即咨询」按钮）
- **THEN** 系统导航至 `/expert/:expertId` 达人主页

#### Scenario: 点击立即咨询

- **WHEN** 用户点击「立即咨询」按钮
- **THEN** 系统导航至 `/im/chat/:expertId` 全屏聊天室

#### Scenario: 加载状态

- **WHEN** 咨询 Tab 数据尚未加载完成
- **THEN** 系统展示加载中状态
