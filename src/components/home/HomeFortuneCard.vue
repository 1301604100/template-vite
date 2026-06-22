<script setup lang="ts">
import type { DailyFortune } from '@/types/home';

defineProps<{
  fortune: DailyFortune;
}>();

const emit = defineEmits<{
  click: [];
  more: [];
}>();
</script>

<template>
  <div class="fortune-card" @click="emit('click')">
    <div class="fortune-header">
      <div class="fortune-user">
        <span class="fortune-nickname">{{ fortune.nickname }}</span>
        <span class="fortune-label">更多</span>
      </div>
      <span class="fortune-more" @click.stop="emit('more')">更多 ></span>
    </div>

    <div class="fortune-score-row">
      <span class="fortune-score-label">今日运势</span>
      <span class="fortune-score-value">{{ fortune.total_score }}</span>
      <span class="fortune-score-unit">分</span>
    </div>

    <div class="fortune-summary">{{ fortune.summary }}</div>

    <div class="fortune-dimensions">
      <div
        v-for="dim in fortune.dimensions"
        :key="dim.key"
        class="dimension-item"
      >
        <div class="dimension-bar-wrap">
          <div class="dimension-bar" :style="{ height: dim.score + '%' }" />
        </div>
        <div class="dimension-score">
          {{ dim.score }}
          <span v-if="dim.trend === 'up'" class="trend-up">↑</span>
          <span v-if="dim.trend === 'down'" class="trend-down">↓</span>
        </div>
        <div class="dimension-label">{{ dim.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.fortune-card {
  margin: 24px;
  padding: 28px 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, $dark-bg-secondary 0%, $dark-bg 100%);
  cursor: pointer;

  &:active {
    opacity: 0.9;
  }
}

.fortune-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fortune-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fortune-nickname {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
}

.fortune-label {
  display: none;
}

.fortune-more {
  font-size: 22px;
  color: $text-secondary;
}

.fortune-score-row {
  display: flex;
  align-items: baseline;
  margin-top: 20px;
  gap: 8px;
}

.fortune-score-label {
  font-size: 26px;
  color: $text-primary;
  padding: 4px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.fortune-score-value {
  font-size: 56px;
  font-weight: 700;
  color: $text-primary;
  line-height: 1;
}

.fortune-score-unit {
  font-size: 24px;
  color: $text-secondary;
}

.fortune-summary {
  margin-top: 16px;
  font-size: 24px;
  color: $text-secondary;
  line-height: 36px;
}

.fortune-dimensions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding: 0 16px;
}

.dimension-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.dimension-bar-wrap {
  width: 36px;
  height: 120px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.dimension-bar {
  width: 100%;
  border-radius: 18px;
  background: linear-gradient(180deg, #c084fc 0%, #7b5ea7 100%);
  transition: height 0.6s ease;
}

.dimension-score {
  font-size: 22px;
  font-weight: 600;
  color: $text-primary;
  white-space: nowrap;
}

.trend-up {
  color: #4ade80;
  font-size: 20px;
}

.trend-down {
  color: #f87171;
  font-size: 20px;
}

.dimension-label {
  font-size: 20px;
  color: $text-secondary;
}
</style>
