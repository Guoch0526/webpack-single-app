<style lang="less">
  .fixed-container {
    min-height: 2.3rem;
  }
  .fixed-bottom {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    width: 10rem;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    background-color: white;
    overflow: hidden;
  }
</style>

<template>
  <div class="fixed-container">
    <div class="fixed-bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {}
</script>
