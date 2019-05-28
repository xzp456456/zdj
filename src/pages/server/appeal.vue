<template>
  <div>
    <div class="title row">投诉原因</div>
    <div class="text">
      <textarea v-model="complain_reason"></textarea>
    </div>
    <div>
      <div class="type row">
        上传凭证
        <span>（最多上传3张，每张最大限制2M）</span>
      </div>

      <div class="item">
        <div class="row">
          <div class="upfile">
            <span>
              点击
              <br>上传图片
            </span>
            <input type="file" class="fileForm"  @change="changeImage($event)" ref="uploadExcelId">
          </div>
          
          <div class="imges">
            <div class="upfiles left pd" v-for="(item,index) in avatar" :key="index">
              <img class="close" src="@/assets/guanbi.png" @click="deletes(index)">
              <img class="all" :src="item" alt srcset>
            </div>
            <!-- <div class="upfiles left pd">
          <img class="close" src="@/assets/guanbi.png" />
        </div>
        <div class="upfiles left pd">
           <img class="close" src="@/assets/guanbi.png" />
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="btn">
        <v-button @actionClick="add()">提交</v-button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  data() {
    return {
      complain_reason: "",
      imgArr: [],
      avatar:[]
    };
  },
  methods: {
    changeImage(e) {
      if (this.imgArr.length >= 3) {
        this.Toast({
          message: "最多上传三张图片",
          duration: 1000
        });
        return false;
      }
      let file = e.target.files[0];
      this.imgArr.push(file);
      if (file) {
        this.file = file;
        console.log(this.imgArr);
        let reader = new FileReader();
        let that = this;
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          // 这里的this 指向reader
          that.avatar.push(this.result);
          console.log(that.avatar)
          that.$refs.uploadExcelId.value=null
        };
      }
    },
    deletes(index){
      this.avatar.splice(index,1);
      this.imgArr.splice(index,1);
    },
    add(){
      var data = new FormData();
      data.append('file_1',this.imgArr[0]);
      data.append('file_2',this.imgArr[1]);
      data.append('file_3',this.imgArr[2]);
      data.append('trip_id',localStorage.getItem('trip_id_ts'));
      data.append('complain_reason',this.complain_reason);
      this.$postFileUp('/api/complain/add',data)
      .then(res=>{
        if(res.status){
           this.Toast({
          message: res.msg,
          duration: 1000
        });
        setTimeout(()=>{
          this.$router.push('serverCenter')
        },1000)
        }else{
           this.Toast({
          message: res.msg,
          duration: 1000
        });
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
.all {
  width: 100%;
  height: 100%;
}
.imges {
  margin-top: 0.266667rem;
}
.pd {
  margin-right: 0.266667rem;
}
.bottom {
  width: 100%;
  position: absolute;
  bottom: 1rem;
}
.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  height: 1rem;
  line-height: 1rem;
}

.text {
  margin: 0 auto;
  width: 9.04rem;
  height: 1.906667rem;
}
.text textarea {
  margin: 0 auto;
  width: 9.04rem;
  height: 1.906667rem;
  border: 1px solid rgba(221, 221, 221, 0.4);
  border-radius: 0.133333rem;
  resize: none;
}

.item {
  margin-top: 0.5rem;
}

.fileForm {
  width: 2rem;
  height: 2rem;
  opacity: 0;
}

.upfile {
  width: 2rem;
  height: 2rem;
  position: relative;
  background: rgba(221, 221, 221, 1);
}

.upfiles {
  width: 2rem;
  height: 2rem;
  position: relative;
  background: rgba(221, 221, 221, 1);
}

.close {
  width: 0.43333rem;
  height: 0.433333rem;
  position: absolute;
  right: -0.196667rem;
  border-radius: 50%;
  top: -0.133333rem;
}

.upfile span {
  text-align: center;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1.333333rem;
  transform: translate(-50%, -50%);
}

.type {
  margin-top: 0.533333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.type span {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}
</style>
