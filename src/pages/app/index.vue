<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const tabRoutes = ['/app/home', '/app/qa', '/app/message', '/app/mine'];

const activeTab = ref(0);

function syncTabFromRoute(path: string) {
  const index = tabRoutes.findIndex((item) => path.startsWith(item));
  activeTab.value = index >= 0 ? index : 0;
}

watch(
  () => route.path,
  (path) => syncTabFromRoute(path),
  { immediate: true },
);

function handleTabChange(index: number) {
  router.push(tabRoutes[index]);
}
</script>

<template>
  <div class="app-shell">
    <div class="app-content">
      <router-view />
    </div>
    <van-tabbar v-model="activeTab" fixed placeholder @change="handleTabChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="question-o">问答</van-tabbar-item>
      <van-tabbar-item icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;
  background: #f7f8fa;
}

.app-content {
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
