<script setup lang="ts">
import { useTestStore } from "../store/modules/test";
import { storeToRefs } from "pinia";
import { provide } from "vue";
import { ref, reactive } from "vue";
import Pagination from "./Pagination.vue";
import Top from "./Top.vue";
import { useRouter, useRoute } from 'vue-router';

const currentPage = ref(1);
const totalPages = 8;
const router = useRouter();

const handlePageChange = (page: number) => {
  console.log("当前页码：", page);
  currentPage.value = page;
};

const open = (item)=>{
  router.push({
    path: '/detail',
  });
}

const testStore = useTestStore();
const { count } = storeToRefs(testStore);

testStore.setDoubleCount(100);
</script>

<template>
  <div class="layoutCongtainer">
    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top title="test 页面" /> -->

    <Top/>

    <div class="testContent">
      <div class="box">
        <div class="small-box" v-for="(item, index) in 8" :key="index" @click="open(item)">
          <div class="img"></div>
          <div class="title">
            チ恋チ粘着ピーピンピチ恋チ粘着ピーピンチ恋チ粘着ピーピンピ
          </div>
        </div>
      </div>

      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :maxVisiblePages="5"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.testContent {
  background-color: #0a0510;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  height: calc(100vh - 78px);
  padding: 24.5px 13px 19.5px 13px;
  .box {
    display: flex;
    flex-wrap: wrap;
    row-gap: 15px; /* 上下间距 */
    column-gap: 9.5px; /* 左右间距 */
    margin-bottom: 20px;
    .small-box {
      width: calc(50% - 4.75px);
      height: 123px;
      .img {
        width: 100%;
        height: 97px;
        background-color: white;
        margin-bottom: 5px;
      }
      .title {
        font-size: 14px;
        font-family: PingFangSC;
        color: #fff;
        width: 168px;
        white-space: nowrap; /* 禁止换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 添加省略号 */
      }
    }
  }
  .popup-index {
    background-color: #1d1924;
    padding-top: 39px;
    .popup-ul {
      .popup-li {
        padding: 14px 15px;
        color: white;
        font-size: 16px;
        border-top: 1px solid #29252f;
        .content {
          display: flex;
          justify-content: space-between;
        }
        .down {
          img {
            width: 11.5px;
            height: 6.5px;
          }
        }
      }
      .details {
        margin-top: 14px;
        color: #9186a7;
        font-size: 12px;
        .details-label {
          height: 25px;
        }
        .selected {
          color: #f10086;
        }
      }
    }
  }
}
.search-box {
  padding: 10px 15px;
  height: 40px;
  background-color: #1d1924;
  border-top: 1px solid #29252f;
  .search-input {
    width: 256px;
    height: 40px;
    border-radius: 50px 0 0 50px; /* 左上和左下为圆角，右上和右下为直角 */
    background-color: #2b2536;
    color: #9186a7;
    padding: 0 15px;
    border: 0;
    font-size: 14px;
    display: inline-block;
    vertical-align: bottom;
  }
  .button {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #f10086;
    border-radius: 0 50px 50px 0; /* 左上和左下为圆角，右上和右下为直角 */
    padding: 5px 14px;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
