///token验证
// window.onload=function(){
//     pageverify();
// }
///token验证
axios.defaults.headers.common['SAT'] = '1234567';
axios.defaults.headers.common['token'] = JSON.parse(localStorage.getItem('user')).token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//页面状态对象 记录了页面状态 防止刷新会返回初始页面
//重新登陆会初始化
let pagedate = {
    check_members: {
        display: 'none',
        page_num: '1'
    },
    personal_data: {
        display: 'flex'
    },
    add_members: {
        display: 'none'
    },
    role_list: {
        display: 'none',
        page_num: '1',
        my_role_list: 'blcok',
        add_role: 'none',
    },
    add_article: {
        display: 'none'
    },
    see_article: {
        display: 'none',
        page_num: '1'
    },
    label_list: {
        display: 'none',
        page_num: '1'
    },
    add_label: {
        display: 'none',
    },
    directory: {
        child_lis1: {
            state: 'true',
            value: '0',
            p_bg: '',
            color: '#869FB1'
        },
        child_lis2: {
            state: 'true',
            value: '0',
            p_bg: '',
            color: '#869FB1'
        },
        child_lis3: {
            state: 'true',
            value: '0',
            p_bg: '',
            color: '#869FB1'
        }
    },
    secondary_list_highlight: {
        pre: '999999'
    }
};
//页面初始化
function pageInitialize() {
    if (localStorage.getItem('pagedate')) {
        pagedate = JSON.parse(localStorage.getItem('pagedate'));
    } else {
        localStorage.setItem('pagedate', JSON.stringify(pagedate));
        pagedate = JSON.parse(localStorage.getItem('pagedate'));
    }

    function id_to_display(id) {
        document.getElementById(id).style.display = pagedate[id].display;
    }
    id_to_display('check_members');
    id_to_display('personal_data');
    id_to_display('add_members');
    id_to_display('role_list');
    id_to_display('add_article');
    id_to_display('see_article');
    id_to_display('label_list');
    id_to_display('add_label');
    //
    document.getElementById('my_role_list').style.display = pagedate.role_list.my_role_list;
    document.getElementById('add_role').style.display = pagedate.role_list.add_role;
    document.getElementsByClassName('child_lis1')[0].style.height = `${pagedate.directory.child_lis1.value*46}px`;
    document.getElementsByClassName('child_lis2')[0].style.height = `${pagedate.directory.child_lis2.value*46}px`;
    document.getElementsByClassName('child_lis3')[0].style.height = `${pagedate.directory.child_lis3.value*46}px`;
    document.getElementsByClassName('flis1')[0].style.backgroundColor = `${pagedate.directory.child_lis1.p_bg}`;
    document.getElementsByClassName('flis2')[0].style.backgroundColor = `${pagedate.directory.child_lis2.p_bg}`;
    document.getElementsByClassName('flis3')[0].style.backgroundColor = `${pagedate.directory.child_lis3.p_bg}`;
    document.getElementsByClassName('flis1')[0].style.color = `${pagedate.directory.child_lis1.color}`;
    document.getElementsByClassName('flis2')[0].style.color = `${pagedate.directory.child_lis2.color}`;
    document.getElementsByClassName('flis3')[0].style.color = `${pagedate.directory.child_lis3.color}`;
    //二级高亮
}
pageInitialize();

//目录按钮渲染函数 绑定id 点击即可展开id对应的模块 
function mulu_btn(btnid, type) {
    let pageid = btnid.substring(0, btnid.length - 4);
    document.getElementById(btnid).addEventListener('click', function () {
        let page = document.getElementById(pageid);
        let main_pages = document.getElementsByClassName('main_page');
        for (let i = 0; i < main_pages.length; i++) {
            main_pages[i].style.display = 'none';
            pagedate[main_pages[i].id].display = 'none';
        }
        page.style.display = type;
        pagedate[pageid].display = type;
        //存起来
        localStorage.setItem('pagedate', JSON.stringify(pagedate));
    })
}
//目录按钮渲染绑定id点击切换页面
mulu_btn('check_members_btn', 'block');
mulu_btn('personal_data_btn', 'flex');
mulu_btn('add_members_btn', 'flex');
mulu_btn('role_list_btn', 'flex');
mulu_btn('add_article_btn', 'block');
mulu_btn('see_article_btn', 'block');
mulu_btn('label_list_btn', 'block');
mulu_btn('add_label_btn', 'block');
//渲染二级列表高亮
function secondary_list_highlight() {
    let lis = document.getElementsByClassName('lis2');
    if (lis[pagedate.secondary_list_highlight.pre]) {
        lis[pagedate.secondary_list_highlight.pre].style.color = 'white';
    }
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function () {
            for (let j = 0; j < lis.length; j++) {
                lis[j].style.color = '#869FB1';
            }
            this.style.color = 'white';
            pagedate.secondary_list_highlight.pre = i;
            localStorage.setItem('pagedate', JSON.stringify(pagedate));
        })
    }
}
secondary_list_highlight();
//渲染头像
function render_avatar() {
    let user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('user_avatar').src = user.user.useravatar;
    document.getElementById('user_name').innerHTML = user.user.nickname;
}
render_avatar();
//退出登录
function exit() {
    document.getElementById('exit').addEventListener('click', function () {
        location.href = 'index.html';
    });
    document.getElementById('exit').addEventListener('mouseenter', function () {
        this.src = './images/关机2.png'
    });
    document.getElementById('exit').addEventListener('mouseleave', function () {
        this.src = './images/关机1.png'
    });
}
exit();
//渲染目录收放btn
function render_navbtn() {
    let out_directory = document.getElementById('out_directory');
    let directory1 = document.getElementById('directory1');
    let directory2 = document.getElementById('directory2');
    let state = 'true';
    let text = document.getElementsByClassName('classify_text');
    directory2.addEventListener('click', function () {
        if (state = 'false') {
            state = 'true';
            out_directory.style.width = '220px';
            directory1.style.display = 'block';
            directory2.style.display = 'none';
            for (let i = 0; i < text.length; i++) {
                text[i].style.display = 'block';
            }
        }
    })
    document.getElementById('nav_btn').addEventListener('click', function () {
        if (state == 'true') {
            state = 'false';
            directory1.style.display = 'none';
            directory2.style.display = 'block';
            out_directory.style.width = '70px';
            for (let i = 0; i < text.length; i++) {
                text[i].style.display = 'none';
            }
        } else {
            state = 'true';
            directory1.style.display = 'block';
            directory2.style.display = 'none';
            out_directory.style.width = '220px';
            for (let i = 0; i < text.length; i++) {
                text[i].style.display = 'block';
            }
        }
    });
    //渲染下拉列表
    function fclis(name, h) {
        document.getElementsByClassName(name)[0].addEventListener('click', function () {
            let childname = `child_lis${name.substring(name.length-1,name.length)}`;
            let state = pagedate.directory[childname].state;
            let child = document.getElementsByClassName(childname)[0];
            if (state == 'true') {
                this.style.backgroundColor = '#131E26';
                this.style.color = 'white';
                state = 'false';
                child.style.height = `${h*46}px`;
                pagedate.directory[childname].value = h;
                pagedate.directory[childname].state = state;
                pagedate.directory[childname].p_bg = '#131E26';
                pagedate.directory[childname].color = 'white';
            } else {
                this.style.backgroundColor = '';
                this.style.color = '#869FB1';
                state = 'true'
                child.style.height = '0';
                pagedate.directory[childname].value = '0';
                pagedate.directory[childname].state = state;
                pagedate.directory[childname].p_bg = '';
                pagedate.directory[childname].color = '#869FB1';
            }
            localStorage.setItem('pagedate', JSON.stringify(pagedate));
            console.log('展开成功');
        })
    }
    fclis('flis1', '1');
    fclis('flis2', '3');
    fclis('flis3', '4');
}
render_navbtn();
// 用户列表渲染函数
function render_see_memberlist() {
    //获取数据并保存
    get('https://ty.php800.cn/api/member/search.php').then(res => {
        if (JSON.parse(res).verify === true) {
            localStorage.setItem('members', res);
        }
        topage();
    }).then(res => {
        document.getElementById('check_members_btn').addEventListener('click', function () {
            let pages_btn = document.getElementsByClassName('member_pages');
            for (let i = 0; i < pages_btn.length; i++) {
                pages_btn[i].classList.remove('on');
            }
            pages_btn[0].classList.add('on');
            render_memberlist(1);
        });
    });
    //单页用户列表渲染
    function render_memberlist(n) {
        get('https://ty.php800.cn/api/member/search.php').then(res => {
            if (JSON.parse(res).verify === true) {
                localStorage.setItem('members', res);
            }
        }).then(res => {
            n = n * 1;
            let members = JSON.parse(localStorage.getItem('members')).member;
            let s = JSON.parse(localStorage.getItem('roles'));
            let list = document.getElementsByClassName('checkmembers_li');
            //清空页内容
            for (let i = 0; i < 10; i++) {
                let span = list[i].getElementsByTagName('span');
                list[i].style.cursor = 'pointer';
                //清空行内容
                for (let k = 0; k <= 8; k++) {
                    span[k].innerHTML = '';
                }
            }
            for (let i = 0; i < 10; i++) {
                let span = list[i].getElementsByTagName('span');
                let j = i + 10 * (n - 1);
                for (let i = 0; i < list.length; i++) {
                    list[i].style.borderBottom = 'solid 1px rgb(240, 233, 233)';
                }
                if (members[j]) {
                    span[0].innerHTML = members[j].id;
                    span[1].innerHTML = members[j].nickname;
                    if (members[j].gender == '1') {
                        span[2].innerHTML = '男';
                    }
                    if (members[j].gender == '0') {
                        span[2].innerHTML = '女';
                    }
                    span[3].innerHTML = `${members[j].roleid}`;
                    s.forEach(res=>{
                        if (res.id==members[j].roleid){
                            span[3].innerHTML = res.rolename;
                        }
                    });
                    
                    span[4].innerHTML = `<img src=${members[j].useravatar} style="width:40px"></img>`;
                    let newtime = dealtime2(members[j].registrationtime * 1);
                    span[5].innerHTML = `${newtime}`;
                    span[6].innerHTML = members[j].phone;
                    span[7].innerHTML = members[j].email;
                    let lspan = document.createElement('span');
                    lspan.innerHTML = '查看';
                    lspan.setAttribute('id', j);
                    lspan.classList.add('chakan');
                    let rspan = document.createElement('span');
                    rspan.setAttribute('id', j);
                    rspan.classList.add('bianji');
                    rspan.innerHTML = '编辑';
                    span[8].appendChild(lspan);
                    span[8].appendChild(rspan);
                }
            }
            //如果电话和邮箱都为空，则证明这一栏没有数据，清除这一栏
            for (let i = 0; i < list.length; i++) {
                let span = list[i].getElementsByTagName('span');
                if (span[6].innerHTML == '' && span[7].innerHTML == '') {
                    list[i].style.borderBottom = 'solid 1px #FFFFFF';
                    list[i].style.cursor = 'default';
                }
            }
            pagedate.check_members.page_num = n;
            localStorage.setItem('pagedate', JSON.stringify(pagedate));
            //渲染玩列表后 渲染查看和编辑功能
            see_and_edit();
        })
    }
    //翻页效果渲染函数
    function topage() {
        let members = JSON.parse(localStorage.getItem('members')).member;
        let num = Math.ceil(members.length / 10);
        let list = document.getElementsByClassName('memberlist_nav')[0];
        //上一页
        let lspan = document.createElement('span');
        let limg = document.createElement('img');
        limg.src = './images/member_list/上一页.png';
        lspan.appendChild(limg);
        lspan.addEventListener('click', function () {
            let temp = pagedate.check_members.page_num;
            temp = temp * 1;
            if (temp >= 2) {
                temp = temp - 1;
                pagedate.check_members.page_num = temp;
                localStorage.setItem('pagedate', JSON.stringify(pagedate));
                render_memberlist(temp);
                //翻页高亮
                let pages_btn = document.getElementsByClassName('member_pages');
                for (let i = 0; i < pages_btn.length; i++) {
                    pages_btn[i].classList.remove('on');
                }
                pages_btn[temp - 1].classList.add('on');
            }
        });
        lspan.onmouseenter = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/c上一页.png';
        }
        lspan.onmouseleave = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/上一页.png';
        }
        list.appendChild(lspan);
        //翻页
        for (let i = 1; i <= num; i++) {
            let span = document.createElement('span');
            if (i == pagedate.check_members.page_num) {
                span.classList.add('on');
            }
            list.appendChild(span);
            span.innerHTML = i;
            span.classList.add('member_pages');
            span.addEventListener('click', function () {
                let n = this.innerHTML;
                pagedate.check_members.page_num = n;
                localStorage.setItem('pagedate', JSON.stringify(pagedate));
                render_memberlist(n);
                //翻页高亮
                let pages_btn = document.getElementsByClassName('member_pages');
                for (let i = 0; i < pages_btn.length; i++) {
                    pages_btn[i].classList.remove('on');
                }
                pages_btn[n - 1].classList.add('on');
            })
        }
        //下一页
        let rspan = document.createElement('span');
        let rimg = document.createElement('img');
        rimg.src = './images/member_list/下一页.png';
        rspan.appendChild(rimg);
        rspan.addEventListener('click', function () {
            let temp = pagedate.check_members.page_num;
            temp = temp * 1;
            if (temp <= num - 1) {
                temp = temp + 1;
                pagedate.check_members.page_num = temp;
                localStorage.setItem('pagedate', JSON.stringify(pagedate));
                render_memberlist(temp);
                //翻页高亮
                let pages_btn = document.getElementsByClassName('member_pages');
                for (let i = 0; i < pages_btn.length; i++) {
                    pages_btn[i].classList.remove('on');
                }
                pages_btn[temp - 1].classList.add('on');
            }
        });
        rspan.onmouseenter = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/c下一页.png';
        }
        rspan.onmouseleave = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/下一页.png';
        }
        list.appendChild(rspan);
        //默认渲染第一页
        render_memberlist(pagedate.check_members.page_num);
    }

    function see_and_edit() {
        let arr = JSON.parse(localStorage.getItem('members')).member;
        let sees = document.getElementsByClassName('chakan');
        let edits = document.getElementsByClassName('bianji');
        let tip = document.getElementById('edit_member');
        let see_member = document.getElementById('see_member');
        let id = '';
        for (let i = 0; i < sees.length; i++) {
            sees[i].addEventListener('click', function () {
                id = arr[sees[i].id].id;
                see_member.style.display = 'block';
                see_member.style.animationName = 'myalert2';
                get('https://ty.php800.cn/api/member/search.php').then(res => {
                    let mem = null;
                    if (JSON.parse(res).verify === true) {
                        mem = JSON.parse(res).member;
                    }
                    mem = JSON.parse(localStorage.getItem('members')).member;
                    mem.forEach(user => {
                        if (user.id == id) {
                            console.log(user);
                            if (user.gender == '0') {
                                user.gender = '女';
                            } else if (user.gender == '1') {
                                user.gender = '男';
                            }
                            see_member.innerHTML = `
                <div class="edit_member_li tips_li" >
                <span>ID</span>${user.id}
                </div>
                <div class="edit_member_li tips_li" >
                <span>用户名称</span>${user.nickname}
                </div>
                <div class="edit_member_li tips_li" >
                <span>性别</span>${user.gender}
                </div>
                <div class="edit_member_li tips_li" >
                <span>roleid</span>${user.roleid}
                </div>
                <div class="edit_member_li tips_li" >
                <span>手机</span>${user.phone}
                </div>
                <div class="edit_member_li tips_li" >
                <span>email</span>${user.email}
                </div>
                <div class="edit_member_li tips_li" style="height:100px">
                <span>头像</span><img src=${user.useravatar} style="width:100px;transform:none;"></img>
                </div>
                <div class="edit_member_li tips_li" style=" display:flex; justify-content: center; height:100px">
                <div id="right_see_member" class="tips_button">
                    确认
                </div>
                </div>
                      `;
                        }
                    });
                }).then(res => {
                    document.getElementById('right_see_member').addEventListener('click', function () {
                        see_member.style.display = 'none';
                        see_member.style.animationName = '';
                    })
                })
            });
            edits[i].addEventListener('click', function () {
                tip.style.display = 'block';
                tip.style.animationName = 'myalert2';
                id = arr[edits[i].id].id;
                console.log(id);
            })
        }
        //编辑用户时获取数据
        function edit_member_newmessage() {
            return new Promise(resolve => {
                let male = document.getElementById('edit_member_male');
                let famale = document.getElementById('edit_member_famale');
                let nickname = document.getElementById('edit_member_nickname').value;
                let roleid = document.getElementById('edit_member_roleid').value;
                let gender = '';
                if (male.checked) {
                    gender = male.value;
                } else if (famale.checked) {
                    gender = famale.value;
                }
                let authority = document.getElementById('edit_member_authority').value;
                let data = `id=${id}&nickname=${nickname}&roleid=${roleid}&gender=${gender}&authority=${authority}`;
                resolve(data);
            })
        }
        //编辑完重置数据
        function reset_edit_member_newmessage() {
            document.getElementById('edit_member_male').checked = false;;
            document.getElementById('edit_member_famale').checked = false;;
            document.getElementById('edit_member_nickname').value = '';
            document.getElementById('edit_member_roleid').value = '';
            document.getElementById('edit_member_authority').value = '';
            tip.style.display = 'none';
            tip.style.animationName = '';
            id = '';
        }
        //提交前正则验证数据
        function test_edit_member_newmessage() {
            let male = document.getElementById('edit_member_male');
            let famale = document.getElementById('edit_member_famale');
            let nickname = document.getElementById('edit_member_nickname').value;
            let roleid = document.getElementById('edit_member_roleid').value;
            let authority = document.getElementById('edit_member_authority').value;
            if (nickname == '') {
                myalert('用户名称不能为空', 'false');
                return false;
            } else if (roleid == '') {
                myalert('用户ID不能为空', 'false');
                return false;
            } else if (authority == '' || authority < 1 || authority > 9) {
                myalert('请填写正确的用户权限等级', 'false');
                return false;
            } else if (male.checked === false && famale.checked === false) {
                myalert('请选择性别', 'false');
                return false;
            } else {
                return true;
            }
        }

        function two_btn() {
            //提交修改
            document.getElementById('right_edit_member').addEventListener('click', function () {
                test_edit_member_newmessage();
                if (test_edit_member_newmessage()) {
                    edit_member_newmessage().then(res => {
                        post('https://ty.php800.cn/api/member/useredit.php', res).then(res => {
                            if (JSON.parse(res).verify === true) {
                                myalert('修改成功', 'true');
                                get(url).then(res => {
                                    localStorage.setItem('members', res);
                                }).then(res => {
                                    render_memberlist(pagedate.check_members.page_num);
                                });
                            } else if (JSON.parse(res).verify === false) {
                                myalert(JSON.parse(res).msg, 'false');
                            }
                        }).then(res => {
                            reset_edit_member_newmessage();
                        })
                    })
                }
                render_memberlist(pagedate.check_members.page_num);
            });
            //取消修改
            document.getElementById('cancel_edit_member').addEventListener('click', function () {
                reset_edit_member_newmessage();
            });
        }
        two_btn();
    }
}
render_see_memberlist();
//点击重新渲染

// 个人资料界面渲染函数
function render_personal_data() {
    function myavatar() {
        let user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('my_avatar').getElementsByTagName('img')[0].src = user.user.useravatar;
        document.getElementById('user_name2').innerHTML = user.user.nickname;
    }
    myavatar();
    //上传头像功能添加函数
    function upload_myavatar(id) {
        document.getElementById(id).addEventListener("change", function () {
            for (let i = 0; i < this.files.length; i++) {
                let file = this.files[i];
                let reader = new FileReader();
                let userid = JSON.parse(localStorage.getItem('user')).user.id;
                reader.onload = function (ev) {
                    let base64Str = ev.target.result;
                    //前端传Base64格式的图片或带有图片的富文本时，
                    //后台接受的字符串无法解析而前端控制台打印的是正确的。
                    //内容传到后台后文本中的"+"全部变为了空格
                    //使用正则将 + 替换成  转义的 +
                    base64Str = base64Str.replace(/\+/g, "%2B");
                    let obj = `userid=${userid}&base64=${base64Str}`;
                    post('https://ty.php800.cn/api/member/avatar.php', obj).then(res => {
                        console.log(JSON.parse(res));
                        if (JSON.parse(res).verify === true) {
                            myalert('上传成功！', 'true');
                            //换头像后将数据保存到本地
                            let user = JSON.parse(localStorage.getItem('user'));
                            user.user.useravatar = JSON.parse(res).dataPath;
                            localStorage.setItem('user', JSON.stringify(user));
                            //换头像后重新渲染头像
                            myavatar();
                            render_avatar();
                            show_article();
                        } else {
                            myalert('上传失败', false);
                        }

                    });
                    ///////////////////////
                }
                reader.readAsDataURL(file);
            }
        });
    }
    //通过id查找input 添加上传头像功能
    upload_myavatar("upload_avatar");
    upload_myavatar("upload_avatar2");
    //修改密码
    function change_password() {
        let tip = document.getElementById('change_password_tip');
        document.getElementById('change_password').addEventListener('click', function () {
            tip.style.display = 'block';
            tip.style.animationName = 'myalert2';
        });
        document.getElementById('right_change_password').addEventListener('click', function () {
            data().then(res => {
                post('https://ty.php800.cn/api/member/userPassword.php', res).then(res => {
                    if (JSON.parse(res).verify === true) {
                        myalert('修改成功,请重新登陆', 'true').then(res => {
                            reset_change_password();
                            location.href = './index.html';
                        })
                    } else if (JSON.parse(res).verify === false) {
                        console.log(JSON.parse(res));
                        myalert(JSON.parse(res).msg, 'false');
                    }
                })
            })
        })
        document.getElementById('cancel_change_password').addEventListener('click', function () {
            reset_change_password();
        })

        function reset_change_password() {
            tip.style.display = 'none';
            tip.style.animationName = '';
            document.getElementById('change_password_first').value = '';
            document.getElementById('change_password_second').value = '';
        }

        function data() {
            return new Promise(resolve => {
                let pw1 = document.getElementById('change_password_first').value;
                let pw2 = document.getElementById('change_password_second').value;
                let id = JSON.parse(localStorage.getItem('user')).user.id;
                let data = `id=${id}&password=${pw1}&password2=${pw2}`;
                resolve(data);
            })
        }
    }
    change_password();
    //文章展示
    function show_article() {
        function start_render() {
            //渲染之前先清除
            let ul = document.getElementById('personal_article');
            let lis = ul.getElementsByTagName('li');
            while (lis.length > 0) {
                ul.removeChild(lis[0]);
            }
            let articles = null;
            let users = null;
            return new Promise(resolve => {
                axios.get('https://ty.php800.cn/api/article/list.php').then(res => {
                    if (res.data.verify === true) {
                        articles = res.data.blogs;
                        localStorage.setItem('articles', JSON.stringify(articles));
                    } else {
                        articles = JSON.parse(localStorage.getItem('articles'));
                    }
                }).then(res => {
                    get('https://ty.php800.cn/api/member/search.php').then(res => {
                        if (JSON.parse(res).verify === true) {
                            localStorage.setItem('members', res);
                        }
                        users = JSON.parse(localStorage.getItem('members')).member;
                    }).then(res => {
                        let n = articles.length;
                        for (let i = n; i >= n - 10; i--) {
                            if (articles[i]) {
                                users.forEach(res => {
                                    if (res.id == articles[i].userid) {
                                        articles[i].userid = res.nickname;
                                        articles[i].useravatar = res.useravatar;
                                    }
                                });
                                let ul = document.getElementById('personal_article');
                                let li = document.createElement('li');
                                let img = document.createElement('img');
                                let span1 = document.createElement('span');
                                let span2 = document.createElement('span');
                                let span3 = document.createElement('span');
                                let span4 = document.createElement('span');
                                ul.appendChild(li);
                                li.appendChild(img);
                                img.src = `${articles[i].useravatar}`;
                                li.appendChild(span1);
                                li.appendChild(span2);
                                li.appendChild(span3);
                                li.appendChild(span4);
                                span1.innerText = `${articles[i].userid}`;
                                span2.innerText = `发布了一篇文章`;
                                span3.innerText = `${articles[i].title}`;
                                let newtime = dealtime(articles[i].datetime * 1);
                                span4.innerHTML = `${newtime}`;
                                li.addEventListener('click', function () {
                                    let tip = document.getElementById('see_this_article');
                                    tip.style.display = 'flex';
                                    tip.style.animationName = 'myalert2';
                                    tip.innerHTML = `<div id="see_this_article_area" style="flex: 1;overflow:scroll;text-overflow: ellipsis;padding:20px 0;">${articles[i].body}</div>
                        <div class="tips_li" style="display: flex; justify-content: center; align-items: center;">
                            <div id="right_see_this_article" class="tips_button" >
                                我知道了
                            </div>
                        </div>`;
                                    document.getElementById('right_see_this_article').addEventListener('click', function () {
                                        tip.style.display = 'none';
                                        tip.style.animationName = '';
                                        tip.innerHTML = '';
                                    })
                                })
                            }
                        }
                    })
                })
            })
        }
        start_render()
    }
    show_article();
}
render_personal_data();
// 添加会员界面渲染函数
function render_add_members() {
    //角色选择下拉列表渲染
    function choose_role() {
        let state = 'true';
        let screen = document.getElementById('choose_role');
        let list = document.getElementById('choose_list');
        let lis = list.getElementsByTagName('li');
        screen.addEventListener('click', function () {
            if (state == 'true') {
                state = 'false';
                list.style.display = 'block';
            } else {
                state = 'true';
                list.style.display = 'none';
            }
        })
        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', function () {
                state = 'true';
                list.style.display = 'none';
                if (this.id == '-1') {
                    screen.value = '空';
                } else if (this.id > 30) {
                    screen.value = '超级会员';
                } else {
                    screen.value = '普通会员';
                }
                screen.style.color = 'black';
            })
        }
    }
    choose_role();
    //单选框传值
    function choose_sex() {
        let lis = document.getElementsByClassName('add_radio_li')[0].getElementsByTagName('input');
        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', function () {
                document.getElementsByClassName('add_radio_li')[0].id = this.id;
            })
        }
    }
    choose_sex();
    //添加会员函数
    let useravatar = '';
    document.getElementById('c_avatar').addEventListener("change", function () {
        for (let i = 0; i < this.files.length; i++) {
            let file = this.files[i];
            let reader = new FileReader();
            reader.onload = function (ev) {
                let base64Str = ev.target.result;
                document.getElementById('pre_avatar').src = ev.target.result;
                document.getElementById('pre_avatar').style.opacity = '1';
                //前端传Base64格式的图片或带有图片的富文本时，
                //后台接受的字符串无法解析而前端控制台打印的是正确的。
                //内容传到后台后文本中的"+"全部变为了空格
                //使用正则将 + 替换成  转义的 +
                base64Str = base64Str.replace(/\+/g, "%2B");
                useravatar = base64Str;
            }
            reader.readAsDataURL(file);
        }
    });

    function add_members() {
        let nickname = document.getElementById('c_nickname').value;
        let phone = document.getElementById('c_phone').value;
        let email = document.getElementById('c_email').value;
        let password = document.getElementById('c_password').value;
        let password2 = document.getElementById('c_password2').value;
        let roleid = document.getElementById('choose_role').value;
        //注册头像

        if (roleid = '超级会员') {
            roleid = 35;
        } else if (roleid = '普通会员') {
            roleid = 0;
        }
        let gender = document.getElementsByClassName('add_radio_li')[0].id;
        //正则验证
        if (!(/^1[3-9]\d{9}$/.test(phone))) {
            myalert("请填写正确的手机号码", 'false');
        } else if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))) {
            myalert("请填写正确的邮箱", 'false');
        } else if (password == '') {
            myalert("请填写密码", 'false');
        } else if (password2 == '') {
            myalert("请确认密码", 'false');
        } else if (password != password2) {
            myalert("两次密码不一致", 'false');
        } else {
            //正则验证成功请求数据
            let user = `nickname=${nickname}&phone=${phone}&email=${email}&useravatar=${useravatar}&password=${password}&password2=${password2}&roleid=${roleid}&gender=${gender}`;
            post('https://ty.php800.cn/api/member/userregister.php', user).then(res => {
                if (JSON.parse(res).verify === false) {
                    myalert(JSON.parse(res).msg, 'false');
                } else if (JSON.parse(res).verify === true) {
                    myalert('添加成功', 'true');
                }
            });
        }
    }
    // 重制数据
    function reset_add_members() {
        document.getElementById('c_nickname').value = '';
        document.getElementById('c_phone').value = '';
        document.getElementById('c_email').value = '';
        useravatar = '';
        document.getElementById('c_avatar').file = [];
        document.getElementById('pre_avatar').src = '';
        document.getElementById('pre_avatar').style.opacity = '0';
        document.getElementById('c_password').value = '';
        document.getElementById('c_password2').value = '';
        document.getElementById('choose_role').value = '请选择角色';
        document.getElementById('choose_role').style.color = '#D4D7DC';
        document.getElementsByClassName('add_radio_li')[0].id = '';
        document.getElementsByClassName('add_radio_li')[0].getElementsByTagName('input')[0].checked = false;
        document.getElementsByClassName('add_radio_li')[0].getElementsByTagName('input')[1].checked = false;
        myalert('重置成功', 'true')
    }
    //点击按钮 发送请求
    document.getElementById('create_member').addEventListener('click', function () {
        add_members();
    });
    //点击按钮 重制数据
    document.getElementById('reset_member').addEventListener('click', function () {
        reset_add_members();
    })
}
render_add_members();
//角色列表渲染函数
function render_role_list() {
    axios.get('https://ty.php800.cn/api/member/role.php').then(res => {
        localStorage.setItem('roles', JSON.stringify(res.data.role));
        start_render(pagedate.role_list.page_num);
    });

    function start_render(n) {
        axios.get('https://ty.php800.cn/api/member/role.php').then(res => {
            localStorage.setItem('roles', JSON.stringify(res.data.role));
        }).then(res => {
            //清除函数
            let role_lis = document.getElementsByClassName('role_li');
            while (role_lis.length > 1) {
                document.getElementById('my_role_list').removeChild(document.getElementsByClassName('role_li')[1]);
            }
            //渲染
            let roles = JSON.parse(localStorage.getItem('roles'));
            let list = document.getElementById('my_role_list');
            for (let i = (n - 1) * 10; i <= (n - 1) * 10 + 9; i++) {
                if (!roles[(n - 1) * 10]) {
                    n = n - 1;
                    start_render(n);
                } else if (roles[i]) {
                    let li = document.createElement('li');
                    li.classList.add('role_li')
                    list.appendChild(li);
                    let span1 = document.createElement('span');
                    let span2 = document.createElement('span');
                    let span3 = document.createElement('span');
                    let span4 = document.createElement('span');
                    let span5 = document.createElement('span');
                    //
                    span5.innerHTML = '编辑';
                    span5.setAttribute('id', 'role_edit');
                    span5.classList.add(`role_edit`);
                    //
                    let span6 = document.createElement('span');
                    span6.innerHTML = '删除';
                    span6.setAttribute('id', 'role_delete');
                    span6.classList.add(`role_delete`);
                    span1.innerHTML = roles[i].id;
                    span2.innerHTML = roles[i].rolename;
                    span3.innerHTML = roles[i].roleauth;
                    span4.appendChild(span5);
                    span4.appendChild(span6);
                    li.appendChild(span1);
                    li.appendChild(span2);
                    li.appendChild(span3);
                    li.appendChild(span4);
                }

            }
        }).then(res => {
            //点击删除
            function my_role_delete() {
                let roles = JSON.parse(localStorage.getItem('roles'));
                let btns = document.getElementsByClassName('role_delete');
                let deleteid = '';
                for (let i = 0; i < btns.length; i++) {
                    btns[i].addEventListener('click', function () {
                        deleteid = roles[i].id;
                        let data = {
                            params: {
                                id: deleteid
                            }
                        };
                        //这里遇到一个问题，使用原生ajax发送字符串'id=xx'时服务器接收不到
                        axios.get('https://ty.php800.cn/api/member/roledel.php', data).then(res => {
                            if (res.data.verify === true) {
                                myalert('删除成功', 'true');
                                start_render(pagedate.role_list.page_num);
                            } else if (res.data.verify === false) {
                                myalert(res.data.msg, 'false');
                            }
                        })
                    });
                }
            }
            my_role_delete();
            //编辑角色
            function role_edit() {
                let roles = JSON.parse(localStorage.getItem('roles'));
                let area = document.getElementById('change_role');
                let id = '';

                function btn_to_change() {
                    let btns = document.getElementsByClassName('role_edit');
                    let area = document.getElementById('change_role');
                    for (let i = 0; i < btns.length; i++) {
                        btns[i].addEventListener('click', function () {
                            area.style.animationName = 'myalert2';
                            area.style.display = 'block';
                            id = roles[i].id;
                        });
                    }

                }
                btn_to_change();
                //修改角色
                function right_to_change() {
                    document.getElementById('change_role_create').addEventListener('click', function () {
                        let s1 = document.getElementById('change_systemindex');
                        let s2 = document.getElementById('change_articleindex');
                        let s3 = document.getElementById('change_memberindex');
                        let arr = [];
                        if (s1.checked) {
                            s1.value = 'SystemIndex';
                            arr.push(s1.value);
                        }
                        if (s2.checked) {
                            s2.value = 'ArticleIndex';
                            arr.push(s2.value);
                        }
                        if (s3.checked) {
                            s3.value = 'MemberIndex';
                            arr.push(s3.value);
                        }
                        let rolename = document.getElementById('change_role_name').value;
                        let roleauth = arr.join(",");
                        let data = `rolename=${rolename}&roleauth=${roleauth}&id=${id}`;
                        post('https://ty.php800.cn/api/member/roleedit.php', data).then(res => {
                            console.log(JSON.parse(res));
                            if (JSON.parse(res).verify === true) {
                                myalert('修改成功', 'true');
                                area.style.display = 'none';
                                area.style.animationName = '';
                                s1.checked = false;
                                s1.value = '';
                                s2.checked = false;
                                s2.value = '';
                                s3.checked = false;
                                s3.value = '';
                                arr = [];
                                start_render(pagedate.role_list.page_num);
                            } else if (JSON.parse(res).verify === false) {
                                myalert(JSON.parse(res).msg, 'false');
                            }

                        })
                    })
                }
                right_to_change();
                //取消修改
                function quxiao_change() {
                    document.getElementById('cancel_changerole').addEventListener('click', function () {
                        let s1 = document.getElementById('change_systemindex');
                        let s2 = document.getElementById('change_articleindex');
                        let s3 = document.getElementById('change_memberindex');
                        document.getElementById('change_role_name').value = '';
                        s1.checked = false;
                        s1.value = '';
                        s2.checked = false;
                        s2.value = '';
                        s3.checked = false;
                        s3.value = '';
                        area.style.display = 'none';
                        area.style.animationName = '';
                        arr = [];
                    })
                }
                quxiao_change();
            }
            role_edit();
        }).then(res => {
            divide_page();
        }).then(res => {
            //渲染高亮
            let nav = document.getElementById('my_role_list').getElementsByClassName('memberlist_nav')[0].getElementsByClassName('member_pages');
            if (document.getElementById('my_role_list').getElementsByClassName('role_on')[0]) {
                document.getElementById('my_role_list').getElementsByClassName('role_on')[0].classList.remove('role_on');
            }
            nav[n - 1].classList.add('role_on');
            //将当前页数存取方便下次读取
            pagedate = JSON.parse(localStorage.getItem('pagedate'));
            pagedate.role_list.page_num = n;
            localStorage.setItem('pagedate', JSON.stringify(pagedate));
        })
    }
    //分页
    function divide_page() {
        if (document.getElementById('role_list').getElementsByClassName('memberlist_nav')[0]) {
            let nav = document.getElementById('role_list').getElementsByClassName('memberlist_nav')[0];
            document.getElementById('my_role_list').removeChild(nav);
        }
        let roles = JSON.parse(localStorage.getItem('roles'));
        let num = Math.ceil(roles.length / 10);
        let list = document.createElement('div');
        list.classList.add('memberlist_nav');
        list.setAttribute('id', 'role_list_nav');
        let role_list = document.getElementById('my_role_list');
        role_list.appendChild(list);
        //上一页
        let lspan = document.createElement('span');
        let limg = document.createElement('img');
        limg.src = './images/member_list/上一页.png';
        lspan.appendChild(limg);
        lspan.addEventListener('click', function () {
            let temp = pagedate.role_list.page_num;
            temp = temp * 1;
            console.log(temp);
            if (temp >= 2) {
                temp = temp - 1;
                start_render(temp);
            }
        });
        lspan.onmouseenter = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/c上一页.png';
        }
        lspan.onmouseleave = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/上一页.png';
        }
        list.appendChild(lspan);
        //翻页
        for (let i = 1; i <= num; i++) {
            let span = document.createElement('span');
            list.appendChild(span);
            span.innerHTML = i;
            span.classList.add('member_pages');
            span.addEventListener('click', function () {
                let temp = this.innerHTML;
                start_render(temp);
            })
        }
        //下一页
        let rspan = document.createElement('span');
        let rimg = document.createElement('img');
        rimg.src = './images/member_list/下一页.png';
        rspan.appendChild(rimg);
        rspan.addEventListener('click', function () {
            let temp = pagedate.role_list.page_num;
            temp = temp * 1;
            console.log(temp);
            if (temp <= num - 1) {
                temp = temp + 1;
                start_render(temp);
            }
        });
        rspan.onmouseenter = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/c下一页.png';
        }
        rspan.onmouseleave = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/下一页.png';
        }
        list.appendChild(rspan);
    }

    //查看角色和增加角色两个按钮
    function two_btn() {
        document.getElementById('role_addrole').addEventListener('click', function () {
            document.getElementById('my_role_list').style.display = 'none';
            document.getElementById('add_role').style.display = 'block';
            pagedate.role_list.my_role_list = 'none';
            pagedate.role_list.add_role = 'block';
            localStorage.setItem('pagedate', JSON.stringify(pagedate));
        });
        document.getElementById('role_seerole').addEventListener('click', function () {
            document.getElementById('my_role_list').style.display = 'block';
            document.getElementById('add_role').style.display = 'none';
            pagedate.role_list.my_role_list = 'block';
            pagedate.role_list.add_role = 'none';
            localStorage.setItem('pagedate', JSON.stringify(pagedate));
            start_render(1);
        });
    }
    two_btn();

    //点击增加角色按钮 发送请求
    function create_myrole() {
        let add = document.getElementById('add_role_create');
        add.addEventListener('click', function () {
            let rolename = document.getElementById('role_name').value;
            let s1 = document.getElementById('systemindex');
            let s2 = document.getElementById('articleindex');
            let s3 = document.getElementById('memberindex');
            let arr = []
            if (s1.checked) {
                s1.value = 'SystemIndex';
                arr.push(s1.value);
            }
            if (s2.checked) {
                s2.value = 'ArticleIndex';
                arr.push(s2.value);
            }
            if (s3.checked) {
                s3.value = 'MemberIndex';
                arr.push(s3.value);
            }
            let roleauth = arr.join(",");
            let role = `rolename=${rolename}&roleauth=${roleauth}`;
            post('https://ty.php800.cn/api/member/roleadd.php', role).then(res => {
                if (JSON.parse(res).verify === true) {
                    myalert('添加成功', 'true');
                    s1.checked = false;
                    s1.value = '';
                    s2.checked = false;
                    s2.value = '';
                    s3.checked = false;
                    s3.value = '';
                    arr = [];
                } else if (JSON.parse(res).verify === false) {
                    myalert(JSON.parse(res).msg, 'false');
                }
            })
        })
    }
    create_myrole();
    //点击角色管理展开界面
    document.getElementById('role_list_btn').addEventListener('click', function () {
        document.getElementById('my_role_list').style.display = 'block';
        document.getElementById('add_role').style.display = 'none';
        pagedate.role_list.my_role_list = 'block';
        pagedate.role_list.add_role = 'none';
        localStorage.setItem('pagedate', JSON.stringify(pagedate));
    });

}
render_role_list();
//文章管理
//查看文章
function render_article_list() {
    axios.get('https://ty.php800.cn/api/article/list.php', {
        params: {
            userid: 72
        }
    }).then(res => {
        res = res.data.blogs;
        localStorage.setItem('myarticles', JSON.stringify(res));
        start_render(pagedate.see_article.page_num);
    });

    function start_render(n) {
        axios.get('https://ty.php800.cn/api/article/list.php', {
            params: {
                userid: 72
            }
        }).then(res => {
            if (res.data.verify === true) {
                res = res.data.blogs;
                localStorage.setItem('myarticles', JSON.stringify(res));
            } else {
                myalert(res.data.verify, 'false');
            }
        }).then(res => {
            axios.get('https://ty.php800.cn/api/article/classshow.php').then(res => {
                if (res.data.verify === true) {
                    res = res.data.classType;
                    localStorage.setItem('labels', JSON.stringify(res));
                } else {
                    myalert(res.data.msg, 'false');
                }
            }).then(res => {
                //清除函数
                let article_lis = document.getElementById('see_article_area').getElementsByClassName('my_article_list');
                while (article_lis.length > 1) {
                    document.getElementById('see_article_area').removeChild(document.getElementsByClassName('my_article_list')[1]);
                }
                //渲染
                let article = JSON.parse(localStorage.getItem('myarticles'));
                let labels = JSON.parse(localStorage.getItem('labels'));
                let list = document.getElementById('see_article_area');
                for (let i = (n - 1) * 10; i <= (n - 1) * 10 + 9; i++) {
                    if (article[i]) {
                        let li = document.createElement('li');
                        li.classList.add('my_article_list');
                        li.classList.add('my_article_li');
                        list.appendChild(li);
                        let span1 = document.createElement('span');
                        let span2 = document.createElement('span');
                        let span3 = document.createElement('span');
                        let span4 = document.createElement('span');
                        let span5 = document.createElement('span');
                        span1.innerHTML = article[i].id;
                        span2.innerHTML = article[i].title;
                        span3.innerHTML = '无分类';
                        labels.forEach(res => {
                            if (res.id == article[i].classid) {
                                span3.innerHTML = res.title;
                            }
                        })
                        if (article[i].body.length > 20) {
                            span4.innerHTML = `${article[i].body.slice(0,20)}......`;
                        } else {
                            span4.innerHTML = `${article[i].body}`;
                        }
                        span5.innerHTML = `<span style="color: #409EFF;">查看</span>`;
                        span5.addEventListener('click', function () {
                            let tip = document.getElementById('see_this_article');
                            tip.style.display = 'flex';
                            tip.style.animationName = 'myalert2';
                            tip.innerHTML = `<div id="see_this_article_area" style="flex: 1;overflow:scroll;text-overflow: ellipsis;padding:20px 0;">${article[i].body}</div>
                        <div class="tips_li" style="display: flex; justify-content: center; align-items: center;">
                            <div id="right_see_this_article" class="tips_button" >
                                我知道了
                            </div>
                        </div>`;
                            document.getElementById('right_see_this_article').addEventListener('click', function () {
                                tip.style.display = 'none';
                                tip.style.animationName = '';
                                tip.innerHTML = '';
                            })
                        });
                        li.appendChild(span1);
                        li.appendChild(span2);
                        li.appendChild(span3);
                        li.appendChild(span4);
                        li.appendChild(span5);
                    }
                }
            })
        }).then(res => {
            let list = document.getElementById('see_article_area');
            list.onclick = function (e) {
                if (e.target.nodeName == 'LI' && e.target.classList.contains('my_article_li')) {
                    console.log(e.target);
                } else if (e.target.parentNode.nodeName == 'LI' && e.target.parentNode.classList.contains('my_article_li')) {
                    console.log(e.target.parentNode);
                }
            }
            divide_page();
        }).then(res => {
            //渲染高亮
            let nav = document.getElementById('see_article').getElementsByClassName('memberlist_nav')[0].getElementsByClassName('member_pages');
            if (document.getElementById('see_article').getElementsByClassName('role_on')[0]) {
                document.getElementById('see_article').getElementsByClassName('role_on')[0].classList.remove('role_on');
            }
            nav[n - 1].classList.add('role_on');
            //将当前页数存取方便下次读取
            pagedate.see_article.page_num = n;
            localStorage.setItem('pagedate', JSON.stringify(pagedate));
        });
    }
    //分页
    function divide_page() {
        if (document.getElementById('see_article_area').getElementsByClassName('memberlist_nav')[0]) {
            let nav = document.getElementById('see_article_area').getElementsByClassName('memberlist_nav')[0];
            document.getElementById('see_article_area').removeChild(nav);
        }
        let roles = JSON.parse(localStorage.getItem('myarticles'));
        let num = Math.ceil(roles.length / 10);
        let list = document.createElement('div');
        list.classList.add('memberlist_nav');
        list.setAttribute('id', 'role_list_nav');
        let role_list = document.getElementById('see_article_area');
        role_list.appendChild(list);
        //上一页
        let lspan = document.createElement('span');
        let limg = document.createElement('img');
        limg.src = './images/member_list/上一页.png';
        lspan.appendChild(limg);
        lspan.addEventListener('click', function () {
            let temp = pagedate.see_article.page_num;
            temp = temp * 1;
            console.log(temp);
            if (temp >= 2) {
                temp = temp - 1;
                start_render(temp);
            }
        });
        lspan.onmouseenter = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/c上一页.png';
        }
        lspan.onmouseleave = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/上一页.png';
        }
        list.appendChild(lspan);
        //翻页
        for (let i = 1; i <= num; i++) {
            let span = document.createElement('span');
            list.appendChild(span);
            span.innerHTML = i;
            span.classList.add('member_pages');
            span.addEventListener('click', function () {
                let temp = this.innerHTML;
                start_render(temp);
            })
        }
        //下一页
        let rspan = document.createElement('span');
        let rimg = document.createElement('img');
        rimg.src = './images/member_list/下一页.png';
        rspan.appendChild(rimg);
        rspan.addEventListener('click', function () {
            let temp = pagedate.see_article.page_num;
            temp = temp * 1;
            console.log(temp);
            if (temp <= num - 1) {
                temp = temp + 1;
                start_render(temp);
            }
        });
        rspan.onmouseenter = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/c下一页.png';
        }
        rspan.onmouseleave = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/下一页.png';
        }
        list.appendChild(rspan);
    }
    document.getElementById('see_article_btn').addEventListener('click', function () {
        start_render(1);
    })
}
render_article_list();
//发布文章
function add_article() {
    //渲染界面
    let label = document.getElementById('choose_article_class');
    //富文本编辑框
    const E = window.wangEditor
    const editor = new E(document.getElementById('article_editor'));
    editor.create();

    //获取数据
    function getmessage() {
        let userid = JSON.parse(localStorage.getItem('user')).user.id;
        let body = editor.txt.text();
        let title = document.getElementById('article_title').value;
        let classid = label.value;
        let data = '';
        return new Promise(resolve => {
            if (title == '') {
                myalert('标题不能为空', 'false');
            } else if (classid == '') {
                myalert('文章分类不能为空', 'false');
            } else if (body == '') {
                myalert('文章内容不能为空', 'false');
            } else {
                axios.get('https://ty.php800.cn/api/article/classshow.php').then(res => {
                    if (res.data.classType.some(res => {
                            return res.title == classid
                        })) {
                        console.log(1);
                        res.data.classType.forEach(res => {
                            if (res.title == classid) {
                                classid = res.id;
                            }
                        });
                        data = `title=${title}&userid=${userid}&classid=${classid}&body=${body}`;
                        resolve(data);
                    } else {
                        myalert('请填写正确的分类', 'false');
                    }
                })
            }
        });
    }
    //重置
    function reset() {
        return new Promise(resolve => {
            document.getElementById('article_title').value = '';
            editor.txt.clear();
            label.value = '';
            resolve('重置成功');
        })
    }
    //点击提交数据
    document.getElementById('right_add_article').addEventListener('click', function () {
        getmessage().then(res => {
            console.log(res);
            post('https://ty.php800.cn/api/article/post.php', res).then(res => {
                console.log(JSON.parse(res));
                if (JSON.parse(res).verify === true) {
                    myalert('发布成功', 'true');
                } else if (JSON.parse(res).verify === false) {
                    myalert(JSON.parse(res).msg, 'false');
                }
            })
        });
    });
    //点击重置数据
    document.getElementById('cancel_add_article').addEventListener('click', function () {
        reset().then(res => {
            myalert(res, 'true');
        })
    });
}
add_article();

//查看分类list
function label_list() {
    axios.get('https://ty.php800.cn/api/article/classshow.php').then(res => {
        if (res.data.verify === true) {
            res = res.data.classType;
            localStorage.setItem('labels', JSON.stringify(res));
            start_render(pagedate.label_list.page_num);
        } else {
            myalert(res.data.msg, 'false');
        }
    });

    function start_render(n) {
        axios.get('https://ty.php800.cn/api/article/classshow.php').then(res => {
            if (res.data.verify === true) {
                res = res.data.classType;
                localStorage.setItem('labels', JSON.stringify(res));
            } else {
                myalert(res.data.msg, 'false');
            }
        }).then(res => {
            //清除函数
            let label_lis = document.getElementById('my_label_list').getElementsByClassName('label_li');
            while (label_lis.length > 1) {
                document.getElementById('my_label_list').removeChild(document.getElementById('my_label_list').getElementsByClassName('label_li')[1]);
            };
            //渲染
            let labels = JSON.parse(localStorage.getItem('labels'));
            let list = document.getElementById('my_label_list');
            for (let i = (n - 1) * 10; i <= (n - 1) * 10 + 9; i++) {
                if (!labels[(n - 1) * 10]) {
                    n = n - 1;
                    start_render(n);
                } else if (labels[i]) {
                    let li = document.createElement('li');
                    li.classList.add('my_label_li');
                    li.classList.add('label_li');
                    list.appendChild(li);
                    let span1 = document.createElement('span');
                    let span2 = document.createElement('span');
                    let span3 = document.createElement('span');
                    span1.innerHTML = labels[i].id;
                    span2.innerHTML = labels[i].title;
                    span3.innerHTML = `<span id='delete_this_label' style="color: #409EFF;">删除</span>`;
                    li.appendChild(span1);
                    li.appendChild(span2);
                    li.appendChild(span3);
                }

            }
        }).then(res => {
            //事件委托点击删除
            let list = document.getElementById('my_label_list');
            list.onclick = function (e) {
                if (e.target.id == 'delete_this_label') {
                    let classid = e.target.parentNode.parentNode.childNodes[0].innerHTML;
                    axios.get('https://ty.php800.cn/api/article/classdel.php', {
                        params: {
                            id: classid
                        }
                    }).then(res => {
                        if (res.data.verify === true) {
                            myalert('删除成功', 'true');
                            start_render(pagedate.label_list.page_num);
                        } else if (res.data.verify === false) {
                            myalert(res.data.verify, 'false');
                        }
                    })
                }
            }
            divide_page();
        }).then(res => {
            //渲染高亮
            let nav = document.getElementById('label_list').getElementsByClassName('memberlist_nav')[0].getElementsByClassName('member_pages');
            if (document.getElementById('label_list').getElementsByClassName('role_on')[0]) {
                document.getElementById('label_list').getElementsByClassName('role_on')[0].classList.remove('role_on');
            }
            nav[n - 1].classList.add('role_on');
            //将当前页数存取方便下次读取
            pagedate.label_list.page_num = n;
            localStorage.setItem('pagedate', JSON.stringify(pagedate));
        });
    }
    //分页
    function divide_page() {
        if (document.getElementById('label_list').getElementsByClassName('memberlist_nav')[0]) {
            let nav = document.getElementById('label_list').getElementsByClassName('memberlist_nav')[0];
            document.getElementById('label_list').removeChild(nav);
        }
        let roles = JSON.parse(localStorage.getItem('labels'));
        let num = Math.ceil(roles.length / 10);
        let list = document.createElement('div');
        list.classList.add('memberlist_nav');
        list.setAttribute('id', 'role_list_nav');
        let role_list = document.getElementById('label_list');
        role_list.appendChild(list);
        //上一页
        let lspan = document.createElement('span');
        let limg = document.createElement('img');
        limg.src = './images/member_list/上一页.png';
        lspan.appendChild(limg);
        lspan.addEventListener('click', function () {
            let temp = pagedate.label_list.page_num;
            temp = temp * 1;
            console.log(temp);
            if (temp >= 2) {
                temp = temp - 1;
                start_render(temp);
            }
        });
        lspan.onmouseenter = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/c上一页.png';
        }
        lspan.onmouseleave = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/上一页.png';
        }
        list.appendChild(lspan);
        //翻页
        for (let i = 1; i <= num; i++) {
            let span = document.createElement('span');
            list.appendChild(span);
            span.innerHTML = i;
            span.classList.add('member_pages');
            span.addEventListener('click', function () {
                let temp = this.innerHTML;
                start_render(temp);
            })
        }
        //下一页
        let rspan = document.createElement('span');
        let rimg = document.createElement('img');
        rimg.src = './images/member_list/下一页.png';
        rspan.appendChild(rimg);
        rspan.addEventListener('click', function () {
            let temp = pagedate.label_list.page_num;
            temp = temp * 1;
            console.log(temp);
            if (temp <= num - 1) {
                temp = temp + 1;
                start_render(temp);
            }
        });
        rspan.onmouseenter = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/c下一页.png';
        }
        rspan.onmouseleave = function () {
            this.getElementsByTagName('img')[0].src = './images/member_list/下一页.png';
        }
        list.appendChild(rspan);
    }
    //点击默认渲染第一页
    document.getElementById('label_list_btn').addEventListener('click', function () {
        start_render(1);
    });
}
label_list();
//添加分类
function add_label() {
    let btn = document.getElementById('right_add_label');
    let title = document.getElementById('new_label_name');

    function getmessage() {
        if (title != '') {
            return new Promise(resolve => {
                let data = `title=${title.value}`;
                resolve(data);
            });
        } else {
            myalert('分类名称不能为空', 'false');
            return false;
        }
    }

    function reset() {
        title.value = '';
    }
    btn.addEventListener('click', function () {
        if (getmessage()) {
            getmessage().then(res => {
                post('https://ty.php800.cn/api/article/classadd.php', res).then(res => {
                    res = JSON.parse(res);
                    if (res.verify === true) {
                        myalert('添加成功', 'true');
                        reset();
                    } else if (res.verify === false) {
                        myalert(res.msg, 'false');
                    }
                })
            })
        }
    })
}
add_label();