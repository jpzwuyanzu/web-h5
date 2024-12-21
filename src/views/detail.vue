<script setup lang="ts">
import { useTestStore } from "../store/modules/test";
import { storeToRefs } from "pinia";
import { provide } from "vue";
import { ref, reactive } from "vue";
import Top from "./Top.vue";
import { useRouter, useRoute } from 'vue-router';


const testStore = useTestStore();
const router = useRouter();
const { count } = storeToRefs(testStore);

const open = (item)=>{
  router.push({
    path: '/',
  });
}

testStore.setDoubleCount(100);
</script>

<template>
  <div class="layoutCongtainer">
    <Top/>
    <div class="testContent">
        <div class="title">
            <span style="vertical-align: top;"><span @click="open">首页</span> / 视频 /</span> <span style="color: #f10086;vertical-align: middle;">视频详情</span>
        </div>
        <div class="video"></div>
        <div class="box">
            <div class="title-box">
                重磅网曝门上海某集团顶级名媛“李思涵”，被曝做性奴吃屌狂操白虎粉穴 A 片
            </div>
            <div class="date">
                2024-12-12
            </div>
            <div class="tag">
                <div v-for="(i,index) in 10" class="s-tag">
                    输入文本
                </div>
            </div>
            <div class="big-title">
                相关推荐
            </div>

            <div class="m-box">
                <div class="small-box" v-for="(item, index) in 5" :key="index" @click="open(item)">
                <div class="img"></div>
                <div class="m-title">
                    チ恋チ粘着ピーピンピチ恋チ粘着ピーピンチ恋チ粘着ピーピンピ
                </div>
                </div>
            </div>
        </div>
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
  .title {
    height: 20px;
    padding: 13.5px 15px;
    font-size: 14px;
    color: #9186a7;
  }
  .video {
    background: white;
    width: 100%;
    height: 210px;
    margin-bottom: 9px;
  }
  .box {
    padding: 0 12.5px;
    .title-box {
        font-size: 15px;
        font-weight: 500;
        color: white;
        margin-bottom: 5px;
    }
    .date {
        font-size: 12px;
        color: #c5c5c5;
        margin-bottom: 10px;
    }
    .tag {
        display: flex;
        flex-wrap: wrap;
        gap: 6px; /* 左右间距 */
        margin-bottom: 15px;
    }
    .s-tag {
        border-radius: 13px;
        background-color: #2b2633;
        color: white;
        font-size: 12px;
        padding: 4px 8px;
    }
    .big-title {
        font-size: 18px;
        color: white;
        font-weight: 500;
        margin-bottom: 6px;
    }
  }
  .m-box {
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
      .m-title {
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
}
</style>
