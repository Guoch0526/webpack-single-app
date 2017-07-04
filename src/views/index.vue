<template>
  <div>
    <h1>Holle word</h1>
    <p @click="getData">点击</p>
  </div>
</template>

<script>
  export default {
    created () {
    },
    methods: {
      getData () {
        this.$http.post('/member/stat/staff/report').then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less">
  h1{
    margin: 50px;
    font-size: 30px;
    text-align: center;
  }
</style>
