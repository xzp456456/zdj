<template>
  <div>
    <div class="item">
      <div class="list" @click="navgateTo('accountBalance')">
          <div class="row">
        <span class="left">账户余额</span>
        <span class="right money">
         {{info.balance}}元
          <img class="jt" src="@/assets/jt.png" alt srcset>
        </span>
        </div>
      </div>
      <div class="list" @click="navgateTo('discount')">
          <div class="row">
        <span class="left">优惠券</span>
        <span class="right money">
          {{info.coupon_num}}张
          <img class="jt" src="@/assets/jt.png" alt srcset>
        </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      info:{}
    }
  },
  created(){
    this.getUserInfo()
  },
  methods:{
    navgateTo(url){
      this.$router.push(url);
    },
    getUserInfo(){
      this.$postAjax('/api/user/getUserInfo',{})
      .then(res=>{
        //console.log(res);
        this.info = res.data;
      })
    }
  }
};
</script>
<style scoped="">
.list {
  width: 100%;
  height: 1.32rem;
  line-height: 1.32rem;
  font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
border-bottom:1px solid  #DDDDDD;
}

.money{
    color: #999999;
}

.jt {
  width: 0.186667rem;
  height: 0.346667rem;
}
</style>
