<template>
  <div>
    <div class="list" @click="navgateTo('accountSecurity')">
      <div class="row">
        <span>账户安全</span>
        <span class="right">
          <img class="jt" src="@/assets/jt.png" alt srcset>
        </span>
      </div>
    </div>
    <div class="list" @click="navgateTo('about')">
      <div class="row">
        <span>关于我们</span>
        <span class="right">
          <img class="jt" src="@/assets/jt.png" alt srcset>
        </span>
      </div>
    </div>
    <div class="btn">
      <v-button @actionClick="logout()">退出登陆</v-button>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  methods: {
    logout() {
      this.$postAjax("/api/user/logout", {}).then(res => {
        localStorage.removeItem("access_token");
        this.Toast({
          message: res.msg,
          duration: 1000
        });
        setTimeout(() => {
          this.$router.push("login");
        }, 1000);
      });
    },
    navgateTo(url){
      this.$router.push(url);
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.btn {
  margin-top: 12rem;
}
.list {
  width: 100%;
  height: 1.333333rem;
  border-bottom: 1px solid #dddddd;
  line-height: 1.333333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.jt {
  width: 0.193333rem;
}
</style>
