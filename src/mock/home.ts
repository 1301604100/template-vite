import type {
  ConsultExpertItem,
  DailyFortune,
  HomeApiResponse,
  HomeBannerItem,
  HomeIconPage,
  LiveRoomItem,
} from '@/types/home';

/**
 * @description 模拟网络延迟
 */
function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PAGE1_ICONS: HomeIconPage = {
  page: 1,
  icons_per_row: 5,
  icons: [
    { pkey: 'tarot', title: '塔罗', icon: '🃏', position: 1, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { pkey: 'dice', title: '骰子', icon: '🎲', position: 2, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { pkey: 'astro_solve', title: '星盘', icon: '⭐', position: 3, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { pkey: 'astro_couple', title: '合盘', icon: '💕', position: 4, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { pkey: 'ask_astro', title: '星盘问答', icon: '🔮', position: 5, gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { pkey: 'report_voice', title: '测试报告', icon: '📋', position: 6, gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
    { pkey: 'dream_voice', title: '解梦', icon: '🌙', position: 7, gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
    { pkey: 'talk_voice', title: '倾诉', icon: '💬', position: 8, gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { pkey: 'palm', title: '手相', icon: '✋', position: 9, gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { pkey: 'xingxiu', title: '星宿', icon: '✨', position: 10, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  ],
};

const PAGE2_ICONS: HomeIconPage = {
  page: 2,
  icons_per_row: 5,
  icons: [
    { pkey: 'paizhen', title: '牌阵', icon: '🎴', position: 11, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { pkey: 'astro_luck', title: '运势', icon: '🌟', position: 12, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { pkey: 'voice_chat', title: '连麦', icon: '🎙️', position: 13, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { pkey: 'ai_bot', title: 'AI占卜', icon: '🤖', position: 14, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { pkey: 'more', title: '更多', icon: '➕', position: 15, gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  ],
};

const MOCK_BANNERS: HomeBannerItem[] = [
  {
    id: 'banner_1',
    title: '2025星盘 年运报告',
    subtitle: '查看详情',
    priority: 100,
    gradient: 'linear-gradient(135deg, #1a1033 0%, #4a2c7a 50%, #7b5ea7 100%)',
  },
  {
    id: 'banner_2',
    title: '塔罗牌阵 限时免费',
    subtitle: '查看详情',
    priority: 90,
    gradient: 'linear-gradient(135deg, #251845 0%, #5b3a8c 50%, #9b6fd0 100%)',
  },
  {
    id: 'banner_3',
    title: '新人专享 首单立减',
    subtitle: '立即领取',
    priority: 80,
    gradient: 'linear-gradient(135deg, #2d1b4e 0%, #6b4c9a 50%, #c084fc 100%)',
  },
  {
    id: 'banner_4',
    title: '大师连麦 情感咨询',
    subtitle: '查看详情',
    priority: 70,
    gradient: 'linear-gradient(135deg, #1a1033 0%, #3d2566 50%, #764ba2 100%)',
  },
];

/**
 * @description Mock 获取金刚位分页数据
 */
export async function mockGetHomeIcons(): Promise<HomeApiResponse<HomeIconPage[]>> {
  await delay();
  return {
    code: 0,
    message: 'success',
    data: [PAGE1_ICONS, PAGE2_ICONS],
  };
}

/**
 * @description Mock 获取首页 Banner 列表
 */
export async function mockGetHomeBanners(): Promise<HomeApiResponse<HomeBannerItem[]>> {
  await delay();
  const sorted = [...MOCK_BANNERS].sort((a, b) => b.priority - a.priority);
  return {
    code: 0,
    message: 'success',
    data: sorted,
  };
}

const MOCK_FORTUNE: DailyFortune = {
  nickname: '冰冰哈哈',
  total_score: 73,
  summary: '单身的你今天可能会感到感觉有些心累，忙',
  dimensions: [
    { key: 'love', label: '爱情', score: 90, trend: 'up' },
    { key: 'career', label: '事业', score: 71 },
    { key: 'wealth', label: '财富', score: 71 },
    { key: 'social', label: '社交', score: 52, trend: 'down' },
    { key: 'study', label: '学业', score: 52 },
  ],
};

const MOCK_LIVE_ROOMS: LiveRoomItem[] = [
  {
    id: 'live_1',
    title: '他内心真正的想法是什么？',
    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    category: '塔罗',
    expert_name: '暖暖塔罗咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    status: '空闲中',
    gradient: 'linear-gradient(135deg, #251845 0%, #4a2c7a 100%)',
  },
  {
    id: 'live_2',
    title: '他内心真正的想法是什么？',
    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    category: '国学',
    expert_name: '暖暖塔罗咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    status: '咨询中',
    gradient: 'linear-gradient(135deg, #1a1033 0%, #3d2566 100%)',
  },
  {
    id: 'live_3',
    title: '他内心真正的想法是什么？',
    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    category: '占星',
    expert_name: '暖暖塔罗咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    status: '空闲中',
    gradient: 'linear-gradient(135deg, #251845 0%, #4a2c7a 100%)',
  },
  {
    id: 'live_4',
    title: '他内心真正的想法是什么？',
    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    category: '塔罗',
    expert_name: '暖暖塔罗咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    status: '咨询中',
    gradient: 'linear-gradient(135deg, #1a1033 0%, #3d2566 100%)',
  },
  {
    id: 'live_5',
    title: '他内心真正的想法是什么？',
    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    category: '国学',
    expert_name: '暖暖塔罗咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    status: '空闲中',
    gradient: 'linear-gradient(135deg, #251845 0%, #4a2c7a 100%)',
  },
  {
    id: 'live_6',
    title: '他内心真正的想法是什么？',
    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    category: '占星',
    expert_name: '暖暖塔罗咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    status: '咨询中',
    gradient: 'linear-gradient(135deg, #1a1033 0%, #3d2566 100%)',
  },
];

const MOCK_CONSULT_EXPERTS: ConsultExpertItem[] = [
  {
    expert_id: 'expert_1',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    online_status: '在线',
    good_rate: 90,
    service_count: 999,
    description: '专业塔罗咨询师，帮助你找到内心的答案和方向感',
    price_per_minute: 9.80,
    badge: '金牌',
  },
  {
    expert_id: 'expert_2',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    online_status: '在线',
    good_rate: 90,
    service_count: 999,
    description: '专业塔罗梦境占卜，解读你内心最真实的渴望与困惑',
    price_per_minute: 9.80,
    badge: '金牌',
  },
  {
    expert_id: 'expert_3',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    online_status: '忙碌',
    good_rate: 90,
    service_count: 999,
    description: '专业塔罗梦境占卜，解读你内心最真实的渴望与困惑',
    price_per_minute: 9.80,
  },
  {
    expert_id: 'expert_4',
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    online_status: '在线',
    good_rate: 90,
    service_count: 999,
    description: '专业塔罗梦境占卜，解读你内心最真实的渴望与困惑',
    price_per_minute: 9.80,
  },
];

/**
 * @description Mock 获取今日运势
 */
export async function mockGetDailyFortune(): Promise<HomeApiResponse<DailyFortune>> {
  await delay();
  return { code: 0, message: 'success', data: MOCK_FORTUNE };
}

/**
 * @description Mock 获取在线直播列表
 */
export async function mockGetLiveRooms(): Promise<HomeApiResponse<LiveRoomItem[]>> {
  await delay();
  return { code: 0, message: 'success', data: MOCK_LIVE_ROOMS };
}

/**
 * @description Mock 获取 1v1 咨询达人列表
 */
export async function mockGetConsultExperts(): Promise<HomeApiResponse<ConsultExpertItem[]>> {
  await delay();
  return { code: 0, message: 'success', data: MOCK_CONSULT_EXPERTS };
}
