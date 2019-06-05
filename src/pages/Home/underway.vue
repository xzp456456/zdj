<template>
  <div class="map">
    <div id="container"></div>
    <div class="change"><img src="@/assets/changemid.png"  @click="navgateTo('changeway')"   alt="" srcset=""></div>
    <div class="bottom">
      <div class="title">行程中，请系好安全带</div>
      <div class="current_price">当前{{current_price}}元</div>
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
      lng:'',
      getDevice:'',
      current_price:0
    };
  },
  components: {
    "v-button": Button
  },
  created(){
    this.getDeviceInfo()
  },
  destroyed(){
    clearInterval(this.getDevice);
  },
  mounted() {
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
           if(message.content.extra=='TripEnd'){
              that.Toast({
             message: '订单完成',
            duration:1000
          })
          that.$router.replace('order');
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
    
    getDeviceInfo(){
      let data = { obj_uid:localStorage.getItem('driver_uid') }
      this.$postAjax('/api/user/getUserInfo',data)
      .then(res=>{
        console.log(res);
        this.device = res.data;
      })
    },
    settargetId(){
      var id = localStorage.getItem('driver_uid');
      localStorage.setItem('driver',this.device.realname);
      localStorage.setItem('targetId',id)
    },
    navgateTo(url) {
      
      this.settargetId();
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
        icon:new AMap.Icon({            
            image:"http://zhangdj.yxsoft.net/assets/we.png",
            size:new AMap.Size(47, 61),  //图标大小
            imageSize: new AMap.Size(47,61)
        }), 
       offset: new AMap.Pixel(-20, -40),
        position: new AMap.LngLat(that.lng, that.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "我的位置"
      });
      marker.setLabel({
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: "<div class='info'>我的位置</div>", //设置文本标注内容
            direction: 'top' //设置文本标注方位
        });
          map.add(marker);
         
          that.getDevice = setInterval(()=>{
                that.getLagLng().then(res=>{
                    var lnglat = new AMap.LngLat(res.data.driver_longitude,res.data.driver_latitude);
                      marker.moveTo(lnglat,500,(k)=>{
                        return k
                      })
                })
            },5000)
      })
      
     
    },
    getLagLng(){
      return new Promise((reslove,reject)=>{
        let data = {trip_id:localStorage.getItem('trip_id')};
        this.$postAjax('/api/trip/tripInfo',data)
        .then(res=>{
          this.current_price = res.data.current_price;
          reslove(res);
          
        })
      })
    }
  }
};
</script>
<style scoped="">
.current_price{
  text-align: center;
}
.change{
  position: fixed;
  bottom: 3.3rem;
  right: 0.3rem;
  
  z-index: 99999;
}

.change img{
  width:2rem;
  height: 2rem;
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

