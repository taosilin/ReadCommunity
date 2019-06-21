import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home'
import Me from '@/components/page/Me'
import SignIn from '@/components/page/SignIn'
import SignUp from '@/components/page/SignUp'
import BookDetail from '@/components/page/BookDetail'
import Type from '@/components/page/Type'
import TypeList from '@/components/page/TypeList'
import Recommend from '@/components/page/Recommend'
import SearchResult from '@/components/page/SearchResult'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Me',
      name: 'Me',
      component: Me
    },
    {
      path: '/BookDetail',
      name: 'BookDetail',
      component: BookDetail
    },
    {
      path: '/Type',
      name: 'Type',
      component: Type
    },
    {
      path: '/TypeList',
      name: 'TypeList',
      component: TypeList
    },
    {
      path: '/Recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/SearchResult',
      name: 'SearchResult',
      component: SearchResult
    }
  ]
})
