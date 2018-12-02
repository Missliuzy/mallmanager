<template>
  <el-card>
    <bread-crumb data-one="商品管理" data-two="商品列表"></bread-crumb>
    <el-alert title="成功提示的文案" type="success" center show-icon style="margin-top:40px"></el-alert>
    <el-steps :active="1*active" finish-status="success" simple>
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 表单 -->
    <el-form :model="list">
      <el-tabs tab-position="left" style="height: 500px;" v-model="active" @tab-click="checktabs()">
        <el-tab-pane name="1" label="用户管理">
          <el-form-item label="商品名称">
            <el-input type="password" v-model="list.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input type="password" v-model="list.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input type="password" v-model="list.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input type="password" v-model="list.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类"></el-form-item>
          {{moren}}
          <el-cascader :options="options" change-on-select v-model="moren" :props="porps" clearable></el-cascader>
        </el-tab-pane>

        <el-tab-pane name="2" label="配置管理">
          <el-form-item v-for="(item,i) in arrmanyData" :key="i" :label="item.attr_name">
            <!-- 复选框组 -->
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox border v-for="(item2,i) in item.attr_vals" :key="i" :label="item2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="3" label="角色管理">
          <!-- 静态数据 -->
          <el-form-item :label="item1.attr_name" v-for="(item1,i) in arronlyData" :key="i">
            <el-input v-model="item1.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <!-- 图片 -->
          <el-form-item>
            <el-upload
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
              :headers="headers"
            >>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="定时任务补偿">
          <!-- 富文本编辑 -->
          <el-form-item>
            <el-button type="primary" round @click="addcomman()">添加商品</el-button>
            <quill-editor style="height:500px" v-model="list.goods_introduce"></quill-editor>
          
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
//引入富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
   components: {
    quillEditor
  },
  data() {
    return {
      active: "1",
      list: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: [],
        goods_introduce: "",
        pics: [],  
        attrs: []
      },
      //级联数据
      // goods_name商品名称
      // goods_cat以为','分割的分类列表
      // goods_price价格
      // goods_number数量
      // goods_weight重量
      // goods_introduce介绍
      // pics上传的图片临时路径（对象）--数组
      // attrs商品的参数（数组）

      options: [],
      moren: [1, 2, 3],
      porps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 动态数据
      arrmanyData: [],
      // 静态数据
      arronlyData: [],
      headers:{
        Authorization:sessionStorage.getItem("token")
      }
    };
  },
  //   goods_id

  // 商品 ID
  // goods_name
  // 商品名称
  // goods_price
  // 价格
  // goods_number
  // 数量
  // goods_weight
  // 重量
  // 不能为空
  // goods_stat
  // 商品状态
  // 商品状态 0: 未通过 1: 审核中 2: 已审核
  // add_time
  // 添加时间
  // upd_time
  // 更新时间
  // hot_mumber
  // 热销品数量
  // is_promote

  created() {
    // this.getcomman();
    this.getlianji();
  },
  methods: {
    //添加商品
    async addcomman (){
        //商品分类列表
        this.list.goods_cat = this.moren.join(',')

      const res = await this.$http.post(`goods`,this.list)
    },
    //图片上传的方法
    handlePreview (file){

    },
    handleRemove(file) {
      // console.log(file)
      // reponse.data.tmp_path
     const i = this.list.pics.findIndex(item => {
        return item.pic == file.response.data.tmp_path
      })
      this.list.pics.splice(i,1)
    },
    handleSuccess(file) {
      // file.data.tmp_path
      // console.log(file)
      this.list.pics.push({pic:file.data.tmp_path})
    },
       
    async getlianji() {
      // console.log('123');

      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      this.options = res.data.data;
    },
    async checktabs() {
      //点击选项卡判断是否为第2个标签
      if (this.active == 2) {
        // 判断三级级联是否选中
        if (this.moren.length != 3) {
          this.$message.warning("请选择商品分类");
          return;
        }
        const res = await this.$http.get(
          `categories/${this.moren[2]}/attributes?sel=many`
        );
        console.log(res);
        this.arrmanyData = res.data.data;
        this.arrmanyData.forEach(element => {
          element.attr_vals =
            element.attr_vals.length == 0
              ? []
              : element.attr_vals.trim().split(",");
        });
      }
      //点击选项卡判断是否为第3个标签
      if (this.active == 3) {
        // 判断三级级联是否选中
        if (this.moren.length != 3) {
          this.$message.warning("请选择商品分类");
          return;
        }
        const res = await this.$http.get(
          `categories/${this.moren[2]}/attributes?sel=only`
        );
        console.log(res);
        this.arronlyData = res.data.data;
      }
    }
  }
};
</script>

<style>
quill-editor{
  height: 300px;
}
</style>
