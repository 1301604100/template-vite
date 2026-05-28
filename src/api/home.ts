import { mockGetHomeBanners, mockGetHomeIcons } from '@/mock/home';
import type { HomeApiResponse, HomeBannerItem, HomeIconPage } from '@/types/home';

/**
 * @description 获取金刚位分页数据
 */
export function getHomeIcons(): Promise<HomeApiResponse<HomeIconPage[]>> {
  return mockGetHomeIcons();
}

/**
 * @description 获取首页活动 Banner 列表
 */
export function getHomeBanners(): Promise<HomeApiResponse<HomeBannerItem[]>> {
  return mockGetHomeBanners();
}
