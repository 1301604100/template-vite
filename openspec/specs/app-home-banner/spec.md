# app-home-banner Specification

## Purpose

定义 App 首页活动轮播 Banner 的展示、自动播放与 Mock 数据规范。
## Requirements
### Requirement: 活动轮播 Banner 展示

系统 MUST 在 App 首页 Tab 底部展示活动轮播 Banner，复刻 Android 首页 ZCC 活动轮播区域。

#### Scenario: 展示 Banner 轮播

- **WHEN** 用户进入 `/app/home` 首页 Tab 且 Banner 数据加载完成
- **THEN** 系统在金刚位下方展示横向轮播 Banner，含活动标题和「查看详情」按钮

#### Scenario: 自动轮播

- **WHEN** Banner 数据包含多条记录
- **THEN** 系统每 3 秒自动切换到下一张 Banner

#### Scenario: 轮播指示器

- **WHEN** Banner 包含多条记录
- **THEN** 系统展示底部圆点指示器，当前页高亮

#### Scenario: 点击 Banner

- **WHEN** 用户点击某张 Banner
- **THEN** 系统 Toast 提示活动标题（演示占位，不跳转 H5/原生页）

#### Scenario: 单条 Banner

- **WHEN** Banner 数据仅 1 条
- **THEN** 系统展示该 Banner 且不展示指示器

### Requirement: Banner Mock 数据

系统 MUST 使用 Mock 数据模拟活动 Banner 配置。

#### Scenario: Mock 数据加载

- **WHEN** 首页 Tab 初始化
- **THEN** 系统调用 Mock 接口获取 Banner 列表，按 priority 降序排列

#### Scenario: 默认 Banner 内容

- **WHEN** Mock 返回 Banner 数据
- **THEN** 至少包含一条「2025星盘 年运报告」活动 Banner

