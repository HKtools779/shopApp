<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification"
                      :class="{right_phone: rightPhone}" @click.prevent="getCode">
                {{computeTime>0? `已发送(${computeTime})秒`: '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd? 'on' : 'off' " @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
<!--                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha">-->
                <div class= "picCodeWrapper" @click="getCaptcha"></div>
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou"></i>
      </a>
    </div>
    <AlterTip :alertText="alertText" v-show="alterShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
import AlterTip from '../../components/AlterTip/AlterTip'

import {reqPicCode, reqPwdLogin, reqSendCode, reqSmsLogin} from '../../api'


export default {

  data(){
    return{
      //true代表短信登录
      loginWay: true,
      //手机号
      phone: '',
      //手机验证码
      code:'',
      //计算时间
      computeTime: 0,
      //是否显示密码
      showPwd: false,
      //密码
      pwd: '',
      //图片验证码
      captcha:'',
      //手机、邮箱名
      name:'',
      //提示框提示信息
      alertText:'',
      //是否显示提示框
      alterShow: false,
    }
  },

  computed:{
    rightPhone(){
      return /^1\d{10}$/.test(this.phone)
    }
  },

  mounted () {
    this.getCaptcha()
  },

  methods: {
    //异步获取短信验证码
    async getCode(){
      // 如果当前没有计时
      if(!this.computeTime){      //启动倒计时
        this.computeTime = 30
        this.set1=setInterval(()=>{
          this.computeTime--
          if(this.computeTime<=0){
            clearInterval(this.set1)
          }
        }, 1000)

        //发送ajax请求，向手机号发短信
        const result= await reqSendCode(this.phone)
        if (result.code===1){
          //显式提示
          this.showAlter(result.msg)
          //停止倒计时
          this.stopTimeCount()
        }
      }
    },

    //关闭计时
    stopTimeCount(){
      if(this.computeTime){
        this.computeTime=0
        if(this.set1){
          clearInterval(this.set1)
          this.set1=undefined
        }
      }
    },

    //显式警告框
    showAlter(alterText){
      this.alertText=alterText
      this.alterShow= true
    },
    //  关闭提示框
    closeTip(){
      this.alterShow= false
      this.alertText=''
    },

    //获取新的图片验证码
    async getCaptcha(){
      //每次指定的src值不一样
      // event.target.src='http://localhost:4000/captcha?time='+Date.now()
      const picCodeData=await reqPicCode()
      const picWrapper = document.getElementsByClassName('picCodeWrapper')[0]
      picWrapper.innerHTML = picCodeData
      // console.log(picWrapper)
      // console.log(picCodeData)
    },

    //前台表单验证并且发送登录请求
    async login(){
      let result  //返回结果数据

      if(this.loginWay){  //短信登录
        const {rightPhone,phone, code}=this
        if(!rightPhone){
          //手机号不正确
          this.showAlter('请输入正确的手机号')
          return
        }else if(!/^\d{6}$/.test(code)){
          //验证码不正确
          this.showAlter('请输入正确的验证码')
          return
        }

        //发送ajax短信登录
        result = await reqSmsLogin(phone, code)

      }else {  //密码登录
        const {name, pwd, captcha} = this
        if(!name){
          //请输入用户名
          this.showAlter('请输入用户名')
          return
        }else if(!pwd){
          //请输入密码
          this.showAlter('请输入密码')
          return
        }else if(!captcha){
          //请输入验证码
          this.showAlter('请输入验证码')
          return
        }

        //密码登录
        result = await reqPwdLogin(name, pwd, captcha)
      }

      //根据结果处理
        //停止计时
      this.stopTimeCount()

      if(result.code===0){
        console.log(result)
        const user = result.data
        //将user保存到vuex的state中、
        this.$store.dispatch('recordUser',user)
        //跳转去个人中心界面
        await this.$router.replace('/profile')
      }else {
        const msg = result.msg
        this.showAlter(msg)
      }
    },
  },

  components:{
    AlterTip
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
            .picCodeWrapper
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .2s
                &.right
                  transform translateX(30px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      .icon-jiantou
        font-size 20px
        color #999
</style>
