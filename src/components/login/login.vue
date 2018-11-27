<template>
  <div class="login">
    <el-form label-position="top" label-width="80px" :model="fordata" class="login-data">
      <H2>用户登录</H2>
      <el-form-item label="用户名">
        <el-input v-model="fordata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="fordata.passworld"></el-input>
      </el-form-item>
      <el-button id="btn" type="primary">登陆</el-button>
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
