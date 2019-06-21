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
        <el-breadcrumb-item>分类排行</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-input
        placeholder="搜索分类、标签"
        v-model="search1">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button icon="el-icon-search" @click="onSearch1"></el-button>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" class="type-card">
            <img src="../../assets/img/type.jpg" class="image" @click="onClick(1)">
            <div style="padding: 14px;">
              <span class="type">文学</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" class="type-card">
            <img src="../../assets/img/popu.png" class="image" @click="onClick(2)">
            <div style="padding: 14px;">
              <span class="type">流行</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" class="type-card">
            <img src="../../assets/img/literature.jpg" class="image" @click="onClick(3)">
            <div style="padding: 14px;">
              <span class="type">文化</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" class="type-card">
            <img src="../../assets/img/economic.jpg" class="image" @click="onClick(4)">
            <div style="padding: 14px;">
              <span class="type">经管</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" class="type-card">
            <img src="../../assets/img/tech.jpg" class="image" @click="onClick(5)">
            <div style="padding: 14px;">
              <span class="type">科技</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" class="type-card">
            <img src="../../assets/img/life.jpg" class="image" @click="onClick(6)">
            <div style="padding: 14px;">
              <span class="type">生活</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Type',
  data () {
    return {
      activeIndex: '2',
      search: '',
      currentDate: new Date(),
      search1: ''
    }
  },
  methods: {
    onSearch () {
      let username = this.$route.params.username
      this.$router.push({name: `SearchResult`, params: {book_name: this.search, username: username}})
    },
    onSearch1 () {
      this.$router.push({ name: `TypeList`, params: {type: this.search1, username: this.$route.params.username} })
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
    onClick (type) {
      if (type === 1) {
        this.$router.push({ name: `TypeList`, params: {type: '文学', username: this.$route.params.username} })
      } else if (type === 2) {
        this.$router.push({ name: `TypeList`, params: {type: '流行', username: this.$route.params.username} })
      } else if (type === 3) {
        this.$router.push({ name: `TypeList`, params: {type: '文化', username: this.$route.params.username} })
      } else if (type === 4) {
        this.$router.push({ name: `TypeList`, params: {type: '经管', username: this.$route.params.username} })
      } else if (type === 5) {
        this.$router.push({ name: `TypeList`, params: {type: '科技', username: this.$route.params.username} })
      } else if (type === 6) {
        this.$router.push({ name: `TypeList`, params: {type: '生活', username: this.$route.params.username} })
      }
    }
  }
}
</script>

<style scoped>
  .search{
    display: flex;
    width: 250px;
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
  .image {
    width: 100%;
    display: block;
    height:200px;
  }
  .type-card{
    margin: 20px;
  }
  .bread{
    padding: 20px;
  }
  .type{
    color: #409EFF;
    font-weight: bold;
    font-size: 25px;
  }
</style>
