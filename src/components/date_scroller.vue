<template>
  <scroller ref="scroller" :scroll="scrollerData"
    @confirm="onScrollerConfirm"
    @claer="onScrollerClear" 
    @change="onScrollerChange">
  </scroller>
</template>

<script>
  import Scroller from 'anima-vue-scroller'
  require('anima-vue-scroller/dist/anima-vue-scroller.css')
  export default {
    components: { Scroller },
    props: {
      /**
       * 选择时
       */
      onChange: {
        type: Function,
        required: false,
        default: undefined
      },
      /**
       * 点击确定
       */
      onOk: {
        type: Function,
        required: false,
        default: undefined
      },
      /**
       * 点击取消
       */
      onCancel: {
        type: Function,
        required: false,
        default: undefined
      }
    },
    data () {
      return {
        scrollerData: [],
        lastYear: {},
        lastMonth: {},
        lastDay: {}
      }
    },
    mounted () {
      var date = new Date()
      var objYear = {
        defaultValue: '' + date.getFullYear(),
        data: this.getYearData()
      }
      var objMonth = {
        defaultValue: '' + (date.getMonth() + 1),
        data: this.getMonthData()
      }
      var objDay = {
        defaultValue: '' + date.getDate(),
        data: this.getDayData(date.getFullYear(), date.getMonth() + 1)
      }
      this.scrollerData.push(objYear)
      this.scrollerData.push(objMonth)
      this.scrollerData.push(objDay)
      this.lastYear = this.makeObj(date.getFullYear())
      this.lastMonth = this.makeObj(date.getMonth() + 1)
      this.lastDay = this.makeObj(date.getDate())
    },
    methods: {
      show () {
        this.$refs['scroller'].open()
      },
      onScrollerChange (values) {
        if (!values) {
          values = []
        }
        if (!values[0]) {
          values[0] = this.lastYear
        }
        if (!values[1]) {
          values[1] = this.lastMonth
        }
        if (!values[2]) {
          values[2] = this.lastDay
        }
        var monthData, dayData
        if (values[0].value !== this.lastYear.value) {
          monthData = this.getMonthData()
          dayData = this.getDayData(values[0].value, monthData[0].value)
          this.lastYear = values[0]
          this.lastMonth = monthData[0]
          this.lastDay = dayData[0]
          this.scrollerData[1].data = monthData
          this.scrollerData[2].data = dayData
        } else if (values[1].value !== this.lastMonth.value) {
          dayData = this.getDayData(this.lastYear.value, values[1].value)
          this.scrollerData[2].data = dayData
          this.lastMonth = values[1]
          this.lastDay = dayData[0]
        } else {
          this.lastDay = values[2]
        }
        this.onChange && this.onChange(values)
      },
      onScrollerConfirm (values) {
        if (!values) {
          values = []
        }
        if (!values[0]) {
          values[0] = this.lastYear
        }
        if (!values[1]) {
          values[1] = this.lastMonth
        }
        if (!values[2]) {
          values[2] = this.lastDay
        }
        this.onOk && this.onOk(values)
      },
      onScrollerClear () {
        this.onCancel && this.onCancel()
      },
      getYearData () {
        var arr = []
        for (var i = 1970; i <= 2049; i++) {
          var year = this.makeObj(i)
          arr.push(year)
        }
        return arr
      },
      getMonthData () {
        var arr = []
        for (var i = 1; i <= 12; i++) {
          var month = this.makeObj(i)
          arr.push(month)
        }
        return arr
      },
      getDayData (year, month) {
        year = year.toString()
        month = month.toString()
        var y = window.parseInt(year)
        var m = (month.substr(0, 1) === '0') ? window.parseInt(month.substr(1, 1)) : window.parseInt(month)
        var date = new Date(y, m, 1) // 下一个月的第一天
        date = new Date(date.valueOf() - 1000) // 往前一秒。也可以往前一天 (1 * 24 * 60 * 60 * 1000)
        var arr = []
        for (var i = 1; i <= date.getDate(); i++) {
          var day = this.makeObj(i)
          arr.push(day)
        }
        return arr
      },
      makeObj (value) {
        if (!value) {
          value = ''
        }
        var name = '' + value
        if (name.length === 1) {
          name = '0' + name
        }
        return { name, value: '' + value }
      }
    }
  }
</script>

<style></style>
