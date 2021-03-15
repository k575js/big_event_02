$(() => {
    // 需求1 定义校验规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('input[name=oldPwd]').val()) return '原密码和新密码不能相同';
        },
        rePwd: function (value) {
            if (value != $('input[name=newPwd]').val()) return '两次新密码输入不一致';
        }
    })

    // 需求2 点击密码修改 提交表单 发送ajax请求
    $('form').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $('form').serialize(),
            success: (res) => {
                if (res.status != 0) return layui.layer.msg(res.message);
                layui.layer.msg('恭喜您,密码修改成功');
                $('.layui-form')[0].reset()
            }
        })
    })
})