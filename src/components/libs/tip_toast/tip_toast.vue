<style lang="less">
  .tip-toast{
    position: fixed;
    top:0;
    left:0;
    z-index: 1000;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    &-cont{
      padding: 0.2rem;
      height:0.6rem;
      line-height:0.6rem;
      border-radius: 0.08rem;
      color: #fff;
      font-size: 0.373333rem;
      text-align: center;
      background-color: rgba(0,0,0,.5);
    }
  }
</style>
<template>
  <div class="tip-toast" v-if="isShow">
    <div class="tip-toast-cont">
      <slot></slot> 
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      isShow: Boolean
    }
  }
</script> 
