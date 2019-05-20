<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.search-btn{
  display: none !important;
}
.row{
  width: 9.2rem;
  margin: 0 auto;
}

.left{
  float: left;
}

.right{
  float: right;
}
</style>
