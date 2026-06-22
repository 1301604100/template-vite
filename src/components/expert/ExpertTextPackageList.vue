<script setup lang="ts">
import type { TextPackage } from '@/types/expert';

defineProps<{
  packages: TextPackage[];
}>();

const emit = defineEmits<{
  buy: [item: TextPackage];
}>();
</script>

<template>
  <div class="section-block">
    <div class="section-title">文字套餐</div>
    <div v-for="item in packages" :key="item.id" class="package-card">
      <div class="package-badge">{{ item.badge_text }}</div>
      <div class="package-info">
        <div class="package-title">{{ item.title }}</div>
        <div class="package-subtitle">{{ item.subtitle }}</div>
        <div class="package-price">¥ {{ item.price }}</div>
      </div>
      <button type="button" class="buy-btn" @click="emit('buy', item)">立即购买</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-block {
  padding-bottom: 24px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 20px;
}

.package-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  background: $dark-bg-secondary;
}

.package-badge {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-line;
  text-align: center;
  border-radius: 12px;
  background: rgba(155, 111, 208, 0.25);
  font-size: 22px;
  color: $link-color;
  line-height: 32px;
}

.package-info {
  flex: 1;
  min-width: 0;
}

.package-title {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
}

.package-subtitle {
  margin-top: 6px;
  font-size: 22px;
  color: $text-secondary;
}

.package-price {
  margin-top: 8px;
  font-size: 28px;
  font-weight: 700;
  color: #fbbf24;
}

.buy-btn {
  flex-shrink: 0;
  padding: 12px 24px;
  border: none;
  border-radius: 999px;
  background: $gradient-btn;
  font-size: 24px;
  color: $text-primary;
  cursor: pointer;
}
</style>
