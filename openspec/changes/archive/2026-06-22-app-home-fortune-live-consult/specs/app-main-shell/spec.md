## MODIFIED Requirements

### Requirement: 首页 Tab 完整布局

系统 MUST 在首页 Tab 提供完整首页布局，包含顶部品牌区、金刚位、活动 Banner、今日运势、在线直播和 1v1 咨询模块。

#### Scenario: 首页 Tab 展示

- **WHEN** 用户切换到「首页」Tab
- **THEN** 系统展示深色主题可滚动首页，包含顶部「准准」品牌 + 「准准日签」入口、可左右滑动的金刚位、活动轮播 Banner、今日运势卡片、在线直播区块和 1v1 咨询区块

#### Scenario: 顶部日签入口

- **WHEN** 用户查看首页顶部区域
- **THEN** 系统展示「准准日签」按钮及「免费」角标

#### Scenario: 点击日签入口

- **WHEN** 用户点击「准准日签」按钮
- **THEN** 系统 Toast 提示「准准日签演示中」

#### Scenario: 首页加载状态

- **WHEN** 首页 Tab 数据尚未加载完成
- **THEN** 系统展示加载中状态

#### Scenario: 首页纵向滚动

- **WHEN** 首页内容超出视口高度
- **THEN** 系统允许用户纵向滚动浏览 Banner 以下全部模块
