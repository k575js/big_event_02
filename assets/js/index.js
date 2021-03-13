$(function () {
    // 需求1 获取用户信息
    getUserInfo()


})
// 封装一个函数 用于发送ajax请求 获取用户信息
function getUserInfo() {
    $.ajax({
        url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
        type: 'get',
        // data: {},   无需传参数 不过需要设置header
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        success: (res) => {
            console.log(res);
            let { nickname, user_pic, username } = res.data;
            // 获取用户信息成功后 修改页面 左侧导航栏头部的 用户名 (有nickname 用nickname 没有就用用户名)
            nickname ? $('.welcome').html(nickname) : $('.welcome').html('欢迎' + username);
            // 修改用户的头像 (有头像照片就用照片 没有就用用户名字首字母大写
            user_pic ? $('.layui-nav-img').show().attr('src', user_pic).siblings('.headPortraits').hide() : $('.headPortraits').show().html(username[0].toUpperCase()).siblings('img').hide()
        }
    })
}