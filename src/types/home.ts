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

/** 首页 API 通用响应 */
export interface HomeApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}
