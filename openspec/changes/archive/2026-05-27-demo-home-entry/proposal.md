## Why

zhunzhun-process 项目目前仅有脚手架（空路由、占位 API），无法向产品经理演示 App 核心交互流程。需要建立统一的演示入口页，并复刻登录、IM 聊天等关键流程，使 PM 可在 H5 中快速体验与 App 一致的交互路径。

## What Changes

- 新增演示首页（`/home`），作为所有流程的统一入口，展示可点击的流程卡片（登录、IM 聊天等）
- 新增短信验证码登录演示页，复刻 App `SmsLoginActivity` 的核心交互（手机号输入、验证码倒计时、协议勾选、登录成功跳转）
- 新增 IM 消息列表演示页，复刻 App `AdvisoryMessageFragment` 的会话列表展示
- 新增 IM 聊天室演示页，复刻 App `ChatActivity` 的核心布局（顶部达人信息、消息气泡、输入框发送）
- 完善路由配置、Pinia 用户状态、Mock 数据层，支持演示流程间的跳转与登录态传递
- 使用 Mock 数据模拟 API 响应，不依赖真实后端与 Agora RTM

## Capabilities

### New Capabilities

- `demo-home`: 演示首页入口，展示流程导航卡片，支持跳转到各演示模块
- `demo-login`: 短信验证码登录流程演示，包含发验证码、登录、协议勾选、登录成功状态保存
- `demo-im-list`: IM 消息列表演示，展示会话列表（达人头像、昵称、最后消息、未读数）
- `demo-im-chat`: IM 1v1 聊天室演示，展示历史消息、发送文字消息、消息气泡样式

### Modified Capabilities

（无现有 spec，无需修改）

## Impact

- **新增页面**: `src/pages/home/`、`src/pages/login/`、`src/pages/im/`
- **新增组件**: 聊天消息气泡、会话列表项、流程入口卡片等
- **API 层**: 新增 `src/api/login.ts`、`src/api/im.ts` 及对应 Mock 数据
- **状态管理**: 完善 `src/store/user.ts`，存储登录态与用户信息
- **路由**: `src/router/index.ts` 新增 4 条路由
- **参考来源**: tarot-android 登录/IM 模块、taluo-app-backend H5 登录与 IM 接口定义
