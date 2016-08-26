/**
 * Created by cattle on 2016/8/26.
 * 本插件依赖于jQuery-1.8
 * 有些方法是互相调用，单独拷贝需谨慎
 */

$.extend({
    _D:{
        /**
         * 获取当前的时间戳
         * @returns {number}  返回当前的时间戳
         */
        getNowTimeStamp:function(){
            return new Date().getTime();
        },

        /**
         * 返回当前的时间
         * @param signStr  数字之间相隔的符号，如:':'
         *                 默认是':'
         * @returns {*}  返回当前的时间，不包含日期
         */
        getNowTime:function(signStr){
            var sign = ':';
            if(signStr){
                sign = signStr;
            }
            var date = new Date();
            var h = date.getHours();
            h = this.countNumberLt(h);
            var m = date.getMinutes();
            m = this.countNumberLt(m);
            var s = date.getSeconds()
            s = this.countNumberLt(s);
            return h + sign + m + sign + s || 0;
        },

        /**
         * 获取当前的日期
         * @param signStr 数字之间相隔的符号，如: '-', '/'
         *                默认为"-"
         * @returns {*} 返回当前的日期
         */
        getNowDate:function(signStr){
            var sign = '-';
            if(signStr){
                sign = signStr;
            }
            var date = new Date();
            var y = date.getFullYear();
            var m = (date.getMonth() + 1);
            m = this.countNumberLt(m);
            var d = date.getDate();
            d = this.countNumberLt(d);
            return y + sign + m  + sign + d || null;
        },

        /**
         * 把传进去的数字转换成秒数
         * @param h 小时  0为不计算小时
         * @param m 分钟
         * @param s 秒数  一般为60s
         * @returns {number}  返回0表示传入的参数有误，参数必须是数字
         */
        timeToSecond:function(h, m, s){
            var sum = 0;
            if (h <= 0) {
                sum = m * s;
            } else {
                sum = h * m * s;
            }
            return Math.ceil(sum) || 0;
        },

        /**
         * 时间戳转换成日期格式
         * @param timeStamp 时间戳
         * @param timeFlag 是否要返回时间 boolean
         * @param signStr 日期间拼接的符号， 如：'-', '/' 默认为'-'
         * @returns {*|null}
         * @constructor
         */
        TimeStampToDateTime:function(timeStamp, timeFlag, signStr) {
            var sign = '-';
            if(signStr){
                sign = signStr;
            }
            var date = new Date(timeStamp);
            var dateTimeStr = '';
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1);
            M = this.countNumberLt(M);
            var D = date.getDate();
            D = this.countNumberLt(D);
            dateTimeStr = Y + sign + M + sign + D;
            if (timeFlag) {
                var h = date.getHours();
                h = this.countNumberLt(h);
                var m = date.getMinutes();
                m = this.countNumberLt(m);
                var s = date.getSeconds();
                s = this.countNumberLt(s);
                dateTimeStr = dateTimeStr + ' ' + h + ':' + m + ':' + s;
            }
            return dateTimeStr || null;
        },

        /**
         * 日期转换成时间戳
         * @param dateStr  要转换的日期  默认为当前日期和时间
         * @returns {number} 返回0表示参数类型错误
         */
        dateTimeToTimeStamp:function(dateStr){
            var dateTime = '';
            if(dateStr){
                dateStr = this.formatDate(dateStr, false, '-', '/', false);
                dateTime = dateStr;
            }else{
                dateTime = this.getNowDate() +' ' + this.getNowTime()
            }
            return Number(new Date(dateTime).getTime()) || 0;
        },

        /**
         * 获取两个日期相差的天数
         * 如果不传入日期，则默认为当前的时间
         * @param dateStr1
         * @param dateStr2
         * @returns {number|null}  返回相差的天数，天数为向下取整的，
         *                         返回null 则表示两个日期都为当前日期
         */
        getDateDifferDayCount:function(dateStr1, dateStr2) {
            var dateOne = '',
                dateTwo = '',
                diffDate = '';
            if (!dateStr1 || dateStr1 === '' || dateStr1 === 'undefined') {
                dateStr1 = this.getNowDate('-');
            }
            dateOne = new Date(dateStr1).getTime();
            if (!dateStr2 || dateStr2 === '' || dateStr2 === 'undefined') {
                dateStr2 = this.getNowDate('-');
            }
            dateTwo = new Date(dateStr2).getTime();
            diffDate = parseInt((dateOne - dateTwo) / (1000 * 60 * 60 * 24));
            return Number(Math.round(diffDate)) || null;
        },
        /**
         * 获取当前天数是星期几
         * @returns {string|null}
         */
        getWeekSeveral:function() {
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = (new Date().getDay());
            if (week == 0) {
                week = 7;
            }
            return weekArr[week - 1] || null;
        },

        /**
         * 倒计时
         * @param time  秒数  默认值为60秒
         */
        downCount:function(time){
            var intDiff = parseInt(60);
            if(time){
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
                    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                count = day + '天 ' + hour + '时 ' + minute + '分 ' + second + '秒';
                $('.box').html(count);
                intDiff--;
            }, 1000);

        },

        /**
         * 格式化字符串
         * @param dateTime 要转化的字符串
         * @param isHanization 传进来的字符串是否为中文  boolean值
         * @param repSign 日期要替换的字符
         * @param repSignEnd 日期替换之后的字符  默认是'/'
         * @param hanization 是否要转为中文  boolean值
         * @returns {string|null}
         */
        formatDate:function(dateTime, isHanization, repSign, repSignEnd, hanization){
            var repEnd = '';
            var sign = '/';
            if(repSignEnd){
                sign = repSignEnd;
            }
            if(!dateTime || dateTime === ''){
                alert('请输入要格式化的时间～～');
                return;
            }
            //中文转为字符
            if(isHanization){
                repEnd = dateTime.replace('年', sign)
                    .replace('月', sign)
                    .replace('日', '');
            }
            //字符转为中文
            if(hanization){
                var Y = '年';
                var M = '月';
                var D = '天';
                repEnd =  dateTime.replace(repSign, Y)
                    .replace(repSign, M)
                    .replace(' ', D + ' ');
            }else{
                //字符转字符
                repEnd = dateTime.replace( repSign, sign)
                    .replace(repSign, sign);
            }
            return repEnd || null;
        },
        /**
         * 判断数字是否小于10，如果小于10则在前面加0
         * @param n
         * @returns {*}
         */
        countNumberLt:function(n){
            return n <= 9 ? ('0' + n) : n;
        }
    }
})
