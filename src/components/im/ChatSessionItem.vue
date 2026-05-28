<script setup lang="ts">
import type { ChatSession } from '@/types/im';

defineProps<{
  session: ChatSession;
}>();

const emit = defineEmits<{
  click: [expertId: string];
}>();
</script>

<template>
  <div class="session-item" @click="emit('click', session.expert_id)">
    <div class="session-avatar-wrap">
      <van-image
        round
        width="96px"
        height="96px"
        :src="session.expert_avatar"
        fit="cover"
      />
      <div v-if="session.unread_count > 0" class="unread-badge">
        {{ session.unread_count > 99 ? '99+' : session.unread_count }}
      </div>
    </div>
    <div class="session-content">
      <div class="session-top">
        <span class="session-name">{{ session.expert_name }}</span>
        <span class="session-time">{{ session.update_time }}</span>
      </div>
      <div class="session-msg">{{ session.last_message }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.session-item {
  display: flex;
  align-items: center;
  padding: 24px 32px;
  background: #fff;

  &:active {
    background: #f7f8fa;
  }
}

.session-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.unread-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  background: #ee0a24;
  color: #fff;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  border-radius: 32px;
}

.session-content {
  flex: 1;
  margin-left: 20px;
  overflow: hidden;
}

.session-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-name {
  font-size: 30px;
  font-weight: 500;
  color: #323233;
}

.session-time {
  font-size: 22px;
  color: #c8c9cc;
  flex-shrink: 0;
}

.session-msg {
  font-size: 26px;
  color: #969799;
  line-height: 36px;
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
