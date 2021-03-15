window.onload = function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2.选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 3.修改裁剪图片
    $('#file').on('change', (e) => {
        var file = e.target.files[0] //拿到用户选择的图片
        if (!file) return layui.layer.msg('照片不能为空'); //进行非空校验
        var newImgURL = URL.createObjectURL(file) //根据选择的文件，创建一个对应的 URL 地址
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //4.点击确定 上传图片
    $('#btnUpload').on('click', () => {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            url: '/my/update/avatar',
            type: 'POST',
            data: { avatar: dataURL },
            success: (res) => {
                // console.log(res);
                if (res.status != 0) return layui.layer.msg(res.message)    //状态判断
                layui.layer.msg('头像更改成功')     //提示信息
                window.parent.getUserInfo();        //渲染用户信息
            }
        })
    })
}