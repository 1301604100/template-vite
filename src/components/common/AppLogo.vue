<script setup lang="ts">
withDefaults(
  defineProps<{
    showSlogan?: boolean;
    size?: 'large' | 'medium';
  }>(),
  {
    showSlogan: true,
    size: 'large',
  },
);
</script>

<template>
  <div class="app-logo" :class="size">
    <div class="logo-icon">
      <span class="logo-whale">🐋</span>
    </div>
    <div class="logo-name">准准</div>
    <div v-if="showSlogan" class="logo-slogan">你渴望倾诉的，这里都能找到答案</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.app-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: $logo-gradient;
  border-radius: 24px;

  .large & {
    width: 160px;
    height: 160px;
  }

  .medium & {
    width: 120px;
    height: 120px;
    border-radius: 20px;
  }
}

.logo-whale {
  .large & {
    font-size: 80px;
  }

  .medium & {
    font-size: 60px;
  }
}

.logo-name {
  color: $text-primary;
  font-weight: 700;

  .large & {
    font-size: 56px;
    margin-top: 32px;
    line-height: 78px;
  }

  .medium & {
    font-size: 40px;
    margin-top: 24px;
    line-height: 56px;
  }
}

.logo-slogan {
  color: $text-secondary;
  font-size: 26px;
  margin-top: 12px;
  line-height: 36px;
  padding: 0 48px;
}
</style>
