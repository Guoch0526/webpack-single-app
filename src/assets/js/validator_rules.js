/*
* @Author: janmi
* @Date:   2017-06-27 15:30:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-27 15:31:36
*/
'use strict';
var Validator = {
  // 是否有值。检查"必填"项。
  hasValue (val) {
    if (val === undefined || val === null || val === '') {
      return false
    }
    return true
  },
  // 是否小于指定长度。
  isShorter (val, len) {
    return Validator._getLength(val) < len
  },
  // 是否大于指定长度
  isLonger (val, len) {
    return Validator._getLength(val) > len
  },
  // 是否数字。type: 0 验证0（不能有小数点） 
  isDigit (val, type) { // 经测试，对于非字符串，不会报错，返回 false
    if (type !== 0) {
      return /(?!\.)(?!0{2,})^[1-9]+$/.test(val)
    } else {
      return /(?!\.)(?!0{2,})^\d+$/.test(val)
    }
  },
  // 是否整数。能否使用 parseInt 转换成整数。据说能识别42位十进制整数，未验证。
  // isInteger (val) { // 此方法存在验证不严谨问题，暂不使用
  //   return !window.isNaN(window.parseInt(val))
  // },
  // 是否小数。能否使用 parseFloat 转换成浮点数。
  // isFloat (val) {
  //   return !window.isNaN(window.parseFloat(val))
  // },
  // 是否手机号码
  isPhone (val) {
    return /^1\d{10}$/.test(val)
  },
  // 判断身份证号码是否正确
  isIdCard (val) {
    if (typeof val !== 'string' && typeof val !== 'number') {
      return false
    }
    if (typeof val === 'number') {
      val = '' + val
    }

    let regexCheck = /^\d{15}$/.test(val) ||
      /^\d{18}$/.test(val) ||
      /^\d{17}[xX]$/.test(val)
    if (!regexCheck) {
      return false
    }

    if (val.length === 15) {
      // 6位地区编码，2位年，2位月，2位日，3位序号。
      // let year = val.substr(6, 2)
      let month = parseInt(val.substr(8, 2))
      let day = parseInt(val.substr(10, 2))
      if (month < 1 || month > 12) {
        return false
      }
      if (day < 1 || day > 31) {
        return false
      }
      return true
    } else if (val.length === 18) {
      // 6位地区编码，4位年，2位月，2位日，3位序号，1位校验号。
      // 年
      let year = parseInt(val.substr(6, 4))
      if (year < 1900 || year > new Date().getFullYear()) {
        return false
      }

      // 月
      let month = parseInt(val.substr(10, 2))
      if (month < 1 || month > 12) {
        return false
      }

      // 日
      let day = parseInt(val.substr(12, 2))
      if (day < 1 || day > 31) {
        return false
      }

      const ratio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      const mark = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2']
      let calculate = 0
      for (var i = 0; i < val.length - 1; i++) {
        calculate += parseInt(val[i]) * ratio[i]
      }
      let mod = calculate % 11
      return val[val.length - 1].toLowerCase() === mark[mod]
    }

    return false
  },
  _getLength (val) { // 是否考虑把非 string 转换成 string ? 如数字。。。
    let length = 0
    if (val && val.length) {
      length = val.length
    }
    return length
  }
}

export {
  Validator
}
