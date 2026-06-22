import type { ExpertApiResponse, ExpertProfile } from '@/types/expert';

/**
 * @description 模拟网络延迟
 */
function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BASE_TEXT_PACKAGES = [
  {
    id: 'pkg_1',
    title: '10次追聊机会',
    subtitle: '仅限购买一次',
    price: 50,
    badge_text: '10次\n聊天',
  },
];

const BASE_SERVICES = [
  {
    id: 'svc_1',
    title: '爱情维纳斯牌阵推理',
    category: '情感关系人际关系交流',
    description:
      '分析对方内心真实想法，判断关系走向，是否适合继续，帮助你在感情中找到方向与答案。',
    note: '下单后不限次数文字聊天',
  },
  {
    id: 'svc_2',
    title: '爱情维纳斯牌阵推理',
    category: '情感关系人际关系交流',
    description:
      '深入解读你们之间的缘分与阻碍，给出可执行的建议，陪伴你走出情感困惑。',
    note: '下单后不限次数文字聊天',
  },
];

const BASE_REVIEWS = [
  {
    id: 'rev_1',
    user_name: '甲一丙',
    user_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    date: '2021-11-03',
    rating: 4,
    badge: '第30次连麦',
    tags: ['很准', '一针见血', '面面俱到'],
    content:
      '老师分析得非常准确，把我现在的困惑都说中了，也给了很实用的建议，感觉心里踏实了很多。',
  },
  {
    id: 'rev_2',
    user_name: '甲一丙',
    user_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
    date: '2021-11-03',
    rating: 5,
    badge: '第30次连麦',
    tags: ['很准', '一针见血', '面面俱到'],
    content: '非常专业，回复很快，分析到位，会继续咨询。',
  },
];

const EXPERT_META: Record<string, Pick<ExpertProfile, 'expert_name' | 'expert_avatar' | 'online_status' | 'good_rate' | 'service_count'>> = {
  'demo-expert-001': {
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    online_status: '在线',
    good_rate: 90,
    service_count: 999,
  },
  'demo-expert-002': {
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
    online_status: '休息',
    good_rate: 88,
    service_count: 756,
  },
  'demo-expert-003': {
    expert_name: '暖暖咨询师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/sand.jpeg',
    online_status: '忙碌',
    good_rate: 95,
    service_count: 1200,
  },
  'demo-expert-004': {
    expert_name: '星语老师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    online_status: '在线',
    good_rate: 92,
    service_count: 680,
  },
  'demo-expert-005': {
    expert_name: '灵犀老师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
    online_status: '在线',
    good_rate: 86,
    service_count: 450,
  },
  'demo-expert-006': {
    expert_name: '紫薇老师',
    expert_avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/sand.jpeg',
    online_status: '忙碌',
    good_rate: 98,
    service_count: 1500,
  },
};

/**
 * @description 构建达人主页 Mock 数据
 */
function buildExpertProfile(expertId: string): ExpertProfile | null {
  const meta = EXPERT_META[expertId];
  if (!meta) return null;

  return {
    expert_id: expertId,
    expert_name: meta.expert_name,
    expert_avatar: meta.expert_avatar,
    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    online_status: meta.online_status,
    good_rate: meta.good_rate,
    follower_count: 34513,
    service_count: meta.service_count,
    rank_label: '实力老师排行榜第4名',
    tags: ['治愈达人', '星盘导师', '星盘导师', '星盘导师'],
    bio: '我是Nana，从事情感咨询和心理咨询工作已有8年时间，擅长塔罗牌阵、星盘分析，帮助你在感情、事业和人际关系中找到方向。我相信每个人都有内在的力量，我的工作是陪伴你发现它。',
    is_followed: false,
    voice_call_price: 9.22,
    private_call_price: 9.22,
    appointment_status: '您已预约，预计等待12分钟',
    appointment_time: '12:31',
    text_packages: BASE_TEXT_PACKAGES,
    services: BASE_SERVICES,
    reviews: BASE_REVIEWS,
  };
}

/**
 * @description Mock 获取达人主页详情
 */
export async function mockGetExpertProfile(
  expertId: string,
): Promise<ExpertApiResponse<ExpertProfile | null>> {
  await delay();
  const profile = buildExpertProfile(expertId);
  if (!profile) {
    return { code: -1, message: '达人不存在', data: null };
  }
  return { code: 0, message: 'success', data: profile };
}
