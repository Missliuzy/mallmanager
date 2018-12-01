import axios from "axios"
//创建对象
const MyHttpServer = {}

MyHttpServer.install = Vue => {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        //判断url是不是登陆
        // console.log(config)
        if (config.url !== 'login') {

            // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
            const AUTH_TOKEN = sessionStorage.getItem("token");
            config.headers.common["Authorization"] = AUTH_TOKEN;
        }
        return config;
    }, function (error) {
        //     // 对请求错误做些什么
        return Promise.reject(error);
    });


    //添加axios方法
    Vue.prototype.$http = axios
}

export default MyHttpServer