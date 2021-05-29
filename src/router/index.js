/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
import MSite from '../pages/MSite/MSite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../pages/Shop/ShopRatings/ShopRating'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // 配置所有路由
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRating
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path:'',
          redirect:'/shop/goods'
        }
      ]
    },
    {
      path: '/',
      redirect: '/msite',
      meta:{
        showFooter: true
      }
    }
  ]
})
