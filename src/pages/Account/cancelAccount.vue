<template>
  <div>
    <div class="title row">注销原因</div>
    <div class="kgs">
      <textarea class="kg" placeholder="请输入注销原因" v-model="reason"></textarea>
    </div>
    <div class="main">
      <div class="row">
        <div class="text">温馨提示：</div>
        <div class="text">注销后，所有的信息将清空，请谨慎操作！</div>
      </div>
    </div>
    <div class="row mar">
      <button class="centel">取消</button>
      <button class="read"  @click="deletes()">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      reason:''
    }
  },
  methods:{
    deletes(){
      this.$postAjax('/api/user/delete',{reason:this.reason})
      .then(res=>{
        if(res.status){
            this.Toast({
            message: res.msg,
            duration:1000
          });
          setTimeout(()=>{
            this.$router.push('login');
          },1000)
        }else{
           this.Toast({
            message: res.msg,
            duration:1000
          });
        }
      })
    }
  }
};
</script>
<style scoped="">
.centel {
  width: 4.266667rem;
  height: 1.173333rem;
  float: left;
  background: #48cbb7;
  border-radius: 0.133333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  outline: none;
  border: none;
}

.mar{
    margin-top: 0.5rem;
}

.read {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  width: 4.266667rem;
  height: 1.173333rem;
  float: right;
  background: #cccccc;
  border-radius: 0.133333rem;
  outline: none;
  border: none;
}

.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  height: 1.2rem;
  line-height: 1.2rem;
}

.text {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.2rem;
}

.kgs {
  width: 9.04rem;
  margin: 0 auto;
}

.kg {
  padding: 0.2rem;
  width: 9.04rem;
  resize: none;
  height: 4rem;
  border: 1px solid rgba(221, 221, 221, 0.4);
  border-radius: 0.133333rem;
  margin: 0 auto;
}
</style>
