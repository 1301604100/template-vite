<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getChatMessageList } from '@/api/im';
import ChatSessionItem from '@/components/im/ChatSessionItem.vue';
import type { ChatSession } from '@/types/im';

const router = useRouter();

const sessions = ref<ChatSession[]>([]);
const loading = ref(false);
const refreshing = ref(false);

async function loadSessions() {
  loading.value = true;
  try {
    const res = await getChatMessageList();
    if (res.code === 0) {
      sessions.value = res.data.list;
    }
  } finally {
    loading.value = false;
    refreshing.value = false;
  }
}

function handleSessionClick(expertId: string) {
  router.push(`/im/chat/${expertId}`);
}

function onRefresh() {
  loadSessions();
}

onMounted(() => {
  loadSessions();
});
</script>

<template>
  <div class="im-list-page">
    <van-nav-bar title="消息" left-arrow @click-left="router.push('/home')" />

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div v-if="loading && sessions.length === 0" class="loading-wrap">
        <van-loading size="48px" vertical>加载中...</van-loading>
      </div>

      <div v-else-if="sessions.length === 0" class="empty-wrap">
        <van-empty description="暂无消息" />
      </div>

      <div v-else class="session-list">
        <ChatSessionItem
          v-for="session in sessions"
          :key="session.expert_id"
          :session="session"
          @click="handleSessionClick"
        />
      </div>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
.im-list-page {
  min-height: 100vh;
  background: #f7f8fa;
}

.session-list {
  background: #fff;
}

.loading-wrap,
.empty-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
</style>
