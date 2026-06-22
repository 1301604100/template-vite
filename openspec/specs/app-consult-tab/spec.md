# app-consult-tab Specification

## Purpose

定义 App 咨询 Tab（1v1 咨询达人列表）的展示、排序筛选、导航与 Mock 数据规范。

## Requirements

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

#### Scenario: 进入 IM 聊天

- **WHEN** 用户点击咨询 Tab 中某达人卡片或「立即咨询」按钮
- **THEN** 系统导航至 `/im/chat/:expertId` 全屏聊天室

#### Scenario: 加载状态

- **WHEN** 咨询 Tab 数据尚未加载完成
- **THEN** 系统展示加载中状态

### Requirement: 咨询 Tab Mock 数据

系统 MUST 使用 Mock 数据模拟咨询 Tab 达人列表。

#### Scenario: Mock 数据加载

- **WHEN** 咨询 Tab 初始化
- **THEN** 系统调用 Mock 接口获取达人列表，至少返回 6 条记录

#### Scenario: 数据字段

- **WHEN** Mock 返回达人数据
- **THEN** 每项包含 expert_id、expert_name、expert_avatar、online_status、good_rate、service_count、description、price_per_minute、gender 字段

#### Scenario: IM 兼容性

- **WHEN** Mock 返回达人 expert_id
- **THEN** expert_id 与 IM Mock 中 ExpertInfo 的 ID 一致，确保聊天页可加载

#### Scenario: 聊天页返回来源页

- **WHEN** 用户从咨询 Tab 或首页进入 IM 聊天后点击返回
- **THEN** 系统通过 `router.back()` 返回进入聊天前的页面，而非固定跳转消息 Tab
