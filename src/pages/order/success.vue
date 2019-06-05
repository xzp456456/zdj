<template>
  <div class="map">
    <div id="container"></div>
    <div class="bottom">
      <div class="row mag">
        <img class="moren left" :src="driver.avatar" alt srcset>
        <div class="left mlf">
          <span class="name">{{driver.realname}}</span>
          <span class="pj">
            <img class="xinxing" src="@/assets/xinxing.png" alt srcset>
            {{driver.driver_star}}
          </span>
          <div class="lin">代驾{{driver.drive_times}}次 驾龄{{driver.driver_years}}</div>
        </div>
        <div class="right">
          <img class="line" @click="navgateTo('serverUser')" src="@/assets/duanxin.png" alt srcset>
          <a :href="'tel:'+driver.mobile">
            <img class="mobile" src="@/assets/dianhua.png" alt srcset>
          </a>
        </div>
      </div>
      <v-button myclass="wid" @actionClick="cancel()">取消代驾</v-button>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  data() {
    return {
      wait: 0,
      driver: {},
      map: "",
      getDevice:''
    };
  },
  destroyed(){
    clearInterval(this.getDevice)
  },
  components: {
    "v-button": Button
  },
  mounted() {
    
    var that = this;
    this.getLatLng().then(longs=>{
         var lng = longs.data.driver_longitude;
    var lat = longs.data.driver_latitude;
    var marker_my = '';
    
    var map = new AMap.Map("container", {
      zoom: 15, //设置地图显示的缩放级别
      center: [lng, lat] //设置地图中心点坐标
    });
    
    var marker_sj = new AMap.Marker({
         icon:new AMap.Icon({            
            image:"http://zhangdj.yxsoft.net/assets/we.png",
            size:new AMap.Size(47, 61),  //图标大小
            imageSize: new AMap.Size(47,61)
        }), 
        offset: new AMap.Pixel(-10, -10),
        position: new AMap.LngLat(lng,lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "司机当前位置"
      });
       marker_sj.setLabel({
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: "<div class='info'>司机位置</div>", //设置文本标注内容
            direction: 'top' //设置文本标注方位
        });
      map.add(marker_sj);
    map.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        var marker_my = new AMap.Marker({
        icon:new AMap.Icon({            
            image:"http://zhangdj.yxsoft.net/assets/my.png",
            size:new AMap.Size(47, 61),  //图标大小
            imageSize: new AMap.Size(47,61)
        }), 
        offset: new AMap.Pixel(-20, -40),
        position: new AMap.LngLat(data.position.lng, data.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "我的位置"
      });
        marker_my.setLabel({
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: "<div class='info'>我的位置</div>", //设置文本标注内容
            direction: 'top' //设置文本标注方位
        });
        map.add(marker_my);
        var lnglat = new AMap.LngLat(data.position.lng,data.position.lat);
        marker_my.moveTo(lnglat,500,(k)=>{
          return k
    })
      }

      function onError(data) {
        // 定位出错
      }
    });
   that.getDevice = setInterval(()=>{
      this.getLatLng().then(res=>{
        var lnglat = new AMap.LngLat(res.data.driver_longitude,res.data.driver_latitude);
        marker_sj.moveTo(lnglat,500,(k)=>{
          return k
    })
      })
    
    },10000)
    
    })
    var that = this;
      RongIMLib.RongIMClient.init('25wehl3u2g0qw');
        RongIMClient.setConnectionStatusListener({
       onChanged: function (status) {
           // status 标识当前连接状态
           console.log(status);
           switch (status) {
               case RongIMLib.ConnectionStatus.CONNECTED:
                   console.log('链接成功');
                   break;
               case RongIMLib.ConnectionStatus.CONNECTING:
                   console.log('正在链接');
                   break;
               case RongIMLib.ConnectionStatus.DISCONNECTED:
                   console.log('断开连接');
                   break;
               case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                   console.log('其他设备登录');
                   break;
               case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                   console.log('域名不正确');
                   break;
               case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                   console.log('网络不可用');
                   break;
           }
       }
   });
   RongIMClient.setOnReceiveMessageListener({
       // 接收到的消息
       onReceived: function (message) {
           // 判断消息类型
           console.log(message);
           if(message.content.extra=='TripStart'){
              that.Toast({
             message: '司机接到乘客',
            duration:1000
          })
          that.$router.replace('underway');
           }
          
           switch(message.messageType){
               case RongIMClient.MessageType.TextMessage:
                   // message.content.content => 文字内容
                   break;
               case RongIMClient.MessageType.VoiceMessage:
                   // message.content.content => 格式为 AMR 的音频 base64
                   break;
               case RongIMClient.MessageType.ImageMessage:
                   // message.content.content => 图片缩略图 base64
                   // message.content.imageUri => 原图 URL
                   break;
               case RongIMClient.MessageType.LocationMessage:
                   // message.content.latiude => 纬度
                   // message.content.longitude => 经度
                   // message.content.content => 位置图片 base64
                   break;
               case RongIMClient.MessageType.RichContentMessage:
                   // message.content.content => 文本消息内容
                   // message.content.imageUri => 图片 base64
                   // message.content.url => 原图 URL
                   break;
               case RongIMClient.MessageType.InformationNotificationMessage:
                   // do something
                   break;
               case RongIMClient.MessageType.ContactNotificationMessage:
                   // do something
                   break;
               case RongIMClient.MessageType.ProfileNotificationMessage:
                   // do something
                   break;
               case RongIMClient.MessageType.CommandNotificationMessage:
                   // do something
                   break;
               case RongIMClient.MessageType.CommandMessage:
                   // do something
                   break;
               case RongIMClient.MessageType.UnknownMessage:
                   // do something
                   break;
               default:
                   // do something
           }
       }
   });
   var token = localStorage.getItem('im_token');
   
   RongIMClient.connect(token, {
       onSuccess: function(userId) {
           console.log('Connect successfully. ' + userId);
       },
       onTokenIncorrect: function() {
           //console.log('token 无效');
       },
       onError: function(errorCode){
           var info = '';
           switch (errorCode) {
               case RongIMLib.ErrorCode.TIMEOUT:
                   info = '超时';
                   break;
               case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                   info = '不可接受的协议版本';
                   break;
               case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                   info = 'appkey不正确';
                   break;
               case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                   info = '服务器不可用';
                   break;
           }
           //console.log(info);
       }
   });
   var callback = {
       onSuccess: function(userId) {
           console.log('Reconnect successfully. ' + userId);
       },
       onTokenIncorrect: function() {
           console.log('token无效');
       },
       onError: function(errorCode){
           console.log(errorcode);
       }
   };
   var config = {
       // 默认 false, true 启用自动重连，启用则为必选参数
       auto: true,
       // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
       url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
       // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
       rate: [100, 1000, 3000, 6000, 10000]
   };
   RongIMClient.reconnect(callback, config);
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    cancel() {
      this.$router.push('pail')
    },
    navgateChange(url){
      this.$router.push(url);
    },
    navgateTo(url) {
      this.setUserInfo();
      this.$router.push(url);
    },
    setUserInfo() {
      localStorage.setItem("driver", this.driver.realname);
      var id = localStorage.getItem('driver_uid')
      localStorage.setItem("targetId", id);
    },
    getUserInfo() {
      this.$postAjax("/api/user/getUserInfo", { obj_uid: 3 }).then(res => {
        console.log(res);
        this.driver = res.data;
      });
    },
    getLatLng(){
      return new Promise((reslove,reject)=>{
        this.$postAjax('/api/trip/tripInfo',{trip_id:localStorage.getItem('trip_id')})
      .then(res=>{
          reslove(res);
      })
      })
      
    }
  }
};
</script>
<style scoped="">
.change{
  position: fixed;
  bottom: 5rem;
  right: 0.5rem;
  background-color: white;
  width: 0.8rem;
  height: 0.8rem;
  /* border-radius:50%;  */
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
</style>

