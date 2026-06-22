<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getChatMessageList } from '@/api/im';
import ChatSessionItem from '@/components/im/ChatSessionItem.vue';
import type { ChatSession } from '@/types/im';

defineOptions({ name: 'AppMessage' });

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
  <div class="message-tab">
    <div class="tab-header">消息</div>

    <div class="tab-scroll">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div v-if="loading && sessions.length === 0" class="state-wrap">
          <van-loading size="48px" vertical>加载中...</van-loading>
        </div>

        <div v-else-if="sessions.length === 0" class="state-wrap">
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
  </div>
</template>

<style scoped lang="scss">
.message-tab {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f7f8fa;
}

.tab-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.tab-header {
  padding: 24px 32px;
  font-size: 34px;
  font-weight: 600;
  color: #323233;
  background: #fff;
}

.session-list {
  background: #fff;
}

.state-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
</style>
