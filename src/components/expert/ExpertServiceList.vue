<script setup lang="ts">
import type { ExpertService } from '@/types/expert';

defineProps<{
  services: ExpertService[];
}>();

const emit = defineEmits<{
  communicate: [item: ExpertService];
}>();
</script>

<template>
  <div class="section-block">
    <div class="section-title">服务</div>
    <div v-for="item in services" :key="item.id" class="service-card">
      <div class="service-title">{{ item.title }}</div>
      <div class="service-category">{{ item.category }}</div>
      <div class="service-desc">{{ item.description }}</div>
      <div class="service-note">🕐 {{ item.note }}</div>
      <button type="button" class="communicate-btn" @click="emit('communicate', item)">
        立即沟通
      </button>
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

.service-card {
  padding: 24px;
  border-radius: 16px;
  background: $dark-bg-secondary;

  & + & {
    margin-top: 20px;
  }
}

.service-title {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
}

.service-category {
  margin-top: 8px;
  font-size: 22px;
  color: $text-secondary;
}

.service-desc {
  margin-top: 12px;
  font-size: 24px;
  line-height: 36px;
  color: $text-muted;
}

.service-note {
  margin-top: 12px;
  font-size: 22px;
  color: $text-secondary;
}

.communicate-btn {
  float: right;
  margin-top: 16px;
  padding: 10px 28px;
  border: 2px solid $link-color;
  border-radius: 999px;
  background: transparent;
  font-size: 24px;
  color: $link-color;
  cursor: pointer;
}
</style>
