<template>
  <div class="login">
    <el-form label-position="top" label-width="80px" :model="fordata" class="login-data">
      <H2>用户登录</H2>
      <el-form-item label="用户名">
        <el-input v-model="fordata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="fordata.password"></el-input>
      </el-form-item>
      <el-button id="btn" type="primary" @click.prevent="login">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    data () {
        return {
            fordata: {
                username: '',
                passworld:''
            }
        }
    },
    //方法
    methods:{
        async login () {
            const res = await this.$http.post(`login`,this.fordata)
                console.log(res)
                const {data,meta:{msg,status}} = res.data
                if(status === 200) {
                    //获取
                    sessionStorage.setItem('token',data.token)
                    //跳转
                    this.$router.push({name:'home'})
                    //成功提示
                    this.$message.success(msg)
                }else{
                    this.$message.error(msg);
                }
 


        }
    }
}
</script>

<style>
 .login {
     height: 100%;
     background-color: #324152;
  /* 弹性盒布局 */
  display: flex;
  justify-content: center;
  align-items: center;
 }
 .login-data {
     width: 400px;
     border-radius: 5px;
     background-color: #fff;
     padding: 30px
 }
   .login-data #btn {
     width: 100%;
 }
</style>
