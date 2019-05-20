<template>
  <div>
    <div class="title">
      <div class="row">
        <div>修改登录密码</div>
        <div class="or">密码8—16位，需包含数字、字母、符号中至少2中元素</div>
      </div>
    </div>
    <div class="row">
      <div class="poser">
        <input :type="type" class="mobile" v-model="info.old_password"  placeholder="请输入旧密码">
        <img class="yanjin" @click="showPwd(1)" src="@/assets/yanjin.png" alt srcset>
      </div>
      <div class="poser">
        <input :type="type_new" class="mobile" v-model="info.new_password" placeholder="请输入新密码">
        <img class="yanjin" @click="showPwd(2)" src="@/assets/yanjin.png" alt srcset>
      </div>
      <div class="poser">
        <input :type="type_password" class="mobile" v-model="info.new_password_again" placeholder="再次输入密码">
        <img class="yanjin" @click="showPwd(3)" src="@/assets/yanjin.png" alt srcset>
      </div>
    </div>
    <div class="btn">
      <v-button @actionClick="changePassword()">确认修改手机号</v-button>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  data() {
    return {
      type: "password",
      type_new: "password",
      type_password: "password",
      info:{}
    }
  },
  methods: {
    changePassword(){
      let data = this.info;
      this.$postAjax('/api/user/changePassword',data)
      .then(res=>{
           if (res.status) {
          this.Toast({
            message: res.msg,
            duration:1000
          });
        } else {
          this.Toast({
            message: res.msg,
            duration:1000
          })
        }
      })
    },
    showPwd(num) {
      switch (num) {
        case 1:
          if (this.type == "password") {
            this.type = "text";
          } else {
            this.type = "password";
          }
          break;
           case 2:
          if (this.type_new == "password") {
           this.type_new = "text";
          } else {
            this.type_new = "password";
          }
          break;
           case 3:
          if (this.type_password == "password") {
            this.type_password = "text";
          } else {
            this.type_password = "password";
          }
          break;
      }
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.poser {
  position: relative;
}
.yanjin {
  position: absolute;
  right: 5%;
  top: 40%;
  width: 0.586667rem;
}
.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  height: 1.7rem;
  line-height: 1rem;
}

.or {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  line-height: normal;
  color: rgba(153, 153, 153, 1);
}

.inp {
  clear: both;
  width: 100%;
  height: 1.5rem;
}

.mobile {
  width: 100%;
  border: none;
  outline: none;
  line-height: 1rem;
  border-bottom: 1px solid #dddddd;
}

.inp button {
  float: right;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  width: 2.053333rem;
  height: 0.88rem;
  background: rgba(72, 203, 183, 1);
  border-radius: 0.133333rem;
  outline: none;
  border: none;
}

.btn {
  margin-top: 0.6rem;
}
</style>
