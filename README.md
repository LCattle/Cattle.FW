# Cattle.FW
#es6
common FW
/**
 * Created by cattle on 2016/8/24.
 *
 * 此框架是对日期和时间的一些操作，依赖于jQuery-1.8以上
 *
 */

class _D {
    /**
     * 获取当前的时间戳
     * @returns {number}  返回当前的时间戳
     */
    getNowTimeStamp() {
        return new Date().getTime();
    }

    /**
     * 返回当前的时间
     * @param signStr  数字之间相隔的符号，如:':'
     *                 默认是':'
     * @returns {*}  返回当前的时间，不包含日期
     */
    getNowTime(signStr) {
        let sign = ':';
        if(signStr){
            sign = signStr;
        }
        let date = new Date();
        let [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        return h + sign + m + sign + s || 0;
    }

    /**
     * 获取当前的日期
     * @param signStr 数字之间相隔的符号，如: '-', '/'
     *                默认为"-"
     * @returns {*} 返回当前的日期
     */
    getNowDate(signStr) {
        let sign = '-';
        if(signStr){
            sign = signStr;
        }
        var date = new Date();
        var [y, m, d] = [date.getFullYear(), (date.getMonth() + 1), date.getDate()];
        return y + sign + m + sign + d || null;
    }

    /**
     * 把传进去的数字转换成秒数
     * @param h 小时  0为不计算小时
     * @param m 分钟
     * @param s 秒数  一般为60s
     * @returns {number}  返回0表示传入的参数有误，参数必须是数字
     */
    timeToSecond(h, m, s) {
        let sum = 0;
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
    TimeStampToDateTime(timeStamp, timeFlag, signStr) {
        let sign = '-';
        if(signStr){
            sign = signStr;
        }
        let date = new Date(timeStamp);
        let [dateTimeStr, Y, M, D] = [, date.getFullYear(), (date.getMonth() + 1), date.getDate()];
        dateTimeStr = Y + sign + M + sign + D;
        if (timeFlag) {
            let [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()];
            dateTimeStr = dateTimeStr + ' ' + h + ':' + m + ':' + s;
        }
        return dateTimeStr || null;
    }

    /**
     * 日期转换成时间戳
     * @param dateStr  要转换的日期  默认为当前日期和时间
     * @returns {number} 返回0表示参数类型错误
     */
    dateTimeToTimeStamp(dateStr){
        let dateTime = this.getNowDate() +' ' + this.getNowTime();
        if(dateStr){
            dateTime = dateStr;
        }
        return new Date(dateTime).getTime() || 0;
    }

    /**
     * 获取两个日期相差的天数
     * 如果不传入日期，则默认为当前的时间
     * @param dateStr1
     * @param dateStr2
     * @returns {number|null}  返回相差的天数，天数为向下取整的，
     *                         返回null 则表示两个日期都为当前日期
     */
    getDateDifferDayCount(dateStr1, dateStr2) {
        let [dateOne, dateTwo, diffDate] = [];
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
    getWeekSeveral() {
        let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        let week = (new Date().getDay());
        if (week == 0) {
            week = 7;
        }
        return weekArr[week - 1] || null;
    }

    /**
     * 倒计时
     * @param time  秒数  默认值为60秒
     */
    downCount(time){
        let intDiff = parseInt(60);
        if(time){
            intDiff = parseInt(time);
        }
        window.setInterval(function () {
            let [day, hour, minute, second, count] = [0, 0, 0, 0, ''];
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

    }
}
