<template>
  <div class="menu-cell">
    <router-link :to="url">
      <div class="img-wrap">
        <i class="icon iconfont" :class="iconImg"></i>
      </div>
      <div class="title-wrap">{{menuName}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "menucell",
  props: ["menuName", "iconImg", "url"]
};
</script>

<style scoped lang="scss">
.menu-cell{
    display:flex;
    justify-content: center;
    align-items: center;
    height:100%;
    text-align: center;
    .img-wrap{
        width:px2rem(62);
        width:px2rem(62);
        display:inline-block;
        margin-bottom: px2rem(36);;
        .icon::before{
           font-size: px2rem(62);
        }
    }
    .title-wrap{
        font-size: $text-size;
        color:#000;
        
    }
}
</style>
