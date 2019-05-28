<template>
  <div>
    <!-- <div class="list">
            <div class="row">
        <div class="time">
            2月26日 18:30
        </div>
        <div class="all">
        <div class="dj">
            <img class="dz" src="@/assets/dz.png" alt="" srcset="">
            <span>代驾出发地</span>
        </div>
        <div class="dj">
            <img class="dz" src="@/assets/dz.png" alt="" srcset="">
            <span>代驾出发地</span>
        </div>
        </div>
        </div>
        <div class="btns">
            <button class="btn">我要投诉</button>
        </div>
        </div>
        <div class="list">
            <div class="row">
        <div class="time">
            2月26日 18:30
        </div>
        <div class="all">
        <div class="dj">
            <img class="dz" src="@/assets/dz.png" alt="" srcset="">
            <span>代驾出发地</span>
        </div>
        <div class="dj">
            <img class="dz" src="@/assets/dz.png" alt="" srcset="">
            <span>代驾出发地</span>
        </div>
        </div>
        </div>
        <div class="btns">
            <button class="btn">我要投诉</button>
        </div>
    </div>-->
    <div class="list" v-for="(item,index) in list" :key="index">
      <div class="row">
        <div class="time">{{item.create_time}}</div>
        <div class="all">
          <div class="dj">
            <img class="dz" src="@/assets/dz.png" alt srcset>
            <span>代驾出发地:{{item.origin_name}}</span>
          </div>
          <div class="dj">
            <img class="dz" src="@/assets/dz.png" alt srcset>
            <span>代驾目的地:{{item.destination_name}}</span>
          </div>
        </div>
      </div>
      <div class="btns">
        <button class="btn" @click="navgateTo('appeal',item.trip_id)">我要投诉</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      page: 1,
      pages_size: 10
    };
  },
  created() {
    this.getMyList();
  },
  methods: {
      navgateTo(url,id){
          this.$router.push(url);
          localStorage.setItem('trip_id_ts',id)
      },
    getMyList() {
      let data = { page: this.page, pages_size: this.pages_size };
      this.$postAjax("/api/trip/getMyList", data).then(res => {
        this.list = res.data.list;
      });
    }
  }
};
</script>
<style scoped="">
.btn {
  position: absolute;
  right: 10%;
  top: 44%;
  outline: none;
  border: none;
  width: 1.733333rem;
  height: 0.773333rem;
  background: rgba(72, 203, 183, 1);
  border-radius: 0.133333rem;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.dz {
  width: 0.266667rem;
  height: 0.346667rem;
  position: relative;
  top: 0.05rem;
}

.list {
  position: relative;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #dddddd;
}

.dj {
  width: 70%;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.time {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  width: 100%;
  height: 1rem;
  line-height: 1rem;
}
</style>
