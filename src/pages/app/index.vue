<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/** 四个 Tab 页组件名，与路由 name 一致，供 keep-alive 缓存 */
const TAB_KEEP_ALIVE_NAMES = ['AppHome', 'AppQa', 'AppMessage', 'AppMine'];

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
      <router-view v-slot="{ Component }">
        <keep-alive :include="TAB_KEEP_ALIVE_NAMES">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <van-tabbar v-model="activeTab" fixed placeholder @change="handleTabChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="question-o">咨询</van-tabbar-item>
      <van-tabbar-item icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #1a1033;
}

.app-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
