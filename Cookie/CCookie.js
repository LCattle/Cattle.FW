/**
 * Created by cattle on 2016/8/26.
 */

var _C = function(){
    /**
     * 设置cookie
     * @param name  名字
     * @param value 值
     * @param exDay 过期时间，必须为数字
     */
    _C.prototype.setCookie = function setCookie(name, value, exDay) {
        if(typeof exDay != 'number') return alert('cookie过期时间必须是数字～～');
        var date = new Date();
        var ed = 7;
        if(exDay || exDay > 0 ){
            ed = Math.ceil(exDay);
        }
        date.setDate(date.getDate() + ed);
        document.cookie=name+"="+value+"; expires="+date.toUTCString(); //将date赋值给expires
    }
    /**
     * 获取指定名字的cookie
     * @param name 指定cookie的名字
     * @returns {string|null}
     */
    _C.prototype.getCookie = function getCookie(name){
        var a = document.cookie;
        var cookieArr = a.split(';');
        var splitItem = '';
        var reName = '';
        for(var i = 0; i < cookieArr.length; i++){
            splitItem = cookieArr[i].split('=');
            if(splitItem[0] === name){
                reName = splitItem[1];
                break;
            }
        }
        return reName || null;
    }
    /**
     *删除cookie
     * @param name 要删除的cookie
     */
    _C.prototype.delteCookie = function deleteCookie(name){
        var date = new Date();
        date.setTime(date.getTime()-1);
        var cName = this.getCookie(name);
        if(cName){
            document.cookie = name + "=" + cName +"; expires=" + date.toUTCString();
        }else{
            console.log('用户不存在！');
        }
    }


}
