<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  send: [content: string];
}>();

const inputText = ref('');

function handleSend() {
  const text = inputText.value.trim();
  if (!text) return;
  emit('send', text);
  inputText.value = '';
}
</script>

<template>
  <div class="chat-input-bar">
    <van-field
      v-model="inputText"
      type="text"
      placeholder="输入消息..."
      :border="false"
      class="input-field"
      @keyup.enter="handleSend"
    />
    <van-button
      type="primary"
      size="small"
      round
      class="send-btn"
      :disabled="!inputText.trim()"
      @click="handleSend"
    >
      发送
    </van-button>
  </div>
</template>

<style scoped lang="scss">
.chat-input-bar {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  background: #fff;
  border-top: 1px solid #ebedf0;
  gap: 16px;
}

.input-field {
  flex: 1;
  background: #f7f8fa;
  border-radius: 36px;
  padding: 12px 24px;
  font-size: 28px;
}

.send-btn {
  flex-shrink: 0;
  height: 64px;
  padding: 0 32px;
  font-size: 26px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}
</style>
