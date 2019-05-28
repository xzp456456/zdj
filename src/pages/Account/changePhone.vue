<template>
  <div>
    <div class="title">
      <div class="row">
        <div>请输入验证码</div>
        <div class="or">验证码已通过短信发送至 +86 150 6075 8879</div>
      </div>
    </div>
    <div class="row">
       <input type="text" class="mobile" v-model="info.mobile" placeholder="请输入正确的手机号" >
   </div>
    <div class="inp">
      
        <div class="row">
      <input type="text" placeholder="请输入验证码" v-model="info.code">
      <button @click="getCode()" :disabled="disabled" >{{codeText}}</button>
      </div>
    </div>
    <div class="btn">
        <v-button @actionClick="changePhone()">确认修改手机号</v-button>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button';
export default {
  data(){
    return{
      info:{},
      codeText:'发送验证码',
      disabled:false
    }
  },
  methods:{
    changePhone(){
      let data = this.info;
      this.$postAjax('/api/user/changeMobile',data)
      .then(res=>{
        if (res.status) {
          this.Toast({
            message: res.msg,
            duration:1000
          });
          setTimeout(()=>{
            this.$router.push('accountSecurity');
          })
        } else {
          this.Toast({
            message: res.msg,
            duration:1000
          })
        }
      })
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
    },
     getCode() {
      let data = { type: "change_mobile", account: this.info.mobile };
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
  },
    components:{
        'v-button':Button
    }
};
</script>
<style scoped="">
.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  height: 1.7rem;
  line-height: 1rem;
}

.mobile{
    width: 100%;
    border: none;
    outline: none;
    line-height:1rem;
    border-bottom:1px solid #DDDDDD;
     margin-bottom: .4rem;
}
.or {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  line-height: normal;
  color: rgba(153, 153, 153, 1);
 
}

.inp{
    clear: both;
    width: 100%;
    height: 1.5rem;
}

.inp input{
    float: left;
    margin-top: 0.2rem;
    outline: none;
    border: none;
}

.inp button {
    float: right;
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
  width: 2.053333rem;
  height: 0.88rem;
  background: rgba(72, 203, 183, 1);
  border-radius: 0.133333rem;
  outline: none;
  border: none;
}
</style>
