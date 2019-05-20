<template>
  <div>
    <div class="title">
      <div class="row">
        <div>请输入新的手机号</div>
        <div class="or">验证码已通过短信发送至 +86 150 6075 8879</div>
      </div>
    </div>
   
    <div class="btn">
        <v-button>确认修改手机号</v-button>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button';
export default {
  data(){
    return{
      info:{}
    }
  },
  methods:{
    
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

.mobile{
    width: 100%;
    border: none;
    outline: none;
    line-height:1rem;
    border-bottom:1px solid #DDDDDD;
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

.btn{
    margin-top: 0.6rem;
}
</style>
