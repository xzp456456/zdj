<template>
  <div>
    
    <div class="title">
      <div class="row">未完成订单</div>
    </div>
    <div class="item" v-for="(item,index) in list" :key="index"  @click="navgateTo('orderDetails',item.trip_id,item.current_price)">
      <div class="all" v-if="item.is_finish==0">
      <div class="list" >
        <div class="row">
          <span class="left time">{{item.create_time}}</span>
          <span class="right ing">{{item.status_desc}}</span>
        </div>
      </div>
      <div class="list">
        <div class="row clear">
          <span class="left wen wen1"><img class="dz" src="@/assets/dz.png" />出发地：{{item.origin_name}}</span>
          <span class="right mun">
            <!-- 17张 -->
            <img class="jt" src="@/assets/jt.png" alt srcset>
          </span> 
        </div>
      </div>
      <div class="list">
        <div class="row">
          <span class="left wen wen2"><img class="dz" src="@/assets/dz.png" />目的地：{{item.destination_name}}</span>
           </div>
      </div>
      <div class="mar"></div>
      </div>
    </div>
    <div class="title" style="border-bottom:none;">
      <div class="row">已完成订单</div>
    </div>
     <div class="all" v-for="(item,index) in list" :key="'k'+index"  >
       <div v-if="item.is_finish==1">
     <div class="list">
        <div class="row clear">
          <span class="left time">{{item.create_time}}</span>
          <span class="right ing">{{item.status_desc}}</span>
        </div>
        
      </div>
      <div class="list">
        <div class="row">
          <span class="left wen wen1"><img class="dz" src="@/assets/dz.png" />出发地：{{item.origin_name}}</span>
          <span class="right mun">
         
            <img class="jt" src="@/assets/jt.png" alt srcset>
          </span>
        </div>
      </div>
       <div class="list">
        <div class="row">
          <span class="left wen wen2"><img class="dz" src="@/assets/dz.png" />目的地：{{item.destination_name}}</span>
          <span class="right mun">
           
          </span>
        </div>
      </div>
      <div class="border"></div>
      </div>
      </div>
      <!-- <div class="all">
     <div class="list">
        <div class="row">
          <span class="left time">02月28日 14:07</span>
          <span class="right ing">已取消</span>
        </div>
        
      </div>
      <div class="list">
        <div class="row">
          <span class="left wen"><img class="dz" src="@/assets/dz.png" />优惠券</span>
          <span class="right mun">
            
            <img class="jt" src="@/assets/jt.png" alt srcset>
          </span>
        </div>
      </div>
       <div class="list">
        <div class="row">
          <span class="left wen"><img class="dz" src="@/assets/dz.png" />优惠券</span>
          <span class="right mun">
          
           
          </span>
        </div>
      </div>
       <div class="border"></div>
       </div> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:[],
      vlist:[],
      page:1,
      page_size:10
    }
  },
  created(){
    this.getOrder();
  },
  methods:{
    getOrder(){
      let data = {page:this.page,page_size:this.page_size }
      this.$postAjax('/api/trip/getMyList',data)
      .then(res=>{
        this.list = res.data.list;
        this.vlist = res.data.list;
      })
    },
    getStatus(id){
      this.$postAjax('/api/trip/getMyList',{trip_id:id})
      .then(res=>{
        if(res.data.status){

        }
      })
    },
    navgateTo(url,id,current_price){
      this.$router.push(url);
      localStorage.setItem('trip_id_info',id);
      localStorage.setItem('current_price',current_price);
    }
  }
};
</script>
<style scoped="">
.dz{
  width:.266667rem;
height:.346667rem;
margin-right: .133333rem;
position: relative;
top: 0.04rem;
}

.clear{
  clear: both;
}
.mar{
  width: 100%;
  height:.24rem;
background:rgba(221,221,221,1);
opacity:0.4;
clear: both;
}
.jt {
  width: 0.16rem;
  height: 0.306667rem;
}

.border{
  height: 1px;
  background: #dddddd;
}

.wen {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1) !important;
  
}

.wen1{
  padding-top:0.5rem; 
}

.wen2{
  padding-bottom:0.5rem; 
}

.num {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.title {
  width: 100%;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  height: 1.306667rem;
  line-height: 1.306667rem;
  border-bottom: 1px solid #dddddd;
}

.item{
  clear: both;
 
}

.list {
  width: 100%;
}

.time {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  padding-top:0.6rem; 
}

.ing {
  font-size: 0.32rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(72, 203, 183, 1);
   padding-top:0.6rem; 
}
</style>

