<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { sendVerifyCode, login } from '@/api/login';
import { showToast, showLoadingToast, closeToast } from 'vant';
import AgreementFooter from '@/components/login/AgreementFooter.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const phone = ref('');
const code = ref('');
const agreed = ref(false);
const countdown = ref(0);
const loading = ref(false);

let countdownTimer: ReturnType<typeof setInterval> | null = null;

function validatePhone(): boolean {
  return /^1\d{10}$/.test(phone.value);
}

async function handleSendCode() {
  if (!validatePhone()) {
    showToast('请输入正确的手机号');
    return;
  }
  if (countdown.value > 0) return;

  const res = await sendVerifyCode(phone.value);
  if (res.code !== 0) {
    showToast(res.message);
    return;
  }

  showToast('验证码已发送');
  countdown.value = 60;
  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0 && countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }, 1000);
}

async function handleLogin() {
  if (!validatePhone()) {
    showToast('请输入正确的手机号');
    return;
  }
  if (!code.value) {
    showToast('请输入验证码');
    return;
  }
  if (!agreed.value) {
    showToast('请先同意服务协议和隐私策略');
    return;
  }

  loading.value = true;
  showLoadingToast({ message: '登录中...', forbidClick: true });

  try {
    const res = await login(phone.value, code.value);
    closeToast();

    if (res.code !== 0) {
      showToast(res.message);
      return;
    }

    const { user_id, session_token, user_info } = res.data;
    userStore.login(user_id, session_token, user_info);
    showToast('登录成功');

    const redirect = (route.query.redirect as string) || '/app';
    router.replace(redirect);
  } finally {
    loading.value = false;
  }
}

function handleSkip() {
  router.replace('/home');
}

function handleBack() {
  router.replace({
    path: '/login/one-key',
    query: route.query.redirect ? { redirect: route.query.redirect as string } : {},
  });
}
</script>

<template>
  <div class="login-page">
    <div class="page-header">
      <van-icon name="arrow-left" class="back-icon" @click="handleBack" />
      <span class="nav-skip" @click="handleSkip">我先看看</span>
    </div>

    <div class="login-content">
      <div class="login-title">验证码登录</div>

      <div class="form-section">
        <van-field
          v-model="phone"
          type="tel"
          maxlength="11"
          placeholder="请输入您的手机号"
          :border="false"
          class="login-field"
        />

        <van-field
          v-model="code"
          type="digit"
          maxlength="6"
          placeholder="请输入验证码"
          :border="false"
          class="login-field"
        >
          <template #button>
            <span
              class="code-btn"
              :class="{ disabled: countdown > 0 }"
              @click="handleSendCode"
            >
              {{ countdown > 0 ? `重新获取(${countdown}s)` : '获取验证码' }}
            </span>
          </template>
        </van-field>
      </div>

      <van-button
        class="login-btn"
        round
        block
        :loading="loading"
        loading-text="登录中..."
        @click="handleLogin"
      >
        登录
      </van-button>

      <AgreementFooter v-model="agreed" mode="sms" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.login-page {
  min-height: 100vh;
  background: $dark-bg;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
}

.back-icon {
  font-size: 40px;
  color: $text-primary;
}

.nav-skip {
  font-size: 28px;
  color: $text-secondary;
}

.login-content {
  padding: 40px 48px 0;
}

.login-title {
  font-size: 48px;
  font-weight: 700;
  color: $text-primary;
  line-height: 68px;
}

.form-section {
  margin-top: 64px;
}

.login-field {
  padding: 24px 0;
  margin-bottom: 16px;
  background: transparent;
  font-size: 30px;

  :deep(.van-field__control) {
    color: $text-primary;

    &::placeholder {
      color: $text-muted;
    }
  }

  :deep(.van-cell) {
    background: transparent;
  }
}

.code-btn {
  font-size: 26px;
  color: $link-color;
  white-space: nowrap;

  &.disabled {
    color: $text-muted;
  }
}

.login-btn {
  margin-top: 64px;
  height: 96px;
  font-size: 32px;
  color: #fff;
  background: $gradient-btn;
  border: none;
}

:deep(.agreement-footer) {
  margin-top: 32px;
  justify-content: flex-start;
  padding: 0;
}
</style>
