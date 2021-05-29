/*
间接更新state
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_FOOD_TYPES,
  RECEIVE_USER_INFO,
  REMOVE_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  RECEIVE_INFO,
} from './mutation-types'
import {
  reqAddress,
  reqShops,
  reqFoodTypes,
  reqUseInfos,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,

} from '../api'

export default {
  //异步获取地址
  async getAddress({commit,state}){
    //发送异步ajax请求
    const geohash =state.latitude+','+state.longitude
    const result= await reqAddress(geohash)
    //提交一个mutation
    if(result.code===0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  async getFoodTypes({commit}){
    //发送异步ajax请求
    const result= await reqFoodTypes()
    //提交一个mutation
    if(result.code===0) {
      const foodTypes = result.data
      commit(RECEIVE_FOOD_TYPES, {foodTypes})
    }
  },

  async getShops({commit,state}){
    //发送异步ajax请求
    const {longitude, latitude}= state
    const result= await reqShops(longitude,latitude)
    //提交一个mutation
    if(result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  //同步记录用户信息//将获得的用户信息保存到store中
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },

  //异步 获取用户信息
  async getUserInfo({commit}){
    const result = await reqUseInfos()
    if(result.code===0){
      const  userInfo=result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },

  async logout({commit}){
    const result = await reqLogout()
    if(result.code===0){
      commit(REMOVE_USER_INFO)
    }
    return result.code
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
    }
  },

// 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})

    }
  },

// 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      //数据更新了，执行
      callback && callback()
    }
  },


}
