<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { getHistoryImRecord, sendMessage, getAutoReply, getExpertInfo } from '@/api/im';
import ChatMessageBubble from '@/components/im/ChatMessageBubble.vue';
import ChatInputBar from '@/components/im/ChatInputBar.vue';
import type { ChatMessage, ExpertInfo } from '@/types/im';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const expertId = route.params.expertId as string;
const messages = ref<ChatMessage[]>([]);
const expert = ref<ExpertInfo | null>(null);
const loading = ref(false);
const messageListRef = ref<HTMLDivElement>();

function scrollToBottom() {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
    }
  });
}

async function loadData() {
  loading.value = true;
  try {
    const [expertRes, historyRes] = await Promise.all([
      getExpertInfo(expertId),
      getHistoryImRecord(expertId),
    ]);
    if (expertRes.code === 0 && expertRes.data) {
      expert.value = expertRes.data;
    }
    if (historyRes.code === 0) {
      messages.value = historyRes.data.list;
    }
    scrollToBottom();
  } finally {
    loading.value = false;
  }
}

async function handleSend(content: string) {
  const tempId = 'msg-temp-' + Date.now();
  const userMsg: ChatMessage = {
    message_id: tempId,
    type: 0,
    content,
    sender_role: 'user',
    create_time: new Date().toLocaleString(),
    status: 'sending',
  };
  messages.value.push(userMsg);
  scrollToBottom();

  try {
    const res = await sendMessage(expertId, content);
    const msg = messages.value.find((m) => m.message_id === tempId);
    if (msg) {
      msg.message_id = res.data.message_id;
      msg.status = 'sent';
    }

    const reply = await getAutoReply();
    messages.value.push(reply);
    scrollToBottom();
  } catch {
    const msg = messages.value.find((m) => m.message_id === tempId);
    if (msg) msg.status = 'failed';
  }
}

function handleBack() {
  router.push('/app/message');
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="chat-page">
    <!-- 顶部导航 -->
    <van-nav-bar :title="expert?.expert_name ?? '聊天'" left-arrow @click-left="handleBack">
      <template #right>
        <span v-if="expert" class="expert-status" :class="expert.online_status">
          {{ expert.online_status }}
        </span>
      </template>
    </van-nav-bar>

    <!-- 达人信息卡片 -->
    <div v-if="expert" class="expert-card">
      <van-image
        round
        width="80px"
        height="80px"
        :src="expert.expert_avatar"
        fit="cover"
      />
      <div class="expert-info">
        <div class="expert-name">{{ expert.expert_name }}</div>
        <div class="expert-meta">
          好评率 {{ expert.good_rate }} · 服务 {{ expert.service_count }} 次
        </div>
      </div>
    </div>

    <!-- 消息列表 -->
    <div ref="messageListRef" class="message-list">
      <van-loading v-if="loading" size="36px" class="loading-indicator" />
      <ChatMessageBubble
        v-for="msg in messages"
        :key="msg.message_id"
        :message="msg"
        :expert-avatar="expert?.expert_avatar"
        :user-avatar="userStore.userInfo?.avatar"
      />
    </div>

    <!-- 输入栏 -->
    <ChatInputBar @send="handleSend" />
  </div>
</template>

<style scoped lang="scss">
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #ededed;
}

.expert-status {
  font-size: 22px;
  padding: 4px 12px;
  border-radius: 16px;

  &.在线 {
    color: #07c160;
    background: rgba(7, 193, 96, 0.1);
  }

  &.忙碌 {
    color: #ff976a;
    background: rgba(255, 151, 106, 0.1);
  }

  &.离线 {
    color: #969799;
    background: rgba(150, 151, 153, 0.1);
  }
}

.expert-card {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
  gap: 16px;
}

.expert-info {
  flex: 1;
}

.expert-name {
  font-size: 28px;
  font-weight: 600;
  color: #323233;
}

.expert-meta {
  font-size: 22px;
  color: #969799;
  margin-top: 4px;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  -webkit-overflow-scrolling: touch;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  padding: 24px;
}
</style>
