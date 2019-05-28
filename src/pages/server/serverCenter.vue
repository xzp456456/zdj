<template>
  <div class="server">
    <div class="order" @click="navgateTo('recentOrders')">
      <div class="row">
        <span class="left on">最近订单</span>
        <span class="right all">
          全部
          <img class="jt" src="@/assets/jt.png" alt srcset>
        </span>
      </div>
    </div>
    <div>
    <div>
      <div class="row time">{{list[0].create_time}}</div>
    </div>
    <div class="mode">
      <div class="row list">
        <img class="dz" src="@/assets/dz.png" alt srcset>
        <span>代驾出发地:{{list[0].origin_name}}</span>
      </div>
      <div class="row list">
        <img class="dz" src="@/assets/dz.png" alt srcset>
        <span>代驾出发地:{{list[0].destination_name}}</span>
      </div>
      <div class="ab">
        <button @click="navgateTo('appeal',id)">我要投诉</button>
      </div>
    </div>
    </div>
    <div class="pd"></div>
    <div class="order">
      <div class="row">
        <span class="left on">投诉反馈</span>
      </div>
    </div>
    <div class="order" style="border:none" @click="navgateTo('messageCenter')">
      <div class="row">
        <span class="left on">
          <img class="sl" src="@/assets/sl.png" alt srcset> 投诉进度
        </span>
        <span class="right all">
          1条投诉进度
          <img class="jt" src="@/assets/jt.png" alt srcset>
        </span>
      </div>
    </div>
    <div class="pd"></div>
    <div class="order">
      <div class="row">
        <span class="left on">常见问题</span>
      </div>
    </div>
    <div class="iger">
      <div class="main" v-for="(item,index) in problem" :key="index">
        <div class="row">
          <div class="left user">
            <img class="yh" src="@/assets/yh.png" alt srcset>
            <div class="account">{{item.cate_name}}</div>
            <img  src="@/assets/xiajiantou.png" :class="indexImg[index]==1?'up xia':'xia'" @click="showDiv('show'+index,index)"  alt srcset>
          </div>
          <div class="left disn">
            <div class="rh" v-for="(list,i) in item.faq"  :class="item.faq.length==1?'mag':''"  v-show="i<2" :ref="'show'+index" :key="i">{{list.answer}}</div>

          </div>
        </div>
      </div>
    
    </div>
    <div class="row we">
     <a :href="'tel:'+info.service_tel"><button class="phone left">电话客服</button></a>
      <button class="line right" @click="navgateTo('serverUser')">在线客服</button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:[{}],
      info:{},
      problem:[],
      length:'',
      indexImg:[]
    }
  },
  created(){
    this.getOrder();
    this. getProblem();
    
  },
  mounted(){
    console.log(this.$refs)
  },
  methods:{
    navgateTo(url,id){
      this.$router.push(url);
      localStorage.setItem('trip_id_ts',id)
    },
    getOrder(){
      let data = {
        page:1,
        page_size:10
      }
      this.$postAjax('/api/trip/getMyList',data)
      .then(res=>{
        this.list = res.data.list;

      })
    },
    getMsgIndex(){
      this.$postAjax('/api/index/index',{})
      .then(res=>{
        this.info = res.data;
      })
    },
    getProblem(){
      this.$postAjax('/api/faq/getList',{})
      .then(res=>{
        console.log(res)
        this.problem = res.data;
        this.problem.forEach((item,index)=>{
          this.indexImg[index] = 0; 
        })
        
      })
    },
    showDiv(ref,index){
      if(this.indexImg[index] == 0){
        this.indexImg[index] = 1;
      }else{
        this.indexImg[index] = 0;
      }
      console.log( this.indexImg)
      var id = this.$refs[ref];
      id.forEach((item,index)=>{
        if(index>1){
          if(this.$refs[ref][index].style.display=='none'){
            this.$refs[ref][index].style.display='block';
          }else{
            this.$refs[ref][index].style.display='none';
          }
          
        }
      })
      
    }
  }
};
</script>
<style scoped="">
.mag{
  margin-top: 0.6rem
}
.we {
  padding-top: 0.5rem;
  margin-bottom: 2rem;
   border-top: 1px solid #dddddd;
  clear: both;
}
.phone {
  width: 4.266667rem;
  height: 0.88rem;
  background: #48cbb7;
  border-radius: 0.133333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  outline: none;
  border: none;
}
.line {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  width: 4.266667rem;
  outline: none;
  border: none;
  height: 0.88rem;
  background: #48cbb7;
  border-radius: 0.133333rem;
}

.yh {
  width: 0.72rem;
  height: 0.72rem;
}
.dz {
  width: 0.266667rem;
  height: 0.346667rem;
}

.main {
  border-bottom: 1px solid #dddddd;
  clear: both;
}

.user {
  margin-top: 0.4rem;
  width: 2rem;
  text-align: center;
  font-size: 0.373333rem;
  height: 2.153333rem;
}

.ck {
  width: 6.5rem;
  height: 1rem;
  line-height: 1rem;
  padding-left: 0.5rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.rh {
  width: 6.5rem;
  padding-left: 0.5rem;
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  border-top: 1px solid #dddddd;
  border-left:1px solid #dddddd;
}

.rh:first-child{
   border-top:none;
}

.disn{
  display: inline-block;
}

.account {
  margin: 0.2rem 0;
}

.user img {
  display: block;
  margin: 0 auto;
}

.xia {
  width: 0.333333rem;
  height: 0.186667rem;
}

.sl {
  width: 0.293333rem;
  height: 0.373333rem;
}

.mode {
  position: relative;
}
.jt {
  width: 0.16rem;
  height: 0.306667rem;
  margin-left: 0.3rem;
}

.list {
  width: 6.5rem;
  display: block;
  margin: 0;
  margin-left: 0.4rem;
  padding-bottom: 0.5rem;
}

.ab {
  position: absolute;
  right: 1rem;
  bottom: 1.5rem;
}

.pd {
  width: 100%;
  height: 0.24rem;
  background: rgba(221, 221, 221, 1);
  opacity: 0.4;
}

.ab button {
  width: 1.733333rem;
  height: 0.773333rem;
  background: rgba(72, 203, 183, 1);
  border-radius: 0.133333rem;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border: none;
  outline: none;
}

.time {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  height: 1.333333rem;
  line-height: 1.333333rem;
}

.all {
  color: #999999;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
}

.on {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.order {
  /* border-bottom: 1px solid #dddddd; */
  width: 100%;
  height: 1.333333rem;
  line-height: 1.333333rem;
}

.up{
  transform: rotate(180deg) !important;
}
</style>
