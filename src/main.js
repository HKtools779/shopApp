/*
入口JS
 */
import Vue from 'vue'
import {Button} from 'mint-ui'

import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer'   //加载mockServer即可
import './filters'   //加载过滤器

//注册全局组件标签
Vue.component(Button.name,Button)  //组件<mt-Button>

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store  //使用时vuex
})
