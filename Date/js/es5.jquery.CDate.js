'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by cattle on 2016/8/24.
 * 此框架依赖于jQuery-1.8以上
 *
 */

var _D = function () {
    function _D() {
        _classCallCheck(this, _D);
    }

    _createClass(_D, [{
        key: 'getNowTimeStamp',

        /**
         * 获取当前的时间戳
         * @returns {number}  返回当前的时间戳
         */
        value: function getNowTimeStamp() {
            return new Date().getTime();
        }

        /**
         * 返回当前的时间
         * @param signStr  数字之间相隔的符号，如:':'
         *                 默认是':'
         * @returns {*}  返回当前的时间，不包含日期
         */

    }, {
        key: 'getNowTime',
        value: function getNowTime(signStr) {
            var sign = ':';
            if (signStr) {
                sign = signStr;
            }
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();

            return h + sign + m + sign + s || 0;
        }

        /**
         * 获取当前的日期
         * @param signStr 数字之间相隔的符号，如: '-', '/'
         *                默认为"-"
         * @returns {*} 返回当前的日期
         */

    }, {
        key: 'getNowDate',
        value: function getNowDate(signStr) {
            var sign = '-';
            if (signStr) {
                sign = signStr;
            }
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();

            return y + sign + m + sign + d || null;
        }

        /**
         * 把传进去的数字转换成秒数
         * @param h 小时  0为不计算小时
         * @param m 分钟
         * @param s 秒数  一般为60s
         * @returns {number}  返回0表示传入的参数有误，参数必须是数字
         */

    }, {
        key: 'timeToSecond',
        value: function timeToSecond(h, m, s) {
            var sum = 0;
            if (h <= 0) {
                sum = m * s;
            } else {
                sum = h * m * s;
            }
            return Math.ceil(sum) || 0;
        }

        /**
         * 时间戳转换成日期格式
         * @param timeStamp 时间戳
         * @param timeFlag 是否要返回时间 boolean
         * @param signStr 日期间拼接的符号， 如：'-', '/' 默认为'-'
         * @returns {*|null}
         * @constructor
         */

    }, {
        key: 'TimeStampToDateTime',
        value: function TimeStampToDateTime(timeStamp, timeFlag, signStr) {
            var sign = '-';
            if (signStr) {
                sign = signStr;
            }
            var date = new Date(timeStamp);
            var dateTimeStr;
            var Y = date.getFullYear();
            var M = date.getMonth() + 1;
            var D = date.getDate();

            dateTimeStr = Y + sign + M + sign + D;
            if (timeFlag) {
                var h = date.getHours();
                var m = date.getMinutes();
                var s = date.getSeconds();

                dateTimeStr = dateTimeStr + ' ' + h + ':' + m + ':' + s;
            }
            return dateTimeStr || null;
        }

        /**
         * 日期转换成时间戳
         * @param dateStr  要转换的日期  默认为当前日期和时间
         * @returns {number} 返回0表示参数类型错误
         */

    }, {
        key: 'dateTimeToTimeStamp',
        value: function dateTimeToTimeStamp(dateStr) {
            var dateTime = this.getNowDate() + ' ' + this.getNowTime();
            if (dateStr) {
                dateTime = dateStr;
            }
            return new Date(dateTime).getTime() || 0;
        }

        /**
         * 获取两个日期相差的天数  如果不传入日期，则默认为当前的时间
         * @param dateStr1
         * @param dateStr2
         * @returns {number|null}  返回相差的天数，天数为向下取整的，
         *                         返回null 则表示两个日期都为当前日期
         */

    }, {
        key: 'getDateDifferDayCount',
        value: function getDateDifferDayCount(dateStr1, dateStr2) {
            var _ref = [];
            var dateOne = _ref[0];
            var dateTwo = _ref[1];
            var diffDate = _ref[2];

            if (!dateStr1 || dateStr1 === '' || dateStr1 === 'undefined') {
                dateStr1 = this.getNowDate('-');
            }
            dateOne = new Date(dateStr1).getTime();
            if (!dateStr2 || dateStr2 === '' || dateStr2 === 'undefined') {
                dateStr2 = this.getNowDate('-');
            }
            dateTwo = new Date(dateStr2).getTime();
            diffDate = (dateOne - dateTwo) / (1000 * 60 * 60 * 24);
            return Number(Math.round(diffDate)) || null;
        }

        /**
         * 获取当前天数是星期几
         * @returns {string|null}
         */

    }, {
        key: 'getWeekSeveral',
        value: function getWeekSeveral() {
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = new Date().getDay();
            if (week == 0) {
                week = 7;
            }
            return weekArr[week - 1] || null;
        }

        /**
         * 倒计时
         * @param time  秒数  默认值为60秒
         */

    }, {
        key: 'downCount',
        value: function downCount(time) {
            var intDiff = parseInt(60);
            if (time) {
                intDiff = parseInt(time);
            }
            window.setInterval(function () {
                var day = 0;
                var hour = 0;
                var minute = 0;
                var second = 0;
                var count = '';

                if (intDiff > 0) {
                    day = Math.floor(intDiff / (60 * 60 * 24));
                    hour = Math.floor(intDiff / (60 * 60)) - day * 24;
                    minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
                    second = Math.floor(intDiff) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
                }
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                count = day + '天 ' + hour + '时 ' + minute + '分 ' + second + '秒';
                $('.box').html(count);
                intDiff--;
            }, 1000);
        }
    }]);

    return _D;
}();