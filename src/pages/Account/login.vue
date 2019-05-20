<template>
  <div class="main">
    <div class="top">
      <div class="header_img">
        <div class="header">
          <img src="@/assets/header.png" alt>
        </div>
      </div>
    </div>
    <div class="btn">
      <button :class="change==0?'active btn-pass':'btn-pass'" @click="changeLogin(0)">账号密码登录</button>
      <button :class="change==1?'active btn-phone':'btn-phone'" @click="changeLogin(1)">快捷登录</button>
    </div>
    <div class="form">
      <div class="border">
        <img class="phone" src="@/assets/phone.png" alt>
        <input
          maxlength="11"
          onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
          placeholder="请输入手机号"
          type="text"
          name
          id
          v-model="info.mobile"
        >
      </div>
      <div class="border" v-if="change==0">
        <img class="pwd" src="@/assets/password.png" alt>
        <input placeholder="请输入登录密码"  v-model="info.password" :type="type">
        <img class="eye" src="@/assets/eye.png" @click="showPwd()" alt>
      </div>
      <div class="border" v-if="change==1">
        <img class="pwd" src="@/assets/yzm.png" alt>
        <input class="code" v-model="info.code" maxlength="6" placeholder="请输入验证码">
        <button :disabled="disabled" @click="getCode()" class="getcode right">{{codeText}}</button>
      </div>
    </div>
    <div class="more">
      <div class="left" @click="navgateTo('forgetPassword')">忘记密码？</div>
      <div class="right" @click="navgateTo('register')">快速注册</div>
    </div>
    <div class="read">
      <button class="login" @click="login()">登录</button>
    </div>
    <div class="line" @click="navgateTo('discuss')">登录表示您已阅读并同意《用户协议》</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "password",
      change: 0,
      codeText: "获取验证码",
      info:{},
      disabled:false
    };
  },
  methods: {
    navgateTo(url){
      this.$router.push(url)
    },
    showPwd() {
      if (this.type == "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    changeLogin(num) {
      this.change = num;
    },
    login(){
      if(this.change==1){
        let data = this.info;
        this.loginbyMobile('/api/user/loginByMobile',data)
      }else{
        let data ={account:this.info.mobile,password:this.info.password};
        this.loginbyMobile('/api/user/loginByAccount',data)
      }
      
    },
    loginbyMobile(url,data){
      this.$postAjax(url,data)
      .then(res=>{
        if (res.status) {
           localStorage.setItem('access_token',res.data.access_token);
          localStorage.setItem('uid',res.data.uid);
          localStorage.setItem('im_token',res.data.im_token);
          localStorage.setItem('mobile',this.info.mobile);
          this.Toast({
            message: res.msg,
            duration:1000
          });
          setTimeout(()=>{
            this.$router.push('/');
          },1000)
        } else {
          this.Toast({
            message: res.msg,
            duration:1000
          })
        }
      })
    },
    getCode() {
      let data = { type: "login_mobile", account: this.info.mobile };
      this.$postAjax("/api/code/sendCode", data).then(res => {
        if (res.status) {
         
          this.Toast({
            message: res.msg,
            duration:1000
          });
          this.getTime(60);
        } else {
          this.Toast({
            message: res.msg,
            duration:1000
          })
        }
      });
    },
    getTime(time) {
      var timeFun = setInterval(() => {
        time--;
        this.codeText = "重新发送(" + time + ")";
        this.disabled = true;
        if (time < 0) {
          clearInterval(timeFun);
          this.codeText = "重新发送";
          this.disabled = false;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped="">
.left {
  float: left;
}

.right {
  float: right;
}

.header img {
  width: 1.866667rem;
  height: 1.866667rem;
}

.header {
  width: 1.866667rem;
  height: 1.866667rem;
  margin: 0.96rem auto;
}

.top {
  width: 100%;
  height: 4.213333rem;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
}

.btn {
  width: 6.616667rem;
  margin: 0 auto;
  margin-top: -0.426667rem;
}

.btn button {
  width: 3.306667rem;
  height: 0.853333rem;
}

.form {
  padding-top: 0.96rem;
}

.btn-pass {
  font: size 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
  background-color: white;
  outline: none;
  border: none;
  float: left;
  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  border: 1px solid rgba(72, 203, 183, 1);
}

.btn-phone {
  font: size 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
  background-color: white;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  border: 1px solid rgba(72, 203, 183, 1);
}

.active {
  color: rgba(255, 255, 255, 1);
  background-color: #48cbb7;
  border: 1px solid rgba(72, 203, 183, 1);
}

.eye {
  width: 0.573333rem;
  height: 0.32rem;
}

.border {
  width: 7.12rem;
  height: 1.173333rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 221, 221, 0.4);
  border-radius: 0.133333rem;
  line-height: 1.173333rem;
  margin: 0 auto;
  margin-bottom: 0.453333rem;
}

.border input {
  width: 4.8rem;
  height: 0.8rem;
  margin-left: 0.5rem;
  border: none;
  outline: none;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
}

.phone {
  width: 0.44rem;
  height: 0.626667rem;
  position: relative;
  top: 0.2rem;
  margin-left: 0.266667rem;
}

.pwd {
  position: relative;
  top: 0.2rem;
  width: 0.546667rem;
  height: 0.64rem;
  margin-left: 0.266667rem;
}

.more {
  width: 6.82rem;
  margin: 0 auto;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
}

.read {
  clear: both;
  width: 6.64rem;
  height: 1.173333rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0.08rem 0.2rem 1px rgba(185, 185, 185, 0.3);
  border-radius: 0.133333rem;
  margin: 0 auto;
  margin-top: 1.906667rem;
}

.read button {
  width: 6.64rem;
  height: 1.173333rem;
  background: #48cbb7;
  box-shadow: 0px 0.08rem 0.2rem 1px rgba(185, 185, 185, 0.3);
  border-radius: 0.133333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  border: none;
  outline: none;
}

.line {
  position: absolute;
  bottom: 0.566667rem;
  width: 100%;
  text-align: center;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}

.code {
  width: 3rem !important;
}

.getcode {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
  outline: none;
  border: none;
  background-color: transparent;
  margin-top: 0.366667rem;
  margin-right: 0.133333rem;
}
</style>

