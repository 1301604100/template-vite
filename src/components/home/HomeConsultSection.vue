<script setup lang="ts">
import type { ConsultExpertItem } from '@/types/home';
import ConsultExpertCard from '@/components/consult/ConsultExpertCard.vue';

defineProps<{
  experts: ConsultExpertItem[];
}>();

const emit = defineEmits<{
  more: [];
  'consult-click': [item: ConsultExpertItem];
}>();
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
      <ConsultExpertCard
        v-for="expert in experts"
        :key="expert.expert_id"
        :expert="expert"
        variant="home"
        @consult="emit('consult-click', $event)"
      />
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
</style>
