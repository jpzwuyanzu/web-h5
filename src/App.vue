<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
</script>

<template>
  <RouterView />
  <!-- 开启底部安全区适配 -->
  <van-number-keyboard safe-area-inset-bottom />
</template>

<style scoped></style>
