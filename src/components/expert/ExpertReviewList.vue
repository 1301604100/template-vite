<script setup lang="ts">
import type { ExpertReview } from '@/types/expert';

defineProps<{
  reviews: ExpertReview[];
}>();
</script>

<template>
  <div class="section-block">
    <div class="section-title">评价</div>
    <div v-for="item in reviews" :key="item.id" class="review-card">
      <div class="review-header">
        <van-image round width="64" height="64" :src="item.user_avatar" fit="cover" />
        <div class="review-meta">
          <div class="review-user">{{ item.user_name }}</div>
          <div class="review-date">{{ item.date }}</div>
        </div>
        <div class="review-stars">
          <span v-for="n in 5" :key="n" class="star" :class="{ active: n <= item.rating }">★</span>
        </div>
      </div>
      <div v-if="item.badge" class="review-badge">{{ item.badge }}</div>
      <div class="review-tags">
        <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="review-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.section-block {
  padding-bottom: 24px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 20px;
}

.review-card {
  padding: 24px;
  border-radius: 16px;
  background: $dark-bg-secondary;

  & + & {
    margin-top: 20px;
  }
}

.review-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.review-meta {
  flex: 1;
}

.review-user {
  font-size: 26px;
  font-weight: 600;
  color: $text-primary;
}

.review-date {
  margin-top: 4px;
  font-size: 20px;
  color: $text-secondary;
}

.review-stars {
  display: flex;
  gap: 4px;
}

.star {
  font-size: 24px;
  color: #4b5563;

  &.active {
    color: #fbbf24;
  }
}

.review-badge {
  display: inline-block;
  margin-top: 12px;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 20px;
  color: $text-secondary;
}

.review-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.tag {
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(155, 111, 208, 0.2);
  font-size: 20px;
  color: $link-color;
}

.review-content {
  margin-top: 12px;
  font-size: 24px;
  line-height: 36px;
  color: $text-muted;
}
</style>
