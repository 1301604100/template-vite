import {
  mockGetChatMessageList,
  mockGetHistoryImRecord,
  mockSendMessage,
  mockAutoReply,
  mockGetExpertInfo,
} from '@/mock/im';
import type { ApiResponse } from '@/types/login';
import type { ChatSession, ChatMessage, ExpertInfo } from '@/types/im';

/**
 * @description 获取 IM 会话列表
 */
export function getChatMessageList(): Promise<ApiResponse<{ list: ChatSession[] }>> {
  return mockGetChatMessageList();
}

/**
 * @description 获取历史消息
 */
export function getHistoryImRecord(
  expertId: string,
): Promise<ApiResponse<{ list: ChatMessage[] }>> {
  return mockGetHistoryImRecord(expertId);
}

/**
 * @description 发送文字消息
 */
export function sendMessage(
  expertId: string,
  content: string,
): Promise<ApiResponse<{ message_id: string }>> {
  return mockSendMessage(expertId, content);
}

/**
 * @description 获取达人自动回复
 */
export function getAutoReply(): Promise<ChatMessage> {
  return mockAutoReply();
}

/**
 * @description 获取达人信息
 */
export function getExpertInfo(expertId: string): Promise<ApiResponse<ExpertInfo | null>> {
  return mockGetExpertInfo(expertId);
}
