<template>
    <div class="btn" :class="myclass">
        <button :class="myclass" @click="MyClickEvent()"><slot></slot></button>
    </div>
</template>

<script>
export default {
    props:['myclass'],
    methods:{
        MyClickEvent(){
             this.$emit('actionClick');
        }
    }
}
</script>
<style scoped="">
.btn{
    width:9.04rem;
height:1.173333rem;
box-shadow:0px .08rem .2rem 1px rgba(185,185,185,0.3);
border-radius:.133333rem;
margin: 0 auto;

}

.btn button{
width:9.04rem;
height:1.173333rem;
background:rgba(72,203,183,1);
box-shadow:0px .08rem .2rem 1px rgba(185,185,185,0.3);
border-radius:.133333rem;
font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
outline: none;
border: none;
}

.wid{
    width: 100% !important;
    border-radius:0 !important; 
}

.bgcolor{
    background:#CCCCCC !important;
}
</style>

