<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { getLiveRooms } from '@/api/home';
import LiveRoomListItem from '@/components/live/LiveRoomListItem.vue';
import type { LiveRoomItem } from '@/types/home';

const router = useRouter();

const rooms = ref<LiveRoomItem[]>([]);
const loading = ref(false);

/**
 * @description 加载全部直播列表
 */
async function loadRooms() {
  loading.value = true;
  try {
    const res = await getLiveRooms();
    if (res.code === 0) {
      rooms.value = res.data;
    }
  } finally {
    loading.value = false;
  }
}

function handleBack() {
  router.back();
}

function handleRoomClick(room: LiveRoomItem) {
  showToast(`进入直播间：${room.title}`);
}

onMounted(() => {
  loadRooms();
});
</script>

<template>
  <div class="live-list-page">
    <van-nav-bar
      title="全部房间"
      left-arrow
      @click-left="handleBack"
    />

    <div v-if="loading" class="loading-wrap">
      <van-loading size="48px" vertical color="#9b6fd0">加载中...</van-loading>
    </div>

    <div v-else-if="rooms.length === 0" class="empty-wrap">
      <van-empty description="暂无直播" />
    </div>

    <div v-else class="room-list">
      <LiveRoomListItem
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        @click="handleRoomClick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.live-list-page {
  min-height: 100vh;
  background: $dark-bg;
  padding-top: env(safe-area-inset-top);
}

:deep(.van-nav-bar) {
  background: $dark-bg;

  .van-nav-bar__title,
  .van-icon {
    color: $text-primary;
  }
}

.room-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.loading-wrap,
.empty-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
</style>
