/** 会话列表项 */
export interface ChatSession {
  expert_id: string;
  expert_name: string;
  expert_avatar: string;
  last_message: string;
  unread_count: number;
  update_time: string;
}

/** 聊天消息 */
export interface ChatMessage {
  message_id: string;
  type: number;
  content: string;
  /** 'user' | 'expert' */
  sender_role: string;
  create_time: string;
  /** 'sending' | 'sent' | 'failed' */
  status?: string;
}

/** 达人信息 */
export interface ExpertInfo {
  expert_id: string;
  expert_name: string;
  expert_avatar: string;
  online_status: string;
  good_rate: string;
  service_count: number;
}

/** 发送消息请求参数 */
export interface SendMessageReq {
  expert_id: string;
  content: string;
  type?: number;
}

/** 历史消息请求参数 */
export interface HistoryImRecordReq {
  expert_id: string;
  page?: number;
  page_size?: number;
}
