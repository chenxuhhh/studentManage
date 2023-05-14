<template>
    <div class="loginPage">
        <div class="loginPanel">
            <div class="panel">
                <h2>学生管理系统|登陆</h2>
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="loginClick">
                        <el-button type="primary" @click="handleLogin">登陆</el-button>
                    <div>没有账号?<el-button type="text" @click="handRegister">立即注册</el-button></div>
                    </div>
                </el-form-item>
            </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { login } from '@/api/user'
export default {
    data() {
        return {
            loginForm:{},
            loginFormRules:{
                username:[{required:true,message:'请输入用户名'}],
                password:[{required:true,message:'请输入密码'}]
            }
        }
    },
    methods:{
        handleLogin(){
            this.$refs['loginForm'].validate((valid)=>{
                if(valid){
                    login(this.loginForm).then((res)=>{
                        console.log(res.data);
                        if(res.success){
                            this.$cookies.set('token',res.data)
                            this.$router.push('/home/class')
                        }else{
                            this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                    }).catch((err)=>{
                        console.error(err)
                    })
                }
            })
        },
        handRegister(){
            this.$router.push('/register')
        }
    }
}
</script>
<style lang="scss">
.loginPage{
    display: flex;
    flex-direction: row-reverse;
}
.loginPanel{
    width: 769px;
    height: 937px;
    background-color: #fff;
    border-radius: 50% 0 0 50%;
    h2{
        text-align: center;
        color: rgb(64, 158, 255);
    }
    display: flex;
    align-items: center;
    justify-content: center;
    .loginClick{
        display: flex;
        justify-content: space-between;
    }
}
</style>