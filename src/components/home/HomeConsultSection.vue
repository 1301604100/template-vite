<script setup lang="ts">
import type { ConsultExpertItem } from '@/types/home';

defineProps<{
  experts: ConsultExpertItem[];
}>();

const emit = defineEmits<{
  more: [];
  'consult-click': [item: ConsultExpertItem];
}>();

function statusClass(status: string) {
  if (status === '在线') return 'online';
  if (status === '忙碌') return 'busy';
  return 'offline';
}
</script>

<template>
  <div class="consult-section">
    <div class="section-header">
      <div class="section-title-group">
        <span class="section-title">1v1咨询</span>
        <span class="section-subtitle">| 私密解惑沟通</span>
      </div>
      <span class="section-more" @click="emit('more')">更多 ></span>
    </div>

    <div class="consult-list">
      <div
        v-for="expert in experts"
        :key="expert.expert_id"
        class="consult-card"
      >
        <div class="expert-avatar-wrap">
          <van-image
            round
            width="100px"
            height="100px"
            :src="expert.expert_avatar"
            fit="cover"
          />
          <span
            class="status-badge"
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
              <span class="price-value">{{ expert.price_per_minute.toFixed(2) }}</span>
              <span class="price-unit">/分钟</span>
            </span>
          </div>
          <div class="expert-stats">
            好评 {{ expert.good_rate }}% · 咨询连麦 {{ expert.service_count }}
          </div>
          <div class="expert-desc">{{ expert.description }}</div>
          <button type="button" class="consult-btn" @click.stop="emit('consult-click', expert)">
            立即咨询
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.consult-section {
  padding: 24px 0 32px;
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

.consult-list {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.consult-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  background: $dark-bg-secondary;
}

.expert-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.status-badge {
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
  align-items: center;
  justify-content: space-between;
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
</style>
