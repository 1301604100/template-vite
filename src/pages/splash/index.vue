<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { isPrivacyAgreed, setPrivacyAgreed } from '@/utils/storage';
import { showToast } from 'vant';
import AppLogo from '@/components/common/AppLogo.vue';
import PrivacyAgreementSheet from '@/components/splash/PrivacyAgreementSheet.vue';

const router = useRouter();
const userStore = useUserStore();

const showPrivacy = ref(false);

function goToOneKeyLogin() {
  router.replace('/login/one-key');
}

function handlePrivacyAgree() {
  setPrivacyAgreed();
  showPrivacy.value = false;
  goToOneKeyLogin();
}

function handlePrivacyRefuse() {
  showToast('需同意协议才能继续使用');
}

onMounted(() => {
  if (userStore.isLoggedIn) {
    setTimeout(() => router.replace('/app'), 1000);
    return;
  }

  if (isPrivacyAgreed()) {
    setTimeout(() => goToOneKeyLogin(), 1500);
    return;
  }

  showPrivacy.value = true;
});
</script>

<template>
  <div class="splash-page">
    <div class="splash-content">
      <AppLogo />
    </div>
    <div class="splash-version">V1.9.0</div>

    <PrivacyAgreementSheet
      v-model="showPrivacy"
      @agree="handlePrivacyAgree"
      @refuse="handlePrivacyRefuse"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.splash-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $dark-bg;
}

.splash-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-version {
  padding-bottom: 48px;
  text-align: center;
  font-size: 24px;
  color: $text-muted;
}
</style>
