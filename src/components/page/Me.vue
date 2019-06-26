<template>
  <div>
    <div>
      <el-row>
        <el-col span="4">
          <el-row>
            <i class="el-icon-collection logo"></i>
            <span class="title">读书社区</span>
          </el-row>
        </el-col>
        <el-col span="14">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#409EFF" active-text-color="#536dfe" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">分类排行</el-menu-item>
            <el-menu-item index="3">推荐</el-menu-item>
            <el-menu-item index="4">个人中心</el-menu-item>
          </el-menu>
        </el-col>
        <el-col span="6">
          <div class="search">
            <el-input
              placeholder="搜索书名、作者"
              v-model="search">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button icon="el-icon-search" @click="onSearch"></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="info">
        <el-row>
          <el-col :span="2">
            <img src="../../assets/img/avatar.jpg" class="avatar"/>
          </el-col>
          <el-col :span="16" class="main-info">
            <el-row><div class="username">{{user.nickname}}</div></el-row>
            <el-row><div class="user-info">读过 {{read_num}} 本书</div></el-row>
            <el-row><div class="user-info">简介：{{user.introduction}}</div></el-row>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <el-row>
          <el-tabs tab-position="left">
            <el-tab-pane label="我的评论">
              <el-col span="18">
                <div v-for="(item, index) in comments" class="comment-container">
                    <el-row class="comment">
                      <span class="book-name">{{item.book_name}}</span>
                      <el-rate
                        v-model="item.score/2"
                        disabled
                        text-color="#ff9900">
                      </el-rate>
                      {{item.score}}
                      <el-button type="text" @click="dialogVisible = true; itemid = item.commentid" class="delete" size="mini">删除评论</el-button>
                      <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%">
                        <span>评论删除后不可恢复，确认删除？</span>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="dialogVisible = false">取 消</el-button>
                          <el-button type="primary" @click="onDeleteComment()">确 定</el-button>
                        </span>
                      </el-dialog>
                    </el-row>
                    <el-row>
                      <span>{{item.content}}</span>
                    </el-row>
                    <el-divider></el-divider>
                </div>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="我的收藏">
                <div v-for="(item,index) in likeList" class="likelist" @click="onBookDetail(index)">
                  <el-row>
                    <el-col :span="4">
                      <el-image
                        style="width: 150px; height: 200px"
                        :src="item.book_image"
                        :fit="fit"></el-image>
                    </el-col>
                    <el-col :span="14">
                      <el-row><span class="book-name">{{item.book_name}}</span></el-row>
                      <el-row>{{item.author}}/{{item.publisher}}</el-row>
                      <el-row><div class="introduction">{{item.introduction}}</div></el-row>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我读过的">
              <el-col span="18">
                <div>
                  <el-timeline>
                    <el-timeline-item v-for="item in readList" :timestamp="item.date" placement="top">
                      <el-card>
                        <h4>{{item.book_name}}</h4>
                        <p>{{item.Time}}</p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="修改个人信息">
              <el-form ref="form" :model="form" :label-position="right" :rules="rules" label-width="80px">
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
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Me',
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
      activeIndex: '4',
      itemid: 0,
      user: {},
      comments: [],
      likeList: [],
      readList: [],
      imageUrl: '',
      read_num: 0,
      dialogVisible: false,
      search: '',
      form: {},
      rules: {
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
  created () {
    if (this.$route.params.username === null) {
      this.$router.push({name: `SignIn`})
    }
    axios.post('http://localhost:6793/UserInfo/Detail', {'username': this.$route.params.username})
      .then((response) => {
        console.log(response)
        this.user = response.data
        this.form = response.data
      }).catch((error) => {
        console.log(error)
      })
    axios.post('http://localhost:6793/CommentList/User', {'username': this.$route.params.username})
      .then((response) => {
        console.log(response.data)
        this.comments = response.data
      }).catch((error) => {
        console.log(error)
      })
    axios.post('http://localhost:6793/LikeBook/List', {'username': this.$route.params.username, 'type': '0'})
      .then((response) => {
        console.log(response.data)
        this.likeList = response.data
      }).catch((error) => {
        console.log(error)
      })
    axios.post('http://localhost:6793/LikeBook/List', {'username': this.$route.params.username, 'type': '1'})
      .then((response) => {
        console.log(response.data)
        this.readList = response.data
        this.read_num = response.data.length
        for (var i = 0; i < this.readList.length; i++) {
          this.readList[i].Time = new Date(this.readList[i].time)
          this.readList[i].date = String((this.readList[i].Time).toLocaleDateString())
          this.readList[i].Time = (this.readList[i].Time).toLocaleString()
        }
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    onBookDetail (index) {
      let username = this.$route.params.username
      this.$router.push({name: `BookDetail`, params: {bookid: this.likeList[index].id, username: username}})
    },
    onSearch () {
      let username = this.$route.params.username
      this.$router.push({name: `SearchResult`, params: {book_name: this.search, username: username}})
    },
    handleSelect (key, keyPath) {
      let username = this.$route.params.username
      if (key === '1') {
        this.$router.push({ name: `Home`, params: {username: username} })
      } else if (key === '2') {
        this.$router.push({ name: `Type`, params: {username: username} })
      } else if (key === '3') {
        this.$router.push({ name: `Recommend`, params: {username: username} })
      } else if (key === '4') {
        this.$router.push({ name: `Me`, params: {username: username} })
      }
    },
    onDeleteComment () {
      this.dialogVisible = false
      console.log(this.itemid)
      axios.post('http://localhost:6793/CommentList/Delete', {'commentid': this.itemid})
        .then((response) => {
          console.log(response.data)
          axios.post('http://localhost:6793/CommentList/User', {'username': this.$route.params.username})
            .then((response) => {
              console.log(response.data)
              this.comments = response.data
            }).catch((error) => {
              console.log(error)
            })
        }).catch((error) => {
          console.log(error)
        })
    },
    onSubmit () {
      axios.post('http://localhost:6793/UserInfo/Update', {'username': this.form.username, 'password': this.form.password, 'nickname': this.form.nickname, 'gender': this.form.gender, 'birthday': this.form.birthday, 'introduction': this.form.introduction})
        .then((response) => {
          console.log(response.data)
          if (response.data === 'success') {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            axios.post('http://localhost:6793/UserInfo/Detail', {'username': this.$route.params.username})
              .then((response) => {
                console.log(response)
                this.user = response.data
                this.form = response.data
              }).catch((error) => {
                console.log(error)
              })
          } else {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>

<style scoped>
  .search{
    display: flex;
    width: 250px;
  }
  .main{
    margin-left: 70px;
  }
  .info{
    margin-left: 100px;
    padding:20px;
  }
  .main-info{
    padding-left:20px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .comment{
    display: flex;
    padding: 10px;
  }
  .title {
    color: #409EFF;
    font-weight: bold;
    font-size: 30px;
  }
  .logo{
    color: #409EFF;
    font-weight: bold;
    font-size: 40px;
  }
  .likelist{
    margin: 10px;
  }
  .username{
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
  }
  .delete{
    margin-left:10px;
  }
  .book-name{
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }
  .comment-container{
    padding: 10px;
  }
  .introduction{
    font-weight: lighter;
    font-size: 15px;
    margin-top: 10px;
  }
  .user-info{
    padding: 2px;
    font-weight: lighter;
    font-size: 15px;
  }
</style>
