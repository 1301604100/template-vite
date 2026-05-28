<script setup lang="ts">
import { ref } from 'vue';
import type { HomeIconItem, HomeIconPage } from '@/types/home';

defineProps<{
  pages: HomeIconPage[];
}>();

const emit = defineEmits<{
  click: [item: HomeIconItem];
}>();

const currentPage = ref(0);

/**
 * @description 滑动切换分页时同步指示器
 */
function handleSwipeChange(index: number) {
  currentPage.value = index;
}

function handleIconClick(item: HomeIconItem) {
  emit('click', item);
}
</script>

<template>
  <div class="kingkong-grid">
    <van-swipe
      :loop="false"
      :show-indicators="pages.length > 1"
      indicator-color="rgba(255,255,255,0.9)"
      class="kingkong-swipe"
      @change="handleSwipeChange"
    >
      <van-swipe-item v-for="page in pages" :key="page.page">
        <div
          class="kingkong-page"
          :style="{ gridTemplateColumns: `repeat(${page.icons_per_row}, 1fr)` }"
        >
          <div
            v-for="item in page.icons"
            :key="item.pkey"
            class="kingkong-item"
            @click="handleIconClick(item)"
          >
            <div class="kingkong-icon" :style="{ background: item.gradient }">
              {{ item.icon }}
            </div>
            <div class="kingkong-title">{{ item.title }}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.kingkong-grid {
  padding: 0 16px;
}

.kingkong-swipe {
  :deep(.van-swipe__indicator) {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.3);
  }

  :deep(.van-swipe__indicator--active) {
    background: rgba(255, 255, 255, 0.9);
  }
}

.kingkong-page {
  display: grid;
  gap: 24px 8px;
  min-height: 280px;
  padding-bottom: 32px;
}

.kingkong-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
}

.kingkong-icon {
  width: 96px;
  height: 96px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
}

.kingkong-title {
  margin-top: 12px;
  font-size: 22px;
  color: $text-primary;
  text-align: center;
  line-height: 32px;
  white-space: nowrap;
}
</style>
