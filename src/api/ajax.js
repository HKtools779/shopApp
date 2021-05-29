/*
Ajax请求模块
返回值：Promise对象（返回response.data）
 */
import axios from 'axios'
// axios.defaults.withCredentials = true

const BASE_URL='/api'

export  function ajax(url,data={},type='GET'){
  url=BASE_URL+url

  return new Promise(function (resolve,reject){
    //执行异步ajax请求
    let promise
    if(type==='GET'){
      //准备url query参数数据
      let dataStr=''  //数据拼接字符串
      Object.keys(data).forEach(key=>{
        dataStr+=key+'='+data[key]+'&'
      })
      if(dataStr!==''){
        dataStr=dataStr.substring(0, dataStr.lastIndexOf('&'))
        url=url+'?'+dataStr
      }//发送get请求
      promise=axios.get(url)
    }else{
      promise=axios.post(url,data)
    }
    promise.then(function (response){
      //成功调用resolve
      resolve(response.data)
    }).catch(function (error){
      //失败则reject
      reject(error)
    })
  })
}

export  function ajax2(url,data={},type='GET'){

  return new Promise(function (resolve,reject){
    //执行异步ajax请求
    let promise
    if(type==='GET'){
      //准备url query参数数据
      let dataStr=''  //数据拼接字符串
      Object.keys(data).forEach(key=>{
        dataStr+=key+'='+data[key]+'&'
      })
      if(dataStr!==''){
        dataStr=dataStr.substring(0, dataStr.lastIndexOf('&'))
        url=url+'?'+dataStr
      }//发送get请求
      promise=axios.get(url)
    }else{
      promise=axios.post(url,data)
    }
    promise.then(function (response){
      //成功调用resolve
      resolve(response.data)
    }).catch(function (error){
      //失败则reject
      reject(error)
    })
  })
}
