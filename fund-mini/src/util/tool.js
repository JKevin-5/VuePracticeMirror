// 封装本地存储的方法
var prototype={
    $setStroage(key, value) {
        //对象必须序列化才能存入缓存
        localStorage.setItem(key, JSON.stringify(value));
    },
    $getStroage(key) {
        //反序列化
        return JSON.parse(localStorage.getItem(key));
    },
    $removeStroage(key) {
        localStorage.removeItem(key);
    }
}

const TOKEN_NAME = 'appToken'

// 获取token
function getToken() {
    return this.prototype.$getStroage(TOKEN_NAME)
}
// 删除token
function delToken() {
    return this.prototype.$removeStroage(TOKEN_NAME)
}
// 设置token
function setToken(token) {
    return this.prototype.$setStroage(TOKEN_NAME,token)
}
export default {
    prototype,
    getToken,
    delToken,
    setToken
};