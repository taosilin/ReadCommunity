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
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>搜索</el-breadcrumb-item>
        <el-breadcrumb-item>{{searchstring}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="booklist" v-for="(item, index) in booklist" @click="onBookDetail(index)">
      <el-row>
        <el-col :span="4">
          <el-image
            style="width: 150px; height: 200px"
            :src="item.book_image"
            :fit="fit"></el-image>
        </el-col>
        <el-col :span="12">
          <el-row>
            <div class="book_name">{{item.book_name}}</div>
          </el-row>
          <el-row>{{item.author}}/{{item.publisher}}</el-row>
          <el-row>{{item.introduction}}</el-row>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="sizes, prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchResult',
  data () {
    return {
      activeIndex: '0',
      search: '',
      searchstring: '',
      booklist: [],
      page: 0,
      size: 10,
      type: ''
    }
  },
  created () {
    axios.post('http://localhost:6793/BookList/searchName', {'name': this.$route.params.book_name, 'page': 0, 'size': 10})
      .then((response) => {
        console.log(response.data)
        this.booklist = response.data
        this.searchstring = this.$route.params.book_name
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    onSearch () {
      console.log('search')
      console.log(this.search)
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
    onBookDetail (index) {
      let username = this.$route.params.username
      this.$router.push({name: `BookDetail`, params: {bookid: this.booklist[index].id, username: username}})
    },
    handleSizeChange (val) {
      this.size = val
      console.log(`每页 ${val} 条`)
      axios.post('http://localhost:6793/BookList/searchName', {'name': this.$route.params.book_name, 'page': this.page, 'size': this.size})
        .then((response) => {
          console.log(response.data)
          this.booklist = response.data
          this.searchstring = this.$route.params.book_name
        }).catch((error) => {
          console.log(error)
        })
    },
    handleCurrentChange (val) {
      this.page = val
      console.log(`当前页: ${val}`)
      axios.post('http://localhost:6793/BookList/searchName', {'name': this.$route.params.book_name, 'page': this.page, 'size': this.size})
        .then((response) => {
          console.log(response.data)
          this.booklist = response.data
          this.searchstring = this.$route.params.book_name
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
  .book_name{
    font-size: 20px;
    font-weight: bold;
  }
  .bread{
    padding: 20px;
  }
  .booklist{
    margin-left: 50px;
    margin-top: 20px;
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
</style>
