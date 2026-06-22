<script setup lang="ts">
import type { ChatMessage } from '@/types/im';

defineProps<{
  message: ChatMessage;
  expertAvatar?: string;
  userAvatar?: string;
}>();

const emit = defineEmits<{
  'avatar-click': [];
}>();

function formatTime(time: string): string {
  if (!time) return '';
  const date = new Date(time);
  if (isNaN(date.getTime())) return time;
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
</script>

<template>
  <div
    class="message-bubble"
    :class="{
      'is-user': message.sender_role === 'user',
      'is-expert': message.sender_role === 'expert',
    }"
  >
    <!-- 达人头像（左） -->
    <van-image
      v-if="message.sender_role === 'expert'"
      round
      width="72px"
      height="72px"
      :src="expertAvatar"
      fit="cover"
      class="avatar avatar-clickable"
      @click.stop="emit('avatar-click')"
    />

    <div class="bubble-content">
      <div class="bubble-text">{{ message.content }}</div>
      <div class="bubble-meta">
        <span class="bubble-time">{{ formatTime(message.create_time) }}</span>
        <span v-if="message.status === 'sending'" class="bubble-status">发送中</span>
      </div>
    </div>

    <!-- 用户头像（右） -->
    <van-image
      v-if="message.sender_role === 'user'"
      round
      width="72px"
      height="72px"
      :src="userAvatar"
      fit="cover"
      class="avatar"
    />
  </div>
</template>

<style scoped lang="scss">
.message-bubble {
  display: flex;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 16px;

  &.is-user {
    flex-direction: row-reverse;

    .bubble-content {
      align-items: flex-end;
    }

    .bubble-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border-radius: 24px 4px 24px 24px;
    }

    .bubble-meta {
      text-align: right;
    }
  }

  &.is-expert {
    .bubble-text {
      background: #f7f8fa;
      color: #323233;
      border-radius: 4px 24px 24px 24px;
    }
  }
}

.avatar {
  flex-shrink: 0;
}

.avatar-clickable {
  cursor: pointer;
}

.bubble-content {
  display: flex;
  flex-direction: column;
  max-width: 480px;
}

.bubble-text {
  padding: 20px 24px;
  font-size: 28px;
  line-height: 40px;
  word-break: break-word;
}

.bubble-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  padding: 0 4px;
}

.bubble-time {
  font-size: 20px;
  color: #c8c9cc;
}

.bubble-status {
  font-size: 20px;
  color: #969799;
}
</style>
