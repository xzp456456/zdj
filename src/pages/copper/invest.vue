<template>
  <div>
    <div class="top">
      <div class="row">
        账户余额：
        <span>{{info.balance}}</span>元
      </div>
    </div>
    <div class="item">
      <ul>
        <li :class="select_id==0?'active':''" @click="select(0,100)">￥100</li>
        <li :class="select_id==1?'active':''" @click="select(1,200)">￥200</li>
        <li :class="select_id==2?'active':''" @click="select(2,300)">￥300</li>
        <li :class="select_id==3?'active':''" @click="select(3,500)">￥500</li>
        <li :class="select_id==4?'active':''" @click="select(4,1000)">￥1000</li>
        <li :class="select_id==5?'active':''" @click="select(5,3000)">￥2000</li>
      </ul>
    </div>

    <input class="shuru" type="text" placeholder="请输入充值金额" v-model="amount">
    <div>
      <v-button @actionClick="showWx(1)">立即充值</v-button>
    </div>
    <div class="lving" v-show="wxId==1">
      <div class="bottom">
        <div class="close">
          <div class="row">
            <img src="@/assets/cuo.png" @click="showWx(0)" alt srcset> 充值支付金额
          </div>
        </div>
        <div class="allmoney">
          <span class="left">充值金额</span>
          <span class="right">{{amount}}元</span>
        </div>
        <div class="imgk row">
          <div class="left">
          <img class="wx left" src="@/assets/wx.png" alt srcset>
          <span class="left">微信支付</span>
          </div>
          <img class="xuanze" src="@/assets/xuanze.png" alt="" >
        </div>
        <div class="mode">
            <v-button @actionClick="Money()">确认支付{{amount}}元</v-button>
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
      amount:'100',
      wxId:0,
      select_id:0,
      info:{}
    }
  },
  components: {
    "v-button": Button
  },
  created(){
    this.getUserInfo()
  },
  methods:{
    showWx(id){
      if(this.amount==''){
        this.Toast({
          message: '金额不能为空',
          duration: 1000
        });
        return false;
      }
      this.wxId=id;
      
    },
    getUserInfo(){
      this.$postAjax('/api/user/getUserInfo',{})
      .then(res=>{
        this.info = res.data;
      })
    },
    Money(){
      let data = {amount:this.amount}
      this.$postAjax('/api/finance/recharge',data)
      .then(res=>{
        if(res.status==10000){
          location.href = res.data.url;
        }
         this.Toast({
          message: res.msg,
          duration: 1000
        });
      })
    },
    select(id,money){
      this.select_id = id;
      this.amount = money;
    }
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
  padding: 0.163333rem 0;
  width: 2.733333rem;
  text-align: center;
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

