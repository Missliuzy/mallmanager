<template>
  <el-card class="main" >
    <bread-crumb data1="用户管理" data2="权限列表"></bread-crumb>
    <el-table :data="rightList" style="width: 100%" height="510px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="authName" label="权限名称" width="120"></el-table-column>
      <el-table-column property="path" label="路径" width="120"></el-table-column>
      <el-table-column property="level" label="层级" width="120">
        <template slot-scope="level">
          <span v-if="level.row.level == 0">层级一</span>
          <span v-if="level.row.level == 1">层级二</span>
          <span v-if="level.row.level == 2">层级三</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rightList:[]
    };
  },
  created () {
    this.getdata()
  },
  methods: {
    async getdata(){
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
    // const AUTH_TOKEN = sessionStorage.getItem("token");
    // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(`rights/list`)
      // console.log(res)
      
      const{data,meta:{msg,status}} = res.data
      if(status == 200) {
        this.rightList = data
      }
      
    }
  }
};
</script>

<style>
</style>
