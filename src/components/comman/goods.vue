<template>
  <el-card class="main">
    <bread-crumb data-one="用户管理" data-two="用户列表"></bread-crumb>
    <!-- //搜索 -->
    <el-row style="margin-top: 20px;">
      <el-col>
        <el-input
          placeholder="请输入内容"
          hide-loading
          clearable
          style="width: 300px"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="$router.push({name:'goods/add'})">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <template width="100%">
      <el-table :data="tableData" stripe>
        <el-table-column type="index" label="#" width="30"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="300"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="80"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
        <el-table-column label="创建日期" width="130">
          <template slot-scope="formData">{{formData.row.add_time | clearTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="formData">
            <el-button
              plain
              type="primary"
              icon="el-icon-edit"
              circle
             
            ></el-button>
            <el-button
              plain
              type="danger"
              icon="el-icon-delete"
              circle
              
            ></el-button>
            
          </template>
        </el-table-column>
      </el-table>
    </template>

  </el-card>
</template>

<script>
export default {
    data () {
        return {
            tableData:[],
            pagenum: 1,
            pagesize: 7,
        }
    },
    created () {
        this.getcomman()
    },
    methods:{
        async getcomman() {
            const res = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

            console.log(res)
            const {data:{total,goods},meta:{msg,status}} = res.data
            this.tableData = goods
        }
    }
};
</script>

<style>
</style>
