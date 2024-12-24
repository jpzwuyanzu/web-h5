<script setup lang="ts">
import useTranslate from "@/hooks/TransLateKey";
import { computed } from "vue";

const { getTranslate } = useTranslate();
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisiblePages: {
    type: Number,
    default: 5, // 默认显示 5 个页码
  },
});

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

// 计算可见的页码
const visiblePages = computed(() => {
  const pages: number[] = [];
  const half = Math.floor(props.maxVisiblePages / 2);
  let start = Math.max(1, props.currentPage - half);
  let end = Math.min(props.totalPages, props.currentPage + half);

  if (props.totalPages <= props.maxVisiblePages) {
    // 如果总页数小于等于最大可见页数，显示所有页码
    start = 1;
    end = props.totalPages;
  } else {
    // 左边靠近起点
    if (start <= 2) {
      start = 1;
      end = Math.min(props.maxVisiblePages, props.totalPages);
    }
    // 右边靠近终点
    if (end >= props.totalPages - 1) {
      start = Math.max(1, props.totalPages - props.maxVisiblePages + 1);
      end = props.totalPages;
    }
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// 显示省略号
const showLeftEllipsis = computed(() => {
  return props.totalPages > props.maxVisiblePages && visiblePages.value[0] > 2;
});

const showRightEllipsis = computed(() => {
  return (
    props.totalPages > props.maxVisiblePages &&
    visiblePages.value.at(-1) < props.totalPages - 1
  );
});

// 切换页码
const goToPage = (page: number): void => {
  if (page >= 1 && page <= props.totalPages) {
    emit("pageChange", page);
  }
};
</script>
<template>
  <div class="pagination">
    <!-- 上一页 -->
    <button
      class="pagination-item"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      {{ getTranslate("home.perPage") }}
    </button>

    <button class="pagination-item" v-if="showLeftEllipsis">...</button>

    <!-- 页码按钮 -->
    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination-item"
      :class="{ active: page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <!-- 省略号 -->
    <button class="pagination-item" v-if="showRightEllipsis">...</button>

    <!-- 下一页 -->
    <button
      class="pagination-item"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      {{ getTranslate("home.nextPage") }}
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
}

.pagination-item {
  background: #262626;
  color: white;
  padding: 4px 9px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
}

.pagination-item.active {
  background-color: #f10086;
  color: white;
}

.pagination-item:disabled {
  background: #262626;
  cursor: not-allowed;
}

.pagination-ellipsis {
  color: white;
}
</style>
