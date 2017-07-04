var Document = {
  // 修改文档标题
  changeTitle (title = '淘力') {
    document.title = title
    var i = document.createElement('iframe')
    // i.src = '/static/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(() => {
        i.remove()
      }, 5)
    }
    document.body.appendChild(i)
  },
  // 设置背景颜色
  setBackgroundColor (color) {
    document.body.style.backgroundColor = color
  },
  // 解析时间戳
  getTime (time) {
    const date = new Date(time)
    const obj = {}
    function zero (str) {
      str = str + ''
      if (str.length === 1) {
        str = `0${str}`
      }
      return str
    }
    obj.year = date.getFullYear() + ''
    obj.month = zero(date.getMonth() + 1)
    obj.day = zero(date.getDate())
    obj.hour = zero(date.getHours())
    obj.minute = zero(date.getMinutes())
    obj.second = zero(date.getSeconds())
    return obj
  }
}

export {
  Document
}
