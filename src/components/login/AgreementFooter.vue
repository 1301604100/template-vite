<script setup lang="ts">
const agreed = defineModel<boolean>({ default: false });

withDefaults(
  defineProps<{
    mode?: 'one-key' | 'sms';
  }>(),
  {
    mode: 'sms',
  },
);
</script>

<template>
  <div class="agreement-footer">
    <van-checkbox v-model="agreed" icon-size="28px" checked-color="#9B6FD0">
      <span class="agreement-text">
        <template v-if="mode === 'one-key'">
          我已阅读并同意
          <span class="agreement-link">《中国移动认证服务条款》</span>
          和
          <span class="agreement-link">《用户协议》</span>、
          <span class="agreement-link">《隐私政策》</span>
        </template>
        <template v-else>
          我已阅读并同意
          <span class="agreement-link">《服务协议》</span>
          和
          <span class="agreement-link">《隐私策略》</span>
        </template>
      </span>
    </van-checkbox>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.agreement-footer {
  display: flex;
  justify-content: center;
  padding: 0 32px;
}

.agreement-text {
  font-size: 22px;
  color: $text-secondary;
  line-height: 32px;
}

.agreement-link {
  color: $link-color;
}
</style>
