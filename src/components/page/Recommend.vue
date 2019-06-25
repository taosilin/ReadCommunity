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
            <el-button icon="el-icon-search" circle @click="onSearch"></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推荐</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-left: 20px">
      <span class="recommend">猜你喜欢</span>
      <el-row>根据你最近读过的书推荐</el-row>
    </div>
    <div v-for="(item, index) in recommend" @click="onDetail(index)">
      <el-col :span="3">
        <el-card :body-style="{ padding: '14px', height:'300px' }">
          <el-image
            style="width: 150px; height: 200px"
            :src="item.book_image"
            :fit="fit"></el-image>
          <div style="padding: 0px;">
            <span>{{item.book_name}}</span>
            {{item.author}}/{{item.publisher}}
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Recommend',
  data () {
    return {
      activeIndex: '3',
      search: '',
      recommend: []
    }
  },
  created () {
    axios.post('http://localhost:51324/BookList/Recommend', {'name': this.$route.params.username, 'page': 0, 'size': 16})
      .then((response) => {
        this.recommend = response.data
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
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
    onDetail (index) {
      let username = this.$route.params.username
      this.$router.push({name: `BookDetail`, params: {bookid: this.recommend[index].id, username: username}})
    }
  }
}
</script>

<style scoped>
  .search{
    display: flex;
    width: 250px;
  }
  .bread{
    padding: 20px;
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
  .recommend{
    font-weight: bold;
    font-size: 20px;
  }
</style>
