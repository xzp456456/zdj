<template>
    <div>
          <div class="bar">
            <div class="border inback"></div>
             <div class="text inback">车费详情</div>
             <div class="border inback"></div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped="">
.inback{
    display: inline-block;
}

.border{
    width: 4.136667rem;
    height: 1px;
    background:rgba(221,221,221,1);
opacity:0.4;
}

.bar{
    margin: 0 auto;
    margin-top: .233333rem;
}

.yhj{
    font-size:.4rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(72,203,183,1);
}

.text{
    font-size:.373333rem;
    text-align: center;
font-family:PingFang-SC-Medium;
font-weight:500;
position: relative;
bottom: -0.1rem;
color:rgba(153,153,153,1);
}

</style>
