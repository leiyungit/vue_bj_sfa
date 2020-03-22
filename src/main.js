import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from 'vee-validate';
import helper from "./lib/helper";


import "./lib/hotcss/hotcss.js";
// 引入mint-ui的样式
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false;
Vue.use(VeeValidate);
// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path != "/"){
    //console.log('1111')
    // 校验用户是否登录
    //console.log(helper.getTypes(store.getters.getLoginUser)=== "Object")
    if(helper.getTypes(store.getters.getLoginUser) === "Object"){
      next();
    }else{
      console.log('跳转回登录页面');
      next("/");
    }

  }
  else{
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
