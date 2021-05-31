/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_FOOD_TYPES,
  RECEIVE_USER_INFO,
  REMOVE_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}){
    state.address=address
  },
  [RECEIVE_SHOPS](state, {shops}){
    state.shops=shops
  },
  [RECEIVE_FOOD_TYPES](state, {foodTypes}){
    state.foodTypes=foodTypes
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [REMOVE_USER_INFO](state){
    state.userInfo={}
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(!food.count){
      Vue.set(food,'count',1)  //让新增的属性也有数据绑定
      //添加food条目进购物车
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count){
      food.count--
      if(food.count===0){
        //将food从购物车移除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },

  [CLEAR_CART](state) {
    //清除food中的count
    state.cartFoods.forEach(food=>food.count=0)
    //移除购物车商品
    state.cartFoods = []
  },


}
