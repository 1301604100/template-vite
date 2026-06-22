import {
  mockGetConsultExperts,
  mockGetDailyFortune,
  mockGetHomeBanners,
  mockGetHomeIcons,
  mockGetLiveRooms,
} from '@/mock/home';
import type {
  ConsultExpertItem,
  DailyFortune,
  HomeApiResponse,
  HomeBannerItem,
  HomeIconPage,
  LiveRoomItem,
} from '@/types/home';

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

/**
 * @description 获取今日运势
 */
export function getDailyFortune(): Promise<HomeApiResponse<DailyFortune>> {
  return mockGetDailyFortune();
}

/**
 * @description 获取在线直播列表
 */
export function getLiveRooms(): Promise<HomeApiResponse<LiveRoomItem[]>> {
  return mockGetLiveRooms();
}

/**
 * @description 获取 1v1 咨询达人列表
 */
export function getConsultExperts(): Promise<HomeApiResponse<ConsultExpertItem[]>> {
  return mockGetConsultExperts();
}
