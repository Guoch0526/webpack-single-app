<template>
  <div class="m-tab-nav" @click="changeTab($event)">
    <a href="javascript:;" v-for="item in navList" :data-id="item.id" class="m-tab-nav-item" :class="{'active': tabId === item.id}">
      {{item.name}}
    </a>
  </div>
</template>
<script>
  export default {
    name: 'tabNav',
    props: {
      navList: {
        require: true,
        type: Array
      },
      change: {
        type: Function
      }
    },
    data () {
      return {
        tabId: this.navList[0].id
      }
    },
    methods: {
      changeTab (event) {
        this.tabId = Number(event.target.dataset.id)
        this.$emit('change', this.tabId)
      }
    }
  }
</script>  
<style lang="less">
  .m-tab-nav{
    display: flex;
    background-color: #fff;
    .m-tab-nav-item{
      display: block;
      position: relative;
      flex:1;
      height:1.066667rem;
      line-height:1.066667rem;
      font-size: 0.453333rem;
      text-align: center;
      &.active::before{
        content: '';
        position: absolute;
        left:0;
        bottom:0;
        width: 100%;
        height:2px;
        background-color:#ffdd00;
      }
    }
  }
</style>
