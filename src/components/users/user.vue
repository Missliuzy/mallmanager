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
        <el-input
          placeholder="请输入内容"
          v-model="searchList"
          hide-loading
          clearable
          style="width: 300px"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>
        <el-button type="success" @click="addUser()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" stripe>
        <el-table-column type="index" label="#" width="30"></el-table-column>
        <el-table-column prop="username" label="姓名" width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column label="创建日期" width="180">
          <template slot-scope="formData">{{formData.row.create_time | clearTime}}</template>
        </el-table-column>
        <el-table-column label="用户状态" width="180">
          <template slot-scope="formData">
            <el-switch
              v-model="formData.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="formData">
            <el-button plain type="primary" icon="el-icon-edit" circle @click="edit(formData.row.id)"></el-button>
            <el-button plain type="danger" icon="el-icon-delete" circle @click="Dele(formData.row.id)"></el-button>
            <el-button plain type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total - 0"
    ></el-pagination>
    <!-- 编辑 -->
    <el-dialog title="添加用户" :visible.sync="showEdit">
      <el-form :model="editUser">
        <el-form-item label="用户名">
          <el-input v-model="editUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEdit = false">取 消</el-button>
        <el-button type="primary" @click="QEdit(editUser)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="FormVisible">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="no"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FormVisible = false">取 消</el-button>
        <el-button type="primary" @click="QFormTata">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      searchList: "",
      tableData: [],
      pagenum: 1,
      pagesize: 2,
      total: '',
      FormVisible: false,
      showEdit:false,
      form: {
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      //编辑
      editUser:{
        id:'',
        username:'',
        email:'',
        mobile:''
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //删除
     Dele (id) {
      this.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`users/${id}`)
          
          this.pagenum =1
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 确定编辑
    async QEdit (data) {
      this.showEdit = false
      const res = await this.$http.put(`users/${data.id}`,data)
      // console.log(res)
      const {meta:{msg,status}} = res.data
      if(status == 200) {
        this.$message.success(msg)
        this.getList()
      }
    },
    //编辑
    async edit (Id) {
      this.showEdit = true
      const res = await this.$http.get(`users/${Id}`)
      // console.log(res)
      const {data,meta:{msg,status} } =res.data
      if(status == 200) {
        this.editUser = data
      }
    },
    //添加确定
    async QFormTata () {
      this.FormVisible = false;
    const res = await this.$http.post('users',this.form)
    // console.log(res)
    const {data,meta:{msg,status}} = res.data
    if(status == 201) {
      this.$message.success(msg)
      this.getList()
    }

    },
    //添加
    addUser() {
      this.FormVisible = true
    },
    //搜索用户
    searchUser() {
      this.getList();
      this.searchList = "";
    },
    //分页功能
     handleSizeChange(val) {
       this.pagesize = val
       //当改变每页显示多少条数据时。当前页返回第一页
       this.pagenum =1
        this.getList()
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.getList()
      },

    async getList() {
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = sessionStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.searchList}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      const {
        data: { users, total },
        meta: { msg, status }
      } = res.data;
      if (status == 200) {
        this.tableData = users;
        // 2. 给total赋值
        this.total = total
        // this.pagesize = 
      }
    }
  }
};
</script>

<style>
.main {
  height: 100%;
}
</style>
