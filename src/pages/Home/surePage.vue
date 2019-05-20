<template>
  <div class="page">
    <div class="text">
      <div class="title">请确认起点后呼叫代驾</div>
      <div class="start">起点：{{origin_name}}</div>
      <div class="length">距您当前定位{{dis}}米</div>
    </div>
    <div class="bottom">
      <div class="row">
        <div class="btn">
          <v-button @actionClick="navgateTo('/')">修改起点</v-button>
        </div>
        <div class="btn">
          <v-button myclass="bgcolor" @actionClick="getOrder()">确认呼叫</v-button>
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
      origin_longitude:'',
      dis:''
    }
  },
  created(){
   
    this.origin_name = localStorage.getItem('origin_name');
  },
  mounted(){
    this.getLanger();
  },
  methods:{
    navgateTo(url){
      this.$router.push(url);
    },
    getLanger(){
this.$getAjax('https://restapi.amap.com/v3/direction/walking?origin='+localStorage.getItem('location')+
'&destination='+localStorage.getItem('yl_location')+'&&key=5d36d977b287953b8e7037325b1085bf')
.then(res=>{
  //console.log(res);
  this.dis = res.route.paths[0].distance;
})


    },
    toNonExponential(num) {
          var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
          return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
      },
    getOrder() {
      let data = {
        origin_longitude: localStorage.getItem('origin_longitude'),
        origin_latitude:  localStorage.getItem('origin_latitude'),
        origin_name: localStorage.getItem('origin_name'),
        destination_longitude:localStorage.getItem('destination_longitude'),
        destination_latitude:localStorage.getItem('destination_latitude'),
        destination_name:localStorage.getItem('destination_name'),
        is_add_price:0
      };
      this.$postAjax("/api/trip/createTrip", data).then(res => {
        //console.log(res);
        if(res.status){
          localStorage.setItem(trip_id,res.data.trip_id);
         this.Toast({
            message: res.msg,
            duration:1000
          })
          setTimeout(()=>{
            this.navgateTo('wait')
          },1000)
        }else{
          this.Toast({
            message: res.msg,
            duration:1000
          })
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
</style>

