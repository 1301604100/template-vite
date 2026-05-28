## ADDED Requirements

### Requirement: 金刚位功能入口展示

系统 MUST 在 App 首页 Tab 展示金刚位功能入口网格，复刻 Android 首页功能快捷入口区域。

#### Scenario: 展示金刚位网格

- **WHEN** 用户进入 `/app/home` 首页 Tab
- **THEN** 系统展示金刚位功能入口，默认第 1 页为 2 行 × 5 列共 10 个入口，每个入口包含图标和标题

#### Scenario: 金刚位左右滑动分页

- **WHEN** 用户在金刚位区域左右滑动
- **THEN** 系统切换至对应分页，展示该页的 5 列功能入口网格
- **AND** 底部分页指示器同步高亮当前页

#### Scenario: 多页金刚位数据

- **WHEN** Mock 返回多页金刚位数据
- **THEN** 第 1 页展示 10 个核心入口，第 2 页展示扩展入口（至少 5 个）

#### Scenario: 第 1 页核心功能列表

- **WHEN** 金刚位第 1 页数据加载完成
- **THEN** 系统展示以下功能入口：塔罗、骰子、星盘、合盘、星盘问答、测试报告、解梦、倾诉、手相、星宿

#### Scenario: 点击金刚位入口

- **WHEN** 用户点击某个金刚位功能入口
- **THEN** 系统 Toast 提示该功能名称（演示占位，不跳转子模块）

#### Scenario: 深色主题

- **WHEN** 用户查看金刚位区域
- **THEN** 图标和文字在深色背景（#1a1033）下清晰可辨

### Requirement: 金刚位 Mock 数据

系统 MUST 使用 Mock 数据模拟金刚位配置，数据结构对齐 Android `HomeIconInfoBean`。

#### Scenario: Mock 数据加载

- **WHEN** 首页 Tab 初始化
- **THEN** 系统调用 Mock 接口获取金刚位列表，模拟 300ms 网络延迟

#### Scenario: 数据字段

- **WHEN** Mock 返回金刚位数据
- **THEN** 每项包含 pkey、title、icon（占位）和 position 字段
- **AND** 数据按 page 分组，每页 icons_per_row 为 5
