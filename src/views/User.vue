<template>
  <div class="user">
    <tophead title="User"></tophead>
    <div class="userinfo">
      <div class="row">
        <label>CName：</label>
        <span>{{Usres.CName}}</span>
      </div>
      <div class="row">
        <label>CNO：</label>
        <span>{{Usres.CNO}}</span>
      </div>
      <div class="row">
        <label>Name:</label>
        <span>{{Usres.Name}}</span>
      </div>
      <div class="row">
        <label>Phone:</label>
        <span>{{Usres.Phone}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from "@/components/TopHead";
export default {
  name: "user",
  props: {},
  components: {
    tophead: TopHead
  },
  data() {
    return { Usres: {} };
  },
  created() {
    this.Usres = JSON.parse(sessionStorage.getItem("LoginUser"));
    console.log(this.Usres);
  }
};
</script>

<style scoped lang="scss">
.userinfo {
  height: 100%;
  padding-top: 20px;
  display: inline-block;
  text-align: left;
  color: #000;
  .row {
    line-height: px2rem(40);
    label{
      font-weight: bold;
    }
    span{
      color: $act-color;
    }
  }
}
</style>
