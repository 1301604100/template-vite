## ADDED Requirements

### Requirement: 首页 Tab 完整布局

系统 MUST 在首页 Tab 提供完整首页布局，包含顶部品牌区、金刚位和活动 Banner。

#### Scenario: 首页 Tab 展示

- **WHEN** 用户切换到「首页」Tab
- **THEN** 系统展示深色主题首页，包含顶部「准准」品牌 + 「准准日签」入口、可左右滑动的金刚位功能网格和活动轮播 Banner

#### Scenario: 顶部日签入口

- **WHEN** 用户查看首页顶部区域
- **THEN** 系统展示「准准日签」按钮及「免费」角标

#### Scenario: 点击日签入口

- **WHEN** 用户点击「准准日签」按钮
- **THEN** 系统 Toast 提示「准准日签演示中」

#### Scenario: 首页加载状态

- **WHEN** 首页 Tab 数据尚未加载完成
- **THEN** 系统展示加载中状态

## REMOVED Requirements

### Requirement: 首页 Tab 占位

**Reason**: 首页 Tab 已从占位页升级为完整首页布局
**Migration**: 首页 Tab 现展示金刚位 + Banner，不再显示欢迎占位文案
