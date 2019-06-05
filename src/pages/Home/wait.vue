<template>
  <div class="map">
    <div id="container"></div>
    <!-- <div class="kk1">
      <div class="kk2">
        <div class="kk3"></div>
      </div>
    </div> -->

    <div class="bottom">
      <!-- <div class="or">已等待 00 : 04</div> -->
      <div class="or">已等待 {{createTripWaitTime}}s</div>
      <div class="wait">正在为您寻找司机，请耐心等待</div>
      <v-button myclass="wid"  v-if="wait==0" @actionClick="cancel()">取消代驾</v-button>
     <div class="form" v-if="wait==1">
         <button class="quxiao left" @click="select(0)">继续等待</button>
         <button class="sure right" @click="addMoney()">同意加价</button>
     </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
import {IM} from '@/util/public'
export default {
    data(){
        return{
            wait:0,
            createTripWaitTime:0,
            waitTime:'',
            d1:'',
            d2:''
        }
    },
    created(){
    this.waitTime =  setInterval(()=>{
        this.waitOrderInfo();
      },1000)
    },
    destroyed(){
      clearInterval(this.waitTime);
      sessionStorage.removeItem('contunte')
    },
  components: {
    "v-button": Button
  },
  mounted() {
    this.getOldTime()
    .then(res=>{
      this.setTimeInit()
    })
    this.getMap();
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
          if(message.content.extra=='DriverTakeOrder'){
              that.Toast({
             message: '司机接到乘客',
            duration:1000
          })
          that.$router.replace('success');
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
  methods: {
    select(wait){
        this.wait = wait;
        sessionStorage.setItem('contunte',1);
    },
    cancel(){
      this.navgateTo('pail')
    },
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
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true      //显示定位按钮，默认：true   //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(-10, -10), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
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
        icon:new AMap.Icon({            
            image:"http://zhangdj.yxsoft.net/assets/my.png",
            size:new AMap.Size(47, 61),  //图标大小
            imageSize: new AMap.Size(47,61)
        }), 
        offset: new AMap.Pixel(-20, -40),
        position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "我的位置"
      });
       marker.setLabel({
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: "<div class='info'>我的位置</div>", //设置文本标注内容
            direction: 'top' //设置文本标注方位
        });
      return marker;
    },
    waitOrderInfo(){
      this.$postAjax('/api/trip/waitOrderInfo',{trip_id:localStorage.getItem('trip_id')})
      .then(res=>{
        if(this.is_close==1){
          this.$router.replace('cancel');
        }
        //this.createTripWaitTime = res.data.createTripWaitTime;
        this.is_close = res.data.is_close;
          this.remind_add_price = res.data.remind_add_price;
           if(this.remind_add_price==1){
             if(!sessionStorage.getItem('contunte')){
          this.wait = 1;
             }else{
                this.wait = 0;
             }
        }else{
          this.wait = 0;
        }
      })
    },
    getOldTime(){
      return new Promise((reslove,reject)=>{
        this.$postAjax('/api/trip/waitOrderInfo',{trip_id:localStorage.getItem('trip_id')})
      .then(res=>{
        this.createTripWaitTime = res.data.createTripWaitTime;
        reslove(res)
      })
      })
      
    },
    setTimeInit(){
      setInterval(()=>{
        this.createTripWaitTime=this.createTripWaitTime+1;
      },1000)
    },
    addMoney(){
      this.$postAjax('/api/trip/addPriceTrip',{trip_id:localStorage.getItem('trip_id')})
      .then(res=>{
        if(res.status){
          this.wait = 0;
           this.Toast({
            message: res.msg,
            duration: 1000
          });
        }else{
           this.Toast({
            message: res.msg,
            duration: 1000
          });
        }
      })
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

