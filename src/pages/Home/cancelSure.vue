<template>
  <div class="map">
    <div class="header">
      <div class="row">
      <span class="left"><img class="back" @click="navgateTo('/')" src="@/assets/de.png" alt="" srcset=""></span>
      <span class="right" @click="navgateTo('serverUser')">在线客服</span>
      </div>
    </div>
    <div id="container"></div>

    <div class="bottom">
      <div class="row mag">
        <img class="moren left" :src="device.avatar" alt srcset>
        <div class="left mlf">
          <span class="name">{{device.realname}}</span>
          <div class="lin">叫代驾{{device.drive_times}}次</div>
        </div>
      </div>
      <div class="textCenter">
        <div class="text">行程已取消</div>
        <div class="kh">02月27日 14:07 客户主动取消</div>
        <div class="qx" @click="navgateTo('rule')">
          <img class="gth" src="@/assets/gth.png" alt srcset>
          取消规则
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
      reason:{},
      device:{}
    };
  },
  components: {
    "v-button": Button
  },
  created(){
    this.getReason();
    this.getUserInfo();
  },
  mounted() {
    this.getMap();
  },
  methods: {
    getUserInfo(){
      this.$postAjax('/api/user/getUserInfo',{obj_uid:localStorage.getItem('uid')})
      .then(res=>{
        console.log(res)
        this.device = res.data;
      })

    },
    setTallId(){
      var id = localStorage.getItem('im_service_id');
      localStorage.setItem('tall_id',id)
    },
    navgateTo(url) {
      this.$router.push(url);
    },
    getReason(){
      this.$postAjax('/api/trip/getTripCancelReason',{type:2})
      .then(res=>{
        //console.log(res.data);
        this.reason = res.data;
      })
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
          showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true      //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
        function onComplete(data) {
          //console.log(data);
          map.add(that.getMarker(data.position.lat, data.position.lng));
        }

        function onError(data) {
          //console.log(data);
        }
      });
      //console.log(map.getCenter());
      //解析定位错误信息
    },
    getMarker(lat, lng) {
      var marker = new AMap.Marker({
        icon: "http://zhangdj.yxsoft.net/assets/my.png",
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
.back{
  width: .24rem;
  transform: rotate(-180deg);
  position: relative;
  top:0.1rem;
}
.header{
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
}
.textCenter {
  text-align: center;
}
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
  height: 4.906667rem;
  width: 100%;
  z-index: 999;
  background-color: white;
}

.gth {
  width: 0.373333rem;
  height: 0.373333rem;
  position: relative;
  top: 0.05rem;
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

.textCenter {
  border-top: 1px solid #e1e1e1;
}

.text {
  font-size: 0.426667rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.5rem;
}

.kh {
  font-size: 0.346667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  padding: 0.266667rem 0;
}
.qx {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}
</style>

