<template>
    <h1>123</h1>
</template>

<script>
export default {
    beforeCreate:{
        If(){
            const token = sessionStorage.getItem('token')
            if(!token){
                this.$router.push({name:'login'})
            }
        }
    }
}
</script>

<style>

</style>
