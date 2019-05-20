<template>
  <div>
    <div class="list" v-for="(item,index) in info" :key="index">
      <div class="title">{{item.cate_name}}</div>
      <div class="desc row">
      <div v-for="(li,i) in item.faq" :key="i">
      <div >{{li.title}}</div>
      <div>{{li.answer}}</div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.getProblem();
  },
  methods: {
    getProblem() {
      this.$postAjax("/api/faq/getList", {}).then(res => {
        //console.log(res)
        this.info = res.data;
      });
    }
  }
};
</script>
<style scoped="">
.title {
  font-size: 0.426667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.466667rem;
  padding-bottom: 0.466667rem;
  text-align: center;
}
.desc {
  font-size: 0.373333rem;
  font-family: ArialMT;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>
