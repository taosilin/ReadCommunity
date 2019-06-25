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
        <el-breadcrumb-item>图书详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-col>
      <el-row>
        <div class="title">{{book.book_name}}</div>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-image
            style="width: 150px; height: 200px"
            :src="book.book_image"
            :fit="fit"></el-image>
        </el-col >
        <el-col :span="8">
          <el-row>
            <div class="info">作者：{{book.author}}</div>
          </el-row>
          <el-row>
            <div class="info">出版社：{{book.publisher}}</div>
          </el-row>
          <el-row>
            <div class="info">出品方：{{book.producer}}</div>
          </el-row>
          <el-row v-if="book.origin_name!=null">
            <div class="info">原作名：{{book.origin_name}}</div>
          </el-row>
          <el-row v-if="book.translater!=null">
            <div class="info">译者：{{book.translater}}</div>
          </el-row>
          <el-row>
            <div class="info">出版年：{{book.publish_date}}</div>
          </el-row>
          <el-row>
            <div class="info">页数：{{book.page_num}}</div>
          </el-row>
          <el-row>
            <div class="info">装帧：{{book.binding}}</div>
          </el-row>
          <el-row>
            <div class="info">丛书：{{book.series}}</div>
          </el-row>
          <el-row>
            <div class="info">isbn：{{book.isbn}}</div>
          </el-row>
        </el-col>
        <el-col :span="8">
          <div class="score">{{book.score}}({{book.rating_num}}人评价)</div>
          <el-rate
            v-model="score"
            disabled
            text-color="#ff9900"></el-rate>
          <div>
            <div class="star">
              5星<el-progress :percentage="book.star5" :stroke-width="10" ></el-progress>
            </div>
            4星<el-progress :percentage="book.star4" :stroke-width="10"></el-progress>
            3星<el-progress :percentage="book.star3" :stroke-width="10" ></el-progress>
            2星<el-progress :percentage="book.star2" :stroke-width="10" ></el-progress>
            1星<el-progress :percentage="book.star1" :stroke-width="10" ></el-progress>
          </div>
          <el-row>
            <el-tag class="tags" v-for="tag in tags">{{tag}}</el-tag>
          </el-row>
        </el-col>
      </el-row>
        <el-row type="flex">
          <el-button type="primary" icon="el-icon-edit" circle @click="openComment" class="button"></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle @click="onLike" class="button"></el-button>
          <el-button type="success" icon="el-icon-check" circle @click="onRead" class="button"></el-button>
          <div class="rate">
            打分：<el-rate v-model="value"></el-rate>
            <el-popover
              placement="top"
              width="160"
              v-model="visible">
              <p>提交打分后不可更改，确定打分吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="onScore">确定</el-button>
              </div>
              <el-button type="primary" plain slot="reference" >提交分数</el-button>
            </el-popover>
          </div>
        </el-row>
      <el-row>
        <el-col :span="18">
          <el-divider content-position="left"><span class="introduction">内容简介</span></el-divider>
          {{book.introduction}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-divider content-position="left"><span class="introduction">作者简介</span></el-divider>
          {{book.author_info}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-divider content-position="left"><span class="introduction">评论</span></el-divider>
          <div v-for="item in comments" class="comment">
            <el-row><span class="commenter">{{item.nickname}}</span><span class="commenttime">{{item.Time}}</span></el-row>
            <el-row><div class="comment-content">{{item.content}}</div></el-row>
            <el-divider></el-divider>
          </div>
        </el-col>
      </el-row>
    </el-col>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BookDetail',
  data () {
    return {
      activeIndex: '0',
      book: {},
      comments: [],
      currentDate: new Date(),
      value: null,
      score: 0.0,
      visible: false,
      commentContent: '',
      tags: [],
      search: ''
    }
  },
  created () {
    axios.post('http://localhost:51324/BookList/Detail', {'id': this.$route.params.bookid})
      .then((response) => {
        console.log(response)
        this.book = response.data[0]
        this.score = response.data[0].score / 2
        let tags = response.data[0].tags.split(',')
        tags.pop()
        this.tags = tags
      }).catch((error) => {
        console.log(error)
      })
    axios.post('http://localhost:51324/CommentList/Book', {'id': this.$route.params.bookid})
      .then((response) => {
        console.log(response.data)
        this.comments = response.data
        for (var i = 0; i < this.comments.length; i++) {
          this.comments[i].Time = new Date(this.comments[i].commenttime)
          this.comments[i].Time = (this.comments[i].Time).toLocaleString()
        }
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
    openComment () {
      var _this = this
      this.$prompt('请输入评论', '评论此书', {
        confirmButtonText: '确定评论',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        axios.post('http://localhost:51324/CommentList/Add', {'bookid': _this.$route.params.bookid, 'username': _this.$route.params.username, 'content': value, 'commenttime': new Date()})
          .then((response) => {
            console.log(response.data)
            axios.post('http://localhost:51324/CommentList/Book', {'id': _this.$route.params.bookid})
              .then((response) => {
                console.log(response.data)
                _this.comments = response.data
                for (var i = 0; i < _this.comments.length; i++) {
                  _this.comments[i].Time = new Date(_this.comments[i].commenttime)
                  _this.comments[i].Time = (_this.comments[i].Time).toLocaleString()
                }
              }).catch((error) => {
                console.log(error)
              })
          }).catch((error) => {
            console.log(error)
          })
        this.$message({
          type: 'success',
          message: '评论成功'
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消评论'
        })
      })
    },
    onLike () {
      axios.post('http://localhost:51324/LikeBook/UserBook', {'username': this.$route.params.username, 'bookid': this.$route.params.bookid, 'type': '0', 'time': new Date()})
        .then((response) => {
          console.log(response.data)
          if (response.data !== 'exist') {
            this.$message({
              type: 'success',
              message: '收藏成功'
            })
          } else {
            this.$message({
              type: 'info',
              message: '您已收藏过此书'
            })
          }
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '您已收藏过此书'
          })
        })
    },
    onRead () {
      axios.post('http://localhost:51324/LikeBook/UserBook', {'username': this.$route.params.username, 'bookid': this.$route.params.bookid, 'type': '1', 'time': new Date()})
        .then((response) => {
          console.log(response.data)
          if (response.data !== 'exist') {
            this.$message({
              type: 'success',
              message: '阅读完毕'
            })
          } else {
            this.$message({
              type: 'info',
              message: '您已阅读过此书'
            })
          }
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '您已阅读过此书'
          })
        })
    },
    onScore () {
      axios.post('http://localhost:51324/Score/Add', {'bookid': this.$route.params.bookid, 'username': this.$route.params.username, 'score1': this.value})
        .then((response) => {
          console.log(response.data)
          this.$message({
            type: 'success',
            message: '成功打分'
          })
          this.visible = false
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '您已为此书打过分,请勿重复评价'
          })
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
  .bread{
    padding: 20px;
  }
  .main{
    padding-left: 100px;
  }
  .title{
    font-size: 30px;
    font-weight: bold;
    padding: 20px;
  }
  .info{
    font-weight: lighter;
    margin: 5px;
  }
  .score{
    font-size: 20px;
    font-weight: bold;
  }
  .comment{
    padding: 10px;
  }
  .star{

  }
  .tags{
    margin: 5px;
  }
  .rate{
    margin: 10px;
    display: flex;
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
  .introduction{
    color: #409EFF;
    font-weight: bold;
    font-size: 20px;
  }
  .commenter{
    font-size: 20px;
    font-weight: bold;
    margin-right: 20px;
  }
  .commenttime{
    font-weight: lighter;
    color: darkgray;
    font-size: 15px;
  }
  .comment-content{
    padding: 10px;
    font-size: 15px;
  }
  .button{
    margin: 10px;
  }
</style>
