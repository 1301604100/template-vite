<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

defineOptions({ name: 'AppHome' });
import {
  getConsultExperts,
  getDailyFortune,
  getHomeBanners,
  getHomeIcons,
  getLiveRooms,
} from '@/api/home';
import HomeBannerSwipe from '@/components/home/HomeBannerSwipe.vue';
import HomeConsultSection from '@/components/home/HomeConsultSection.vue';
import HomeFortuneCard from '@/components/home/HomeFortuneCard.vue';
import HomeKingKongGrid from '@/components/home/HomeKingKongGrid.vue';
import HomeLiveSection from '@/components/home/HomeLiveSection.vue';
import type {
  ConsultExpertItem,
  DailyFortune,
  HomeBannerItem,
  HomeIconItem,
  HomeIconPage,
  LiveRoomItem,
} from '@/types/home';

const router = useRouter();

const loading = ref(true);
const iconPages = ref<HomeIconPage[]>([]);
const banners = ref<HomeBannerItem[]>([]);
const fortune = ref<DailyFortune | null>(null);
const liveRooms = ref<LiveRoomItem[]>([]);
const consultExperts = ref<ConsultExpertItem[]>([]);

/**
 * @description 并行加载首页全部数据
 */
async function loadHomeData() {
  loading.value = true;
  try {
    const [iconsRes, bannersRes, fortuneRes, liveRes, consultRes] = await Promise.all([
      getHomeIcons(),
      getHomeBanners(),
      getDailyFortune(),
      getLiveRooms(),
      getConsultExperts(),
    ]);
    if (iconsRes.code === 0) iconPages.value = iconsRes.data;
    if (bannersRes.code === 0) banners.value = bannersRes.data;
    if (fortuneRes.code === 0) fortune.value = fortuneRes.data;
    if (liveRes.code === 0) liveRooms.value = liveRes.data;
    if (consultRes.code === 0) consultExperts.value = consultRes.data;
  } finally {
    loading.value = false;
  }
}

function handleDailySignClick() {
  showToast('准准日签演示中');
}

function handleIconClick(item: HomeIconItem) {
  showToast(`${item.title} 功能演示中`);
}

function handleBannerClick(item: HomeBannerItem) {
  showToast(`查看活动：${item.title}`);
}

function handleFortuneClick() {
  showToast('查看今日运势');
}

function handleFortuneMore() {
  showToast('今日运势详情演示中');
}

function handleLiveItemClick(item: LiveRoomItem) {
  showToast(`进入直播间：${item.title}`);
}

function handleLiveMore() {
  router.push('/live/list');
}

function handleConsultClick(item: ConsultExpertItem) {
  router.push(`/im/chat/${item.expert_id}`);
}

function handleConsultMore() {
  router.push('/app/qa');
}

onMounted(() => {
  loadHomeData();
});
</script>

<template>
  <div class="home-page">
    <div class="home-scroll">
      <header class="home-header">
        <div class="home-brand">准准</div>
        <button type="button" class="daily-sign-btn" @click="handleDailySignClick">
          <span class="daily-sign-text">准准日签</span>
          <span class="daily-sign-badge">免费</span>
        </button>
      </header>

      <div v-if="loading" class="home-loading">
        <van-loading type="spinner" color="#9b6fd0" />
      </div>

      <template v-else>
        <HomeKingKongGrid :pages="iconPages" @click="handleIconClick" />
        <HomeBannerSwipe :banners="banners" @click="handleBannerClick" />

        <HomeFortuneCard
          v-if="fortune"
          :fortune="fortune"
          @click="handleFortuneClick"
          @more="handleFortuneMore"
        />

        <HomeLiveSection
          v-if="liveRooms.length"
          :rooms="liveRooms"
          @more="handleLiveMore"
          @item-click="handleLiveItemClick"
        />

        <HomeConsultSection
          v-if="consultExperts.length"
          :experts="consultExperts"
          @more="handleConsultMore"
          @consult-click="handleConsultClick"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.home-page {
  height: calc(100vh - 100px);
  overflow: hidden;
  background: $dark-bg;
  display: flex;
  flex-direction: column;
}

.home-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: env(safe-area-inset-top);
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px 16px;
}

.home-brand {
  font-size: 40px;
  font-weight: 700;
  background: $logo-gradient;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.daily-sign-btn {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 28px;
  border: none;
  border-radius: 999px;
  background: $gradient-btn;
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }
}

.daily-sign-text {
  font-size: 26px;
  color: $text-primary;
  line-height: 36px;
}

.daily-sign-badge {
  position: absolute;
  top: -12px;
  right: -8px;
  padding: 2px 10px;
  border-radius: 8px;
  background: #ffd54f;
  font-size: 18px;
  font-weight: 600;
  color: #5c3d00;
  line-height: 26px;
}

.home-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0;
}
</style>
