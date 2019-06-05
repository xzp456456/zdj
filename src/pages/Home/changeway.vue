<template>
  <div>
    <div class="search">
      <div class="row">
        <div class="left address" @click="navgateTo('city')">
          {{city}}
          <img class="xz" src="@/assets/xz.png" alt srcset>
        </div>
        <div class="left border"></div>
        <div class="left searchInput">
          <input
            type="text"
            placeholder="请输入代驾出发地"
            v-model="keywords"
            @input="getAddress()"
            class="searchTap"
          >
        </div>
        <div class="left quxiao" @click="navgateTo('underway')">取消</div>
      </div>
    </div>
    <div class="item">
      <div
        class="list"
        v-for="(item,index) in list"
        :key="index"
        @click="select(item.location,item.name)"
      >
        <div class="row">
          <div class="name">{{item.adname}}</div>
          <div class="area">{{item.name}}</div>
        </div>
      </div>
      <!-- <div class="list">
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
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      city: "",
      keywords: "",
      list: [],
      destination_longitude: "",
      destination_latitude: "",
      trip_id: "",
      destination_name: ""
    };
  },
  created() {
    this.city = localStorage.getItem("city");
  },
  methods: {
    navgateTo(url) {
      this.$router.push(url);
    },
    select(location, name) {
      this.destination_longitude = location.split(",")[0];
      this.destination_latitude = location.split(",")[1];
      this.destination_name = name;
      this.trip_id = localStorage.getItem("trip_id");
      this.MessageBox({
        title: "温馨提示",
        message: "您确定要改变行程？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(action => {
        if (action == "confirm") {
          this.changeway(this.destination_longitude,this.destination_latitude,this.destination_name,this.trip_id)
        } else {
          console.log("取消");
        }
      });
    },
    changeway(
      destination_longitude,
      destination_latitude,
      destination_name,
      trip_id
    ) {
      let data = {
        destination_longitude,
        destination_latitude,
        destination_name,
        trip_id
      };
      this.$postAjax("/api/trip/updateTrip", data).then(res => {
        if (res.status) {
          that.Toast({
            message: res.msg,
            duration: 1000
          });
          setTimeout(() => {
            this.$router.push("underway");
          }, 1000);
        } else {
          this.Toast({
            message: res.msg,
            duration: 1000
          });
        }
      });
    },
    getAddress() {
      let data = {
        keywords: this.keywords,
        city: this.city,
        extensions: "all",
        page: "1",
        offset: 10,
        key: "5d36d977b287953b8e7037325b1085bf"
      };
      this.$getAjax("https://restapi.amap.com/v3/place/text", data).then(
        res => {
          //console.log(res)
          this.list = res.pois;
        }
      );
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

.el-vue-search-box-container {
  position: relative;
  width: 6.16rem;
  height: 1.5rem;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  z-index: 10;
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

.border {
  width: 1px;
  height: 0.426667rem;
  background: rgba(221, 221, 221, 1);
  margin-right: 0.1rem;
  margin-left: 0.4rem;
  margin-top: 0.506667rem;
}

.quxiao {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.name {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.393333rem;
  padding-bottom: 0.1rem;
}

.area {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.list {
  width: 100%;
  height: 1.88rem;
  border-bottom: 1px solid #dddddd;
}
</style>

