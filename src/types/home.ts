/** 金刚位功能入口项 */
export interface HomeIconItem {
  pkey: string;
  title: string;
  /** emoji 或占位图标 */
  icon: string;
  position: number;
  /** 图标背景渐变色 */
  gradient?: string;
}

/** 金刚位分页数据 */
export interface HomeIconPage {
  page: number;
  icons_per_row: number;
  icons: HomeIconItem[];
}

/** 活动 Banner 项 */
export interface HomeBannerItem {
  id: string;
  title: string;
  subtitle?: string;
  image_url?: string;
  link_url?: string;
  priority: number;
  /** 卡片背景渐变 */
  gradient?: string;
}

/** 运势维度 */
export interface FortuneDimension {
  key: 'love' | 'career' | 'wealth' | 'social' | 'study';
  label: string;
  score: number;
  trend?: 'up' | 'down';
}

/** 今日运势 */
export interface DailyFortune {
  nickname: string;
  total_score: number;
  summary: string;
  dimensions: FortuneDimension[];
}

/** 直播间连麦状态 */
export type LiveRoomStatus = '空闲中' | '咨询中';

/** 直播间 */
export interface LiveRoomItem {
  id: string;
  title: string;
  cover_url: string;
  category: string;
  expert_name: string;
  expert_avatar: string;
  /** 连麦状态 */
  status: LiveRoomStatus;
  /** 卡片背景渐变（无封面时） */
  gradient?: string;
}

/** 1v1 咨询达人 */
export interface ConsultExpertItem {
  expert_id: string;
  expert_name: string;
  expert_avatar: string;
  online_status: '在线' | '忙碌' | '休息';
  good_rate: number;
  service_count: number;
  description: string;
  price_per_minute: number;
  /** 性别 */
  gender: '男' | '女';
  /** 语音介绍时长（秒） */
  voice_duration: number;
  /** 认证标签 */
  badge?: string;
}

/** 首页 API 通用响应 */
export interface HomeApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}
