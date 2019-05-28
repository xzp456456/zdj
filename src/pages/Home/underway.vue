<template>
  <div class="map">
    <div id="container"></div>

    <div class="bottom">
      <div class="title">行程中，请系好安全带</div>
      <div class="row mag">
        <img class="moren left" src="@/assets/moren.png" alt srcset>
        <div class="left mlf">
          <span class="name">{{device.realname}}</span>
          <span class="pj">
            <img class="xinxing" src="@/assets/xinxing.png" alt srcset>{{device.driver_star}}
          </span>
          <div class="lin">代驾{{device.drive_times}}次 驾龄{{device.driver_years}}</div>
        </div>
        <div class="right">
          <img class="line" @click="navgateTo('serverUser')" src="@/assets/duanxin.png" alt srcset>
          <a :href="'tel:'+device.mobile"><img class="mobile" src="@/assets/dianhua.png" alt srcset></a>
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
      wait: 0,
      device:{},
      center:[],
      lat:'',
      lng:''
    };
  },
  components: {
    "v-button": Button
  },
  created(){
    this.getDeviceInfo()
  },
  mounted() {
    this.getMap();
  },
  methods: {
    getDeviceInfo(){
      let data = { obj_uid:localStorage.getItem('uid') }
      this.$postAjax('/api/user/getUserInfo',data)
      .then(res=>{
        console.log(res);
        this.device = res.data;
      })
    },
    navgateTo(url) {
      this.$router.push(url);
    },
    getMap() {
      var that = this;
      that.getLagLng().then(res=>{
        this.center = [res.data.driver_longitude,res.data.driver_latitude];
        this.lng = res.data.driver_longitude;
         this.lat = res.data.driver_latitude;
         var map = new AMap.Map("container", {
        zoom:15,
        center:[that.lng,that.lat]
      });
           var marker = new AMap.Marker({
        icon: "http://zhangdj.yxsoft.net/assets/we.png",
        offset: new AMap.Pixel(-10, -10),
        position: new AMap.LngLat(that.lng, that.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "我的位置"
      });
          map.add(marker);
         
            setInterval(()=>{
                that.getLagLng().then(res=>{
                    var lnglat = new AMap.LngLat(res.data.driver_longitude,res.data.driver_latitude);
                      marker.moveTo(lnglat,500,(k)=>{
                        return k
                      })
                })
            },10000)
      })
      
     
    },
    getLagLng(){
      return new Promise((reslove,reject)=>{
        let data = {trip_id:localStorage.getItem('trip_id')};
        this.$postAjax('/api/trip/tripInfo',data)
        .then(res=>{
          reslove(res);
        })
      })
    }
  }
};
</script>
<style scoped="">
.name {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
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

.bottom {
  position: absolute;
  bottom: 0rem;
  height: 3.306667rem;
  width: 100%;
  z-index: 999;
  background-color: white;
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
</style>

