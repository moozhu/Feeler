var utils = {};

utils.get_playform = function() {
    let runtime = 'native';
    let userAgent = navigator.userAgent,
        webviewType = '';
    if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
        webviewType = 'Android';
    } else if (userAgent.indexOf('iPhone') > -1) {
        webviewType = 'iOS';
    } else {
        runtime = 'browser'
    }
    let platform = (runtime === 'native') ? webviewType : runtime;

    return platform;
};

utils.hasClass = function (e, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
    return re.test(e.className);
};

utils.addClass = function (e, c) {
    if (utils.hasClass(e, c)) {
        return;
    }

    var newclass = e.className.split(' ');
    newclass.push(c);
    e.className = newclass.join(' ');
}.bind(utils);

utils.removeClass = function (e, c) {
    if (!utils.hasClass(e, c)) {
        return;
    }

    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
    e.className = e.className.replace(re, ' ');
}.bind(utils);

//费用保留两位小数函数
utils.payHandler = function (val) {
    var num = 0;
    if (typeof val === "number") {
        if (!isNaN(val)) {
            num = val;
        }
    }
    return num.toFixed(2);
};

//js动画引擎
utils.rAF = function (cb) {
    var rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (cb) { window.setTimeout(cb, 1000 / 60); };
    return rAF(cb);
};

/**
 * 将时间戳转换为类似'2016-5-31 10:25'的格式
 * @param tl
 * @param type, 1 => 2016-5-31 10:25, 2 => 2016-5-31, 3 => 5-31, 4 => 5-31-六, 5 => 星期六, 6 => 2016-5-31 星期六
 * @returns {string}
 */
utils.time2str = function (tl, type) {
    var date = new Date();
    date.setTime(tl);
    var day = (date.getDate().toString());
    (day.length == 1) ? day = '0' + day : day = day;
    var mou = ((date.getMonth() + 1).toString());
    (mou.length == 1) ? mou = '0' + mou : mou = mou;
    var yea = (date.getFullYear().toString());
    var hou = ((date.getHours()).toString());
    (hou.length == 1) ? hou = '0' + hou : hou = hou;
    var min = ((date.getMinutes()).toString());
    (min.length == 1) ? min = '0' + min : min = min;
    var sen = ((date.getSeconds()).toString());
    (sen.length == 1) ? sen = '0' + sen : sen = sen;

    if (type === 1) {
        return yea + '-' + mou + '-' + day + ' ' + hou + ':' + min + ':' + sen;
    } else if (type === 2) {
        return yea + '-' + mou + '-' + day;
    } else if (type === 3) {
        return mou + '-' + day;
    } else if (type === 4) {
        var dayNum = date.getDay();

        var dayMap = {
            0: '天',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
        };

        return mou + '-' + day + '-' + dayMap[dayNum];
    } else if (type === 5) {
        var dayNum = date.getDay();

        var dayMap = {
            0: '天',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
        };

        return '星期' + dayMap[dayNum];
    } else if (type === 6) {
        var dayNum = date.getDay();

        var dayMap = {
            0: '天',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
        };

        return yea + '-' + mou + '-' + day + ' 星期' + dayMap[dayNum];
    }
};

/**
 * 转换时间字符串为时间戳
 * @param strTime {String} .e.g "2017-02-13 10:02:58" or "2017-02-13"
 */
utils.str2time = function (strTime) {
    //new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
    strTime = strTime.trim();
    var type = (strTime.indexOf(' ') == -1) ? "date" : "dateTime";
    var arr = strTime.split(' '),
        date,
        time,
        dateArr,
        year, month, day,
        timeArr,
        hour, minutes, seconds;

    date = arr[0];
    dateArr = date.split('-');
    year = dateArr[0];
    month = dateArr[1];
    day = dateArr[2];
    if (type === 'dateTime') {
        time = arr[1];
        timeArr = time.split(':');
        hour = timeArr[0];
        minutes = timeArr[1];
        seconds = timeArr[2];
        return new Date(year, month - 1, day, hour, minutes, seconds).getTime();
    } else {
        return new Date(year, month - 1, day).getTime();
    }
}

utils.timeLong = function (t) {
    var years = Math.floor(t / (365 * 24 * 60 * 60 * 1000));

    var dt = t % (365 * 24 * 60 * 60 * 1000);
    var days = Math.floor(dt / (24 * 60 * 60 * 1000));

    var ht = dt % (24 * 60 * 60 * 1000);
    var hours = Math.floor(ht / (60 * 60 * 1000));

    var mt = ht % (60 * 60 * 1000);
    var minutes = Math.floor(mt / (60 * 1000));

    var st = mt % (60 * 1000);
    var seconds = Math.floor(st / (1000));

    return {
        long: Math.floor(t / (60 * 1000)),
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
};
utils.aheadtime = function (year, month, day, interval) {
    var date = new Date(year, month - 1, day);
    var datetime = date.valueOf();
    datetime = datetime + interval * 24 * 60 * 60 * 1000;
    return utils.time2str(datetime, 4);
}

//判断数字是否为整数
utils.isInt = function (val) {
    return typeof val === 'number' && val % 1 === 0
};

//判断对象是否为空对象
utils.isEmptyObject = function (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
};

//获取由对象属性数组
utils.keys = function (obj) {
    if (!Object.keys) {
        return (function () {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [],
                    prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    } else {
        return Object.keys(obj);
    }
};

//判断变量是否是对象
utils.isObject = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
};

//判断变量是否是数组
utils.isArray = function (arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
};

//判断变量是否有正确的值
utils.isCorrectVal = function (variable) {
    var result = true;
    if (typeof variable === "string") {
        if (variable === '' || variable === 'undefined' || variable === 'null' || variable === 'NaN' || variable === 'Infinity') {
            result = false;
        }
    } else if (typeof variable === "number") {
        if (isNaN(variable) || !isFinite(variable)) {
            result = false;
        }
    } else if (variable === null) {
        result = false;
    } else if (typeof variable === 'undefined') {
        result = false;
    } else if (this.isObject(variable)) {
        if (this.isEmptyObject(variable)) {
            result = false;
        }
    } else if (this.isArray(variable)) {
        if (variable.length === 0) {
            result = false;
        }
    }
    return result;
}.bind(utils);

//object继承
utils.objInheritance = function (obj, proto) {
    obj = Object(obj);
    var newObj = Object.create(proto);
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

//array object 浅拷贝
utils.clone = function (obj) {
    var isObject = this.isObject(obj),
        isArray = this.isArray(obj);
    if (isArray) {
        return obj.slice(0);
    } else if (isObject) {
        var newObj = {};
        for (var key in obj) {
            newObj[key] = obj[key];
        }
        return newObj;
    } else {
        return obj;
    }
}.bind(utils);

//array object 深拷贝
utils.cloneDeep = function (obj) {
    var isObject = this.isObject(obj),
        isArray = this.isArray(obj);
    if (isObject) {
        var newObj = {};
        for (var key in obj) {
            newObj[key] = this.cloneDeep(obj[key]);
        }
        return newObj;
    } else if (isArray) {
        var newArr = [];
        for (var key in obj) {
            newArr[key] = this.cloneDeep(obj[key]);
        }
        return newArr;
    } else {
        return obj;
    }
}.bind(utils);

//数组去重
utils.uniqueArray = function (arr) {
    var hashmap = {};
    var unique = [];
    for (var i = 0; i < arr.length; i++) {
        if (!hashmap.hasOwnProperty([arr[i]])) {
            hashmap[arr[i]] = 1;
            unique.push(arr[i]);
        }
    }
    return unique;
};

//二分搜索
utils.binarySearch = function (arr, val, start, end) {
    var end = end || arr.length - 1,
        start = start || 0,
        m = Math.floor((start + end) / 2);
    if (arr[m] === val) {
        return m;
    } else if (val < arr[m]) {
        return binarySearch(arr, val, 0, m - 1);
    } else {
        return binarySearch(arr, val, m + 1, end);
    }

    return false;
};

//快速排序
utils.quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var num = Math.floor(arr.length / 2);
    var numVal = arr.splice(num, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < numVal) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return this.quickSort(left).concat([numVal], this.quickSort(right));
}.bind(utils);

//选择排序
utils.selectionSort = function (arr) {
    var len = arr.length,
        temp;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};

//冒泡排序
utils.bubbleSort = function (arr) {
    var len = arr.length,
        temp;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
};

//插入排序
utils.insertionSort = function (arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var insert = arr[i + 1];
        var index = i + 1;
        var j = i;
        while (j >= 0 && insert < arr[j]) {
            arr[j + 1] = arr[j];
            index = j;
            --j;
        }
        arr[index] = insert;
    }
    return arr;
};

export default utils;