<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { clearPrivacyAgreed } from '@/utils/storage';
import { showToast } from 'vant';
import DemoEntryCard from '@/components/demo/DemoEntryCard.vue';

const router = useRouter();
const userStore = useUserStore();

interface DemoEntry {
  icon: string;
  title: string;
  description: string;
  path: string;
  requiresAuth: boolean;
  resetPrivacy?: boolean;
  fullAppFlow?: boolean;
}

const entries: DemoEntry[] = [
  {
    icon: '📱',
    title: '完整 App 流程',
    description: '冷启动 → 隐私 → 登录 → 主框架',
    path: '/splash',
    requiresAuth: false,
    fullAppFlow: true,
  },
  {
    icon: '🚀',
    title: '开屏入口',
    description: '开屏 → 隐私协议 → 一键登录',
    path: '/splash',
    requiresAuth: false,
    resetPrivacy: true,
  },
  {
    icon: '🔑',
    title: '短信验证码登录',
    description: '复刻 App 短信登录流程',
    path: '/login',
    requiresAuth: false,
  },
  {
    icon: '💬',
    title: '消息列表',
    description: 'IM 会话列表展示',
    path: '/im/list',
    requiresAuth: true,
  },
  {
    icon: '🗣️',
    title: '与达人聊天',
    description: '1v1 IM 聊天室演示',
    path: '/im/chat/demo-expert-001',
    requiresAuth: true,
  },
];

function handleCardClick(entry: DemoEntry) {
  if (entry.fullAppFlow) {
    clearPrivacyAgreed();
    userStore.logout();
    router.push(entry.path);
    return;
  }

  if (entry.resetPrivacy) {
    clearPrivacyAgreed();
    router.push(entry.path);
    return;
  }

  if (entry.requiresAuth && !userStore.isLoggedIn) {
    showToast('请先登录');
    router.push({ path: '/login/one-key', query: { redirect: entry.path } });
    return;
  }
  router.push(entry.path);
}

function handleLogout() {
  userStore.logout();
  showToast('已退出登录');
}
</script>

<template>
  <div class="home-page">
    <div class="home-header">
      <div class="header-title">演示沙盒</div>
      <div class="header-subtitle">独立体验各演示模块 · 完整 App 流程请用首卡片</div>
    </div>

    <div class="user-status-bar">
      <template v-if="userStore.isLoggedIn">
        <van-image
          round
          width="48px"
          height="48px"
          :src="userStore.userInfo?.avatar"
          class="user-avatar"
        />
        <span class="user-name">{{ userStore.userInfo?.nickname }}</span>
        <van-button size="mini" plain type="default" @click="handleLogout">退出登录</van-button>
      </template>
      <template v-else>
        <van-icon name="user-circle-o" size="48px" color="#c8c9cc" />
        <span class="user-name-placeholder">未登录</span>
      </template>
    </div>

    <div class="entry-section">
      <div class="section-title">演示流程</div>
      <DemoEntryCard
        v-for="entry in entries"
        :key="entry.title"
        :icon="entry.icon"
        :title="entry.title"
        :description="entry.description"
        @click="handleCardClick(entry)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 40px;
}

.home-header {
  padding: 80px 40px 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.header-title {
  font-size: 44px;
  font-weight: 700;
  line-height: 60px;
}

.header-subtitle {
  font-size: 26px;
  opacity: 0.8;
  margin-top: 8px;
  line-height: 36px;
}

.user-status-bar {
  display: flex;
  align-items: center;
  padding: 24px 32px;
  margin: -24px 24px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  gap: 16px;
}

.user-avatar {
  flex-shrink: 0;
}

.user-name {
  flex: 1;
  font-size: 28px;
  color: #323233;
  font-weight: 500;
}

.user-name-placeholder {
  flex: 1;
  font-size: 28px;
  color: #c8c9cc;
}

.entry-section {
  margin-top: 16px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #323233;
  padding: 16px 40px 20px;
}
</style>
