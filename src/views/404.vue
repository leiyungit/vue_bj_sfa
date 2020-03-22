<template>
  <div class="notfound">
    <tophead title="404"></tophead>
    <h1>此功能还未开发....</h1>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
export default {
   name: 'notfound',
  props: {},
  components:{
      tophead:TopHead
  }
}
</script>
<style lang="scss">
h1{
  padding-top:px2rem(40);
  width:100%;
  font-size:px2rem(40);
  //background-color: #c09;
}
</style>
