<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"/>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(foodTypes,index) in foodTypesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(foodType,index) in foodTypes" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl+foodType.image_url">
              </div>
              <span>{{foodType.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'

  import HeaderTop from '../../components/FooterGuide/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import {mapState} from 'vuex'

  export default {

    data(){
      return{
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },

    computed:{
      ...mapState(['address','foodTypes','userInfo']),

      //生成food的二维数组，最大为八
      foodTypesArr(){
        const {foodTypes}= this
        const arr=[]
        let insideArr=[]
        //遍历foodTypes
        foodTypes.forEach(c=>{
          insideArr.push(c)
          if(insideArr.length===8){
            arr.push(insideArr)
            insideArr=[]
          }
        })
        if(insideArr.length>0){
          arr.push(insideArr)
        }
        return arr
      }
    },

    watch:{
      foodTypes(newVal){  //该函数调用，说明值改变 foodTypes获得数据，在异步更新界面之前
        // //创建一个Swiper对象，实现轮播//创建的时间要在列表显示之后
        // setTimeout(()=>{
        //   new Swiper('.swiper-container', {
        //     loop: true, // 循环模式选项
        //     pagination: {
        //       el: '.swiper-pagination',
        //     }
        //   })
        // },100)

        //界面更新完成就创建swiper对象
        this.$nextTick(()=>{//一旦完成界面更新，立即调用
            new Swiper('.swiper-container', {
              loop: true, // 循环模式选项
              pagination: {
                el: '.swiper-pagination',
              }
            })
        })
      }
    },
    mounted () {

      this.$store.dispatch('getFoodTypes')
      this.$store.dispatch('getShops')

    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
&.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .icon-xuanxiang
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
