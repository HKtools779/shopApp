/*
直接更新state的多个方法的对象
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_FOOD_TYPES,
  RECEIVE_USER_INFO,
  REMOVE_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
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

}