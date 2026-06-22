<script setup lang="ts">
import { ref, watch } from 'vue';

/** 连麦状态筛选 */
export type ConsultStatusFilter = '连麦中' | '空闲中' | '';

/** 性别筛选 */
export type ConsultGenderFilter = '男' | '女' | '';

export interface ConsultFilterValues {
  status: ConsultStatusFilter;
  gender: ConsultGenderFilter;
}

const props = defineProps<{
  show: boolean;
  modelValue: ConsultFilterValues;
}>();

const emit = defineEmits<{
  'update:show': [value: boolean];
  'update:modelValue': [value: ConsultFilterValues];
  confirm: [value: ConsultFilterValues];
}>();

const draft = ref<ConsultFilterValues>({ ...props.modelValue });

watch(
  () => props.show,
  (visible) => {
    if (visible) {
      draft.value = { ...props.modelValue };
    }
  },
);

/**
 * @description 切换筛选项（再次点击取消选中）
 */
function toggleStatus(value: ConsultStatusFilter) {
  draft.value.status = draft.value.status === value ? '' : value;
}

/**
 * @description 切换性别筛选项
 */
function toggleGender(value: ConsultGenderFilter) {
  draft.value.gender = draft.value.gender === value ? '' : value;
}

function handleReset() {
  draft.value = { status: '', gender: '' };
}

function handleConfirm() {
  emit('update:modelValue', { ...draft.value });
  emit('confirm', { ...draft.value });
  emit('update:show', false);
}

function handleClose() {
  emit('update:show', false);
}
</script>

<template>
  <van-popup
    :show="show"
    position="bottom"
    round
    @update:show="emit('update:show', $event)"
    @click-overlay="handleClose"
  >
    <div class="filter-popup">
      <div class="filter-group">
        <div class="filter-label">连麦状态</div>
        <div class="filter-options">
          <button
            type="button"
            class="filter-chip"
            :class="{ active: draft.status === '连麦中' }"
            @click="toggleStatus('连麦中')"
          >
            连麦中
          </button>
          <button
            type="button"
            class="filter-chip"
            :class="{ active: draft.status === '空闲中' }"
            @click="toggleStatus('空闲中')"
          >
            空闲中
          </button>
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-label">性别</div>
        <div class="filter-options">
          <button
            type="button"
            class="filter-chip"
            :class="{ active: draft.gender === '男' }"
            @click="toggleGender('男')"
          >
            男
          </button>
          <button
            type="button"
            class="filter-chip"
            :class="{ active: draft.gender === '女' }"
            @click="toggleGender('女')"
          >
            女
          </button>
        </div>
      </div>

      <div class="filter-actions">
        <button type="button" class="action-btn reset-btn" @click="handleReset">
          重置
        </button>
        <button type="button" class="action-btn confirm-btn" @click="handleConfirm">
          确认
        </button>
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.filter-popup {
  padding: 40px 32px calc(32px + env(safe-area-inset-bottom));
  background: $dark-bg;
}

.filter-group + .filter-group {
  margin-top: 32px;
}

.filter-label {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 20px;
}

.filter-options {
  display: flex;
  gap: 20px;
}

.filter-chip {
  flex: 1;
  padding: 16px 0;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  font-size: 26px;
  color: $text-secondary;
  cursor: pointer;

  &.active {
    border-color: $link-color;
    color: $link-color;
  }
}

.filter-actions {
  display: flex;
  gap: 20px;
  margin-top: 48px;
}

.action-btn {
  flex: 1;
  padding: 20px 0;
  border-radius: 999px;
  font-size: 28px;
  cursor: pointer;
}

.reset-btn {
  border: 2px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: $text-secondary;
}

.confirm-btn {
  border: none;
  background: $gradient-btn;
  color: $text-primary;
}
</style>
