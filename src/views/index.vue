<script setup lang="ts">
import { useTestStore } from "../store/modules/test";
import { storeToRefs } from "pinia";
import { provide } from "vue";

const testStore = useTestStore();
const { count } = storeToRefs(testStore);

testStore.setDoubleCount(100);
</script>

<template>
  <div class="layoutCongtainer">
    <!-- 开启顶部安全区适配 -->
    <van-nav-bar safe-area-inset-top title="test页面" />
   <div class="testContent">测试页面</div>
  </div>
</template>

<style scoped lang="less">
.testContent {
  width: 100%;
  height: 100%;
}
</style>
