<script setup lang="ts">
import type { LiveRoomItem } from '@/types/home';

defineProps<{
  room: LiveRoomItem;
}>();

const emit = defineEmits<{
  click: [room: LiveRoomItem];
}>();

/**
 * @description 按品类返回标签样式类名
 */
function categoryClass(category: string) {
  if (category === '塔罗') return 'cat-tarot';
  if (category === '国学') return 'cat-guoxue';
  if (category === '占星') return 'cat-astro';
  return 'cat-default';
}

/**
 * @description 按连麦状态返回文字样式类名
 */
function statusClass(status: string) {
  return status === '咨询中' ? 'status-busy' : 'status-idle';
}
</script>

<template>
  <div class="live-room-item" @click="emit('click', room)">
    <van-image
      class="room-cover"
      :src="room.cover_url"
      fit="cover"
      radius="12"
    />
    <div class="room-body">
      <div class="room-title">{{ room.title }}</div>
      <div class="room-meta">
        <span class="room-category" :class="categoryClass(room.category)">
          {{ room.category }}
        </span>
        <span class="room-status" :class="statusClass(room.status)">
          <span class="status-icon" aria-hidden="true">
            <span /><span /><span />
          </span>
          {{ room.status }}
        </span>
      </div>
      <div class="room-expert">
        <van-image
          round
          width="36"
          height="36"
          :src="room.expert_avatar"
          fit="cover"
        />
        <span class="expert-name">{{ room.expert_name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.live-room-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-radius: 16px;
  background: $dark-bg-secondary;
  cursor: pointer;

  &:active {
    opacity: 0.9;
  }
}

.room-cover {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
}

.room-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.room-title {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.room-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.room-category {
  font-size: 20px;
  padding: 4px 12px;
  border-radius: 6px;
  line-height: 28px;

  &.cat-tarot {
    color: #c084fc;
    background: rgba(155, 111, 208, 0.25);
  }

  &.cat-guoxue {
    color: #e8a86a;
    background: rgba(200, 140, 80, 0.25);
  }

  &.cat-astro {
    color: #7eb8f0;
    background: rgba(80, 140, 220, 0.25);
  }

  &.cat-default {
    color: $link-color;
    background: rgba(155, 111, 208, 0.15);
  }
}

.room-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
  line-height: 28px;

  &.status-idle {
    color: $text-secondary;
  }

  &.status-busy {
    color: #e879a8;
  }
}

.status-icon {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 16px;

  span {
    display: block;
    width: 4px;
    border-radius: 2px;
    background: currentColor;

    &:nth-child(1) {
      height: 8px;
    }

    &:nth-child(2) {
      height: 12px;
    }

    &:nth-child(3) {
      height: 16px;
    }
  }
}

.room-expert {
  display: flex;
  align-items: center;
  gap: 10px;
}

.expert-name {
  font-size: 22px;
  color: $text-secondary;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
