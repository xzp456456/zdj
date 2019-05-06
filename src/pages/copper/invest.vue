<template>
  <div>
    <div class="top">
      <div class="row">
        账户余额：
        <span>15.00</span>元
      </div>
    </div>
    <div class="item">
      <ul>
        <li>￥100</li>
        <li class="active">￥100</li>
        <li>￥100</li>
        <li>￥100</li>
        <li>￥100</li>
        <li>￥100</li>
      </ul>
    </div>

    <input class="shuru" type="text" placeholder="请输入充值金额">
    <div>
      <v-button>立即充值</v-button>
    </div>
    <div class="lving">
      <div class="bottom">
        <div class="close">
          <div class="row">
            <img src="@/assets/cuo.png" alt srcset> 充值支付金额
          </div>
        </div>
        <div class="allmoney">
          <span class="left">充值金额</span>
          <span class="right">200元</span>
        </div>
        <div class="imgk row">
          <img class="wx" src="@/assets/wx.png" alt srcset>
          <span>微信支付</span>
          <img class="xuanze" src="@/assets/xuanze.png" alt="" >
        </div>
        <div class="mode">
            <v-button>确认支付200元</v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.mode{
    margin-top: 0.3rem;
    margin-bottom: 0.7rem;
}
.shuru {
  width: 8.9rem;
  height: 0.96rem;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 0.133333rem;
  display: block;
  margin: 0 auto;
  margin-top: 0.366667rem;
  padding-left: 0.2rem;
  margin-bottom: 1.066667rem;
}
.top {
  width: 100%;
  height: 1.373333rem;
  line-height: 1.373333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px solid #dddddd;
}

.top span {
  font-size: 0.56rem;
  font-family: Arial-BoldMT;
  font-weight: bold;
  color: rgba(72, 203, 183, 1);
}

.item ul li {
  margin: 0.24rem;
  font-size: 0.4rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  border: 1px solid rgba(225, 225, 225, 1);
  border-radius: 0.106667rem 0.106667rem 0.106667rem 0.106667rem;
  display: inline-block;
  padding: 0.163333rem 0.783333rem;
}

.close {
  text-align: center;
  height: 1.293333rem;
  line-height: 1.293333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px solid rgba(225, 225, 225, 1);
}

.close img {
  width: 0.373333rem;
  height: 0.373333rem;
  float: left;
  margin-top: 0.55rem;
}

.active {
  background-color: #48cbb7;
  color: white !important;
}

.lving {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: white;
}

.allmoney {
  width: 5rem;
  margin: 0 auto;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.493333rem;
  padding-bottom: 0.57333rem;
}

.wx {
  width: 0.826667rem;
  height: 0.826667rem;
}

.imgk{
   
    height: 1.3rem;
    line-height: 1.3rem;
}

.imgk img{
    position: relative;
    top: 0.25rem;
}

.imgk span {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: .133333rem;
}

.xuanze{
    float: right;
    width:.586667rem;
height:.586667rem;
}
</style>

