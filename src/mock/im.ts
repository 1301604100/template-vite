import type { ChatSession, ChatMessage, ExpertInfo } from '@/types/im';
import type { ApiResponse } from '@/types/login';

function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const EXPERTS: Record<string, ExpertInfo> = {
  'demo-expert-001': {
    expert_id: 'demo-expert-001',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    online_status: '在线',
    good_rate: '90%',
    service_count: 999,
  },
  'demo-expert-002': {
    expert_id: 'demo-expert-002',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
    online_status: '休息',
    good_rate: '88%',
    service_count: 756,
  },
  'demo-expert-003': {
    expert_id: 'demo-expert-003',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/sand.jpeg',
    online_status: '忙碌',
    good_rate: '95%',
    service_count: 1200,
  },
  'demo-expert-004': {
    expert_id: 'demo-expert-004',
    expert_name: '星语老师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    online_status: '在线',
    good_rate: '92%',
    service_count: 680,
  },
  'demo-expert-005': {
    expert_id: 'demo-expert-005',
    expert_name: '灵犀老师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
    online_status: '在线',
    good_rate: '86%',
    service_count: 450,
  },
  'demo-expert-006': {
    expert_id: 'demo-expert-006',
    expert_name: '紫薇老师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/sand.jpeg',
    online_status: '忙碌',
    good_rate: '98%',
    service_count: 1500,
  },
};

const MOCK_SESSIONS: ChatSession[] = [
  {
    expert_id: 'demo-expert-001',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    last_message: '你好，有什么可以帮你的吗？',
    unread_count: 2,
    update_time: '10:30',
  },
  {
    expert_id: 'demo-expert-002',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
    last_message: '你的牌面整体不错哦~',
    unread_count: 0,
    update_time: '昨天',
  },
  {
    expert_id: 'demo-expert-003',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/sand.jpeg',
    last_message: '感谢你的信任，祝一切顺利！',
    unread_count: 0,
    update_time: '周一',
  },
];

function buildHistoryMessages(expertId: string): ChatMessage[] {
  const expert = EXPERTS[expertId];
  const name = expert?.expert_name ?? '达人';
  return [
    {
      message_id: 'msg-001',
      type: 0,
      content: `你好，我是${name}，很高兴为你服务～`,
      sender_role: 'expert',
      create_time: '2026-05-27 09:00:00',
    },
    {
      message_id: 'msg-002',
      type: 0,
      content: '老师好，我最近感情方面有些困惑，想咨询一下',
      sender_role: 'user',
      create_time: '2026-05-27 09:01:00',
    },
    {
      message_id: 'msg-003',
      type: 0,
      content: '好的，你可以先简单描述一下你的情况，我来帮你分析',
      sender_role: 'expert',
      create_time: '2026-05-27 09:01:30',
    },
    {
      message_id: 'msg-004',
      type: 0,
      content: '我和对象最近经常因为小事吵架，不知道怎么办',
      sender_role: 'user',
      create_time: '2026-05-27 09:02:00',
    },
    {
      message_id: 'msg-005',
      type: 0,
      content: '理解你的感受，这种情况挺常见的。我帮你抽一组牌看看吧',
      sender_role: 'expert',
      create_time: '2026-05-27 09:02:30',
    },
  ];
}

const AUTO_REPLIES = [
  '好的，我理解你的意思了，让我想想...',
  '这个情况我之前遇到过，给你一些建议吧~',
  '你说得对，我们可以从另一个角度来看这件事',
  '嗯嗯，继续说，我在听',
  '你的牌面显示整体运势还是不错的哦',
  '不用担心，一切都会慢慢好起来的',
];

/**
 * @description Mock 获取会话列表
 */
export async function mockGetChatMessageList(): Promise<ApiResponse<{ list: ChatSession[] }>> {
  await delay(300);
  return { code: 0, message: 'success', data: { list: MOCK_SESSIONS } };
}

/**
 * @description Mock 获取历史消息
 */
export async function mockGetHistoryImRecord(
  expertId: string,
): Promise<ApiResponse<{ list: ChatMessage[] }>> {
  await delay(400);
  return { code: 0, message: 'success', data: { list: buildHistoryMessages(expertId) } };
}

/**
 * @description Mock 发送消息
 */
export async function mockSendMessage(
  _expertId: string,
  _content: string,
): Promise<ApiResponse<{ message_id: string }>> {
  await delay(300);
  return {
    code: 0,
    message: 'success',
    data: { message_id: 'msg-' + Date.now() },
  };
}

/**
 * @description Mock 达人自动回复（1s 延迟）
 */
export async function mockAutoReply(): Promise<ChatMessage> {
  await delay(1000);
  const content = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
  return {
    message_id: 'msg-reply-' + Date.now(),
    type: 0,
    content,
    sender_role: 'expert',
    create_time: new Date().toLocaleString(),
    status: 'sent',
  };
}

/**
 * @description 获取达人信息
 */
export async function mockGetExpertInfo(
  expertId: string,
): Promise<ApiResponse<ExpertInfo | null>> {
  await delay(200);
  const expert = EXPERTS[expertId] ?? null;
  return { code: expert ? 0 : -1, message: expert ? 'success' : '达人不存在', data: expert };
}
