<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { getMaskedPhone, oneKeyLogin } from '@/api/login';
import { showToast, showLoadingToast, closeToast } from 'vant';
import AppLogo from '@/components/common/AppLogo.vue';
import AgreementFooter from '@/components/login/AgreementFooter.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const maskedPhone = ref('153****4578');
const agreed = ref(false);
const loading = ref(false);

async function loadMaskedPhone() {
  const res = await getMaskedPhone();
  if (res.code === 0) {
    maskedPhone.value = res.data.masked_phone;
  }
}

async function handleOneKeyLogin() {
  if (!agreed.value) {
    showToast('请先同意相关协议');
    return;
  }

  loading.value = true;
  showLoadingToast({ message: '登录中...', forbidClick: true });

  try {
    const res = await oneKeyLogin();
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

function handleOtherLogin() {
  router.push({
    path: '/login',
    query: route.query.redirect ? { redirect: route.query.redirect as string } : {},
  });
}

function handleSkip() {
  router.replace('/home');
}

function handleHelp() {
  showToast('请联系客服获取帮助');
}

onMounted(() => {
  loadMaskedPhone();
});
</script>

<template>
  <div class="one-key-page">
    <div class="page-header">
      <span class="nav-skip" @click="handleSkip">我先看看</span>
    </div>

    <div class="page-content">
      <AppLogo :show-slogan="false" size="medium" />

      <div class="phone-number">{{ maskedPhone }}</div>

      <van-button
        class="login-btn"
        round
        block
        :loading="loading"
        loading-text="登录中..."
        @click="handleOneKeyLogin"
      >
        本机号码一键登录
      </van-button>

      <div class="other-login" @click="handleOtherLogin">使用其他手机号登录</div>
    </div>

    <div class="page-footer">
      <AgreementFooter v-model="agreed" mode="one-key" />
      <div class="help-link" @click="handleHelp">遇到问题？可点击这里</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.one-key-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $dark-bg;
}

.page-header {
  display: flex;
  justify-content: flex-end;
  padding: 24px 32px;
}

.nav-skip {
  font-size: 28px;
  color: $text-secondary;
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 48px 0;
}

.phone-number {
  font-size: 56px;
  font-weight: 700;
  color: $text-primary;
  margin-top: 64px;
  letter-spacing: 2px;
}

.login-btn {
  width: 100%;
  height: 96px;
  margin-top: 80px;
  font-size: 32px;
  color: #fff;
  background: $gradient-btn;
  border: none;
}

.other-login {
  margin-top: 40px;
  font-size: 28px;
  color: $link-color;
}

.page-footer {
  padding: 32px 0 calc(48px + env(safe-area-inset-bottom));
}

.help-link {
  margin-top: 24px;
  text-align: center;
  font-size: 24px;
  color: $text-muted;
}
</style>
