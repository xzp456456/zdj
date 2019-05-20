<template>
  <div class="map">
    <div class="header">
      <div class="top">
        <img class="yhmin left" @click="getUserShow(1)" src="@/assets/yh.png" alt srcset>
        <span>张代驾</span>
      </div>
    </div>
    <div class="amap-page-container">
      <div class="amap">
        <el-amap vid="amap" :plugin="plugin"  :amap-manager="amapManager"  class="amap-demo">
          <el-amap-marker
            v-for="(marker, index) in markers"
            :key="index"
            vid="markers"
            :position="marker.position"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :label="marker.label"
          ></el-amap-marker>
        </el-amap>
      </div>
      <div class="toolbar">
        <span v-if="loaded">location: lng = {{ lng }} lat = {{ lat }}</span>
        <span v-else>正在定位</span>
      </div>
    </div>
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
    <div class="maker">
      <div class="address">
        <input type="text" placeholder="请输入当前位置" :value="origin_name" @click="navgateTo('address',1)">
        <input
          type="text"
          placeholder="请输入目的地"
          :value="destination_name"
          @click="navgateTo('address',0)"
        >
      </div>
      <div class="price">
        <div class="money">
          约
          <span>30.00</span>元
          <img class="jt" src="@/assets/jt.png" alt srcset>
        </div>
        <div class="yhz">优惠券已抵扣5.00元</div>
      </div>
      <div class="btn-pd">
        <v-button @actionClick="getOrder()">确认下单</v-button>
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
        <div class="jf">
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
import { AMapManager } from 'vue-amap';
let amapManager = new AMapManager();
import Button from "@/components/Button";
export default {
  data() {
    const self = this;
    return {
      showUser: 0,
      showId: 0,
      destination_name: "",
      userInfo: {},
      origin_name: "",
      label: [],
      markers: [],
      center: [0, 0],
      lng: 0,
      lat: 0,
      loaded: false,
      amapManager:amapManager,
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: "all",
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例

              o.getCurrentPosition((status, result) => {
                //console.log(result);
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  localStorage.setItem("yl_location", result.position.lng+','+result.position.lat);
                  if(localStorage.getItem('changeAddress')!=1){
                  localStorage.setItem("location", result.position.lng+','+result.position.lat);
                  }
                  self.loaded = true;
                  self.icon =
                    "https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png";
                  // self.$nextTick();

                  self.geocoder(result.position.lng, result.position.lat);
                  self.getMasker().then(res => {
                    let items = res.data.list;
                    var lab = [];
                    var markerItem = items.map((item, index) => {
                      return {
                        position: [
                          parseFloat(item.longitude),
                          parseFloat(item.latitude)
                        ],
                        visible: true,
                        draggable: false
                      };
                    });
                    var markerItem = items.map((item, index) => {
                      return {
                        position: [
                          parseFloat(item.longitude),
                          parseFloat(item.latitude)
                        ],
                        visible: true,
                        draggable: false,
                        label: { content: "附近司机", offset: [0, 20] }
                      };
                    });
                    markerItem.push({
                      position: [self.lng, self.lat],
                      visible: true,
                      draggable: true,
                      label: { content: "我的位置", offset: [0, 20] }
                    });
                    self.label = lab;
                    self.markers = markerItem;
                    self.$nextTick();
                  });
                }
              });
            }
          }
        }
      ]
    };
  },
  created() {
    this.getUserInfo();
    this.destination_name = localStorage.getItem("destination_name");
  //  this.getOrderMeta();
  },
  mounted() {
     
  },
  methods: {
    //地址搜索经纬度
    getAddressJW(address) {
      return new Promise((resolve,reject)=>{
        this.$getAjax('https://restapi.amap.com/v3/geocode/geo?address='+address+'&key=5d36d977b287953b8e7037325b1085bf')
        .then(res=>{
            //console.log(res);

        })
      })
    },
    geocoder(lnglatX, lnglatY) {
      var geocoder = new AMap.Geocoder({
        radius: 1000 //范围，默认：500
      });
      ////console.log([lnglatX, lnglatY]);
      geocoder.getAddress([lnglatX, lnglatY], (status, result) => {
        if (status === "complete" && result.info === "OK") {
          ////console.log(result);
          localStorage.setItem("city", result.regeocode.addressComponent.city);
          if(localStorage.getItem('changeAddress')==1){
            this.origin_name = localStorage.getItem('origin_name');
          }else{
            this.origin_name = result.regeocode.formattedAddress;
          }
          localStorage.setItem('changeAddress',0);
          this.getAddressJW(this.origin_name);
        }
      });
    },
    changeNow(e) {
      this.origin_name = e.target.value;
    },
    navgateTo(url,id) {
      this.$router.push(url);
      localStorage.setItem('select_id',id);
    },
    getToken(url) {
      if (!localStorage.getItem("access_token")) {
        this.navgateTo("login");
      } else {
        this.$router.push(url);
      }
    },
    getMasker() {
      return new Promise((resolve, reject) => {
        let data = { longitude: this.lng, latitude: this.lat };
        this.$postAjax("/api/driver/getNearDriver", data).then(res => {
          resolve(res);
        });
      });
    },
    getUserInfo() {
      this.$postAjax("/api/user/getUserInfo", {}).then(res => {
        this.userInfo = res.data;
      });
    },
    getOrder() {
        localStorage.setItem('origin_name',this.origin_name);
        this.getToken("surePage");
      
      
    },
    getOrderMeta() {
      this.$postAjax("/api/trip/getUnDoneTripId", {}).then(res => {
        //console.log(res);
        if (res.data.trip_id != 0) {
          this.showId = 1;
          localStorage.setItem("trip_id", res.data.trip_id);
        } else {
          this.showId = 0;
        }
      });
    },
    getUserShow(id) {
      this.showUser = id;
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
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
  width: 8rem;
  display: block;
  margin: 0 auto;
  margin-top: 0.406667rem;
}

.btn-pd {
  margin-top: 0.533333rem;
  margin-bottom: 1.33333rem;
}
</style>

