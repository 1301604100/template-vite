<script setup lang="ts">
import type { ExpertProfile } from '@/types/expert';

defineProps<{
  profile: ExpertProfile;
}>();

const emit = defineEmits<{
  'enter-room': [];
  action: [];
}>();
</script>

<template>
  <div class="consult-section">
    <div class="section-title">连麦咨询</div>

    <div class="room-card" @click="emit('enter-room')">
      <van-image round width="72" height="72" :src="profile.expert_avatar" fit="cover" />
      <button type="button" class="enter-room-btn">进入房间</button>
      <van-image
        round
        width="72"
        height="72"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
        fit="cover"
      />
    </div>

    <div class="price-row">
      <span class="price-label">普通连麦</span>
      <span class="price-value">🪙 {{ profile.voice_call_price.toFixed(2) }}/分钟</span>
    </div>
    <div class="price-row">
      <span class="price-label">1v1私密连麦</span>
      <span class="price-value">🪙 {{ profile.private_call_price.toFixed(2) }}/分钟</span>
    </div>

    <button type="button" class="appointment-btn" @click="emit('action')">
      {{ profile.appointment_status ?? '立即预约连麦' }}
    </button>
    <div v-if="profile.appointment_time" class="appointment-time">
      预约时间: {{ profile.appointment_time }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.consult-section {
  margin-top: 24px;
  padding: 24px;
  border-radius: 16px;
  background: $dark-bg-secondary;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 20px;
}

.room-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
}

.enter-room-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 999px;
  background: rgba(155, 111, 208, 0.35);
  font-size: 22px;
  color: $text-primary;
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 24px;
}

.price-label {
  color: $text-secondary;
}

.price-value {
  color: #fbbf24;
}

.appointment-btn {
  width: 100%;
  margin-top: 24px;
  padding: 20px;
  border: none;
  border-radius: 999px;
  background: $gradient-btn;
  font-size: 26px;
  color: $text-primary;
  cursor: pointer;
}

.appointment-time {
  margin-top: 12px;
  text-align: center;
  font-size: 22px;
  color: $text-secondary;
}
</style>
