<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple"><img src="../../assets/logo.png" alt></div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light"><h3>电商后台管理系统</h3></div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple"><a href class="loginout">退出</a></div>
        </el-col>
      </el-row>
      
      
      
    </el-header>

    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
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
    console.log(1);
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
