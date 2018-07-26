<template>
  <div class="login-page" :style="'height:'+ height +'px;'">
    <div class="main">
      <div class="login-box"
        v-show="windowIndex === 1"
      >
        <h2 class="">Login</h2>
        <input type="text" placeholder="账号/邮箱" v-model="accountL">
        <label class="alarm" alarm-id="0">{{errMs[0]}}</label>
        <input type="password" placeholder="密码" v-model="passwordL">
        <label class="alarm" alarm-id="1">{{errMs[1]}}</label>
        <div class="text-center">
          <button class="cannel"
            @click="changeIndex(2)"
          >注册</button><button class="submit">登录</button>
          <a class="small-link middle-dom"
            @click="changeIndex(3)"
          >忘记密码?</a>
        </div>
      </div>
      <div class="register-box"
        v-show="windowIndex === 2"
      >
        <h2 class="">Register</h2>
        <input type="text" placeholder="用户名" v-model="accountR">
        <label class="alarm" alarm-id="2">{{errMs[2]}}</label>
        <input type="text" placeholder="邮箱" v-model="emailR">
        <label class="alarm" alarm-id="3">{{errMs[3]}}</label>
        <input type="password" placeholder="输入密码" v-model="passwordR">
        <label class="alarm" alarm-id="4">{{errMs[4]}}</label>
        <input type="password" placeholder="确认密码" v-model="confirmPassword">
        <label class="alarm" alarm-id="5">{{errMs[5]}}</label>
        <div class="check-box">
          <input class="ipnut-left" type="password" placeholder="确认密码" v-model="checkCode">
          <button class="btn-right">{{resendCodeTime?resendCodeTime+'s后可重发':'发送'}}</button>
        </div>
        <div class="text-center">
          <button class="cannel"
            @click="changeIndex(1)"
          >返回</button><button class="submit">注册</button>
        </div>
      </div>
      <div class="find-back-box"
        v-show="windowIndex === 3"
      >
        <h2 class="">Find Back</h2>
        <input type="text" placeholder="账号" v-model="accountF">
        <label class="alarm" alarm-id="6">{{errMs[6]}}</label>
        <input type="text" placeholder="与账号绑定的邮箱" v-model="emailF">
        <label class="alarm" alarm-id="7">{{errMs[7]}}</label>
        <div class="text-center">
          <button class="cannel"
            @click="changeIndex(1)"
          >返回</button><button class="submit">找回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidPassword, isValidAccount, isValidEmail } from '@/common/js/paramsCheck'

const MAX_TIME = 60
export default {
  data(){
    return {
      height: 0,
      windowIndex: 1,

      // 登录 start
      accountL: '',
      passwordL: '',
      // 登录 end

      // 注册 start
      accountR: '',
      emailR: '',
      passwordR: '',
      confirmPassword: '',
      checkCode: '',
      resendCodeTime: 0,
      // 注册 end

      // 找回密码 start
      accountF: '',
      emailF: '',
      // 找回密码 end

      // 错误信息 start
      errMs: ['','','','','','','','']
      // 错误信息 end
    }
  },
  watch: {
    // 登录 start
    accountL(v){
      var r = isValidAccount(v)
      this.errMs[0] = r.mes
    },
    passwordL(v){
      var r = isValidPassword(v)
      this.errMs[1] = r.mes
    },
    // 登录 end

    // 注册 start
    accountR(v){
      var r = isValidAccount(v)
      this.errMs[2] = r.mes
    },
    emailR(v){
      var r = isValidEmail(v)
      this.errMs[3] = r.mes
    },
    passwordR(v){
      var r = isValidPassword(v)
      this.errMs[4] = r.mes
    },
    confirmPassword(v){
      if(v === this.passwordR) {
        this.errMs[5] = ''
      } else {
        this.errMs[5] = '密码不相同！'
      }
    },
    // 注册 end

    // 找回密码 start
    accountF(v){
      var r = isValidAccount(v)
      this.errMs[6] = r.mes
    },
    emailF(v){
      var r = isValidEmail(v)
      this.errMs[7] = r.mes
    }
    // 找回密码 end
  },
  mounted(){
    setTimeout(()=>{
      this.getHeight()
      this.onresize()
    },200)
  },
  methods: {
    getHeight(){
      this.height = window.innerHeight
    },
    onresize(){
      window.addEventListener('resize',()=>{
        clearTimeout(resizeTimer)
        var resizeTimer = setTimeout(()=>{
          this.getHeight()
        },500)
      })
    },
    changeIndex(index){
      this.windowIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/sass/common";
$IMG_URL: "../../common/img";

.login-page {
  background: url("#{$IMG_URL}/loginBg2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.main {
  width: 400px;
  @extend .center-middle-dom;
  padding: 20px;
  @extend .normal-box;
  transition: 200ms;
  &::before {
    content: 'RDC';
    display: inline;
    color: gray;
    font-size: 14px;
    text-align: left;
  };
} 

.login-box, .register-box, .find-back-box {
  &>h2 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
  }
  &>label {
    padding: 0 20px;
  }
}

a.small-link.middle-dom {
  right: 0;
}

div.text-center {
  position: relative;
}

.check-box {
  position: relative;
  &>.input-left {
    padding-right: 100px;
  }
  &>.btn-right {
    position: absolute;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    top: 0;
    right: 0;
    margin: 0;
    width: 100px;
    @extend button.submit;
  }
}
</style>

