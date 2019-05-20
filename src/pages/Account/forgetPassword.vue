<template>
  <div class>
    <div class="forget row">忘记密码</div>
    <div class="desc row">密码8—16位，需包含数字、字母、符号中至少2中元素</div>
    <div class="form">
      <div class="mobile input">
        <input type="text" maxlength="11" v-model="info.mobile"
          onkeyup="this.value=this.value.replace(/[^\d]/g,'')"   placeholder="请输入手机号">
      </div>
      <div class="code input">
        <input type="text" maxlength="6" placeholder="请输入验证码"  v-model="info.code" >
        <button :disabled="disabled"  class="getcode right" @click="getCode()">{{codeText}}</button>
      </div>
      <div class="password input">
        <input :type="type" placeholder="请输入新密码"  v-model="info.password">
        <img class="eye" @click="showPwd()" src="@/assets/eye.png" alt>
      </div>
      <div class="password input">
        <input :type="type_again" placeholder="再次输入密码"  v-model="info.password_again">
        <img class="eye" @click="showPwdAgain()" src="@/assets/eye.png" alt>
      </div>
    </div>
  <div class="btn-pd">
    <v-button @actionClick="changePassword()">确认</v-button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  data() {
    return {
      codeText: "获取验证码",
      disabled: false,
      type: "password",
      type_again: "password",
      info:{}
    };
  },
  methods: {
    changePassword(){
      let data = this.info;
      this.$postAjax('/api/user/forgetLoginPassword',data)
      .then(res=>{
        if(res.status){
           if (res.status) {
          this.Toast({
            message: res.msg,
            duration:1000
          });
          setTimeout(()=>{
            this.$router.push('/login');
          },1000)
        } else {
          this.Toast({
            message: res.msg,
            duration:1000
          })
        }
        }
      })
    },
    showPwd() {
      if (this.type == "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    showPwdAgain() {
      if (this.type_again == "password") {
        this.type_again = "text";
      } else {
        this.type_again = "password";
      }
    },
    getCode() {
      let data = { type: "find_password_mobile", account: this.info.mobile };
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
  },

  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.forget {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.346667rem;
  padding-bottom: 0.106667rem;
}

.desc {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.form {
  padding-top: 0.666667rem;
}

.input {
  border-bottom: 1px solid rgba(221, 221, 221, 0.4);
  width: 9.2rem;
  margin: 0 auto;
  padding-bottom: 0.24rem;
  margin-top: 0.366667rem;
}

.input input {
  border: none;
  outline: none;
}

.getcode {
  padding: 0.156667rem 0.266667rem;
  background: rgba(72, 203, 183, 1);
  border-radius: 0.133333rem;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  outline: none;
  border: none;
}

.eye {
  width: 0.573333rem;
  height: 0.32rem;
  float: right;
  position: relative;
  top: 0.1rem;
}

.btn-pd{
  margin:1.413333rem 0;
}
</style>

