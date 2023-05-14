<template>
    <div class="main_page">
        <el-form style="width:500px;margin:auto" :model="userInfo" :rules="rules" ref="userInfo">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userInfo.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="userInfo.name" placeholder="姓名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="userInfo.pwd" placeholder="密码" prefix-icon="el-icon-view"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPwd">
                <el-input v-model="userInfo.checkPwd" placeholder="确认密码" prefix-icon="el-icon-view"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="loginClick">
                    <el-button type="primary" @click="handleRegister">注册</el-button> 
                    <div>已有账号？<el-button type="text">立即登陆</el-button></div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { register } from '@/api/user';

export default {
    data() {
    var validatePass = (rule, value, callback) => {
       if(!value||value.length==0){
        return callback(new Error('请输入密码'))
       }
       if(value.length<6||value.length>20){
        return callback(new Error('密码长度错误'))
       }
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userInfo.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      userInfo:{
        username:'',
        name:'',
        pwd:'',
        checkPwd:''
      },
      rules:{
        username:[{required:true,message:'请输入用户名'}],
        name:[{required:true,message:'请输入姓名'}],
        pwd:[{validator:validatePass,trigger:'change'}],
        checkPwd:[{validator:validatePass2,trigger:'change'}]
      }
    }
  },
  methods:{
    handleRegister(){
      register({
        username:this.userInfo.username,
        name:this.userInfo.name,
        password:this.userInfo.checkPwd
      }).then((res)=>{
        console.log(res)
        console.log(res.success);
        if(res.data.success){
          this.$message({
        message:'注册成功！',
        type:'success'
      })
        }
      }).catch((err)=>{
        console.error(err);
      })
    }
  }
}
</script>
<style>
.loginClick{
    display: flex;
    justify-content: space-between;
}
</style>