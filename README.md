# Cattle.FW
CDate.js  文档


es6.jquery.CDate.js
仅支持chrome

es5.jquery.CDate.js
jquery.extend.CDate.js
支持IE7以上

-------------------------------
/**
 * 获取当前的时间戳
 * @returns {number}  返回当前的时间戳
 */
  getNowTimeStamp()


/**
 * 返回当前的时间
 * @param signStr  数字之间相隔的符号，如:':'
 *                 默认是':'
 * @returns {*}  返回当前的时间，不包含日期
 */
getNowTime(signStr)


/**
 * 获取当前的日期
 * @param signStr 数字之间相隔的符号，如: '-', '/'
 *                默认为"-"
 * @returns {*} 返回当前的日期
 */
getNowDate(signStr)


/**
 * 把传进去的数字转换成秒数
 * @param h 小时  0为不计算小时
 * @param m 分钟
 * @param s 秒数  一般为60s
 * @returns {number}  返回0表示传入的参数有误，参数必须是数字
 */
timeToSecond(h, m, s)



/**
 * 时间戳转换成日期格式
 * @param timeStamp 时间戳
 * @param timeFlag 是否要返回时间 boolean
 * @param signStr 日期间拼接的符号， 如：'-', '/' 默认为'-'
 * @returns {*|null}
 * @constructor
 */
TimeStampToDateTime(timeStamp, timeFlag, signStr)


/**
 * 日期转换成时间戳
 * @param dateStr  要转换的日期  默认为当前日期和时间
 * @returns {number} 返回0表示参数类型错误
 */
dateTimeToTimeStamp(dateStr)


/**
 * 获取两个日期相差的天数
 * 如果不传入日期，则默认为当前的时间
 * @param dateStr1
 * @param dateStr2
 * @returns {number|null}  返回相差的天数，天数为向下取整的，
 *                         返回null 则表示两个日期都为当前日期
 */
getDateDifferDayCount(dateStr1, dateStr2)


/**
 * 获取当前天数是星期几
 * @returns {string|null}
 */
getWeekSeveral()


/**
 * 倒计时
 * @param time  秒数  默认值为60秒
 */
downCount(time)


/**
 * 格式化字符串
 * @param dateTime 要转化的字符串
 * @param isHanization 传进来的字符串是否为中文  boolean值
 * @param repSign 日期要替换的字符
 * @param repSignEnd 日期替换之后的字符
 * @param hanization 是否要转为中文  boolean值
 * @returns {string|null}
 */
formatDate(dateTime, isHanization, repSign, repSignEnd, hanization)


/**
 * 判断数字是否小于10，如果小于10则在前面加0
 * @param n
 * @returns {*}
 */
countNumberLt(n)

-----------------------------------------------------------------
es5.jquery.CDate.js
es6.jquery.CDate.js
调用方法：
var d = new _D();
d.xxxx();

jqeury.extend.CDate.js
调用方法
$._D.xxxx();
