<template>
  <div class="home">
    <tophead title="SFA">
      <router-link to="/user" slot="r" class="icon iconfont icon-user"></router-link>
    </tophead>
    <div class="main-bd">
      <div class="date-wrap">{{getYearMonth}}</div>
      <div class="mp-wrap">
        <mpie title="月时间进度" :val="getDayOfMonth" :percent="true"></mpie>
        <mpie title="月销售完成度" :val="mounthSealsPercent" :percent="true"></mpie>
        <mpie title="有效商店数" :val="shops" :percent="false"></mpie>
      </div>
    </div>
    <div class="main-nav">
      <div class="nav-cell" v-for="i in 9" :key="i">
        <template v-if="i <= menuList.length">
          <menu-cell
            :url="menuList[i-1].url"
            :menu-name="menuList[i-1].menuName"
            :icon-img="menuList[i-1].iconImg"
          ></menu-cell>
        </template>
      </div>
      <!-- <div class="nav-cell" v-for="(item,i) in menuList" :key="i">
           <menu-cell :url="item.url" :menu-name="item.menuName" :icon-img="item.iconImg"></menu-cell>
      </div>-->
    </div>
  </div>
</template>

<script>
import TopHead from "@/components/TopHead";
import Progress from "@/components/Progress";
import MenuCell from "@/components/MenuCell";

import services from "../service";
import { Toast } from "mint-ui";
export default {
  name: "Home",
  data() {
    return {
      mounthSealsPercent: 0,
      shops: 0,
      menuList: []
    };
  },
  components: {
    tophead: TopHead,
    mpie: Progress,
    menuCell: MenuCell
  },
  created() {
    //getUserProgress();
    services
      .getUserProgress()
      .then(res => {
        this.mounthSealsPercent = parseInt(res.data.monthPercent * 100);
        this.shops = res.data.totalShops;
      })
      .catch(err => {
        Toast("月销售完成度/有效商店数 数据获取异常");
        console.log(err);
      });
    services.getMenuList().then(res => {
      console.log(res);
      this.menuList = res.data;
    });
  },
  computed: {
    getYearMonth() {
      let t = new Date();
      return `${t.getFullYear()}年${t.getMonth()}月`;
    },
    getDayOfMonth() {
      let t = new Date();
      return parseInt((t.getDate() / 30) * 100);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-top: 1px solid #ccc;
  .main-nav {
    flex: 1;
    padding: 0 px2rem(30);
    display: flex;
    flex-flow: row wrap;
    align-content: stretch;
    align-items: stretch;
    .nav-cell {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      flex: 1 1 30%;
    }
    .nav-cell:nth-child(3n) {
      border-right: none;
    }
  }
}
.main-bd {
  background-color: #fff;
  .date-wrap {
    padding: px2rem(40) 0 px2rem(22);
    color: #000;
    font-size: $text-size-mid;
    text-align: center;
  }
  .mp-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 px2rem(22);
  }
}
</style>
