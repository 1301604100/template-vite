<script setup lang="ts">
import type { ExpertProfile } from '@/types/expert';

defineProps<{
  profile: ExpertProfile;
}>();

const emit = defineEmits<{
  follow: [];
}>();
</script>

<template>
  <div class="profile-header">
    <van-image class="cover" :src="profile.cover_url" fit="cover" />
    <div class="header-content">
      <div class="header-main">
        <van-image
          round
          width="120"
          height="120"
          :src="profile.expert_avatar"
          fit="cover"
          class="avatar"
        />
        <div class="info">
          <div class="name-row">
            <span class="name">{{ profile.expert_name }}</span>
            <span class="online-dot" :class="profile.online_status" />
          </div>
          <div v-if="profile.rank_label" class="rank-badge">{{ profile.rank_label }}</div>
          <div class="stats">
            <span>{{ profile.follower_count }} 粉丝</span>
            <span>{{ profile.good_rate }}% 好评率</span>
            <span>{{ profile.service_count }} 近期连麦</span>
          </div>
        </div>
        <button type="button" class="follow-btn" @click="emit('follow')">
          {{ profile.is_followed ? '已关注' : '+ 关注' }}
        </button>
      </div>
      <div class="tags">
        <span v-for="(tag, index) in profile.tags" :key="`${tag}-${index}`" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.profile-header {
  position: relative;
  background: $dark-bg-secondary;
}

.cover {
  width: 100%;
  height: 240px;
}

.header-content {
  padding: 0 24px 24px;
  margin-top: -60px;
}

.header-main {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.avatar {
  flex-shrink: 0;
  border: 4px solid $dark-bg-secondary;
}

.info {
  flex: 1;
  min-width: 0;
  padding-top: 48px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  font-size: 32px;
  font-weight: 700;
  color: $text-primary;
}

.online-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;

  &.在线 {
    background: #4ade80;
  }

  &.忙碌 {
    background: #fb923c;
  }

  &.休息,
  &.离线 {
    background: #9ca3af;
  }
}

.rank-badge {
  display: inline-block;
  margin-top: 8px;
  padding: 4px 12px;
  border-radius: 8px;
  background: rgba(155, 111, 208, 0.25);
  font-size: 20px;
  color: #e9d5ff;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
  font-size: 22px;
  color: $text-secondary;
}

.follow-btn {
  flex-shrink: 0;
  margin-top: 48px;
  padding: 10px 24px;
  border: none;
  border-radius: 999px;
  background: $gradient-btn;
  font-size: 24px;
  color: $text-primary;
  cursor: pointer;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

.tag {
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(155, 111, 208, 0.2);
  font-size: 20px;
  color: $link-color;
}
</style>
