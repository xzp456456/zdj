<template>
  <div>
    <div class="bar">
      <div class="title row">请选择取消原因，我们将努力改善</div>
    </div>
    <div class="item">
      <div :class="index==activeIndex?'list active':'list'" v-for="(item,index) in reason" :key="index" @click="select(index,item.reason_id,item.reason)">
        <div class="row">{{item.reason}}</div>
      </div>
    </div>
    <div class="text row">其他</div>
    <div class="othe row">
      <textarea class="desc" v-model="reason_other"></textarea>
    </div>
    <div class="bottom">
      <div class="btn">
        <v-button @actionClick="formReason()">提交</v-button>
      </div>
      <div class="btn">
        <v-button myclass="bgcolor" @actionClick="navgateTo('/')">返回</v-button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  data(){
    return{
      reason:[],
      activeIndex:0,
      reason_id:'',
      reason_other:''
    }
  },
  created(){
    this.getReason();
  },
  methods:{
    select(index,reason_id,reason){
      this.activeIndex = index;
      this.reason_id = reason_id;
      localStorage.setItem('reason',reason)
    },
    getReason(){
      this.$postAjax('/api/trip/getTripCancelReason',{type:2})
      .then(res=>{
        //console.log(res.data);
        this.reason = res.data;
      })
    },
    navgateTo(url){
      this.$router.push(url)
    },
    formReason(){
      let data = {trip_id:localStorage.getItem('trip_id'),reason_id:this.reason_id,reason_other:this.reason_other}
      this.$postAjax('/api/trip/tripCancelReasonSubmit',data)
      .then(res=>{
          if(res.status){
             this.Toast({
            message: res.msg,
            duration:1000
          })
          localStorage.removeItem('kongkai_id');
          
         setTimeout(()=>{
            this.$router.replace('cancelSure')
         },1000)
          }else{
             this.Toast({
            message: res.msg,
            duration:1000
          })
          }
      })
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.text{
  height: 1rem;
  line-height: 1rem;
  font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}
.desc{
  width:100%;
height:1.906667rem;
border:2px solid rgba(221,221,221,1);
opacity:0.4;
border-radius:.133333rem;
  resize: none;
}
.othe{
  margin-top: 0.1rem;
}

.title {
  height: 1.333333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 1.333333rem;
}

.list {
  width: 100%;
  height: 1.333333rem;
  border-bottom: 1px solid #e1e1e1;
  line-height: 1.333333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.active {
  background-color: #48cbb7;
  color: rgba(255, 255, 255, 1);
}

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
}

.btn {
  margin-bottom: 0.366667rem;
}
</style>
