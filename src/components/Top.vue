<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useSideMenuStore } from "@/store/modules/sideMenu";
import useTranslate from "@/hooks/TransLateKey";

interface Detail {
  label: string;
  aName?: string;
  selected?: boolean; // 可选属性
}

interface Item {
  label: string;
  type: string;
  expanded: boolean;
  details: Detail[];
  selectName?: string;
}
const sideMenuStore = useSideMenuStore();
const { languageSelect } = storeToRefs(sideMenuStore);
const { t, locale } = useI18n();
const { getTranslate } = useTranslate();
const sideMenuVisible = ref<boolean>(false);
const showSearchBox = ref<boolean>(false);
const router = useRouter();

const sideMenuList = reactive<Item[]>([
  {
    label:
      languageSelect.value === "zh_CN"
        ? "简体中文"
        : languageSelect.value === "en_US"
        ? "English"
        : "繁体中文",
    type: "language",
    expanded: false,
    selectName: languageSelect.value,
    details: [
      {
        label: "English",
        selected: false,
        aName: "en_US",
      },
      {
        label: "简体中文",
        selected: false,
        aName: "zh_CN",
      },
      {
        label: "繁体中文",
        selected: false,
        aName: "zh_TW",
      },
      // {
      //   label: "Japan",
      //   selected: false,
      //   aName: "ja_JP",
      // },
    ],
  },
  {
    label: getTranslate("sideMenu.menuInfo.mainMenu") as any,
    type: "menu",
    expanded: false,
    details: [
      {
        label: getTranslate("sideMenu.menuInfo.menu_1") as any,
        selected: false,
      },
      {
        label: getTranslate("sideMenu.menuInfo.menu_2") as any,
        selected: false,
      },
      {
        label: getTranslate("sideMenu.menuInfo.menu_3") as any,
        selected: false,
      },
    ],
  },
]);

// 切换侧边栏
const showPopup = () => {
  sideMenuVisible.value = !sideMenuVisible.value;
  if (sideMenuVisible.value) {
    sideMenuList.forEach((item) => {
      item.expanded = false;
    });
  }
};

// 切换搜索
const switchShowSearchBox = () => {
  showSearchBox.value = !showSearchBox.value;
};

// 切换语言
const changeLangue = (type: string) => {
  locale.value = type;
  sideMenuStore.setLanguageSelect(type);
};

// 选择菜单
const selectMenuItem = (item: Item, newLabel: string, inx: number) => {
  item.details.forEach((detail) => {
    // 设置选中的状态
    detail.selected = detail.label === newLabel;
  });
  if (item.type === "language") {
    // 更新 item.label
    item.label = newLabel;
    item.selectName = item.details.find((d) => d.selected)?.aName || "";
    console.log(item);
    changeLangue(item.selectName);
  }
  // 关闭菜单
  toggleExpand(inx);
  sideMenuVisible.value = false;
};

// 展开菜单
const toggleExpand = (index: number) => {
  sideMenuList[index].expanded = !sideMenuList[index].expanded;
};

// 跳转首页
const linkHome = () => {
  router.push({
    path: "/",
  });
};
</script>

<template>
  <div class="layoutCongtainer">
    <div class="top">
      <div class="left" @click="showPopup">
        <img src="@/assets/left.png" alt="" />
      </div>
      <div class="middle" @click="linkHome">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="left" @click="switchShowSearchBox">
        <img src="@/assets/search.png" alt="" />
      </div>
    </div>

    <transition name="fade">
      <div class="search-box" v-if="showSearchBox">
        <div>
          <input
            type="text"
            class="search-input"
            :placeholder="getTranslate('home.searchPlaceholder').value"
          />
          <div class="button">
            <img src="@/assets/big-search.png" alt="" />
          </div>
        </div>
      </div>
    </transition>

    <div class="top-content">
      <van-popup
        v-model:show="sideMenuVisible"
        position="left"
        :style="{ width: '85%', height: '100%' }"
        class="popup-index"
      >
        <div class="popup-ul">
          <div
            class="popup-li"
            v-for="(item, index) in sideMenuList"
            :key="index"
          >
            <div
              :class="{
                select_content: true,
                language: item.type === 'language',
              }"
              @click="toggleExpand(index)"
            >
              <div>
                {{ item.label }}
              </div>
              <div class="down">
                <img v-if="item.expanded" src="@/assets/up.png" alt="" />
                <img v-else="item.expanded" src="@/assets/down.png" alt="" />
              </div>
            </div>
            <!-- 展开内容 -->
            <div class="details" v-if="item.expanded">
              <div v-for="(i, inx) in item.details">
                <div
                  class="details-label"
                  :class="{ selected: i.selected }"
                  @click="selectMenuItem(item, i.label, index)"
                >
                  {{ i.label }}
                </div>
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
        .select_content {
          display: flex;
          justify-content: space-between;
        }
        .language {
          color: #f10086;
        }
        .down,
        .up {
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
          display: flex;
          flex-direction: row;
          align-items: center;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在 2.1.8+ */ {
  opacity: 0;
}
</style>
