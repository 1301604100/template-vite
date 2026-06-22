<script setup lang="ts">
import type { ConsultExpertItem } from '@/types/home';

withDefaults(
  defineProps<{
    expert: ConsultExpertItem;
    /** 卡片布局：tab 为咨询 Tab 方形头像，home 为首页圆角头像 */
    variant?: 'tab' | 'home';
  }>(),
  { variant: 'tab' },
);

const emit = defineEmits<{
  click: [expert: ConsultExpertItem];
  consult: [expert: ConsultExpertItem];
}>();

/**
 * @description 在线状态样式类名
 */
function statusClass(status: string) {
  if (status === '在线') return 'online';
  if (status === '忙碌') return 'busy';
  return 'offline';
}

/**
 * @description 忙碌状态在设计稿中展示为离线
 */
function statusLabel(status: string) {
  if (status === '忙碌') return '离线';
  return status;
}
</script>

<template>
  <div
    class="consult-card"
    :class="[`variant-${variant}`]"
    @click="emit('click', expert)"
  >
    <div class="avatar-wrap">
      <van-image
        :class="variant === 'tab' ? 'avatar-square' : 'avatar-round'"
        :round="variant === 'home'"
        :width="variant === 'tab' ? 160 : 100"
        :height="variant === 'tab' ? 160 : 100"
        :src="expert.expert_avatar"
        fit="cover"
        :radius="variant === 'tab' ? 12 : undefined"
      />
      <span
        v-if="variant === 'tab'"
        class="status-tag"
        :class="statusClass(expert.online_status)"
      >
        {{ statusLabel(expert.online_status) }}
      </span>
      <span v-if="variant === 'tab'" class="voice-tag">
        🔊 {{ expert.voice_duration }}s
      </span>
      <span
        v-if="variant === 'home'"
        class="status-dot"
        :class="statusClass(expert.online_status)"
      />
    </div>

    <div class="expert-body">
      <div class="expert-top">
        <span class="expert-name">
          {{ expert.expert_name }}
          <span v-if="expert.badge" class="expert-badge">{{ expert.badge }}</span>
        </span>
        <span class="expert-price">
          <span class="price-coin">🪙</span>
          <span class="price-value">{{ expert.price_per_minute.toFixed(2) }}</span>
          <span class="price-unit">/分钟</span>
        </span>
      </div>
      <div class="expert-stats">
        好评 {{ expert.good_rate }}% · {{ variant === 'tab' ? '近期连麦' : '咨询连麦' }} {{ expert.service_count }}
      </div>
      <div class="expert-desc">{{ expert.description }}</div>
      <button
        type="button"
        class="consult-btn"
        @click.stop="emit('consult', expert)"
      >
        立即咨询
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.consult-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  background: $dark-bg-secondary;
  cursor: pointer;

  &:active {
    opacity: 0.92;
  }
}

.avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.avatar-square {
  display: block;
}

.status-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 18px;
  line-height: 26px;
  color: #fff;

  &.online {
    background: rgba(74, 222, 128, 0.9);
  }

  &.busy {
    background: rgba(251, 146, 60, 0.9);
  }

  &.offline {
    background: rgba(156, 163, 175, 0.9);
  }
}

.voice-tag {
  position: absolute;
  bottom: 8px;
  left: 8px;
  padding: 2px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.55);
  font-size: 18px;
  color: #fff;
  line-height: 26px;
}

.status-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid $dark-bg-secondary;

  &.online {
    background: #4ade80;
  }

  &.busy {
    background: #fb923c;
  }

  &.offline {
    background: #9ca3af;
  }
}

.expert-body {
  flex: 1;
  min-width: 0;
}

.expert-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.expert-name {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
  display: flex;
  align-items: center;
  gap: 8px;
}

.expert-badge {
  font-size: 18px;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(155, 111, 208, 0.2);
  color: $link-color;
  font-weight: 400;
}

.expert-price {
  white-space: nowrap;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.price-coin {
  font-size: 20px;
}

.price-value {
  font-size: 28px;
  font-weight: 700;
  color: #fbbf24;
}

.price-unit {
  font-size: 20px;
  color: $text-secondary;
}

.expert-stats {
  margin-top: 8px;
  font-size: 22px;
  color: $text-secondary;
}

.expert-desc {
  margin-top: 8px;
  font-size: 22px;
  color: $text-muted;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.consult-btn {
  margin-top: 16px;
  padding: 10px 32px;
  border: none;
  border-radius: 999px;
  background: $gradient-btn;
  font-size: 24px;
  color: $text-primary;
  cursor: pointer;
  float: right;

  &:active {
    opacity: 0.85;
  }
}

.variant-home {
  .consult-btn {
    margin-top: 12px;
  }
}
</style>
