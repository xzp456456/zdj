<template>
  <div>
    <div class="item">
      <div class="row mk">
        <label for>持卡人：</label>
        <input type="text" class="form" placeholder="请输入持卡人姓名">
      </div>
      <div class="row mk">
        <label for>银行卡号：</label>
        <input type="text" class="form" placeholder="请输入银行卡号">
      </div>
      <div class="row mk" id="singleLinePicker">
        <label for>银行名称：</label>
        <input
          type="text"
          class="form"
          placeholder="请输入银行名称"
          :value="info.cardName"
          @click="getPicker()"
        >
      </div>
      <div class="row mk">
        <label for>预留号码：</label>
        <input type="text" class="form" placeholder="请输入预留号码">
      </div>
      <div class="row mk">
        <label for>验证码：</label>
        <input type="text" class="code" placeholder="请输入验证码">
        <button class="getcode">获取验证码</button>
      </div>
    </div>
    <div class="btns">
      <div class="btn">
        <v-button>提交</v-button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  data() {
    return {
      idCardName: [],
      info: {}
    };
  },
  created() {
    this.getIdCardName();
  },
  methods: {
    // {
    //     label: '飞机票',
    //     value: 0,
    //     disabled: true // 不可用
    // }
    getIdCardName() {
      this.$postAjax("/api/index/getBankList", {}).then(res => {
        let item = res.data.list;
        let card = item.map((item, index) => {
          return { label: item, value: index };
        });
        this.idCardName = card;
      });
    },
    getPicker() {
      var that = this;
      this.weui.picker(this.idCardName, {
        className: "custom-classname",
        container: "body",
        onChange: result => {},
        onConfirm: result => {
          this.$set(that.info,'cardName',result[0].label)
          
        },
        id: "singleLinePicker"
      });
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.row {
  width: 9.6rem;
}
label {
  display: inline-block;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  width: 1.9rem;
  color: rgba(51, 51, 51, 1);
}

.form {
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 0.133333rem;
  width: 7rem;
  height: 0.96rem;
  padding-left: 0.2rem;
  margin-top: 0.5rem;
}

.getcode {
  width: 2.346667rem;
  height: 0.96rem;
  background: rgba(72, 203, 183, 1);
  border-radius: 0.133333rem;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  outline: none;
  border: none;
  margin-left: 0.1rem;
}

.code {
  margin-top: 0.5rem;
  width: 4.52rem;
  height: 0.96rem;
  padding-left: 0.2rem;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 0.133333rem;
}
.btns {
  position: absolute;
  bottom: 0.6rem;
  width: 100%;
}

.btn {
  width: 100%;
}
</style>
