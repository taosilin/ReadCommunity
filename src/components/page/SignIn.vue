<template>
  <div class="background">
    <el-card class="login-form-layout">
      <i class="el-icon-collection logo"></i>
      <h2 class="login-title color-main">欢迎来到读书社区</h2>
      <el-input
        style="margin-bottom: 20px"
        placeholder="请输入用户名"
        v-model="username"
        clearable>
        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
      </el-input>
      <el-input
        style="margin-bottom: 20px"
        placeholder="请输入密码"
        v-model="password"
        show-password>
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
      <el-button style="width: 150px" type="primary" @click="handleLogin">登录</el-button>
      <el-button style="width: 150px" @click="handleSignUp">注册</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SignIn',
  data () {
    return {
      username: '',
      password: '',
      backgroundDiv: {
        backgroundImage: 'url(' + require('../../assets/img/background.jpg') + ')'
      }
    }
  },
  methods: {
    handleLogin () {
      var _this = this
      axios.post('http://localhost:51324/Login/user', {'username': this.username, 'password': this.password})
        .then((response) => {
          console.log(response)
          if (response.data === 'success') {
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
            _this.$router.push({name: `Home`, params: {username: _this.username}})
          } else {
            this.$message({
              showClose: true,
              message: '用户名或密码错误',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
    },
    handleSignUp () {
      this.$router.push({name: `SignUp`})
    }
  }
}
</script>

<style scoped>
  .background{
    height: 700px;
    width: 100%;
    background-size: 100% 100%;
    position: absolute;
    background: lightblue;
  }
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }
  .login-title {
    text-align: center;
  }
  .color-main{
    color: #409EFF;
  }
  .logo{
    margin-left: 125px;
    color: #409EFF;
    font-weight: bold;
    font-size: 60px;
  }
</style>
