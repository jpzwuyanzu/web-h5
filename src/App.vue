<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useSideMenuStore } from "@/store/modules/sideMenu";

const { locale } = useI18n();
const sideMenuStore = useSideMenuStore();
const { languageSelect } = storeToRefs(sideMenuStore);
locale.value = languageSelect.value;
</script>

<template>
  <RouterView />
  <!-- 开启底部安全区适配 -->
  <van-number-keyboard safe-area-inset-bottom />
</template>

<style scoped></style>
