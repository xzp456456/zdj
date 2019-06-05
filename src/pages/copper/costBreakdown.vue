<template>
  <div>
    <div class="copper">费用明细</div>
    <div class="time">{{info.on_time}}</div>
    <border-text></border-text>
    <div class="list">
      <div class="row">
        <span class="left">起步价</span>
        <span class="right">{{info.start_trip_price}}元</span>
      </div>
    </div>
    <div class="list">
      <div class="row">
        <span class="left">里程(超起步8公里)</span>
        <span class="right">{{info.mile_trip_price}}元</span>
      </div>
    </div>
    <div class="list">
      <div class="row">
        <span class="left">等待费({{info.driver_wait_minute}}分钟)</span>
        <span class="right">{{info.wait_trip_price}}元</span>
      </div>
    </div>
     <div class="list">
      <div class="row">
        <span class="left">长途费</span>
        <span class="right">{{info.beyond_trip_price}}</span>
      </div>
    </div>
     <div class="list">
      <div class="row">
        <span class="left">动态加价</span>
        <span class="right">{{info.add_trip_price}}</span>
      </div>
    </div>
    <div class="border"></div>
    <div class="row total">总价 {{info.pay_price}} 元</div>
    <div class="row money">*车费计算四舍五入小数点后两位</div>
  </div>
</template>
<script>
import borderText from "@/components/borderText";
export default {
  data(){
    return{
      info:{}
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    getInfo(){
      this.$postAjax('/api/trip/getTripFeeDetail',{trip_id:localStorage.getItem('trip_id')})
      .then(res=>{
        this.info = res.data;
      })
    }
  },
  components: { "border-text": borderText }
};
</script>
<style scoped="">
.total{
     text-align: right;
    font-size:.453333rem;
font-family:PingFang-SC-Bold;
font-weight:bold;
color:rgba(51,51,51,1);
padding-top: .266667rem;
padding-bottom: .266667rem;
}

.money{
    text-align: right;
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(187,187,187,1);
}

.border{
    height: 1px;
    background-color:#DDDDDD; 
}
.list{
    clear: both;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}
.time {
  font-size: 0.32rem;
  text-align: center;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}
.copper {
  font-size: 0.426667rem;
  text-align: center;
  padding: 0.466667rem 0;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
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
</style>
