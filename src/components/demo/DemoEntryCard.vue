<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <div class="demo-entry-card" @click="emit('click')">
    <div class="card-icon">{{ icon }}</div>
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-desc">{{ description }}</div>
    </div>
    <van-icon name="arrow" class="card-arrow" />
  </div>
</template>

<style scoped lang="scss">
.demo-entry-card {
  display: flex;
  align-items: center;
  padding: 32px 24px;
  margin: 0 24px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

  &:active {
    background: #f7f8fa;
  }
}

.card-icon {
  width: 88px;
  height: 88px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  margin-left: 24px;
  overflow: hidden;
}

.card-title {
  font-size: 30px;
  font-weight: 600;
  color: #323233;
  line-height: 42px;
}

.card-desc {
  font-size: 24px;
  color: #969799;
  line-height: 36px;
  margin-top: 4px;
}

.card-arrow {
  font-size: 28px;
  color: #c8c9cc;
  flex-shrink: 0;
  margin-left: 12px;
}
</style>
