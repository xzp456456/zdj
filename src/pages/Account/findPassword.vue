<template>
  <div>
    <div class="title">
      <div class="row">
        <div>请输入验证码</div>
        <div class="or">验证码已通过短信发送至 +86 150 6075 8879</div>
      </div>
    </div>
    <div class="inp">
        <div class="row">
      <input type="text" placeholder="请输入验证码">
      <button>60 s</button>
      </div>
    </div>
    <div class="btn">
        <v-button>下一步</v-button>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button';
export default {
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
