import axios from "axios";

// 创建axios实例
const instance = axios.create({
    timeout:10000
})

export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
      instance({
        method: 'get',
        url,
        params,
        headers: {
          'token': window.localStorage.token
        },
        ...config
      },).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
}

//post请求
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        url,
        data,
        headers: {
          'token': window.localStorage.token
        },
        ...config
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }