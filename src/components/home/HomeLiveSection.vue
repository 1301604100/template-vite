<script setup lang="ts">
import type { LiveRoomItem } from '@/types/home';

defineProps<{
  rooms: LiveRoomItem[];
}>();

const emit = defineEmits<{
  more: [];
  'item-click': [item: LiveRoomItem];
}>();
</script>

<template>
  <div class="live-section">
    <div class="section-header">
      <div class="section-title-group">
        <span class="section-title">在线直播</span>
        <span class="section-subtitle">| 在线连麦实时沟通</span>
      </div>
      <span class="section-more" @click="emit('more')">更多 ></span>
    </div>

    <div class="live-scroll">
      <div
        v-for="room in rooms"
        :key="room.id"
        class="live-card"
        :style="{ background: room.gradient }"
        @click="emit('item-click', room)"
      >
        <van-image
          class="live-cover"
          :src="room.cover_url"
          fit="cover"
          radius="12"
        />
        <div class="live-info">
          <div class="live-title">{{ room.title }}</div>
          <div class="live-meta">
            <span class="live-category">{{ room.category }}</span>
            <span class="live-expert">{{ room.expert_name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.live-section {
  padding: 24px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 20px;
}

.section-title-group {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: $text-primary;
}

.section-subtitle {
  font-size: 22px;
  color: $text-secondary;
}

.section-more {
  font-size: 22px;
  color: $text-secondary;
  cursor: pointer;
}

.live-scroll {
  display: flex;
  gap: 20px;
  padding: 0 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}

.live-card {
  flex-shrink: 0;
  width: 420px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: start;

  &:active {
    opacity: 0.9;
  }
}

.live-cover {
  width: 100%;
  height: 280px;
}

.live-info {
  padding: 16px 20px;
}

.live-title {
  font-size: 26px;
  font-weight: 500;
  color: $text-primary;
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.live-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.live-category {
  font-size: 20px;
  color: $link-color;
  padding: 2px 10px;
  border-radius: 6px;
  background: rgba(155, 111, 208, 0.15);
}

.live-expert {
  font-size: 20px;
  color: $text-secondary;
}
</style>
