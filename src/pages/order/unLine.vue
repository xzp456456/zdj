<template>
  <div>
    <div class="row mag">
      <img class="moren left" src="@/assets/moren.png" alt srcset>
      <div class="left mlf">
        <span class="name">{{user.realname}}</span>
        <span class="pj">
          <img class="xinxing" src="@/assets/xinxing.png" alt srcset>{{user.driver_star}}
        </span>
        <div class="lin">代驾{{user.drive_times}}次 驾龄{{user.driver_years}}年</div>
      </div>
    </div>
    <div class="bar">
      <div class="border inback"></div>
      <div class="text inback">车费详情</div>
      <div class="border inback"></div>
    </div>
    <div class="item">
      <div class="vlist">
        <div class="row">
          <span class="left colb">起步价</span>
          <span class="right colb">{{info.start_trip_price}}元</span>
        </div>
      </div>
      <div class="vlist">
        <div class="row">
          <span class="left">里程({{info.beyond_start_mile}}公里)</span>
          <span class="right">{{info.mile_trip_price}}元</span>
        </div>
      </div>
      <div class="vlist">
        <div class="row">
          <span class="left">时长({{info.driver_wait_minute}}分钟)</span>
          <span class="right">{{info.wait_trip_price}}元</span>
        </div>
      </div>
      <div class="vlist">
        <div class="row">
          <span class="left">优惠券抵扣</span>
          <span class="right yhj">
            -{{info.use_coupon_amount}}元
            <img class="jt" src="@/assets/jt.png" alt rcset>
          </span>
        </div>
      </div>
    </div>

    <div class="bar">
      <div class="border inback"></div>
      <div class="text inback">支付方式</div>
      <div class="border inback"></div>
      <div class="undel">请线下支付司机费用</div>
    </div>
        <div class="lving" v-show="pay==1">
      <div class="success">
        <img class="success-img" src="@/assets/success.png" alt srcset>
        <div class="suc">线下支付成功！</div>
        <div class="day">给您的这次行程一个评价吧</div>
        <div class="read" ><span @click="navgateTo('/')">下次再说</span><span @click="navgateTo('evaluate')">前往评价</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
   data(){
    return{
      info:{},
      user:{},
      pay:0
    }
  },
  created(){
    this.getMoney()
    this.getUserInfo()
  },
  methods:{
    navgateTo(url){
      this.$router.push(url)
    },
    getUserInfo(){
      this.$postAjax('/api/user/getUserInfo',{obj_uid:localStorage.getItem('driver_uid')})
      .then(res=>{
        this.user = res.data;
      })
    },
    getMoney(){
      this.$postAjax('/api/trip/getTripFeeDetail',{trip_id:localStorage.getItem('trip_id')})
      .then(res=>{
        
        this.info = res.data;
      })
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.prdem {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.successPay {
  width: 6.826667rem;

  height: 4.56rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.133333rem;
  margin: 0 auto;
  margin-top: 1.66667rem;
  padding-top: 0.08rem;
}

.undel {
  text-align: center;
  padding-top: 0.666667rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
}

.textk {
  font-size: 0.373333rem;
  text-align: center;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  padding: 0.133333rem 0;
  color: rgba(51, 51, 51, 1);
}

.pj {
  text-align: center;
  font-size: 0.32rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(187, 187, 187, 1);
}

.success {
  width: 0.906667rem;
  height: 0.906667rem;
  display: block;
  margin: 0 auto;
  margin-top: 0.48rem;
}

.form {
  width: 100%;
  margin-top: 1px solid rgba(221, 221, 221, 1);
  height: 1.306667rem;
  padding-top: 0.6rem;
}

.form button:first-child {
  border-right: 1px solid rgba(221, 221, 221, 1);
  background-color: transparent;
  border: none;
  outline: none;
  height: 1.306667rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  width: 50%;
  float: left;
}

.form button:nth-child(2) {
  background-color: transparent;
  border: none;
  outline: none;
  height: 1.306667rem;
  float: left;
  width: 50%;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
}

.bottom {
  position: absolute;
  bottom: 1rem;
  width: 100%;
}

.inback {
  display: inline-block;
}

.jt {
  width: 0.186667rem;
  height: 0.346667rem;
  margin-left: 0.266667rem;
}

.name {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
}

.border {
  width: 4.026667rem;
  height: 1px;
  background: rgba(221, 221, 221, 1);
  opacity: 0.4;
}

.bar {
  margin-top: 0.233333rem;
}

.yhj {
  font-size: 0.4rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
}

.text {
  font-size: 0.373333rem;
  text-align: center;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  position: relative;
  bottom: -0.1rem;
  color: rgba(153, 153, 153, 1);
}

.xinxing {
  width: 0.453333rem;
  height: 0.453333rem;
  font-size: 0.293333rem;
  font-family: ArialMT;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
#container {
  width: 100%;
  height: 100%;
  position: absolute;
}

.mlf {
  margin-left: 0.1rem;
}

.colb {
  font-weight: bold;
}

.or {
  height: 0.6rem;
  padding-top: 0.4rem;
  font-size: 0.426667rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}

.wait {
  line-height: 1rem;
  height: 1rem;
  text-align: center;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.moren {
  width: 1.306667rem;
  height: 1.306667rem;
}
.amap-icon {
  z-index: 99999 !important;
}

.form {
  width: 6.5rem;
  margin: 0 auto;
}

.sure {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border: none;
  outline: none;
  width: 2.666667rem;
  height: 1.066667rem;
  background: #48cbb7;
  border-radius: 0.133333rem;
}

.quxiao {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border: none;
  outline: none;
  width: 2.666667rem;
  height: 1.066667rem;
  background: #48cbb7;
  border-radius: 0.133333rem;
}

.lin {
  padding-top: 0.153333rem;
  clear: both;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.line {
  width: 0.96rem;
  height: 0.96rem;
}

.mobile {
  width: 0.96rem;
  height: 0.96rem;
  margin-left: 0.253333rem;
}

.mag {
  margin-top: 0.413333rem;
  height: 1.5rem;
}

.pj {
  margin-left: 0.166667rem;
}

.pj img {
  position: relative;
  top: 0.05rem;
}

.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  text-align: center;
  color: rgba(51, 51, 51, 1);
  padding: 0.366667rem 0;
}

.vlist {
  clear: both;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.list {
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.money {
  width: 0.8rem;
  height: 0.8rem;
  position: relative;
  top: 0.3rem;
}

.xuanze {
  float: right;
  width: 0.613333rem;
  height: 0.613333rem;
  position: relative;
  top: 0.3rem;
}

.border {
  width: 4.026667rem;
  height: 1px;
  background: rgba(221, 221, 221, 1);
  opacity: 0.4;
}

.bar {
  margin-top: 0.933333rem;
}

.text {
  font-size: 0.373333rem;
  text-align: center;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  position: relative;
  bottom: -0.1rem;
  color: rgba(153, 153, 153, 1);
}

.top img {
  width: 1.6rem;
  height: 1.6rem;
}

.clear {
  clear: both;
  height: 1rem;
  line-height: 1rem;
}

.clear:first-child {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.clear:nth-child(2) {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.title {
  font-size: 0.453333rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  position: relative;
  bottom: 0.616667rem;
  left: 0.48rem;
}

.btn {
  margin-top: 0.2rem;
}

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

.read span{
  width: 49%;
  display: inline-block;
  text-align: center;
}

.read span:first-child{
  border-right:1px solid  #dddddd;
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

