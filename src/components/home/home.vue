<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a @click.prevent="loginout()" class="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 1 -->
        <el-menu
          :router="true"
          :unique-opened="true"
        >
          <el-submenu :index="''+item.order" v-for="(item,index) in list" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="item1.path" v-for="(item1,index) in item.children" :key="index">
              <i class="el-icon-menu"></i>
              <span>{{item1.authName}}</span>
            </el-menu-item>
          </el-submenu>
        
        
          
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      list:[]  
    }
  },
  beforeCreate() {
    // const token = sessionStorage.getItem("token");
    // if (!token) {
    //   this.$router.push({ name: "login" });
    // }
    // console.log(1);
  },
  created () {
    this.getmenus()
  },
  //方法
  methods:{
    //获取左侧边栏
    async getmenus () {
      const res = await this.$http.get(`menus`)
      // console.log(res)
      this.list = res.data.data
      // console.log(this.list)

    },
    //退出功能
    loginout () {
      //清除token
      sessionStorage.clear()
      //提示
      this.$message.success('退出成功')
      this.$router.push({name:'login'})
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
}

.loginout {
  line-height: 60px;
  text-decoration: none;
  color: #000;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
}
</style>
