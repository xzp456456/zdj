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
            <span>点击<br />上传图片</span>
          <input type="file" class="fileForm" multiple="multiple" @change="getLcalHost($event)">
        </div>
        <div class="imges">
        <div class="upfiles left pd" v-for="(item,index) in avatar" :key="index">
           <img class="close" src="@/assets/guanbi.png" />
           <img class="all" :src="item" alt="" srcset="">
        </div>
        <!-- <div class="upfiles left pd">
          <img class="close" src="@/assets/guanbi.png" />
        </div>
        <div class="upfiles left pd">
           <img class="close" src="@/assets/guanbi.png" />
        </div> -->
        </div>
        </div>
      </div>
    </div>
    <div class="bottom">
    <div class="btn">
        <v-button @actionClick="getAppeal()">提交</v-button>
    </div>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button'
export default {
  data(){
    return{
      form:new FormData(),
      complain_reason:'',
      itemImg:[],
      avatar:''
    }
  },
  methods:{
    changImg(url){
      let that = this;
       let reader = new FileReader();
            reader.readAsDataURL(url)
            reader.onload= function(e){
                    // 这里的this 指向reader
                    that.avatar.push(this.result);
        }

    },
    getLcalHost(e){
      
      if(e.target.files.length>3){
        this.Toast({
            message: '最多选择三张图片',
            duration:1000
          });
      }else{
        let data = [];
              data.push(e.target.files[0]);
              data.push(e.target.files[1]);
              data.push(e.target.files[2]);
            let datas = data.filter((item,index)=>{
                if(item!=undefined){
                  return item
                }
              })
            this.form = datas;
            //console.log(datas);
            this.avatar = [];

            datas.forEach((item,index)=>{
              this.changImg(e.target.files[index]);
            })
            //console.log(this.avatar)
            
      }
    },
    getAppeal(){
      var data = new FormData();
       if(this.form[1]!=undefined){
      data.append('file_1',this.form[0]);
       }
      if(this.form[1]!=undefined){
        data.append('file_2',this.form[1]);
      }
       if(this.form[1]!=undefined){
        data.append('file_3',this.form[2]);
      }

      let complain_reason = this.complain_reason;
      data.append('trip_id',localStorage.getItem('trip_id'));
      data.append('complain_reason',complain_reason);
      this.$postFileUp('/api/complain/add',data)
      .then(res=>{
        //console.log(res)
         this.Toast({
            message: res.msg,
            duration:1000
          });
      })
    }
  },
    components:{
        'v-button':Button
    }

};
</script>
<style scoped="">
.all{
  width: 100%;
  height: 100%;
}
.imges{
  margin-top: .266667rem;
}
.pd{
  margin-right: .266667rem;
}
.bottom{
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
  resize:none;
}

.item{
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

.upfiles{
   width: 2rem;
  height: 2rem;
  position: relative;
  background: rgba(221, 221, 221, 1);
}

.close{
  width: .43333rem;
  height: .433333rem;
  position: absolute;
  right: -0.196667rem;
  border-radius:50%; 
  top: -0.133333rem;
}

.upfile span{
    text-align: center;
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1.333333rem;
    transform: translate(-50%,-50%);
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
