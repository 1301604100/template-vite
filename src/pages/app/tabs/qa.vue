<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

defineOptions({ name: 'AppQa' });
import { getConsultExperts } from '@/api/home';
import ConsultExpertCard from '@/components/consult/ConsultExpertCard.vue';
import ConsultFilterPopup, {
  type ConsultFilterValues,
} from '@/components/consult/ConsultFilterPopup.vue';
import type { ConsultExpertItem } from '@/types/home';

const router = useRouter();

/** 排序 Tab 选项 */
const SORT_TABS = ['综合', '优选老师', '好评优先', '低价', '连麦多'] as const;
type SortTab = (typeof SORT_TABS)[number];

const experts = ref<ConsultExpertItem[]>([]);
const loading = ref(false);
const activeSort = ref<SortTab>('综合');
const showFilter = ref(false);
const filters = ref<ConsultFilterValues>({ status: '', gender: '' });

/**
 * @description 加载咨询达人列表
 */
async function loadExperts() {
  loading.value = true;
  try {
    const res = await getConsultExperts();
    if (res.code === 0) {
      experts.value = res.data;
    }
  } finally {
    loading.value = false;
  }
}

/**
 * @description 按筛选条件过滤达人
 */
const filteredExperts = computed(() => {
  return experts.value.filter((expert) => {
    if (filters.value.status === '连麦中' && expert.online_status !== '忙碌') {
      return false;
    }
    if (filters.value.status === '空闲中' && expert.online_status !== '在线') {
      return false;
    }
    if (filters.value.gender && expert.gender !== filters.value.gender) {
      return false;
    }
    return true;
  });
});

/**
 * @description 按当前排序 Tab 排列达人
 */
const displayExperts = computed(() => {
  const list = [...filteredExperts.value];
  switch (activeSort.value) {
    case '优选老师':
      return list.sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)));
    case '好评优先':
      return list.sort((a, b) => b.good_rate - a.good_rate);
    case '低价':
      return list.sort((a, b) => a.price_per_minute - b.price_per_minute);
    case '连麦多':
      return list.sort((a, b) => b.service_count - a.service_count);
    default:
      return list;
  }
});

function handleSortClick(tab: SortTab) {
  activeSort.value = tab;
}

function handleFilterClick() {
  showFilter.value = true;
}

function handleSearchClick() {
  showToast('搜索功能演示中');
}

function handleVoiceConsultClick() {
  showToast('连麦咨询说明演示中');
}

function goToProfile(expert: ConsultExpertItem) {
  router.push(`/expert/${expert.expert_id}`);
}

function goToChat(expert: ConsultExpertItem) {
  router.push(`/im/chat/${expert.expert_id}`);
}

onMounted(() => {
  loadExperts();
});
</script>

<template>
  <div class="consult-tab-page">
    <header class="page-header">
      <div class="header-left">
        <h1 class="page-title">1v1咨询</h1>
        <button type="button" class="voice-help-btn" @click="handleVoiceConsultClick">
          ? 连麦咨询
        </button>
      </div>
      <van-icon name="search" class="search-icon" @click="handleSearchClick" />
    </header>

    <div class="sort-bar">
      <button
        v-for="tab in SORT_TABS"
        :key="tab"
        type="button"
        class="sort-item"
        :class="{ active: activeSort === tab }"
        @click="handleSortClick(tab)"
      >
        {{ tab }}
      </button>
      <button type="button" class="sort-item filter-item" @click="handleFilterClick">
        筛选
        <van-icon name="filter-o" />
      </button>
    </div>

    <div class="consult-tab-scroll">
      <div v-if="loading" class="loading-wrap">
        <van-loading size="48px" vertical color="#9b6fd0">加载中...</van-loading>
      </div>

      <div v-else-if="displayExperts.length === 0" class="empty-wrap">
        <van-empty description="暂无符合条件的咨询师" />
      </div>

      <div v-else class="expert-list">
        <ConsultExpertCard
          v-for="expert in displayExperts"
          :key="expert.expert_id"
          :expert="expert"
          variant="tab"
          @click="goToProfile"
          @consult="goToChat"
        />
      </div>
    </div>

    <ConsultFilterPopup
      v-model:show="showFilter"
      v-model="filters"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.consult-tab-page {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: $dark-bg;
  padding-top: env(safe-area-inset-top);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-title {
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  color: $text-primary;
}

.voice-help-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 999px;
  background: rgba(155, 111, 208, 0.2);
  font-size: 22px;
  color: $link-color;
  cursor: pointer;
}

.search-icon {
  font-size: 40px;
  color: $text-primary;
  cursor: pointer;
}

.sort-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 32px 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}

.sort-item {
  flex-shrink: 0;
  border: none;
  background: transparent;
  font-size: 26px;
  color: $text-secondary;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &.active {
    color: $text-primary;
    font-weight: 600;
  }
}

.filter-item {
  margin-left: auto;
}

.consult-tab-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.expert-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 24px 32px;
}

.loading-wrap,
.empty-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

:deep(.van-empty__description) {
  color: $text-secondary;
}
</style>
