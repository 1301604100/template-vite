<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { showToast } from 'vant';

const router = useRouter();
const userStore = useUserStore();

function handleLogout() {
  userStore.logout();
  showToast('已退出登录');
  router.replace('/splash');
}

function goSandbox() {
  router.push('/home');
}
</script>

<template>
  <div class="mine-tab">
    <div class="tab-header">我的</div>

    <div class="user-card">
      <van-image
        round
        width="120px"
        height="120px"
        :src="userStore.userInfo?.avatar"
        fit="cover"
      />
      <div class="user-name">{{ userStore.userInfo?.nickname ?? '塔罗用户' }}</div>
      <div class="user-phone">{{ userStore.userInfo?.phone_num ?? '' }}</div>
    </div>

    <van-cell-group inset class="action-group">
      <van-cell title="演示沙盒" is-link label="独立体验各演示模块" @click="goSandbox" />
      <van-cell title="退出登录" is-link @click="handleLogout" />
    </van-cell-group>
  </div>
</template>

<style scoped lang="scss">
.mine-tab {
  min-height: calc(100vh - 100px);
  background: #f7f8fa;
}

.tab-header {
  padding: 24px 32px;
  font-size: 34px;
  font-weight: 600;
  color: #323233;
  background: #fff;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 32px 48px;
  margin: 24px;
  background: #fff;
  border-radius: 16px;
}

.user-name {
  margin-top: 24px;
  font-size: 36px;
  font-weight: 600;
  color: #323233;
}

.user-phone {
  margin-top: 8px;
  font-size: 26px;
  color: #969799;
}

.action-group {
  margin-top: 24px;
}
</style>
