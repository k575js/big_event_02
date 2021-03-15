let baseUrl = 'http://api-breakingnews-web.itheima.net'  //开发环境服务器地址

$.ajaxPrefilter((params) => {
    let { url } = params;
    params.url = baseUrl + url;         //拼接服务器地址

    if (url.indexOf('/my/') != -1) {  //除了login页面接口 其余接口都需要设置headers
        params.headers = { Authorization: localStorage.getItem('token') || '' }

        // 登录拦截
        params.complete = (res) => {
            // console.log(res);
            let { status, message } = res.responseJSON;
            if (status == 1 && message == '身份认证失败！') {
                location.href = '/login.html' //跳转回login页面
                localStorage.remove('token')  //清除令牌
            }
        }
    }

})