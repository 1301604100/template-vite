/** 文字套餐 */
export interface TextPackage {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  /** 套餐图标文案 */
  badge_text: string;
}

/** 达人服务项 */
export interface ExpertService {
  id: string;
  title: string;
  category: string;
  description: string;
  note: string;
}

/** 达人评价 */
export interface ExpertReview {
  id: string;
  user_name: string;
  user_avatar: string;
  date: string;
  rating: number;
  badge?: string;
  tags: string[];
  content: string;
}

/** 达人主页详情 */
export interface ExpertProfile {
  expert_id: string;
  expert_name: string;
  expert_avatar: string;
  cover_url: string;
  online_status: string;
  good_rate: number;
  follower_count: number;
  service_count: number;
  rank_label?: string;
  tags: string[];
  bio: string;
  is_followed: boolean;
  voice_call_price: number;
  private_call_price: number;
  appointment_status?: string;
  appointment_time?: string;
  text_packages: TextPackage[];
  services: ExpertService[];
  reviews: ExpertReview[];
}

/** 达人 API 通用响应 */
export interface ExpertApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}
