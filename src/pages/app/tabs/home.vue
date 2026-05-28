<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { showToast } from 'vant';
import { getHomeBanners, getHomeIcons } from '@/api/home';
import HomeBannerSwipe from '@/components/home/HomeBannerSwipe.vue';
import HomeKingKongGrid from '@/components/home/HomeKingKongGrid.vue';
import type { HomeBannerItem, HomeIconItem, HomeIconPage } from '@/types/home';

const loading = ref(true);
const iconPages = ref<HomeIconPage[]>([]);
const banners = ref<HomeBannerItem[]>([]);

/**
 * @description 并行加载金刚位与 Banner 数据
 */
async function loadHomeData() {
  loading.value = true;
  try {
    const [iconsRes, bannersRes] = await Promise.all([getHomeIcons(), getHomeBanners()]);
    if (iconsRes.code === 0) {
      iconPages.value = iconsRes.data;
    }
    if (bannersRes.code === 0) {
      banners.value = bannersRes.data;
    }
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

onMounted(() => {
  loadHomeData();
});
</script>

<template>
  <div class="home-page">
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
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.home-page {
  min-height: calc(100vh - 100px);
  background: $dark-bg;
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
