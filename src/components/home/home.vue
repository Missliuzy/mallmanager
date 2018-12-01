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
            <a @click="loginout()" class="loginout">退出</a>
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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
        
        <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="cos">
              <i class="el-icon-menu"></i>
              <span slot="title">角色类表</span>
            </el-menu-item>
            <el-menu-item index="right">
              <i class="el-icon-menu"></i>
              <span slot="title">权限类表</span>
            </el-menu-item>
          </el-submenu>
        
        <!-- 3 -->
       
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>
      
        <!-- 4 -->
        
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span slot="title">订单类表</span>
            </el-menu-item>
          </el-submenu>
        
        <!-- 5 -->
        
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
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
  beforeCreate() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
    // console.log(1);
  },
  //方法
  methods:{
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
