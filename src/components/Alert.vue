<template>
  <div>
    <div class="lving">
      <div class="success" v-if="bind==0">
        <img class="success-img" src="@/assets/success.png" alt srcset>
        <div class="suc">提交成功！</div>
        <div class="day">请在3-5个工作日查看您的账户</div>
        <div class="read" @click="MyClickEvent()">确认</div>
      </div>
       <div class="success" v-if="bind==1">
        <div class="suc">未绑定银行卡！</div>
        <!-- <div class="day">请在3-5个工作日查看您的账户</div> -->
        <div class="read" @click="MyClickEvent()">去绑定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['bind'],
   methods:{
        MyClickEvent(){
             this.$emit('actionClick');
        }
    }
};
</script>
<style scoped="">
.read{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(72,203,183,1);
height: 1.306667rem;
width: 100%;
line-height: 1.306667rem;
text-align: center;
border-top:1px solid  #dddddd;
position: absolute;
bottom: 0;
}

.suc {
  text-align: center;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
   padding-top: 0.2rem;
 padding-bottom: 0.2rem;
}

.day {
    padding-bottom: 0.5rem;
    text-align: center;
  font-size: 0.346667rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(187, 187, 187, 1);
}
.lving {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
}

.success {
    position: relative;
  margin: 0 auto;
  padding-top: 0.5rem;
  margin-top: 3rem;
  width: 6.826667rem;
  height: 4.06rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.133333rem;
}
.success-img {
  width: 0.88rem;
  height: 0.88rem;
  display: block;
  margin: 0 auto;
}
</style>

