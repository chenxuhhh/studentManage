<template>
    <div class="home_page">
        <el-container class="el_contain" style='height:100%'>
            <el-header class="header">
                <el-row type="flex" justify="space-between" align="middle" style="height:100%">
                    <span></span>
                    <span class="title">学生信息管理系统</span>
                    <el-button type="text" @click="handleSignOut">退出登陆</el-button>
                </el-row>
            </el-header>
            <el-container>
              <el-aside width="200px" class="aside">
                <el-menu
      default-active="2"
      class="el-menu-vertical-demo" background-color='#304156' router>
      
      <el-menu-item index="/home/class">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/home/main">
        <i class="el-icon-user-solid"></i>
        <span slot="title">班级管理</span>
      </el-menu-item>
      <el-menu-item index="/home/student">
        <i class="el-icon-star-on"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
    </el-menu>
              </el-aside>
              <el-main class="main"><router-view></router-view></el-main>
            </el-container>
          </el-container>
    </div>
</template>
<script>
import { userInfo } from '@/api/user';

export default {
  created(){
    this.getUserInfo()
  },
    methods:{
      getUserInfo(){
        userInfo().then((res)=>{
          // console.log(res);
          // console.log(this);
          // if(res.success){
          //   this.$store.commit('setUserInfo',res.data)
          // }
        }).catch((err)=>{
          console.error(err);
        })
      },
      handleSignOut(){
        this.$confirm('确认退出吗？',{
          type:'warning',
          title:'提示'
        }).then(()=>{
          
          this.$cookies.remove('token')
          this.$router.push('/login')
        })
      }
    }
}
</script>
<style lang="scss">
.el_contain{
  height: 100%;
}
  .home_page{
    height: 100vh;
    min-height: 800px;
    .header{
        background-color: #304156;
        .title{
            font-size: 24px;
            color: #fff;
        }
    }
    .aside{
        background-color: #304156;
        *{
            border: none;
        }
    }
    .main{
        background-color: #fff;
    }
    .el-menu-item{
        color: #fff;
        
        .is-active{
            color: #304156 !important;
        }
    }
  }
</style>