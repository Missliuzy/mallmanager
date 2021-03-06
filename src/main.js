// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element-ui 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//公共组件
import breadcrumb from '@/components/publicComponents/breadcrumb.vue'

//引入css
import "@/assets/css/base.css"
Vue.use(ElementUI);

Vue.config.productionTip = false


//引入axios
import Axios from "@/$axios/http.js"
import moment from 'moment';
Vue.use(Axios)
/* eslint-disable no-new */
//过滤器  时间
Vue.filter('clearTime', v => {
  return moment(v).format('YYYY-MM-DD')
})
//引用全局组件
Vue.component('bread-crumb',breadcrumb)

new Vue({
  el: '#app',
  router,
  
  components: { App },
  template: '<App/>'
})
