<template>
  <div>
    <div class="navgate">
      <div class="row">
        <span class="left"><</span> 系统消息
      </div>
    </div>
    <div class="title">【福利】XXXXXXXXXXXXXX!</div>
    <div class="time">2019-09-21 14:00</div>
    <div class="item">
      <div class="list" v-for="(item,index) in list" :key="index">
        <div class="row">
          <div class="name">{{item.title}}</div>
          <div class="desc">
            {{item.content}}
          </div>
        </div>
      </div>
      <div class="list">
        <div class="row">
          <div class="name">这是一条消息</div>
          <div class="desc">
            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXXXXX
          </div>
        </div>
      </div>
      <div class="list">
        <div class="row">
          <div class="name">这是一条消息</div>
          <div class="desc">
            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXXXXX
          </div>
        </div>
      </div>
    </div>
    <div class="more">没有更多了~</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
        page:0,
        page_size:10,
        list:[]
    }
  },
  created(){
    this.getReport()
  },
  methods:{
      getReport(){
        let data = {page:this.page,page_size:this.page_size}
        this.$postAjax('/api/msg/getList',data)
        .then(res=>{
          //console.log(res)
            this.list = res.data.list
        })
      }
  }
};
</script>
<style scoped="">
.navgate {
  width: 100%;
  height: 1.32rem;
  line-height: 1.32rem;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #dddddd;
}

.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  padding: 0.493333rem 0;
}

.time {
  text-align: center;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}

.item {
  padding-top: 0.666667rem;
}

.list {
  font-size: 0.346667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.more {
  position: absolute;
  width: 100%;
  bottom: 0.5rem;
  font-size: 0.32rem;
  text-align: center;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}
</style>
