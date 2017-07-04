export default {
  changeTitle (title = '淘力') {
    document.title = title
    var i = document.createElement('iframe')
    i.src = '/static/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(() => {
        i.remove()
      }, 5)
    }
    document.body.appendChild(i)
  },
  /*
    type:0 YYYY-MM-DD H-M
    type:1 YYYY-MM-DD
   */
  getTime (value, type) {
    if (value === 0 || typeof value !== 'number') return '-'
    var ret = new Date(value)
    var timeObj = {
      year: ret.getUTCFullYear(),
      month: ret.getUTCMonth() < 10 ? '0' + (ret.getUTCMonth() + 1) : ret.getUTCMonth() + 1,
      date: ret.getDate() < 10 ? '0' + ret.getDate() : ret.getDate(),
      hours: ret.getHours() < 10 ? '0' + ret.getHours() : ret.getHours(),
      minutes: ret.getMinutes() < 10 ? '0' + ret.getMinutes() : ret.getMinutes()
    }
    if (type === 0) {
      return '' + timeObj.year + '-' + timeObj.month + '-' + timeObj.date + ' ' + timeObj.hours + ':' + timeObj.minutes
    } else {
      return '' + timeObj.year + '-' + timeObj.month + '-' + timeObj.date
    }
  },
  getElement (expr) {
    return (typeof expr === 'string') ? document.querySelector(expr) : expr
  },
  getDataSet (el, name) {
    if (el.dataset) {
      return el.dataset[name]
    } else {
      return el.getAttribute('data-' + name)
    }
  },
  getlocalStorage (key) {
    return window.localStorage.getItem(key)
  },
  setlocalStorage (key, value) {
    window.localStorage.setItem(key, value)
  },
  removelocalStorage (key) {
    window.localStorage.removeItem(key)
  },
  trim (val) {
    val = String(val)
    if (String.prototype.trim) {
      return val.trim()
    } else {
      return val.replace(/(^\s*)|(\s*$)/g, '')
    }
  }
}
