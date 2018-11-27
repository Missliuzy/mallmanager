import Vue from 'vue'
import Router from 'vue-router'
//配置路由
import Login from "@/components/login/login.vue"
import Home from "@/components/home/home.vue"
import Users from "@/components/users/user.vue"

Vue.use(Router)

export default new Router({
    routes:[{
        name:'login',
        path:'/login',
        component: Login
    },{
        name:'home',
        path:'/',
        component: Home,
        children:[{
            name:'user',
            path:'user',
            component: Users
        }]
    }]
})



