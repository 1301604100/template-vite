<script setup lang="ts">
const show = defineModel<boolean>({ default: false });

const emit = defineEmits<{
  agree: [];
  refuse: [];
}>();

function handleAgree() {
  emit('agree');
}

function handleRefuse() {
  emit('refuse');
}
</script>

<template>
  <van-popup
    v-model:show="show"
    position="bottom"
    round
    :close-on-click-overlay="false"
    :style="{ maxHeight: '70%' }"
  >
    <div class="privacy-sheet">
      <div class="privacy-title">用户协议及隐私条款</div>
      <div class="privacy-content">
        欢迎使用准准！我们非常重视您的个人信息和隐私保护。在您使用我们的服务前，请您仔细阅读并充分理解
        <span class="privacy-link">《服务协议》</span>
        和
        <span class="privacy-link">《隐私策略》</span>
        的全部内容。我们将严格按照法律法规要求，采取相应安全保护措施，保护您的个人信息安全。
      </div>
      <div class="privacy-actions">
        <van-button class="btn-refuse" round block @click="handleRefuse">拒绝</van-button>
        <van-button class="btn-agree" round block @click="handleAgree">同意</van-button>
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.privacy-sheet {
  padding: 48px 40px calc(48px + env(safe-area-inset-bottom));
}

.privacy-title {
  font-size: 34px;
  font-weight: 700;
  color: #323233;
  text-align: center;
  margin-bottom: 32px;
}

.privacy-content {
  font-size: 28px;
  color: #646566;
  line-height: 44px;
  margin-bottom: 48px;
}

.privacy-link {
  color: $link-color;
}

.privacy-actions {
  display: flex;
  gap: 24px;
}

.btn-refuse {
  flex: 1;
  height: 88px;
  font-size: 30px;
  color: #646566;
  background: #f7f8fa;
  border: none;
}

.btn-agree {
  flex: 1;
  height: 88px;
  font-size: 30px;
  color: #fff;
  background: $gradient-btn;
  border: none;
}
</style>
