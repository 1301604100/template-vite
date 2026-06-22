## ADDED Requirements

### Requirement: 今日运势入口展示

系统 MUST 在 App 首页 Banner 下方展示今日运势入口卡片，复刻 Android 首页运势摘要区域。

#### Scenario: 展示运势卡片

- **WHEN** 用户进入 `/app/home` 且运势数据加载完成
- **THEN** 系统展示用户昵称、今日运势总分、摘要文案和「更多」入口

#### Scenario: 五维运势条

- **WHEN** 运势卡片渲染
- **THEN** 系统展示爱情、事业、财富、社交、学业五个维度分数
- **AND** 分数变化趋势以箭头标识（上升/下降）

#### Scenario: 点击运势更多

- **WHEN** 用户点击运势卡片「更多」
- **THEN** 系统 Toast 提示「今日运势详情演示中」

#### Scenario: 点击运势卡片

- **WHEN** 用户点击运势卡片主体区域
- **THEN** 系统 Toast 提示「查看今日运势」

### Requirement: 运势 Mock 数据

系统 MUST 使用 Mock 数据模拟今日运势。

#### Scenario: Mock 数据加载

- **WHEN** 首页 Tab 初始化
- **THEN** 系统调用 Mock 接口获取运势数据，模拟 300ms 网络延迟

#### Scenario: 默认运势内容

- **WHEN** Mock 返回运势数据
- **THEN** 数据包含 nickname、total_score、summary 和 5 个 dimension 字段
