<template>
  <div>
    <div class="row mag">
      <img class="moren left" src="@/assets/moren.png" alt srcset>
      <div class="left mlf">
        <span class="name">{{driver.realname}}</span>
        <span class="pj">
          <img class="xinxing" src="@/assets/xinxing.png" alt srcset>
          {{driver.driver_star}}
        </span>
        <div class="lin">代驾{{driver.drive_times}}次 驾龄{{driver.driver_years}}年</div>
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
          <span class="left">里程(8公里)</span>
          <span class="right">{{info.mile_trip_price}}元</span>
        </div>
      </div>
      <div class="vlist">
        <div class="row">
          <span class="left">时长({{info.driver_wait_minute}}分钟)</span>
          <span class="right">{{info.wait_trip_price}}元</span>
        </div>
      </div>
      <div class="vlist" @click="navgateTo('discount')">
        <div class="row">
          <span class="left">优惠券抵扣</span>
          <span class="right yhj">
            -{{info.use_coupon_amount}}元
            <img class="jt" src="@/assets/jt.png" alt rcset>
          </span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bar">
        <div class="border inback"></div>
        <div class="text inback">支付方式</div>
        <div class="border inback"></div>
      </div>
      <div class="row">
        <div class="list" @click="select(0)">
          <img class="money" src="@/assets/wx.png" alt srcset>
          <span>微信支付</span>
          <img
            class="xuanze"
            :src="select_id==0?require('@/assets/xuanze.png'):require('@/assets/ty.png')"
            alt
            srcset
          >
        </div>
        <div class="list" @click="select(1)">
          <img class="money" src="@/assets/money.png" alt srcset>
          <span>余额支付</span>
          <img
            class="xuanze"
            :src="select_id==1?require('@/assets/xuanze.png'):require('@/assets/ty.png')"
            alt
            srcset
          >
        </div>
        <div></div>
      </div>
      <div class="btn">
        <v-button @actionClick="payTrip()">确认支付{{info.pay_price}}元</v-button>
      </div>
    </div>
    <div class="prdem" v-show="showId==1">
      <div class="successPay">
        <img class="success" src="@/assets/success.png" alt>
        <div class="textk">支付成功！</div>
        <div class="pj">给您的这次行程一个评价吧</div>
        <div class="form">
          <button @click="navgateTo('/')">下次在说</button>
          <button @click="navgateTo('evaluate')">前往评价</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  data() {
    return {
      showId: 0,
      info: {},
      driver: {},
      select_id: 0,
      amount:'',
      pay_way:'jswxpay'
    };
  },
  created() {
      this.getTripFeeDetail()
    this.getUserInfo();
    this.coupon_id = localStorage.getItem('coupon_id');
  },
  methods: {
    getWxInfo(){
      
        let data = {url:location.href}
      this.$postAjax('/api/wx_oauth/getWxInfo',data)
      .then(res=>{
        console.log(res);
        this.wx = res.data;
        this.getWxConfig(res.data.appId,res.data.timestamp,res.data.nonceStr,res.data.signature)
      })
  
      
    },
    getWxConfig(appId,timestamp,nonceStr,signature){
      var that = this;
      console.log({appId,timestamp,nonceStr,signature})
      wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature,// 必填，签名
          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
      });
    },

    navgateTo(url) {
      this.$router.push(url);
    },
    select(id) {
      this.select_id = id;
      if (id == 0) {
        this.pay_way = "jswxpay";
      } else {
        this.pay_way = "balance";
      }
    },
    
// onBridgeReady(appId,timeStamp,nonceStr,package,signType,paySign){
//    WeixinJSBridge.invoke(
//       'getBrandWCPayRequest', {
//          "appId":appId,     //公众号名称，由商户传入     
//          "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数     
//          "nonceStr":nonceStr, //随机串     
//          "package":package,     
//          "signType":"MD5",         //微信签名方式：     
//          "paySign":paySign //微信签名 
//       },
//       function(res){
//       if(res.err_msg == "get_brand_wcpay_request:ok" ){
//       // 使用以上方式判断前端返回,微信团队郑重提示：
//             //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
//       } 
//    }); 
// },

    getUserInfo() {
      this.$postAjax("/api/user/getUserInfo", {
        obj_uid: localStorage.getItem("driver_uid")
      }).then(res => {
        console.log(res);
        this.driver = res.data;
      });
    },
    getTripFeeDetail() {
      this.$postAjax("/api/trip/getTripFeeDetail", {
        trip_id: localStorage.getItem("trip_id")
      }).then(res => {
        this.info = res.data;
      });
    },
    payTrip() {
      let data = {
        trip_id: localStorage.getItem("trip_id"),
        pay_way: this.pay_way,
        amount: this.info.pay_price,
        coupon_id: this.coupon_id
      };
      this.$postAjax("/api/pay/payTrip", data).then(res => {
        if(res.status==10000){
          localStorage.setItem('uri',location.href);
            location.href = res.data.url;
        }
        if (res.status) {
          this.showId = 1;
          sessionStorage.removeItem('coupon_id')
        } else {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
        }
      });
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
</style>

