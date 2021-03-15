$(function () {
    // 需求1 获取用户信息
    getUserInfo()

    // 需求2 退出后台系统
    $('#logout').on('click', () => {
        // 1. 提示询问框 询问是否真的退出(使用layui的询问框)
        // 2. 用户点击询问框确认按钮后
        layui.layer.confirm('是否退出后台界面', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地token 2.页面跳转
            localStorage.removeItem('token')
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);

        });

    })

})
// 封装一个函数 用于发送ajax请求 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        // data: {},   无需传参数 不过需要设置header
        success: (res) => {
            console.log(res);
            if (res.status == 1) return;
            let { nickname, user_pic, username } = res.data;
            // 获取用户信息成功后 修改页面 左侧导航栏头部的 用户名 (有nickname 用nickname 没有就用用户名)
            nickname ? $('.welcome').html('欢迎 ' + nickname) : $('.welcome').html('欢迎' + username);
            // 修改用户的头像 (有头像照片就用照片 没有就用用户名字首字母大写
            user_pic ? $('.layui-nav-img').show().attr('src', user_pic).siblings('.headPortraits').hide() : $('.headPortraits').show().html(username[0].toUpperCase()).siblings('img').hide()
        }
    })
}