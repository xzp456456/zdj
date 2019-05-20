<template>
  <div>
    <div class="bar">
      <div class="title row">请选择取消原因，我们将努力改善</div>
    </div>
    <div class="item">
      <div :class="index==activeIndex?'list active':'list'" v-for="(item,index) in reason" :key="index" @click="select(index,item.reason_id)">
        <div class="row">{{item.reason}}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="btn">
        <v-button>提交</v-button>
      </div>
      <div class="btn">
        <v-button myclass="bgcolor">返回</v-button>
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
      reason_id:''
    }
  },
  created(){
    this.getReason();
  },
  methods:{
    select(index,reason_id){
      this.activeIndex = index;
      this.reason_id = reason_id;
    },
    getReason(){
      this.$postAjax('/api/trip/getTripCancelReason',{type:2})
      .then(res=>{
        //console.log(res.data);
        this.reason = res.data;
      })
    },
    formReason(trip_id,reason_id,reason_other){
      this.$postAjax('/api/trip/tripCancelReasonSubmit',{trip_id,reason_id,reason_other})
      .then(res=>{
        //console.log(res);
      })
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
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
