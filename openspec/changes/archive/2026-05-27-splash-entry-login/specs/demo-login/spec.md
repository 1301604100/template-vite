## MODIFIED Requirements

### Requirement: 短信验证码登录表单

系统 MUST 提供短信验证码登录演示页，复刻 App 短信登录的核心表单交互，使用深色主题对齐设计稿。

#### Scenario: 展示登录表单

- **WHEN** 用户进入 `/login` 页面
- **THEN** 系统展示深色背景、标题「验证码登录」、手机号输入框、验证码输入框、获取验证码按钮、协议勾选框和登录按钮

#### Scenario: 手机号格式校验

- **WHEN** 用户输入非 11 位手机号并点击获取验证码
- **THEN** 系统提示手机号格式错误，不发送验证码

#### Scenario: 获取验证码倒计时

- **WHEN** 用户输入有效手机号并点击「获取验证码」
- **THEN** 系统模拟发送验证码，按钮进入 60 秒倒计时且不可重复点击

#### Scenario: 协议未勾选阻止登录

- **WHEN** 用户未勾选服务协议并点击登录
- **THEN** 系统提示需先同意协议，不执行登录

#### Scenario: 登录成功

- **WHEN** 用户填写手机号和验证码、勾选协议并点击登录
- **THEN** 系统调用 Mock 登录接口，保存用户信息至 Pinia 和 localStorage，Toast 提示登录成功

#### Scenario: 登录成功后跳转

- **WHEN** 登录成功且 URL 携带 redirect 参数
- **THEN** 系统导航至 redirect 指定路径

#### Scenario: 登录成功后默认跳转

- **WHEN** 登录成功且无 redirect 参数
- **THEN** 系统导航回演示首页 `/home`

#### Scenario: 跳过登录

- **WHEN** 用户点击「我先看看」
- **THEN** 系统导航回演示首页，不执行登录

### Requirement: 登录页导航栏

系统 MUST 在登录页提供与 App 一致的顶部导航操作。

#### Scenario: 返回上一页

- **WHEN** 用户点击登录页返回按钮
- **THEN** 系统导航回 `/login/one-key` 一键登录页

## ADDED Requirements

### Requirement: 短信登录页深色主题

系统 MUST 将短信验证码登录页样式对齐设计稿深色主题。

#### Scenario: 深色背景与渐变按钮

- **WHEN** 用户查看短信登录页
- **THEN** 页面背景为深紫色，登录按钮为紫色渐变，输入框为深色底 + 白色文字

#### Scenario: 从一键登录进入

- **WHEN** 用户从一键登录页点击「使用其他手机号登录」
- **THEN** 短信登录页展示返回按钮，点击返回一键登录页
