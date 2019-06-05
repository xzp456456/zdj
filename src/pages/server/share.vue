<template>
<div>
  <div class="body">
    <div class="navBar">
      <div class="nav" :class="changeid==0?'active':''" @click="change(0)">推荐好友</div>
      <div class="nav"  :class="changeid==1?'active':''"  @click="change(1)">推荐司机</div>
    </div>
    <div id="qrcode1" v-show="changeid==0"></div>
    <div id="qrcode2" v-show="changeid==1"></div>
  </div>
  <div class="shares">
        <div class="share">
        <div class="left pd"><img class="wx" src="@/assets/weq.png" alt="" @click="onMenuShareTimeline()" srcset=""></div>
        <div class="left pd"><img class="wx" src="@/assets/pen.png" @click="onMenuShareAppMessage()" alt="" srcset=""></div>
        <div class="left pd"><img class="wx" src="@/assets/qq2.png" @click="onMenuShareQQ()" alt="" srcset=""></div>
        </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data(){
    return{
      changeid:0,
      info:{}
    }
  },
  created(){
    
  },
  mounted(){
    this.getWxInfo();
    this.changeQrcode()
  },
  methods:{
    change(id){
      this.changeid = id;
    },
    getShare(){
      return new Promise((reslove,reject)=>{
        this.$postAjax('/api/share/index',{})
      .then(res=>{
        console.log(res)
        this.info = res.data;
        reslove(res);
      })
      })
      
    },
    changeQrcode(){
      this.getShare().then(()=>{
      this.qrcode()
    })
    },
     getWxInfo(){
      
        let data = {url:window.location.href.split('#')[0]}
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
          jsApiList: ['checkJsApi','onMenuShareAppMessage','onMenuShareQQ','onMenuShareTimeline'] // 必填，需要使用的JS接口列表
      });
      wx.ready(function(){
        wx.checkJsApi({
    jsApiList: ['onMenuShareAppMessage','onMenuShareQQ','onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
        console.log(res)
    }
    })
      })
    },
    onMenuShareAppMessage(){
        var that = this;
    
    wx.onMenuShareAppMessage({
    title: that.info.user_share_title, // 分享标题
    desc: that.info.user_share_summary, // 分享描述
    link: that.info.user_share_url, // 分享链接
    imgUrl: that.user_share_icon, // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后执行的回调函数
         console.log('ok')
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
           console.log('err')
    }
  
});
    },
    onMenuShareQQ(){
        wx.onMenuShareQQ({
    title: 'dsadsa', // 分享标题
    desc: 'dksakd', // 分享描述
    link: 'https://www.baidu.com', // 分享链接
    imgUrl: 'https://p.ssl.qhimg.com/dmsmty/74_74_100/t0150f888bb2ae2f3ee.png', // 分享图标
    success: function () {
       // 用户确认分享后执行的回调函数
        console.log('ok')
    },
    cancel: function () {
       // 用户取消分享后执行的回调函数
         console.log('err')
    }
    
})
  
      
    },
    onMenuShareTimeline(){
           console.log(3)
       var that = this;
     
      wx.onMenuShareTimeline({
    title: that.info.user_share_title, // 分享标题
    link: that.info.user_share_url, // 分享链接，该链接域名必须与当前企业的可信域名一致
    imgUrl: that.info.user_share_icon, // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
        console.log('ok')
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
          console.log('err')
    }

})
    },
     qrcode() {
      let domWidth = document.body.clientWidth / 3.1;
        var url1 = this.info.user_share_url;
        var url2 = this.info.driver_share_url;
      let qrcode1 = new QRCode("qrcode1", {
        width: domWidth,
        height: domWidth, // 高度
        colorDark: "#000000",
        colorLight: "#ffffff",
        text: url1
      });
      let qrcode2 = new QRCode("qrcode2", {
        width: domWidth,
        height: domWidth, // 高度
        colorDark: "#000000",
        colorLight: "#ffffff",
        text: url2
      });
    },
  }
};
</script>
<style scoped="">
#qrcode1{
  width: 3.226667rem;
  height: 3.226667rem;
  border: .133333rem solid white;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%,-50%)
}

#qrcode2{
  width: 3.226667rem;
  height: 3.226667rem;
  border: .133333rem solid white;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%,-50%)
}

#qrcode img{
  width: 100%;
}

.body {
  position: relative;
  width: 100%;
  height: 13.053333rem;
  background: url(../../assets/bg.png);
  background-size: 100%;
}

.shares{
    clear: both;
    width: 100%;
    margin: 0 auto;
    margin-top: 1.293333rem;
}

.share{
    clear: both;
    width: 9rem;
    margin: 0 auto;
}

.wx{
    width: 1.2rem;
}

.navBar {
  width: 100%;
  height: 1.333333rem;
  line-height: 1.333333rem;
  background: transparent;
  border-bottom: 1px solid #dddddd;
}
.active {
  border-bottom: 2px solid #48cbb7;
}

.pd{
    margin:0 0.8rem;
}

.nav {
  float: left;
  width: 50%;
  text-align: center;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: white;
}
</style>
