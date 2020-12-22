module.exports = {
  /*********** queryString **********/
  /**
   * 获取url中的参数
   * 返回对象 { a:1, b:1 }
   * @param url
   * @returns {{}}
   */
  getUrlParams: function(url){
    let param = {};
    url = url || window.location.href;
    url = url.split('#')[0];
    if(url.indexOf("?")>-1){
      let arr = url.substring(url.indexOf("?")+1).split("&");
      for (let i in arr) {
        let o = arr[i].split("=");
        param[o[0]] = decodeURI(o[1]);
      }
    }
    return param;
  },
  /**
   * 获取url的queryString
   * 返回字符串 a=1&b=1
   * @returns {string}
   */
  getQueryString: function (url) {
    url = url || window.location.href;
    url = window.location.href.split('#')[0];
    if (url.indexOf('?') > -1) {
      return url.substring(url.indexOf("?")+1);
    } else {
      return '';
    }
  },
  /**
   * 获取url的queryString中某一个参数的值
   * @param name 参数key
   * @returns {string|null}
   */
  getParamValue: function(name, url) {
    url = url || window.location.href;
    qs = this.getQueryString(url);
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = qs.match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return null;
  },
  /**
   * 将queryString解析为对象
   * @param qs
   * @returns {{}}
   */
  parseQueryString: function (qs) {
    let obj = {};
    let params = qs.split("&");
    for (let key in params) {
      let kv = params[key].split("=");
      obj[kv[0]] = decodeURI(kv[1]);
    }
    return obj;
  },
  /**
   * 讲对象解析为queryString
   * @param obj
   */
  stringifyQueryString: function (obj) {
    let params = []
    for (let key in obj) {
      params.push(key + '=' + obj[key])
    }
    return params.join('&')
  },
  /*********** 存储 **********/
  setCookie:function  (name, value,expDay) {
    if (value) {
      if(!expDay)expDay=1;
      let exp = new Date();
      exp.setTime(exp.getTime() + expDay * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
  },
  getCookie:function (name) {
    let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //匹配字段
    if (arr === document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  delCookie: function (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.setCookie(name);
    if (cval) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },

  /** 类型判断 ***/
  /**
   * obj is null or empty
   * @param obj
   * @returns {boolean}
   */
  isEmptyObj: function (obj) {
    obj = obj || {};
    const json = JSON.stringify(obj);
    return json === '{}';
  },
  /**
   * 是否是空数组
   * @param arr
   */
  isEmptyArray: function (arr){
    if(!(arr instanceof Array)) return true;
    return arr.length === 0;
  },
  /**
   * 校验一个值是否为数字
   * @param val
   * @returns {boolean}
   */
  isNumber: function (val) {
    val = val + '';
    const reg = /^[-]?(([0-9]+)([.]([0-9]+))?)$/;
    return reg.test(val);
  },
  /******** 转换 **********/
  /**
   *  obj to k，v obj
   * @param obj
   * @return {{}}
   */
  obj2Entity: function(obj) {
    const o = {};
    for(let p in obj){
      o["k"] = p;
      o["v"] = obj[p];
    }
    return o;
  },
  /**
   * 转换变量为整数
   * @param val
   * @param defaultVal
   * @returns {number}
   */
  toInt: function(val, defaultVal) {
    let dv = parseInt(defaultVal);
    dv = isNaN(dv) ? 0 : dv;
    let v = parseInt(val);
    return isNaN(v) ? dv : v;
  },
  /**
   * 转换变量为浮点数
   * @param val
   * @param defaultVal
   * @returns {number}
   */
  toFloat: function(val, defaultVal) {
    let dv = parseFloat(defaultVal);
    dv = isNaN(dv)?0:dv;
    let v = parseFloat(val);
    return isNaN(v) ? dv : v;
  },
  /**
   * 格式化小数点后位数
   * @param val
   * @param digit
   * @returns {string}
   */
  fmtFloat: function(val, digit) {
    digit = this.toInt(digit, 2);
    const dv = this.toFloat(val, 0);
    return dv.toFixed(digit);
  },
  /**
   * 格式化数值为百分数
   * @param val
   * @returns {string}
   */
  fmtPercent: function(val) {
    const num = this.toFloat(val, 0);
    return (num*100).toFixed(2) + "%";
  },
  /**
   * 指定位数的随机数
   * @param digit 位数 默认4
   * @returns {Number}
   */
  randNum: function(digit){
    digit = this.toInt(digit, 4);
    const offset = Math.pow(10, digit-1);
    const max = 9*offset;
    return Math.ceil(Math.random() * max + offset);
  },
  /**
   * 产生指定长度的随机字符串
   * @param length
   * @returns {string}
   */
  randStr: function (length) {
    length = this.toInt(length, 6);
    const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const len = str.length;
    let rlt = '';
    while (length--) {
      let rand = Math.ceil(Math.random()*len);
      rlt += '' + str[rand];
    }
    return rlt;
  }
};
