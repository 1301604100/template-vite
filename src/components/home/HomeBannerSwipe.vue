<script setup lang="ts">
import type { HomeBannerItem } from '@/types/home';

defineProps<{
  banners: HomeBannerItem[];
}>();

const emit = defineEmits<{
  click: [item: HomeBannerItem];
}>();

function handleBannerClick(item: HomeBannerItem) {
  emit('click', item);
}
</script>

<template>
  <div class="banner-swipe">
    <van-swipe
      :autoplay="banners.length > 1 ? 3000 : 0"
      :loop="banners.length > 1"
      :show-indicators="banners.length > 1"
      indicator-color="rgba(255,255,255,0.9)"
    >
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <div
          class="banner-card"
          :style="{ background: banner.gradient }"
          @click="handleBannerClick(banner)"
        >
          <div class="banner-content">
            <div class="banner-title">{{ banner.title }}</div>
            <div v-if="banner.subtitle" class="banner-subtitle">{{ banner.subtitle }}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.banner-swipe {
  padding: 0 24px 32px;

  :deep(.van-swipe__indicator) {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.3);
  }

  :deep(.van-swipe__indicator--active) {
    background: rgba(255, 255, 255, 0.9);
  }
}

.banner-card {
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;

  &:active {
    opacity: 0.9;
  }
}

.banner-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 32px;
}

.banner-title {
  font-size: 32px;
  font-weight: 600;
  color: $text-primary;
  line-height: 44px;
}

.banner-subtitle {
  margin-top: 8px;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 36px;
}
</style>
