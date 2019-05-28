<template>
  <div class="success">
    <div class="top">
      <img class="inback" src="@/assets/success.png" alt srcset>
      <div class="title inback">取消成功</div>
    </div>
    <div class="bar">
      <div class="border inback"></div>
      <div class="text inback">车费详情</div>
      <div class="border inback"></div>
    </div>
    <div class="row">
      <div class="clear">
        <span class="left">费用合计</span>
        <span class="right">{{fee}}元</span>
      </div>
      <div class="clear">
        <span class="left">费用合计</span>
        <span class="right">{{fee}}元</span>
      </div>
    </div>
    <div class="bottom">
      <div class="bar">
        <div class="border inback"></div>
        <div class="text inback">支付方式</div>
        <div class="border inback"></div>
      </div>
      <div class="row">
        <div class="list" @click="changePay(0)">
          <img class="money" src="@/assets/wx.png" alt srcset>
          <span>微信支付</span>
          <img
            class="xuanze"
            :src="changeid==0?require('@/assets/xuanze.png'):require('@/assets/ty.png')"
            alt
            srcset
          >
        </div>
        <div class="list" @click="changePay(1)">
          <img class="money" src="@/assets/money.png" alt srcset>
          <span>余额支付</span>
          <img
            class="xuanze"
            :src="changeid==1?require('@/assets/xuanze.png'):require('@/assets/ty.png')"
            alt
            srcset
          >
        </div>
        <div></div>
      </div>
      <div class="btn">
        <v-button @actionClick="pay()">确认支付{{fee}}元</v-button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  components: {
    "v-button": Button
  },
  data() {
    return {
      fee: "",
      changeid: 0
    };
  },
  created() {
    this.fee = localStorage.getItem("fee");
  },
  methods: {
    changePay(id) {
      this.changeid = id;
      if (this.changeid == 0) {
        this.pay_way = "jswxpay";
      } else {
        this.pay_way = "balance";
      }
    },
    pay() {
      this.$postAjax("/api/pay/cancelTrip", {
        trip_id: localStorage.getItem("trip_id"),
        pay_way: this.pay_way,
        amount: this.fee
      }).then(res => {
        console.log(res);
        if (res.status) {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
          setTimeout(()=>{
              this.$router.push('/')
          },1000)
        } else {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
        }
      });
    }
  }
};
</script>
<style scoped="">
.top {
  width: 5rem;
  margin: 0 auto;
  margin-top: 0.933333rem;
}

.inback {
  display: inline-block;
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

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6rem;
}
</style>
