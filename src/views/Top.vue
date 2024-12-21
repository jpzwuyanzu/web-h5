<script setup lang="ts">
import { useTestStore } from "../store/modules/test";
import { storeToRefs } from "pinia";
import { provide } from "vue";
import { ref, reactive } from "vue";
import Pagination from "./Pagination.vue";
import { useRouter, useRoute } from 'vue-router';

const currentPage = ref(1);
const totalPages = 8;
const show = ref(false);
const searchBox = ref(false);
const router = useRouter();
const items = reactive([
  { label: "中文 1", expanded: false, 
    details: [
      {
        label:'ENG',selected: false
      },
      {
        label:'JAN',selected: false
      },
      {
        label:'ZH',selected: false
      },
    ]
  },
  { label: "中文 2", expanded: false, 
    details: [
    {
        label:'ENG',selected: false
      },
      {
        label:'JAN',selected: false
      },
      {
        label:'ZH',selected: false
      },
    ]
  },
  { label: "中文 3", expanded: false,
    details: [
    {
        label:'ENG',selected: false
      },
      {
        label:'JAN',selected: false
      },
      {
        label:'ZH',selected: false
      },
    ]
  },
  { label: "中文 4", expanded: false,
    details: [
      {
        label:'ENG'
      },
      {
        label:'JAN'
      },
      {
        label:'ZH'
      },
    ]
  },
]);

const showPopup = () => {
  show.value = !show.value;
};

const showSearchBox = () => {
  searchBox.value = !searchBox.value
}

const updateLabel = (item, newLabel) => {
  item.details.forEach(detail => {
    detail.selected = detail.label === newLabel; // 设置选中的状态
  });
  item.label = newLabel; // 更新 item.label
};


const toggleExpand = (index) => {
  items[index].expanded = !items[index].expanded;
};

const handlePageChange = (page: number) => {
  console.log("当前页码：", page);
  currentPage.value = page;
};

const open = (item)=>{
  router.push({
    path: '/',
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
    <div class="top">
      <div class="left" @click="showPopup">
        <img src="@/assets/left.png" alt="" />
      </div>
      <div class="middle" @click="open">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="left" @click="showSearchBox" >
        <img src="@/assets/search.png" alt="" />
      </div>
    </div>

    <div class="search-box" v-if="searchBox">
      <div>
        <input type="text" class="search-input" placeholder="请输入您要搜索的内容">
        <div class="button">
          <img src="@/assets/big-search.png" alt="" />
        </div>
      </div>
    </div>

    <div class="top-content">
      <van-popup
        v-model:show="show"
        position="left"
        :style="{ width: '85%', height: '100%' }"
        class="popup-index"
      >
        <div class="popup-ul">
          <div class="popup-li" v-for="(item, index) in items" :key="index">
            <div class="content"  @click="toggleExpand(index)">
              <div>
                {{ item.label }}
              </div>
              <div class="down">
                <img src="@/assets/down.png" alt="" />
              </div>
            </div>
            <!-- 展开内容 -->
            <div class="details" v-if="item.expanded">
              <div v-for="(i,index) in item.details" >
                <div class="details-label" :class="{ selected: i.selected }" @click="updateLabel(item, i.label)">{{ i.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<style scoped lang="less">
.top {
  height: 34px;
  display: flex;
  justify-content: space-between;
  padding: 2.5px 15px;
  background-color: #1d1924;
  z-index: 999999;
  position: relative;
  .left {
    img {
      width: 20px;
      height: 20px;
      margin-top: 7px;
    }
  }
  .middle {
    img {
      width: 31px;
    }
  }
}
.top-content {
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
