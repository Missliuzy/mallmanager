<template>
  <el-card class="main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- //搜索 -->
    <el-row style="margin-top: 20px;">
      <el-col>
        <el-input placeholder="请输入内容" v-model="searchList" style="width: 300px">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" stripe>
        <el-table-column prop="date" label="#" width="30"></el-table-column>
        <el-table-column prop="name" label="姓名" width="60"></el-table-column>
        <el-table-column prop="address" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="address" label="电话" width="180"></el-table-column>
        <el-table-column prop="address" label="创建日期" width="180"></el-table-column>
        <el-table-column prop="address" label="用户状态" width="180"></el-table-column>
        <el-table-column prop="address" label="操作" width="180"></el-table-column>
      </el-table>
    </template>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      searchList: "",
      tableData: [],
      pagenum: 1,
      pagesize: 2
    };
  },
  created(){
      this.getList()
  },
  methods: {
    async getList() {
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = sessionStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.searchList}$pagenum=${this.pagenum}$pagesize=${
          this.pagesize
        }`)
        console.log(res);
    }
  }
};
</script>

<style>
.main {
  height: 100%;
}
</style>
