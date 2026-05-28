## ADDED Requirements

### Requirement: 隐私协议弹窗展示

系统 MUST 在首次启动开屏页时展示隐私协议底部弹窗。

#### Scenario: 弹窗内容

- **WHEN** 隐私协议弹窗展示
- **THEN** 系统显示标题「用户协议及隐私条款」、协议正文（含《服务协议》和《隐私策略》紫色链接）、「拒绝」和「同意」两个按钮

#### Scenario: 同意隐私协议

- **WHEN** 用户点击「同意」按钮
- **THEN** 系统将隐私同意状态写入 localStorage，关闭弹窗，导航至 `/login/one-key`

#### Scenario: 拒绝隐私协议

- **WHEN** 用户点击「拒绝」按钮
- **THEN** 系统 Toast 提示「需同意协议才能继续使用」，弹窗保持展示

#### Scenario: 非首次启动不弹窗

- **WHEN** 用户已同意过隐私协议（localStorage 有记录）
- **THEN** 系统不再展示隐私协议弹窗

#### Scenario: 重置隐私状态

- **WHEN** 演示首页点击「开屏入口」卡片
- **THEN** 系统清除隐私同意状态并导航至 `/splash`，重新触发完整冷启动流程
