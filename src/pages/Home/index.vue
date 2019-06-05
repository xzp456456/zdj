<template>
  <div class="map">
    <div class="header">
      <div class="top">
        <img class="yhmin left" @click="getUserShow(1)" src="@/assets/yh.png" alt srcset>
        <span>张代驾</span>
      </div>
    </div>
    <div id="container"></div>
    <div class="meizf" v-show="showId==1">
      <div class="moban">
        <img class="gth" src="@/assets/gth.png" alt srcset>
        <div class="textInfo">
          <div class="v-text">您当前存在未支付订单</div>
          <div class="v-text">请先进行支付</div>
        </div>
        <div class="pay" @click="navgateTo('order')">马上支付</div>
      </div>
    </div>
    <div class="meizf" v-show="showId==2">
      <div class="moban">
        <img class="gth" src="@/assets/gth.png" alt srcset>
        <div class="textInfo">
          <div class="v-text">您当前存在待接订单</div>
          <!-- <div class="v-text">请先进行支付</div> -->
        </div>
        <div class="pay" @click="navgateTo('wait')">马上进入</div>
      </div>
    </div>
    <div class="meizf" v-show="showId==3">
      <div class="moban">
        <img class="gth" src="@/assets/gth.png" alt srcset>
        <div class="textInfo">
          <div class="v-text">您当前存在进行中订单</div>
          <!-- <div class="v-text">请先进行支付</div> -->
        </div>
        <div class="pay" @click="changeToNavgate()">马上进入</div>
      </div>
    </div>
    <div class="maker">
      
      <div class="address">
        <img class="diand" src="@/assets/weqw.png" alt="" srcset="">
        <input
          type="text"
          placeholder="请输入当前位置"
          :value="origin_name"
          @click="navgateTo('address',1)"
        >
        <input
          type="text"
          placeholder="请输入目的地"
          :value="destination_name"
          @click="navgateTo('address',0)"
        >
      </div>
      <div class="price" v-if="priceShow==1">
        <div class="money">
          约
          <span>{{estimate_trip_price}}</span>元
          <img class="jt" src="@/assets/jt.png" alt srcset>
        </div>
        <div class="yhz">优惠券已抵扣{{discount}}元</div>
      </div>
      <div class="btn-pd">
        <v-button @actionClick="sure()">确认下单</v-button>
      </div>
    </div>
    <div class="lving" v-show="showUser==1" @click="getUserShow(0)">
      <div class="user" @click.stop>
        <div class="head">
          <img class="yh left" :src="userInfo.avatar" alt srcset>
          <div class="left mobile">{{userInfo.mobile}}</div>
        </div>
        <div class="menu">
          <div class="menu_list" @click="navgateTo('notCompleted')">
            <div class="rowma">
              <img class="or" src="@/assets/zd.png" alt srcset>
              订单
            </div>
          </div>
          <div class="menu_list" @click="navgateTo('myAccount')">
            <div class="rowma">
              <img class="or" src="@/assets/zh.png" alt srcset>
              账户
            </div>
          </div>
          <div class="menu_list" @click="navgateTo('serverCenter')">
            <div class="rowma">
              <img class="or" src="@/assets/fx.png" alt srcset>
              客服
            </div>
          </div>
          <div class="menu_list" @click="navgateTo('share')">
            <div class="rowma">
              <img class="or" src="@/assets/ewq.png" alt srcset>
              分享
            </div>
          </div>
          <div class="menu_list" @click="navgateTo('setup')">
            <div class="rowma">
              <img class="or" src="@/assets/zd.png" alt srcset>
              设置
            </div>
          </div>
        </div>
        <div class="jf" @click="navgateTo('rule')">
          计费规则
          <span>
            <img class="jt" src="@/assets/jt.png" alt srcset>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      showUser: 0,
      showId: 0,
      destination_name: "",
      userInfo: {},
      origin_name: "",
      destination_longitude: "",
      destination_latitude: "",
      destination_name: "",
      origin_longitude: "",
      origin_latitude: "",
      estimate_trip_price: "",
     discount:'',
      priceShow: 0,
      wx:{}
    };
  },
  created() {
    this.recharge();
    this.getWxInfo()
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    
    this.index();
    this.getConfigByLngLat();
    this.getUserInfo();
    if (localStorage.getItem("en_changeAddress")) {
      this.destination_name = localStorage.getItem("destination_name");
      this.destination_longitude = localStorage.getItem(
        "destination_longitude"
      );
      this.destination_latitude = localStorage.getItem("destination_latitude");
    } else {
      this.destination_longitude = "";
      this.destination_latitude = "";
      this.destination_name = "";
    }
    // localStorage.removeItem('en_changeAddress');
    this.getOrderMeta();
  },
  mounted() {
   this.getMap()
  },
  methods: {
    getMap(){
       var marker = "";
    var that = this;
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    map.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
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
        console.log(data);
        marker = new AMap.Marker({
           icon:new AMap.Icon({            
            image:"http://zhangdj.yxsoft.net/assets/my.png",
            size:new AMap.Size(47, 61),  //图标大小
            imageSize: new AMap.Size(47,61)
        }), 
          offset: new AMap.Pixel(-20, -40),
           size: new AMap.Size(11,11),
          position: new AMap.LngLat(data.position.lng, data.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "我的位置",
          draggable: true
        });
         marker.setLabel({
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: "<div class='info'>我的位置</div>", //设置文本标注内容
            direction: 'top' //设置文本标注方位
        });
        localStorage.setItem(
          "mylocation",
          data.position.lng + "," + data.position.lat
        );
        if (localStorage.getItem("changeAddress")) {
          var o_location = localStorage.getItem("location");
          that.origin_longitude = o_location.split(",")[0];
          that.origin_latitude = o_location.split(",")[1];
        } else {
          var o_location = data.position.lng + "," + data.position.lat;
          that.origin_longitude = data.position.lng;
          that.origin_latitude = data.position.lat;
        }
        that.getAddressName(o_location).then(res => {
          //console.log(res);
          localStorage.setItem("city", res.regeocode.addressComponent.city);
          that.origin_name = res.regeocode.formatted_address;
          localStorage.removeItem("changeAddress");
        });
        marker.on("dragend", function(res) {
          var location = res.lnglat.lng + "," + res.lnglat.lat;
          that.origin_longitude = res.lnglat.lng;
          that.origin_latitude = res.lnglat.lat;
          that.getAddressName(location).then(res => {
            that.origin_name = res.regeocode.formatted_address;
             if (that.destination_name != "") {
            that.estimateTripPrice()
             }
          });
        });
        map.add(marker);
        that.getMasker(data.position.lng, data.position.lat).then(res => {
          let list = res.data.list;
          list.forEach((item, index) => {
            map.add(that.getMaskerIcon(item.longitude, item.latitude));
          });
        });
        Indicator.close();
        if (that.destination_name != "") {
          that.estimateTripPrice();
        }
      }

      function onError(data) {
        console.log(data);
        that.Toast({
          message: "定位失败",
          duration: 1000
        });
      }
    });
    },
    recharge(){
      this.$postAjax('/api/pay/recharge',{
        amount:1,
        pay_way:'jswxpay'
      }).then(res=>{
        if(res.status==10000){
         // location.href = res.data.url;
        }
      })
    },
    getWxInfo(){
      
        let data = {url:location.href}
      this.$postAjax('/api/wx_oauth/getWxInfo',data)
      .then(res=>{
        console.log(res);
        this.wx = res.data;
        this.getWxConfig(res.data.appId,res.data.timestamp,res.data.nonceStr,res.data.signature)
      })
  
      
    },
    getWxConfig(appId,timestamp,nonceStr,signature){
      var that = this;
      console.log({appId,timestamp,nonceStr,signature})
      wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature,// 必填，签名
          jsApiList: ['getLocation','openLocation'] // 必填，需要使用的JS接口列表
      });
      wx.ready(function(){
         wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              console.log(res)
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                
            }
        });
      });
    },
    estimateTripPrice() {
      let data = {
        origin_longitude: this.origin_longitude,
        origin_latitude: this.origin_latitude,
        destination_longitude: this.destination_longitude,
        destination_latitude: this.destination_latitude
      };
      this.$postAjax("/api/finance/estimateTripPrice", data).then(res => {
        console.log(res);
        if (res.status) {
          this.estimate_trip_price = res.data.estimate_trip_price;
          this.discount = res.data.discount
          this.priceShow = 1;
        } else {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
        }
      });
    },
    navgateTo(url, id) {
      this.$router.push(url);
      localStorage.setItem("select_id", id);
    },
    getToken(url) {
      if (!localStorage.getItem("access_token")) {
        this.navgateTo("login");
      } else {
        this.$router.push(url);
      }
    },
    getAddressName(location) {
      return new Promise((resolve, reject) => {
        let data = {
          location: location,
          key: "5d36d977b287953b8e7037325b1085bf"
        };
        this.$getAjax("http://restapi.amap.com/v3/geocode/regeo", data).then(
          res => {
            resolve(res);
          }
        );
      });
    },
    getMasker(lng, lat) {
      return new Promise((resolve, reject) => {
        let data = { longitude: lng, latitude: lat };
        this.$postAjax("/api/driver/getNearDriver", data).then(res => {
          resolve(res);
        });
      });
    },
    getMaskerIcon(lng, lat) {
      var device = new AMap.Marker({
         icon:new AMap.Icon({            
            image:"http://zhangdj.yxsoft.net/assets/we.png",
            size:new AMap.Size(47, 61),  //图标大小
            imageSize: new AMap.Size(47,61)
        }),      
        offset: new AMap.Pixel(-20, -40),
        position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "附近司机位置",
        draggable: false
      });
       device.setLabel({
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: "<div class='info'>附近司机位置</div>", //设置文本标注内容
            direction: 'top' //设置文本标注方位
        });
      return device;
    },
    getUserInfo() {
      this.$postAjax("/api/user/getUserInfo", {}).then(res => {
        this.userInfo = res.data;
        localStorage.setItem("header_img", res.data.avatar);
      });
    },
    getOrder() {
      localStorage.setItem("origin_longitude", this.origin_longitude);
      localStorage.setItem("origin_latitude", this.origin_latitude);
      localStorage.setItem("origin_name", this.origin_name);
      localStorage.setItem("destination_longitude", this.destination_longitude);
      localStorage.setItem("destination_latitude", this.destination_latitude);
      localStorage.setItem("origin_longitude", this.origin_longitude);
      let data = {
        origin_longitude: this.origin_longitude,
        origin_latitude: this.origin_latitude,
        origin_name: this.origin_name,
        destination_longitude: this.destination_longitude,
        destination_latitude: this.destination_latitude,
        destination_name: this.destination_name,
        is_add_price: 0
      };
      this.$postAjax("/api/trip/createTrip", data).then(res => {
        console.log(res);
        localStorage.setItem("trip_id", res.data.trip_id);
        if (res.status == 1) {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
          setTimeout(() => {
            this.$router.push("wait");
          }, 1000);
        } else if (res.status == -1) {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
          localStorage.setItem("msg", res.msg);
          localStorage.setItem("add_price_desc", res.data.add_price_desc);
          setTimeout(() => {
            this.$router.push("freePage");
          }, 1000);
        } else {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
        }
      });
    },
    sure(){
      this.getLanger()
      .then(res=>{
        if(res.route.paths[0].distance>1000){
          localStorage.setItem('yl_long',this.origin_longitude+','+this.origin_latitude);
          this.$router.push('surePage');
        }else{
          this.getOrder()
        }
      })
    },
    getOrderMeta() {
      this.$postAjax("/api/trip/getUnDoneTripId", {}).then(res => {
        //console.log(res);
        if (res.data.trip_id != 0) {
          localStorage.setItem("trip_id", res.data.trip_id);
          this.getOderInfo(res.data.trip_id);
        } else {
          //  this.Toast({
          //    message: res.msg,
          //   duration:1000
          // })
        }
      });
    },
    getLanger() {
      return new Promise((resolve,reject)=>{
        this.$getAjax(
        "https://restapi.amap.com/v3/direction/walking?origin=" +
          localStorage.getItem("mylocation") +
          "&destination=" +
         this.origin_longitude +','+this.origin_latitude+
          "&&key=5d36d977b287953b8e7037325b1085bf"
      ).then(res => {
        console.log(res);
        
        resolve(res)
      });
      })
      
    },
    getUserShow(id) {
      if (!localStorage.getItem("access_token")) {
        this.$router.push("login");
      }
      this.showUser = id;
    },
    changeToNavgate() {
      var id = localStorage.getItem("order_status");
      if (id == 1 || id == 2 || id == 3) {
        this.navgateTo("success");
      }
      if (id == 4) {
        this.navgateTo("underway");
      }
      if (id == 5) {
        this.navgateTo("order");
      }
    },
    getConfigByLngLat() {
      this.$postAjax("/api/config/getConfigByLngLat", {}).then(res => {
        let auto_order_cancel_time =
          parseInt(res.data.auto_order_cancel_time) * 60;
        localStorage.setItem("auto_order_cancel_time", auto_order_cancel_time);
      });
    },
    index() {
      this.$postAjax("/api/index/index", {}).then(res => {
        localStorage.setItem("im_service_id", res.data.im_service_id);
      });
    },
    getOderInfo(id) {
      this.$postAjax("/api/trip/tripInfo", { trip_id: id }).then(res => {
        localStorage.setItem('driver_uid',res.data.driver_uid);
        if (res.data.status == 5) {
          this.showId = 1;
        }
        if (res.data.status == 0) {
          this.showId = 2;
        }
        if (
          res.data.status == 1 ||
          res.data.status == 2 ||
          res.data.status == 3 ||
          res.data.status == 4
        ) {
          this.showId = 3;
        }
        localStorage.setItem("order_status", res.data.status);
      });
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">

.diand{
  width: .186667rem;
  position: absolute;
  top: 0.65rem;
  left: 0.35rem;
}
.header {
  width: 100%;
  background-color: white;
  height: 1.3rem;
  text-align: center;
  line-height: 1.3rem;
  box-shadow: 0px 0.08rem 0.2rem 1px rgba(185, 185, 185, 0.3);
}
.header img {
  margin-top: 0.2rem;
  margin-left: 0.266667rem;
}

.header span {
  width: 3rem;
  display: block;
  text-align: center;
  margin: 0 auto;
}

.top {
  font-size: 0.453333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.yhmin {
  width: 0.766667rem;
  height: 0.766667rem;
}
.amap {
  width: 100%;
  height: 100%;
  position: absolute;
}
.jt {
  width: 0.186667rem;
  height: 0.333333rem;
  float: right;
}

.jf {
  position: absolute;
  bottom: 0.5rem;
  width: 4rem;
  margin-right: 0.1rem;
  text-align: center;
}

.menu {
  clear: both;
}
.or {
  width: 0.373333rem;
  height: 0.373333rem;
}

.menu_list {
  height: 1rem;
  line-height: 1rem;
}

.menu_list img {
  position: relative;
  top: 0.07rem;
}

.rowma {
  width: 90%;
  margin: 0 auto;
}

.yh {
  width: 1.2rem;
  height: 1.2rem;
  margin: 0.233333rem;
}

.mobile {
  font-size: 0.4rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.496667rem;
}

.lving {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
}

.user {
  width: 5rem;
  background-color: white;
  height: 100%;
}

.gth {
  width: 0.906667rem;
  height: 0.906667rem;
  margin-top: 0.366667rem;
}
.meizf {
  /* display: none; */
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  z-index: 999999;
}

.jt {
  width: 0.213333rem;
  height: 0.373333rem;
  position: relative;
  top: 0.01rem;
  left: 0.2rem;
}

.textInfo {
  width: 100%;
  height: 1.853333rem;
  border-bottom: 1px solid rgba(221, 221, 221, 0.4);
}

.v-text {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  margin-top: 0.203333rem;
  color: rgba(51, 51, 51, 1);
}

.price {
  text-align: center;
  width: 9.04rem;
  height: 1.666667rem;
  background-color: white;
}

.money {
  border-top: 1px solid rgba(221, 221, 221, 0.6);
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  width: 8rem;
  margin: 0 auto;
  padding-top: 0.233333rem;
}

.money span {
  font-weight: bold;
  font-size: 0.5rem;
}

.yhz {
  width: 8rem;
  margin: 0 auto;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.pay {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
  padding-top: 0.266667rem;
}

.moban {
  width: 6.68rem;
  height: 4.56rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.133333rem;
  margin: 0 auto;
  margin-top: 3rem;
  text-align: center;
}

#container {
  width: 100%;
  height: 100%;
  position: absolute;
}

.maker {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 99;
}

.address {
  width: 9.04rem;
  height: 2.266667rem;
  background: rgba(251, 251, 251, 1);
  box-shadow: 0px 0.08rem 0.2rem 1px rgba(185, 185, 185, 0.3);
  border-radius: 0.133333rem;
  margin: 0 auto;
  padding-top: 0.033333rem;
}

.address input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  width: 7.5rem;
  display: block;
  margin: 0 auto;
  margin-top: 0.406667rem;
}

.btn-pd {
  margin-top: 0.533333rem;
  margin-bottom: 1.33333rem;
}
</style>

