<template>
  <div class="map">
    <div id="container"></div>
    <div class="kk1">
      <div class="kk2">
        <div class="kk3"></div>
      </div>
    </div>

    <div class="bottom">
      <div class="or">已等待 00 : 04</div>
      <div class="wait">正在为您寻找司机，请耐心等待</div>
      <v-button myclass="wid"  v-if="wait==0">取消代驾</v-button>
     <div class="form" v-if="wait==1">
         <button class="quxiao left">取消代驾</button>
         <button class="sure right">同意加价</button>
     </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
    data(){
        return{
            wait:0
        }
    },
  components: {
    "v-button": Button
  },
  mounted() {
    this.getMap();
  },
  methods: {
    navgateTo(url) {
      this.$router.push(url);
    },
    getMap() {
      var that = this;
      var map = new AMap.Map("container", {
        resizeEnable: true
      });
      map.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true      //显示定位按钮，默认：true   //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true      //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
        function onComplete(data) {
          console.log(data);
          map.add(that.getMarker(data.position.lat, data.position.lng));
        }

        function onError(data) {
          console.log(data);
        }
      });
      console.log(map.getCenter());
      //解析定位错误信息
    },
    getMarker(lat, lng) {
      var marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png",
        offset: new AMap.Pixel(-10, -10),
        position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "我的位置"
      });
      return marker;
    }
  }
};
</script>
<style scoped="">
#container {
  width: 100%;
  height: 100%;
  position: absolute;
}

.bottom {
  position: absolute;
  bottom: 1rem;
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

.kk1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6.346667rem;
  height: 6.346667rem;
  background: rgba(102, 102, 102, 0.1);
  border-radius: 50%;
  z-index: 999;
}
.kk2 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4.68rem;
  height: 4.68rem;
  background: rgba(102, 102, 102, 0.1);
  border-radius: 50%;
  z-index: 9999;
}
.kk3 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2.986667rem;
  height: 2.986667rem;
  background: rgba(102, 102, 102, 0.1);
  border-radius: 50%;
  z-index: 99999;
}

.amap-icon {
  z-index: 99999 !important;
}

.form{
    width: 6.5rem;
    margin: 0 auto;
}

.sure{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
    border: none;
    outline: none;
    width:2.666667rem;
height:1.066667rem;
background:#48CBB7;
border-radius:.133333rem;
}

.quxiao{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
    border: none;
    outline: none;
    width:2.666667rem;
height:1.066667rem;
background:#48CBB7;
border-radius:.133333rem;
}
</style>

