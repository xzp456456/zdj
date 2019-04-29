<template>
  <div>
    <div class="search">
      <div class="row">
        <div class="left address" @click="navgateTo('city')">
          厦门
          <img class="xz" src="@/assets/xz.png" alt srcset>
        </div>
        <div class="left border"></div>
        <div class="left searchInput">
          <input type="text" placeholder="请输入代驾目的地" class="searchTap">
        </div>
        <div class="left quxiao">取消</div>
      </div>
    </div>
    <div class="item">
        <div class="list">
            <div class="row">
                <div class="name">西亭村</div>
            <div class="area">厦门市集美区</div>
            </div>
        </div>
        <div class="list">
            <div class="row">
                <div class="name">西亭村</div>
            <div class="area">厦门市集美区</div>
            </div>
        </div>
        <div class="list">
            <div class="row">
                <div class="name">西亭村</div>
            <div class="area">厦门市集美区</div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    methods:{
        navgateTo(url){
            this.$router.push(url)
        }
    }
};
</script>

<style scoped="">
.search {
  width: 100%;
  height: 1.386667rem;
  line-height: 1.386667rem;
  border-bottom: 1px solid #dddddd;
}
.address {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  
}

.searchTap {
  border: none;
  margin-left: 0.233333rem;
  width: 6rem;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
}

.xz {
  width: 0.24rem;
  height: 0.133333rem;
}

.border{
    width:1px;
height:.426667rem;
background:rgba(221,221,221,1);
margin-right:0.1rem;
margin-left:0.4rem;
margin-top: .506667rem;

}

.quxiao {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.name{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
padding-top: .393333rem;
padding-bottom: 0.1rem;
}

.area{
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
}

.list{
    width: 100%;
    height: 1.88rem;
    border-bottom: 1px solid #dddddd;
}
</style>

