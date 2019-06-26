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
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            text-color="#409EFF"
            active-text-color="#536dfe"
            @select="handleSelect">
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
    <div class="block">
      <el-carousel height="550px">
        <el-carousel-item v-for="item in images" :key="item.id">
          <el-image :src="item.src" :fit="scale-down"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="new-list">
      <el-row>
        <el-card class="new-title">
          综合榜单
        </el-card>
      </el-row>
      <el-row>
        <el-col span="10">
          <div class="rating-table">
            <el-table
              :data="tableData"
              style="width: 100%"
              @row-click="onBookDetail">
            <el-table-column
              type="index"
              label="排名"
              width="80">
            </el-table-column>
            <el-table-column
              prop="book_name"
              label="书名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="score"
              label="综合评分"
              width="80">
            </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col span="14">
          <div>
            <el-card :body-style="{ padding: '0px' }" class="card">
              <span class="subtitle">综合评分榜单</span>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="10">
                  <el-image
                    style="width: 150px; height: 200px"
                    :src="tableData[0].book_image"
                    :fit="fit"></el-image>
                </el-col>
                <el-col :span="10">
                <span>{{tableData[0].score}}({{tableData[0].rating_num}}人评价)</span>
                <el-rate
                  v-model="score"
                  disabled
                  show-score
                  text-color="#ff9900" />
                  <div style="padding: 14px;">
                    <span class="bookname">{{tableData[0].book_name}}</span>
                    <div class="bottom clearfix">
                      {{ tableData[0].author }}
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <div class="introduction">{{tableData[0].introduction}}</div>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="new-list">
      <el-row>
        <el-card class="new-title">
          人气榜单
        </el-card>
      </el-row>
      <el-row>
        <el-col span="10">
          <div>
          <el-card :body-style="{ padding: '0px' }" class="card">
            <span class="subtitle">人气榜单</span>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="10">
                <el-image
                  style="width: 150px; height: 200px"
                  :src="tableData1[0].book_image"
                  :fit="fit"></el-image>
              </el-col>
              <el-col :span="10">
                <span>{{tableData1[0].score}}({{tableData1[0].rating_num}}人评价)</span>
                <el-rate
                  v-model="score"
                  disabled
                  show-score
                  text-color="#ff9900" />
                <div style="padding: 14px;">
                  <span class="bookname">{{tableData1[0].book_name}}</span>
                  <div class="bottom clearfix">
                    {{ tableData1[0].author }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <div class="introduction">{{tableData1[0].introduction}}</div>
            </el-row>
          </el-card>
        </div>
        </el-col>
        <el-col span="14">
          <div class="rating-table">
          <el-table
            :data="tableData1"
            style="width: 100%"
            @row-click="onBookDetail">
            <el-table-column
              type="index"
              label="排名"
              width="80">
            </el-table-column>
            <el-table-column
              prop="book_name"
              label="书名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="score"
              label="综合评分"
              width="80">
            </el-table-column>
          </el-table>
        </div>
        </el-col>
      </el-row>
    </div>
    <div class="new-list">
      <el-card class="new-title">
        新书速递
      </el-card>
        <div v-for="(item, index) in tableData2" @click="onDetail(index)">
          <el-col span="4.8">
            <el-card :body-style="{ padding: '0px' }" class="new-card">
              <el-image
                style="width: 150px; height: 200px"
                :src="item.book_image"
                :fit="fit"></el-image>
              <div style="padding: 14px;">
                <span>{{item.book_name}}</span>
              </div>
            </el-card>
          </el-col>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      activeIndex: '1',
      score: 0.0,
      tableData: [],
      tableData1: [],
      tableData2: [],
      search: '',
      users: [],
      images: [
        {id: 0, src: require('../../assets/img/5.jpg')},
        {id: 1, src: require('../../assets/img/22.jpg')},
        {id: 2, src: require('../../assets/img/3.jpg')},
        {id: 3, src: require('../../assets/img/4.jpg')},
        {id: 4, src: require('../../assets/img/11.jpg')}
      ]
    }
  },
  created () {
    axios.post('http://localhost:6793/BookList/score')
      .then((response) => {
        this.tableData = response.data
        this.score = response.data[0].score / 2
      }).catch((error) => {
        console.log(error)
      })
    axios.post('http://localhost:6793/BookList/rating')
      .then((response) => {
        this.tableData1 = response.data
        this.score = response.data[0].score / 2
      }).catch((error) => {
        console.log(error)
      })
    axios.post('http://localhost:6793/BookList/new')
      .then((response) => {
        this.tableData2 = response.data
        this.score = response.data[0].score / 2
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    onSearch () {
      let username = this.$route.params.username
      this.$router.push({name: `SearchResult`, params: {book_name: this.search, username: username}})
    },
    onBookDetail (row) {
      let username = this.$route.params.username
      this.$router.push({name: `BookDetail`, params: {bookid: row.id, username: username}})
    },
    onDetail (index) {
      let username = this.$route.params.username
      this.$router.push({name: `BookDetail`, params: {bookid: this.tableData2[index].id, username: username}})
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
    }
  }
}
</script>

<style>
  .search{
    display: flex;
    width: 250px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
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
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .rating-table {
    width: 400px;
  }
  .card{
    width: 400px;
  }
  .new-list{
    margin-left: 80px;
    margin-right: 80px;
  }
  .new-card{
    width:150px;
  }
  .new-title{
    font-size: 20px;
    font-weight: bold;
    border-top: 5px solid #409EFF;
  }
  .subtitle{
    font-size: 20px;
    font-weight: bold;
    color: #409EFF;
    margin-left: 150px;
  }
  .introduction{
    font-weight: lighter;
    font-size: 15px;
    padding: 15px;
  }
  .bookname{
    font-size: 20px;
    font-weight: bold;
  }
</style>
