let timer = null;

//封装get
function get(url, obj) {
    return new Promise(resolve => {
        let user=JSON.parse(localStorage.getItem('user'));
        let token=user.token;
        let xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.setRequestHeader('SAT', '1234567');
        xhr.setRequestHeader('token', token);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj);
        xhr.onreadystatechange = function () {
            if (this.status === 200) {
                if (this.readyState === 4) {
                    resolve(this.responseText);
                }
            }else{
                myalert('网络好像遇到问题了','false');
            }

        }
    })
}
//封装post
function post(url, obj) {
    return new Promise(resolve => {
        let user=JSON.parse(localStorage.getItem('user'));
        let token=user.token;
        let xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.setRequestHeader('SAT', '1234567');
        xhr.setRequestHeader('token', token);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj);
        xhr.onreadystatechange = function () {
            if (this.status === 200) {
                if (this.readyState === 4) {
                    resolve(this.responseText);
                }
            }else{
                myalert('网络好像遇到问题了','false');
            }

        }
    })
}
//token验证函数
function pageverify() {
    if (localStorage.getItem('user')) {
        get('https://ty.php800.cn/api/token.php').then(res => {
            if (JSON.parse(res).verify === true) {
                console.log('验证成功');
            } else {
                myalert('令牌已过期，请重新登陆', 'false').then(res => {
                    location.href = 'index.html';
                });
            }
        });
    } else {
        myalert('令牌已过期，请重新登陆', 'false').then(res => {
            location.href = 'index.html';
        });
    }
}
//自定义alert 提示框
function myalert(str, state) {
    return new Promise(resolve => {
        if (timer) {
            clearTimeout(timer);
        }
        if (document.getElementById('myalert')) {
            document.body.removeChild(document.getElementById('myalert'));
        }
        let myalert = document.createElement('div');
        myalert.setAttribute('id', 'myalert');
        let text = document.createElement('div');
        text.setAttribute('id', 'myalert_text');
        if (state == 'true') {
            myalert.style.background = '#DFF0D8';
            myalert.style.color = '#3D763E';
            myalert.style.border = 'solid 1px #D6E9C6';
            text.innerHTML = `<span style="color: #2C552D; font-weight:600; margin-right:10px;">Success:</span>${str}`;
        } else {
            myalert.style.background = '#F2DEDE';
            myalert.style.color = '#A94543';
            myalert.style.border = 'solid 1px #EBCCD1';
            text.innerHTML = `<span style="color: #843635; font-weight:600;margin-right:10px;">Error:</span>${str}`;
        }
        myalert.appendChild(text);
        timer = setTimeout(() => {
            document.body.removeChild(document.getElementById('myalert'));
            clearTimeout(timer);
            resolve();
        }, 1000)
        document.getElementsByTagName('body')[0].appendChild(myalert);
    });
}
//时间戳处理函数 分钟/30天/完整日期
function dealtime(date) {
    function setTwo(value) {
        if (value < 10) {
            return '0' + value;
        } else {
            return value;
        }
    }
    //现在的时间
    let nowtime = new Date();
    //输入时间
    let mytime = new Date(date);
    //时间差
    let poor = new Date(nowtime - mytime);
    let poorYear = poor.getFullYear() - 1970;
    let poorMonth = poor.getMonth() + 1 - 1;
    let poorDay = poor.getDate() - 1;
    let poorHour = poor.getHours() - 8;
    let poorMinutes = poor.getMinutes();
    let myYear = setTwo(mytime.getFullYear());
    let myMonth = setTwo(mytime.getMonth() + 1);
    let myDay = setTwo(mytime.getDate());
    let myHours = setTwo(mytime.getHours());
    let myMinutes = setTwo(mytime.getMinutes());
    let mySeconds = setTwo(mytime.getSeconds());
    if (poorYear > 0) {
        let temp = `${myYear}/${myMonth}/${myDay}`;
        return temp;
    } else if (poorMonth > 0) {
        let temp = `${myYear}/${myMonth}/${myDay}`;
        return temp;
    }else if(poorDay>=14){
        let temp = `${myYear}/${myMonth}/${myDay}`;
        return temp;
    }else if(poorDay>=7&&poorDay<14){
        let temp = `一周前`;
        return temp;
    }else if(poorDay>=1&&poorDay<7){
        let temp = `${poorDay}天前`;
        return temp;
    }else if(poorDay<1&&poorHour>=1){
        let temp = `${poorHour}小时前`;
        return temp;
    }else if(poorMinutes>5){
        let temp=`${poorMinutes}分钟前`;
        return temp;
    }else{
        let temp=`刚刚`;
        return temp;
    }
}
function dealtime2(date) {
    function setTwo(value) {
        if (value < 10) {
            return '0' + value;
        } else {
            return value;
        }
    }
    let mytime = new Date(date);
    let myYear = setTwo(mytime.getFullYear());
    let myMonth = setTwo(mytime.getMonth() + 1);
    let myDay = setTwo(mytime.getDate());
    let myHours = setTwo(mytime.getHours());
    let myMinutes = setTwo(mytime.getMinutes());
    let mySeconds = setTwo(mytime.getSeconds());
    let temp = `${myYear}/${myMonth}/${myDay}`;
        return temp;
}