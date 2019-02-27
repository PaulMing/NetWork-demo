
// 封装ajax
function ajaxFunc(method, url, data, callback, flag) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    method = method.toUpperCase();
    if (method == "GET") {
        xhr.open(method, url + '?' + data, flag);
        xhr.send();
    } else if (method = "POST") {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                console.log('error');
            }
        }
    }
}


// 封装jsonp
function jsonp(url, cbName, cb, data) {
    var oScript = document.createElement('script');
    var src = url + '?' + cbName + '=' + cb;
    if (typeof data == 'string') {
        src += "&" + data;
    } else {
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                src += "&" + prop + '=' + data[prop]
            }
        }
    }
    oScript.src = src;
    document.body.appendChild(oScript);
    oScript.remove();
}


// 封装操作cookie函数：
var manageCookie = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ";max-age=" + time;
        return this;
    },
    removeCookie: function (name) {
        return this.setCookie(name, '', -1);
    },
    // 拆解document.cookie
    getCookie: function (name, callback) {
        var allCookieArr = document.cookie.split('; ');
        var len = allCookieArr.length;
        for (var i = 0; i < len; i++) {
            var itemCookieArr = allCookieArr[i].split("=");
            if (itemCookieArr[0] == name) {
                callback(itemCookieArr[1]);
                return this;
            }
        }
        callback(undefined);
        return this;
    }
}
/* 
manageCookie.setCookie(age, 18, 10000)
            .setCookie("target1", "aimee", 20000)
            .setCookie("age", 18, 10000)
            .removeCookie('teater')
            .getCookie('age', function (data) {
                console.log(data);
            }) 
*/