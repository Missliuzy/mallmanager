import axios from "axios"
//创建对象
const MyHttpServer = {}

MyHttpServer.install = Vue => {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    //添加axios方法
    Vue.prototype.$http = axios
}

export default MyHttpServer