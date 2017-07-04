<template>
  <div class="m-no-data">
    <div class="m-no-data-icon"></div>
    <p>{{msg}}</p>
  </div>
</template>
<script>
  export default {
    name: 'noData',
    props: ['tip'],
    data () {
      return {
        msg: this.tip || '暂无数据'
      }
    }
  }
</script>
<style lang="less">
  .m-no-data{
    display: none;
    width:100%;
    padding:0.266667rem 0;
    font-size: 0.266667rem;
    color: #ccc;
    text-align: center;
    &.active{
      display: block;
    }
    &-icon{
      width:5.2rem;
      height: 3.96rem;
      margin: 0 auto;
      background: url('../assets/img/no_data.png') no-repeat;
      background-size: 5.2rem 3.96rem;
    }
  }
</style>
