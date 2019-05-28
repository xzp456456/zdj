<template>
  <div class="page">
    <div class="text">
      <div class="title">附近暂无空闲司机</div>
      <div class="title pd">加价请更远司机来接</div>
      <div class="title">{{add_price_desc}}</div>
      <div class="start">当前时段该地区需求过旺，临时调价有助于更快叫到</div>
      <div class="start pd">司机，也可等价格恢复后下单。</div>
    </div>
    <div class="bottom">
      <div class="row">
        <div class="btn">
          <v-button @actionClick="addMoney()">同意加价</v-button>
        </div>
        <div class="btn">
          <v-button @actionClick="navgateTo('/')">稍后在试</v-button>
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
      info:{},
      add_price_desc:''
      }
  },
  created(){
    this.add_price_desc=localStorage.getItem('add_price_desc');
  },
  components: {
    "v-button": Button
  },
  methods:{
    addMoney(){
      let data = {
         origin_longitude:localStorage.getItem('origin_longitude',this.origin_longitude),
        origin_latitude:localStorage.getItem('origin_latitude',this.origin_latitude),
         origin_name:localStorage.getItem('origin_name',this.origin_name),
         destination_longitude:localStorage.getItem('destination_longitude',this.destination_longitude),
         destination_latitude:localStorage.getItem('destination_latitude',this.destination_latitude),
        origin_longitude: localStorage.getItem('origin_longitude',this.origin_longitude),
        is_add_price:1
      }
      this.$postAjax('/api/trip/createTrip',data)
      .then(res=>{
        if(res.status==1){
          localStorage.setItem('trip_id',res.data.trip_id)
            this.Toast({
             message: res.msg,
            duration:1000
          })
          setTimeout(()=>{
            this.$router.push('wait');
          },1000)
        }else{
           this.Toast({
             message: res.msg,
            duration:1000
          })
        }
      })
    },
    navgateTo(url){
      this.$router.push(url)
    },
   getConfigByLngLat(){
     this.$postAjax('/api/config/getConfigByLngLat',{})
     .then(res=>{
       this.info = res.data;
     })
   },
  }
};
</script>
<style scoped="">
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
</style>

