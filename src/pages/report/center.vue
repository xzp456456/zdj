<template>
  <div>
    <div class="navBar">
      <div class="left nav" :class="infoId==0?'active':''"  @click=" change(0)">系统消息</div>
      <div class="right nav" :class="infoId==1?'active':''" @click="change(1)">对话</div>
    </div>
    <div v-show="infoId==0">
    <div class="item" v-for="(item,index) in list" :key="index">
      <div class="row">
        <div class="list" >
          <span class="left title">{{item.title}}</span>
          <span class="right time">{{item.on_time}}</span>
        </div>
        <div class="desc">
          {{item.content}}
        </div>
      </div>
    </div>
</div>
<div v-show="infoId==1">
  <div class="item" v-for="(item,index) in userList" :key="index" >
      <div class="row">
        <div class="list" >
          <div class="left pd"><img class="header left" src="@/assets/header.png" alt="" srcset="">
          <div class="left">
          <div class="title">{{item.targetId}}</div>
          <div class="desc">
          
        </div>
        </div>
          </div>
      
          <div class="right time">{{item.on_time}}</div>
        
        </div>
        
      </div>
    </div>
</div>
  </div>
</template>
<script>
import { RyMI } from '@/util/public'
export default {
  data(){
    return{
      infoId:0,
        page:0,
        page_size:10,
        list:[],
        userList:{}
    }
  },
  created(){
    this.getReport();
    this.getUserList();
  },
  methods:{
    change(id){
      this.infoId = id;
    },
      getReport(){
        let data = {page:this.page,page_size:this.page_size}
        this.$postAjax('/api/msg/getList',data)
        .then(res=>{
          //console.log(res)
            this.list = res.data.list
        })
      },
      getUserList(){
        RyMI().then(res=>{
          this.userList = res;
        })
      }
  }
};
</script>
<style scoped="">

.header{
  width: 1.266667rem;
  height: 1.266667rem;
  display: inline-block;
  margin-right: .266667rem;
}
.navBar {
  width: 100%;
  height: 1.333333rem;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
}

.nav {
  width: 49%;
  text-align: center;
  height: 1.323333rem;
  line-height: 1.3333333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  border-right: 1px solid rgba(221, 221, 221, 1);
}

.active {
  border-bottom: 0.053333rem solid rgba(72, 203, 183, 1);
}

.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.list {
  padding-bottom: 0.24rem;
}

.item {
  width: 100%;
  height: 2.3rem;
  padding-top: 0.4rem;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
}

.time {
  font-size: 0.346667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}

.desc {
  /* width: 5.613333rem; */
  font-size: 0.346667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  clear: both;
}
</style>
