<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{dataOne}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{dataTwo}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name:'bread-crumb',
    data () {
        return {
        }
    },
    props: ['dataOne','dataTwo']
}
</script>

<style>

</style>
