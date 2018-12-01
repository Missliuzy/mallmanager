<template>
  <el-card>
    <bread-crumb dataOne="用户管理" dataTwo="角色列表"></bread-crumb>
    <el-button type="success" plain style="margin-top:40px">创建角色</el-button>

    <el-table :data="cosdata" style="width: 1000px">
      <el-table-column type="expand" label="$">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
              <el-row v-for="(item,i) in props.row.children" :key="i">
                <el-col :span="4">
                  <el-tag @close="ClearRight(props.row,item.id)" closable type='success'>{{item.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-row v-for="(item1,i) in item.children" :key="i">
                    <el-col :span="4">
                      <el-tag @close="ClearRight(props.row,item1.id)" closable type='info'>{{item1.authName}}</el-tag>
                    </el-col>
                    <el-col :span="20">
                      <el-tag @close="ClearRight(props.row,item2.id)" v-for="(item2,i) in item1.children" :key="i" closable type='warning'>
                        <span>{{item2.authName}}</span>
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          
              <span v-if="props.row.children.length == 0">没有数据</span>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index" width="180px"></el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="180px"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc" width="180px"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="formData">
          <el-button plain type="primary" icon="el-icon-edit" circle @click="edit(formData.row.id)"></el-button>
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="Dele(formData.row.id)"
          ></el-button>
          <el-button
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="checkright(formData.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

  <!-- //分配权限 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
        <!--
          树形结构
          data->数据源 []
          show-checkbox -> 选择框
          node-key 每个节点的唯一标识 通常时data数据源中key名id
          default-expanded-keys 默认展开 [要展开的节点的id]
          default-checked-keys [要选择的节点的id]
          props 配置项 {label,children}
          label节点的文字标题和children节点的子节点
          值都来源于data绑定的数据源中的该数据的key名 'label'和'children'

           :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
         -->
        <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
            <el-button type="primary"
            @click="setRoleRight()">确 定</el-button>
        </div>
    </el-dialog>
  </el-card>
  
</template>

<script>
export default {
  data() {
    return {
      cosdata: [],
      dialogFormVisibleRight:false,
      treelist:[],
      //定义显示的数据
      defaultProps: {
          children: 'children',
          label: 'authName'
      },
      //显示的ID
      arrcheck:[],
      cosId:-1
    };
  },
  created() {
    this.getdata();
  },
  methods: {
      //确定修改权限
    async setRoleRight () {
        this.dialogFormVisibleRight = false
        //获取dom
        const list1 = this.$refs.tree.getHalfCheckedKeys()
        const list2 = this.$refs.tree.getCheckedKeys()
        const list = [...list1,...list2]
        const res = await this.$http.post(`roles/${this.cosId}/rights`,{rids:list.join(',')})
        this.$message.success(res.data.meta.msg)
        this.getdata()
        
      },
    //修改权限
    async checkright (row) {
        this.dialogFormVisibleRight = true
        this.cosId = row.id
        const res = await this.$http.get(`rights/tree`)
        // console.log(row);
        const {data,meta:{msg,status}} = res.data
        if(status == 200) {
            this.treelist = data
        }
        //获取用户ID
            let arrData =[]
            row.children.forEach(item => {
                arrData.push(item.id)
                item.children.forEach(item1 => {
                    arrData.push(item1.id)
                    item1.children.forEach(item2 => {
                        arrData.push(item2.id)
                    })
                })
            })
            // console.log(arrData)
            this.arrcheck = arrData
    },
      //取消权限
    async ClearRight (cos,id) {
        const res = await this.$http.delete(`roles/${cos.id}/rights/${id}`)
        
        const{data,meta:{msg,status}} = res.data
        cos.children = data
        
    },
    async getdata() {
      const res = await this.$http.get(`roles`);

      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      this.cosdata = data;
    }
  }
};
</script>

<style>
/* .demo-table-expand {
    width: 100%;
    color: #99a9bf;
  }
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  } */
</style>
