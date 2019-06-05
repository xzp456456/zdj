<template>
  <div class="account">
    <div class="top">
      <div class="tm account">— 账户余额 (元) —</div>
      <div class="money tm">{{info.balance}}</div>
      <div class="tm balance">余额可用于支付车费</div>
      <div class="btn-item">
        <button class="btn" @click="navgateTo('invest')">充值</button>
      </div>
    </div>
    <div class="clear">
      <div class="list">
        <div class="row text">交易明细</div>
      </div>
      <div class="list" v-for="(item,index) in list" :key="index">
        <div class="row">
          <div class="left">
            <div class="text textview">{{item.fina_action_desc}}</div>
            <div class="time">{{item.on_time}}</div>
          </div>
          <div class="right add">{{item.fina_cash}}元</div>
        </div>
      </div>
       <!-- <div class="list">
        <div class="row">
          <div class="left">
            <div class="text textview">接单消费</div>
            <div class="time">02月27日 14:07</div>
          </div>
          <div class="right add">-100.00元</div>
        </div>
      </div> -->
      <div class="more">
          暂无更多明细
      </div>
    </div>
    <div class="getMoney">
        <v-button @actionClick="navgateTo('advance')">提现</v-button>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button'
export default {
  data(){
    return{
      info:{},
      list:[]
    }
  },
  created(){
    this.getUserInfo();
    this.getList();
  },
  methods:{
    getUserInfo(){
      this.$postAjax('/api/user/getUserInfo',{})
      .then(res=>{
        //console.log(res)
        this.info = res.data;
      })
    },
    navgateTo(url){
    this.$router.push(url)
  },
  getList(){
    let data = {page:this.page,page_size:this.page_size}
    this.$postAjax('/api/finance/tradeList',data)
    .then(res=>{
      this.list = res.data.list;
    })
  }
  },
  
    components:{
        'v-button':Button
    }
};
</script>
<style scoped="">
.clear {
  clear: both;
}

.top {
  padding-top: 0.96rem;
  width: 100%;
  height: 4.68rem;
  background-color: #48cbb7;
}
.btn {
  width: 3.28rem;
  height: 0.906667rem;
  background: white;
  border-radius: 0.133333rem;
  font-size: 0.426667rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(72, 203, 183, 1);
  outline: none;
  border: none;
}

.account {
  font-size: 0.426667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
}

.money {
  font-size: 0.96rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
}

.balance {
  font-size: 0.346667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.tm {
  text-align: center;
  color: white;
  padding-bottom: 0.266667rem;
}

.btn-item {
  width: 3.28rem;
  height: 0.906667rem;
  margin: 0 auto;
}

.list {
  width: 100%;
  height: 1.306667rem;
  line-height: 1.306667rem;
  border-bottom:1px solid  #DDDDDD;
}

.text {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.time {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: normal;
}

.textview{
    margin-top: 0.2rem;
    line-height: normal;
}

.add{
    font-size:.4rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.more{
    text-align: center;
    width:100%;
height:.786667rem;
font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
margin-bottom: 0.3rem;
color:rgba(187,187,187,1);
line-height: .786667rem;
background:rgba(221,221,221,0.4);
}

.getMoney{
    margin-top: 0.5rem;
    margin-bottom: 1rem;
}
</style>
