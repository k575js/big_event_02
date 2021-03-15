$(() => {
    // 需求1 自定义表单验证
    layui.form.verify({
        nickname: function (val) {
            if (val.length < 1 || val.length > 6) {
                return '用户昵称必须在1-6位之间!!'
            }
        }
    })

    // 需求2 发送ajax请求获取用户的基本信息 对表单赋值
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: (res) => {
                console.log(res);
                layui.form.val("userInfoForm", res.data);
            }
        })
    }


    //需求3  点击重置按钮 重置信息
    $('#btnReset').on('click', (e) => {
        e.preventDefault();
        initUserInfo()
    })

    //需求4 点击提交修改 提交表单 更新用户数据
    $('form').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $('form').serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layui.layer.msg('修改用户信息失败')
                layui.layer.msg('修改用户信息成功!')
                // 左侧导航栏 更新用户名字
                window.parent.getUserInfo()
            }
        })
    })

})