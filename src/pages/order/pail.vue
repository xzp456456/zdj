<template>
  <div class="page">
    <div class="text">
        <img class="gth" src="@/assets/gth.png" alt="">
      <div class="title">取消提醒</div>
      <div class="desc" v-if="conunter==0">司机正在赶来的路上，再等一会儿吧？</div>
      <div class="desc" v-if="conunter==1">您已下单超过两分钟，取消需要支付10元取消费</div>
      <div class="desc" v-if="conunter==2">司机已到达出发地，取消需要支付10元取消费</div>
    </div>
    <div class="bottom">
      <div class="row">
        <div class="btn">
          <v-button>暂不取消</v-button>
        </div>
        
        <div class="btn">
          <v-button myclass="bgcolor" @actionClick="cancel()">继续取消</v-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
    data(){
        return{
            conunter:0
        }
    },
    methods:{
        next(){
            this.conunter=1;
        },
        cancel(){
          let data = {trip_id:localStorage.getItem('trip_id'),confirm_cancel:1}
          this.$postAjax('/api/trip/cancelTrip',data)
          .then(res=>{
            //console.log(res);
            this.next()
          })
        }
    },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.gth{
    width: 1.36rem;
    height: 1.36rem;
    display: block;
    margin: 0 auto;
}
.text {
  text-align: center;
  margin-top: 2.666667rem;
}
.title {

  
  font-size: 0.453333rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.466667rem;
}

.start {
    margin: 0 auto;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.466667rem;
}

.length {
  font-size: 0.32rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.466667rem;
}
.bottom {
  position: absolute;
  bottom: 0.733333rem;
  width: 100%;
}

.btn{
    margin-top:.466667rem; 
}

.pd{
    margin: 0;
    padding: 0;
}

.desc{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
padding-top: .466667rem;
}
</style>

