import Vue from 'vue'
import Router from 'vue-router'
//配置路由
import Login from "@/components/login/login.vue"
import Home from "@/components/home/home.vue"
import Users from "@/components/users/user.vue"
import Right from "@/components/right/right.vue"
import Cos from "@/components/right/cos.vue"
import God from "@/components/comman/goods.vue"
import GodAdd from "@/components/comman/addgood.vue"

Vue.use(Router)

var router = new Router({
    routes:[{
        name:'login',
        path:'/login',
        component: Login
    },{
        name:'home',
        path:'/',
        component: Home,
        children:[{
            name:'users',
            path:'users',
            component: Users
        },{
            name:'rights',
            path:'rights',
            component: Right
        },{
            name:'roles',
            path:'roles',
            component: Cos
        },{
            name:'goods',
            path:'goods',
            component: God
        },{
            name:'goods/add',
            path:'goods/add',
            component: GodAdd
        }]
    }]
})
router.beforeEach((to, from, next) => {
    // ...
    // console.log(to)
    // console.log(from)
    // console.log(next)
    if(to.path == '/login'){
        next()
    }else{
        const token = sessionStorage.getItem('token')
        if(!token) {
            router.push({name: 'login'})
        }
    }
    next()
  })
export default router

