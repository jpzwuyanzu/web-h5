<script setup lang="ts">
import { onMounted, ref } from "vue";
import Top from "../components/Top.vue";
import { useRouter } from "vue-router";
import Player, { PlayerConfig } from "xgplayer"; // 导入 PlayerConfig 类型
import "xgplayer/dist/index.min.css";
import useTranslate from "@/hooks/TransLateKey";

const { getTranslate } = useTranslate();
const router = useRouter();
const xgPlayerRef = ref<PlayerConfig>(null);

const linkHome = (): void => {
  router.push({
    path: "/",
  });
};

const playItem = (item: any) => {
  console.log("暂时没有资源，有资源之后在这里传入参数即可");
  createNewPlayer();
};

// 定义 PlayerConfig 类型
const config = ref<PlayerConfig>({
  el: null, // 初始化为 null，稍后在 onMounted 中赋值
  url: "//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo.mp4",
  playsinline: true,
  poster:
    "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
  plugins: [],
  width: window.innerWidth,
  height: "210px",
});

const createNewPlayer = () => {
  xgPlayerRef.value && xgPlayerRef.value.destroy();
  // 获取 DOM 元素并赋值给 el
  config.value.el = document.getElementById("videoContainer") as HTMLElement; // 类型断言

  xgPlayerRef.value = new Player(config.value); // 创建播放器实例
};

onMounted(() => {
  createNewPlayer();
  // 可选：在组件卸载时销毁播放器
  return () => {
    xgPlayerRef.value.destroy();
  };
});
</script>
<template>
  <div class="layoutContainer">
    <Top />
    <div class="testContent">
      <div class="title">
        <span style="vertical-align: top">
          <span @click="linkHome">{{
            getTranslate("routeLinkName.home")
          }}</span>
          / {{ getTranslate("routeLinkName.video") }} /
        </span>
        <span style="color: #f10086; vertical-align: middle">{{
          getTranslate("routeLinkName.detail")
        }}</span>
      </div>
      <div class="video">
        <div id="videoContainer"></div>
      </div>
      <div class="box">
        <div class="title-box">
          重磅网曝门上海某集团顶级名媛“李思涵”，被曝做性奴吃屌狂操白虎粉穴 A 片
        </div>
        <div class="date">2024-12-12</div>
        <div class="tag">
          <div v-for="index in 10" :key="index" class="s-tag">输入文本</div>
        </div>
        <div class="big-title">相关推荐</div>

        <div class="m-box">
          <div
            class="small-box"
            v-for="(item, index) in 5"
            :key="index"
            @click="playItem(item)"
          >
            <div class="preImg">
              <div class="timeLine">2:52:38</div>
              <div class="timeLine">2:52:38</div>
            </div>
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
    margin-bottom: 15px;
    background: url("../assets/videoPre.png") no-repeat center center;
    background-size: 100%;
    .videoContainer {
      width: 100%;
      height: 100%;
    }
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

      .preImg {
        box-sizing: border-box;
        width: 100%;
        height: 97px;
        background-color: white;
        margin-bottom: 5px;
        background: url("../assets/videoPre.png") no-repeat center center;
        background-size: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: end;
        padding: 0 4px 4px 4px;
        .timeLine {
          width: 44px;
          height: 18px;
          border-radius: 18px;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 500;
          color: #fff;
        }
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
