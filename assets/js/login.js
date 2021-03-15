$(function () {
    // 需求1 点击表单右下角链接 切换登录/注册界面
    $('#toReg').on('click', (e) => {
        e.preventDefault();
        $('.loginBox').hide().siblings('.regBox').show();
    })
    $('#toLogin').on('click', (e) => {
        e.preventDefault();
        $('.regBox').hide().siblings('.loginBox').show();
    })

    // 需求2 使用layui框架 自定义表单校验
    layui.form.verify({
        // verify()的参数 是一个对象 
        // 属性是校验规则的名称  值可以是函数或者数组
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            if (value != $('#regForm input[name=password]').val()) return '两次密码输入不正确';
        }
    })

    // 需求3 注册事件
    $('#regForm').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('#regForm input[name=username]').val(),
                password: $('#regForm input[name=password]').val(),
            },
            success: (res) => {
                if (res.status != 0) return layui.layer.msg(res.message, { icon: 5 });
                layui.layer.msg('注册成功!', { icon: 6 });      //提示注册成功
                $('#regForm')[0].reset();  //清空注册表单
                $('#toLogin').click();  //切换到登录界面
            }
        })

    })
    // 需求3 登录事件
    $('#loginForm').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $('#loginForm').serialize(),
            success: (res) => {
                if (res.status != 0) return layui.layer.msg(res.message, { icon: 5 });
                localStorage.setItem('token', res.token);           //保存用户令牌到本地存储
                location.href = '/index.html'

            }
        })
    })


})