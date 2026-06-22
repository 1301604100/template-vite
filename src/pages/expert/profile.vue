<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showToast } from 'vant';
import { getExpertProfile } from '@/api/expert';
import ExpertConsultSection from '@/components/expert/ExpertConsultSection.vue';
import ExpertProfileHeader from '@/components/expert/ExpertProfileHeader.vue';
import ExpertReviewList from '@/components/expert/ExpertReviewList.vue';
import ExpertServiceList from '@/components/expert/ExpertServiceList.vue';
import ExpertTextPackageList from '@/components/expert/ExpertTextPackageList.vue';
import type { ExpertProfile } from '@/types/expert';

const route = useRoute();
const router = useRouter();

const expertId = route.params.expertId as string;
const profile = ref<ExpertProfile | null>(null);
const loading = ref(false);
const activeTab = ref(0);

/**
 * @description 加载达人主页数据
 */
async function loadProfile() {
  loading.value = true;
  try {
    const res = await getExpertProfile(expertId);
    if (res.code === 0 && res.data) {
      profile.value = res.data;
    }
  } finally {
    loading.value = false;
  }
}

function handleBack() {
  if (window.history.state?.back) {
    router.back();
  } else {
    router.push('/app/qa');
  }
}

function handleFollow() {
  showToast('关注功能演示中');
}

function handleReward() {
  showToast('打赏功能演示中');
}

function handleBookCall() {
  showToast('连麦预约功能演示中');
}

/**
 * @description 免费私聊：从聊天页进入时返回已有聊天，否则新开聊天页
 */
function handleFreeChat() {
  if (route.query.from === 'chat') {
    router.back();
    return;
  }
  router.push(`/im/chat/${expertId}`);
}

function handlePlaceholder(action: string) {
  showToast(`${action}演示中`);
}

onMounted(() => {
  loadProfile();
});
</script>

<template>
  <div class="expert-profile-page">
    <van-nav-bar
      title="达人主页"
      left-arrow
      fixed
      placeholder
      @click-left="handleBack"
    />

    <div v-if="loading" class="loading-wrap">
      <van-loading size="48px" vertical color="#9b6fd0">加载中...</van-loading>
    </div>

    <template v-else-if="profile">
      <ExpertProfileHeader :profile="profile" @follow="handleFollow" />

      <van-tabs v-model:active="activeTab" class="profile-tabs" shrink>
        <van-tab title="个人简介">
          <div class="tab-scroll">
            <div class="bio-text">{{ profile.bio }}</div>
            <ExpertConsultSection
              :profile="profile"
              @enter-room="handlePlaceholder('进入房间')"
              @action="handleBookCall"
            />
          </div>
        </van-tab>
        <van-tab title="服务">
          <div class="tab-scroll">
            <ExpertTextPackageList
              :packages="profile.text_packages"
              @buy="() => handlePlaceholder('购买套餐')"
            />
            <ExpertServiceList
              :services="profile.services"
              @communicate="() => handlePlaceholder('立即沟通')"
            />
          </div>
        </van-tab>
        <van-tab title="评价">
          <div class="tab-scroll">
            <ExpertReviewList :reviews="profile.reviews" />
          </div>
        </van-tab>
      </van-tabs>

      <div class="bottom-bar">
        <button type="button" class="bar-side" @click="handleReward">
          <span class="bar-icon">🎁</span>
          <span>打赏</span>
        </button>
        <button type="button" class="bar-main" @click="handleBookCall">
          <span class="bar-main-title">已预约连麦</span>
          <span class="bar-main-sub">🪙 {{ profile.voice_call_price.toFixed(0) }} 币/分钟</span>
        </button>
        <button type="button" class="bar-chat" @click="handleFreeChat">
          <span class="bar-icon">💬</span>
          <span>免费私聊</span>
        </button>
      </div>
    </template>

    <div v-else class="loading-wrap">
      <van-empty description="达人不存在" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.expert-profile-page {
  min-height: 100vh;
  background: $dark-bg;
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
}

:deep(.van-nav-bar) {
  background: $dark-bg;

  .van-nav-bar__title,
  .van-icon {
    color: $text-primary;
  }
}

.loading-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.profile-tabs {
  :deep(.van-tabs__nav) {
    background: $dark-bg;
  }

  :deep(.van-tab) {
    color: $text-secondary;
  }

  :deep(.van-tab--active) {
    color: $text-primary;
    font-weight: 600;
  }

  :deep(.van-tabs__line) {
    background: $link-color;
  }
}

.tab-scroll {
  padding: 24px;
  max-height: calc(100vh - 520px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.bio-text {
  font-size: 26px;
  line-height: 40px;
  color: $text-muted;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px calc(16px + env(safe-area-inset-bottom));
  background: rgba(26, 16, 51, 0.96);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.bar-side,
.bar-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: none;
  background: transparent;
  font-size: 20px;
  color: $text-secondary;
  cursor: pointer;
  min-width: 72px;
}

.bar-icon {
  font-size: 28px;
}

.bar-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border: none;
  border-radius: 999px;
  background: $gradient-btn;
  color: $text-primary;
  cursor: pointer;
}

.bar-main-title {
  font-size: 28px;
  font-weight: 600;
}

.bar-main-sub {
  margin-top: 4px;
  font-size: 20px;
}

.bar-chat {
  padding: 12px 20px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: $text-primary;
}
</style>
