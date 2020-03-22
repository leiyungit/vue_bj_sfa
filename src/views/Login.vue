<template>
  <div class="login">
    <h1>欢迎登录宝洁SFA系统</h1>
    <div class="top_hat"></div>
    <div class="login-box">
      <!-- logo -->
      <div class="logo-wrap">
        <div class="logo-box"></div>
      </div>
      <!-- 登录表单 -->
      <div class="input-group" :class="{active:act_index ===1,error:errors.has('cno') }">
        <label for="cm_code">公司编号：</label>
        <input
          @focus="act_index=1"
          name="cno"
          v-validate="{required:true, max:6,min:4}"
          type="number"
          id="cm_code"
          v-model="cm_code"
        />
      </div>
      <div class="input-group" :class="{active:act_index ===2,error:errors.has('pno')  }">
        <label for="PNO">员工编号：</label>
        <input
          @focus="act_index=2"
          name="pno"
          v-validate="{required:true, max:12,min:4}"
          type="number"
          id="PNO"
          v-model="PNO"
        />
      </div>
      <div class="input-group" :class="{active:act_index ===3,error:errors.has('pwd') }">
        <label for="Passwd">用户密码：</label>
        <input
          @focus="act_index=3"
          name="pwd"
          v-validate="{required:true, max:12,min:4}"
          type="password"
          id="Passwd"
          v-model="passwd"
        />
      </div>
      <div class="ck-row">
        <div class="ckbox_wrap" @click="remembSet" :class="{active:rememb}">
          <i class="iconfont" :class="{'icon-check-square':rememb, 'icon-border':!rememb}"></i>
          <span>记住密码</span>
        </div>
        <div class="ckbox_wrap" @click="autoLoginSet" :class="{active:autologin}">
          <i class="iconfont" :class="{'icon-check-square':autologin, 'icon-border':!autologin}"></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <div class="btn-wrap" @click="loginBtnClick">
      <p>登录</p>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import axios from "axios";
import { Indicator, Toast } from "mint-ui";
import services from "../service";

import "../assets/font/iconfont.css";
export default {
  name: "login",
  data() {
    return {
      act_index: 1,
      cm_code: "",
      PNO: "",
      passwd: "",
      rememb: false,
      autologin: false
    };
  },
  mounted() {
    // 本地缓存
    let data = JSON.parse(localStorage.getItem("Login_data"));
    // 记住密码
    if (data) {
      this.cm_code = data.cm_code;
      this.PNO = data.PNO;
      this.passwd = data.passwd;
      this.rememb = data.rememb;
      this.autologin = data.autologin;
    }

    // 强制校验
    this.$validator.validate();
    // 自动登录
    if (this.autologin) {
      this.loginBtnClick();
    }
  },
  methods: {
    ...mapMutations(["initUser"]),
    autoLoginSet() {
      // 设置当前的autolongin为ture或false
      this.autologin = !this.autologin;
      // 设置rememb的值
      this.autologin && (this.rememb = true);
    },
    remembSet() {
      // 设置当前的 rememb 为ture或false
      this.rememb = !this.rememb;
      // 设置 autologin 的值
      this.rememb || (this.autologin = false);
    },
    loginBtnClick() {
      //this.errors.any(); // 如果有错误返回true
      if (this.errors.any()) {
        return;
      }
      //console.log('没有错误')
      // 弹出等待的遮罩层，防止二次点击
      //Indicator.open("正在登录...");
      //发送ajax请求, axios
      services.login({
          CNO: this.cm_code,
          PNO: this.PNO,
          Passwd: this.passwd
        })
        .then(res => {
          console.log(res);
          Indicator.close();
          // 登录成功
          // 记住用户登录信息
          if (res.data.code == 1) {
            Toast("登录成功");
            localStorage.setItem(
              "Login_data",
              JSON.stringify({
                rememb: this.rememb,
                autologin: this.autologin,
                cm_code: this.rememb ? this.cm_code : "",
                PNO: this.rememb ? this.PNO : "",
                passwd: this.rememb ? this.passwd : ""
              })
            );
            // 存sessonStroage
            sessionStorage.setItem("LoginUser",JSON.stringify(res.data.user));
            sessionStorage.setItem("LoginToken",res.data.token);

            // 存vuex
            // this.$store.commit('initUser',res.data.user)
            this.initUser(res.data.user);
            // 主页
            this.$router.push("/home");
          } else {
            Toast({
              message: "用户名密码错误，登录失败",
              position: "bottom",
              duration: 2000
            });
          }
        })
        .catch(err => {
          Indicator.close();
          console.log("登录失败！");
          console.log(err);
          Toast({
            message: "登录异常失败!",
            position: "bottom",
            duration: 2000
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: px2rem(36);
  height: px2rem(36); // 高度等于字体
  padding: px2rem(148-36-44) 0 px2rem(44) 0;
  line-height: px2rem(36);
  color: #fff;
}
@mixin login_wrap() {
  width: px2rem(600);
  margin: 0 auto;
  background-color: #fff;
  border-radius: px2rem(20);
}
.login {
  background-color: #2abe69;
  height: 100%;
  .top_hat {
    width: px2rem(537);
    height: px2rem(18);
    background-color: #eee;
    margin: 0 auto;
    border-radius: px2rem(18) px2rem(18) 0 0;
  }

  .login-box {
    @include login_wrap();
    height: px2rem(836);
    // width: px2rem(600);
    // margin: 0 auto;
    // background-color: #fff;
    // border-radius: px2rem(20);
    .logo-wrap {
      padding: px2rem(80) 0;
      .logo-box {
        width: px2rem(190);
        height: px2rem(190);
        margin: 0 auto;
        background: url(../assets/logo.png);
        background-size: cover;
      }
    }
    @mixin rowStyle() {
      padding: 0 px2rem(36);
      color: $text-color;
      width: px2rem(400);
    }
    .input-group {
      border: 2px solid #e2e2e2;
      border-radius: px2rem(45);
      font-size: $text-size-mid;
      line-height: px2rem(90);
      @include rowStyle();

      margin: 0 auto px2rem(30);
      input {
        border: 0 none;
        font-size: $text-size-mid;
        line-height: px2rem(90);
        width: px2rem(200);
        padding-right: 1em;
      }
    }
    .input-group.active {
      color: $act-color;
      border: 2px solid $act-color;
    }
    .input-group.error {
      color: red;
      border: 2px solid red;
    }
    .ck-row {
      @include rowStyle();
      font-size: $text-size;
      display: flex;
      justify-content: space-around;
      .ckbox_wrap {
        padding-top: px2rem(8);
        padding-left: px2rem(36);
        i {
          display: inline-block;
          height: px2rem(36);
          width: px2rem(36);
          font-size: px2rem(36);
        }
      }
      .ckbox_wrap.active {
        color: $act-color;
      }
    }
  }
  .btn-wrap {
    font-weight: 700;
    letter-spacing: px2rem(10);
    @include login_wrap();
    height: px2rem(100);
    line-height: px2rem(100);
    text-align: center;
    font-size: $text-size-imp;
    color: $act-color;
    margin-top: px2rem(20);
  }
}
</style>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>