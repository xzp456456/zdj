<template>
  <div class="message">
    <div>
      <div class="title">{{driver.name}}</div>
      <!-- <div class="time">2019-09-21 14:00</div> -->
    </div>
    <div class="item">
      <div class="list" v-for="(item,index) in  success_message" :key="index">
        <div class="row" v-if="item.id==2">
          <img class="header left" src="@/assets/header.png" alt srcset>
          <div class="desc left">{{item.content}}</div>
        </div>
        <div class="row" v-else>
          <img class="header right" :src="avatar" alt srcset>
          <div class="desc right text-right">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="biaoqing" style="display:none">
      <div class="view left" v-for="(item,index) in list" :key="index">{{item.emoji}}</div>
    </div>
    <div class="call">
        <div class="dom"></div>
      <div class="mg">
        <input type="text" placeholder="输入" v-model="message" class="content">
        <img class="bc" src="@/assets/bc.png" alt srcset>
        <button class="send" @click="send()">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
import { sendMessage, RyMI, callHistory } from "@/util/public";
export default {
  data() {
    return {
      message: "",
      success_message: [],
      targetId: "1",
      driver: {},
      list: "",
      avatar: ""
    };
  },
  created() {
    this.avatar = localStorage.getItem("header_img");
    this.driver.name = localStorage.getItem("driver");
  },
  mounted() {
    var that = this;
    RongIMLib.RongIMClient.init("25wehl3u2g0qw");
    RongIMClient.setConnectionStatusListener({
      onChanged: function(status) {
        // status 标识当前连接状态
        //console.log(status);
        switch (status) {
          case RongIMLib.ConnectionStatus.CONNECTED:
            //console.log('链接成功');
            break;
          case RongIMLib.ConnectionStatus.CONNECTING:
            //console.log('正在链接');
            break;
          case RongIMLib.ConnectionStatus.DISCONNECTED:
            //console.log('断开连接');
            break;
          case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
            //console.log('其他设备登录');
            break;
          case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
            //console.log('域名不正确');
            break;
          case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
            //console.log('网络不可用');
            break;
        }
      }
    });
    RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: function(message) {
        // 判断消息类型
        console.log(message);
        that.success_message.push({ content: message.content.content, id: 2 });
        switch (message.messageType) {
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
    var token = localStorage.getItem("im_token");

    RongIMClient.connect(token, {
      onSuccess: function(userId) {
        //console.log('Connect successfully. ' + userId);
      },
      onTokenIncorrect: function() {
        //console.log('token 无效');
      },
      onError: function(errorCode) {
        var info = "";
        switch (errorCode) {
          case RongIMLib.ErrorCode.TIMEOUT:
            info = "超时";
            break;
          case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
            info = "不可接受的协议版本";
            break;
          case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
            info = "appkey不正确";
            break;
          case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
            info = "服务器不可用";
            break;
        }
        //console.log(info);
      }
    });
    var callback = {
      onSuccess: function(userId) {
        //console.log('Reconnect successfully. ' + userId);
      },
      onTokenIncorrect: function() {
        //console.log('token无效');
      },
      onError: function(errorCode) {
        //console.log(errorcode);
      }
    };
    var config = {
      // 默认 false, true 启用自动重连，启用则为必选参数
      auto: true,
      // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
      url: "cdn.ronghub.com/RongIMLib-2.2.6.min.js",
      // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
      rate: [100, 1000, 3000, 6000, 10000]
    };
    RongIMClient.reconnect(callback, config);
    var config = {
      size: 24, // 大小, 默认 24, 建议18 - 58
      url: "//f2e.cn.ronghub.com/sdk/emoji-48.png", // Emoji 背景图片
      lang: "zh", // Emoji 对应名称语言, 默认 zh
      // 扩展表情
      extension: {
        dataSource: {
          u1F914: {
            en: "thinking face", // 英文名称
            zh: "思考", // 中文名称
            tag: "🤔", // 原生 Emoji
            position: "0 0" // 所在背景图位置坐标
          }
        },
        url: "//cdn.ronghub.com/thinking-face.png" // 新增 Emoji 背景图 url
      }
    };
    RongIMLib.RongIMEmoji.init(config);
    var list = RongIMLib.RongIMEmoji.list;
    this.list = list;
  },
  methods: {
    send() {
      var that = this;
      var msg_mode = this.message;
      var target_id = this.targetId;
      var msg = new RongIMLib.TextMessage({
        content: msg_mode,
        extra: "附加信息"
      });
      var conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的消息类型即可
      var targetId = localStorage.getItem("driver_uid"); // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function(message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          //console.log('Send successfully');
          that.success_message.push({
            content: message.content.content,
            id: 1
          });
        },
        onError: function(errorCode, message) {
          var info = "";
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = "超时";
              break;
            case RongIMLib.ErrorCode.UNKNOWN:
              info = "未知错误";
              break;
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
              info = "在黑名单中，无法向对方发送消息";
              break;
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
              info = "不在讨论组中";
              break;
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
              info = "不在群组中";
              break;
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
              info = "不在聊天室中";
              break;
          }
          //console.log('发送失败: ' + info + errorCode);
        }
      });
    },
    getDriverUser() {
      this.$postAjax("/api/trip/checkInTrip", {
        driver_uid: localStorage.getItem("driver_uid"),
        uid: localStorage.getItem("uid")
      }).then(res => {
        if (res.data.in_trip == 1) {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
        } else {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
        }
      });
    }
  }
};
</script>
<style scoped="">
.dom{
    position: absolute;
     height: 1.306667rem;
  width: 100%;
  z-index: 999;
  bottom: 0;
}
.biaoqing {
  width: 9rem;
  height: 3rem;
  position: fixed;
  bottom: 1.5rem;
  border: 1px solid black;
}
.header {
  width: 1.2rem;
  height: 1.2rem;
}
.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  height: 1.333333rem;
  line-height: 1.333333rem;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #dddddd;
}

.text-right {
  text-align: right;
  margin-right: 0.266667rem;
}

.message {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.time {
  font-size: 0.32rem;
  text-align: center;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
  margin-top: 0.266667rem;
}

.list {
  clear: both;
  padding-top: 0.7rem;
}

.call {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1.306667rem;
  width: 100%;
  z-index: 9999;
  border-top: 1px solid #dddddd;
  background: rgba(255, 255, 255, 1);
}

.bc {
  width: 0.64rem;
  height: 0.64rem;
  position: relative;
  top: 0.196667rem;
  margin-right: 0.1rem;
}

.desc {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.366667rem;
  padding-left: 0.133333rem;
  width: 7rem;
  word-wrap: break-word;
}
.content {
  width: 6.453333rem;
  height: 0.8rem;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(221, 221, 221, 0.4);
  border-radius: 0.133333rem;
  padding-left: 0.4rem;
}

.send {
  width: 1.093333rem;
  height: 0.8rem;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(221, 221, 221, 0.4);
  border-radius: 0.133333rem;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.mg {
  margin: 0.166667rem 0.4rem;
}
</style>
