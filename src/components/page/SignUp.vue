<template>
  <div class="background" :style="backgroundDiv">
    <el-card class="login-form-layout">
      <i class="el-icon-collection logo"></i>
      <h2 class="login-title color-main">注册</h2>
      <el-form ref="form" :model="form" :label-position="right" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="checkpass">
          <el-input type="password" v-model="form.checkpass" placeholder="请重复密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="请选择出生日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="form.introduction" placeholder="请输入个人简介"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即注册</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SignUp',
  data: function () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkpass !== '') {
          this.$refs.ruleForm.validateField('checkpass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        nickname: '',
        password: '',
        checkpass: '',
        gender: '',
        birthday: '',
        introduction: '',
        backgroundDiv: {
          backgroundImage: 'url(' + require('../../assets/img/background.jpg') + ')'
        }
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 1, max: 20, message: '昵称长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, validator: validatePass, trigger: 'blur'},
          {min: 4, max: 20, message: '密码长度在 4 到 20 个字符', trigger: 'blur'}
        ],
        checkpass: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        date: [
          {type: 'date', message: '请选择出生日期', trigger: 'change'}
        ]
      }

    }
  },
  methods: {
    onSubmit () {
      var _this = this
      axios.post('http://localhost:51324/UserInfo/SignUp', {'username': this.form.username, 'password': this.form.password, 'nickname': this.form.nickname, 'gender': this.form.gender, 'birthday': this.form.birthday, 'introduction': this.form.introduction})
        .then((response) => {
          console.log(response)
          if (response.data === 'success') {
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            })
            _this.$router.push({name: `SignIn`})
          } else {
            this.$message({
              showClose: true,
              message: '注册失败,该用户名已存在',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
    },
    onCancel () {
      this.$router.push({name: `SignIn`})
    }
  }
}
</script>

<style scoped>
  .background{
    height: 500px;
    width: 100%;
    background-size: 100% 100%;
    position: absolute;
  }
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 600px;
    margin: 100px auto;
    border-top: 10px solid #409EFF;
  }
  .login-title {
    text-align: center;
  }
  .color-main{
    color: #409EFF;
  }
  .logo{
    margin-left: 250px;
    color: #409EFF;
    font-weight: bold;
    font-size: 55px;
  }
</style>
