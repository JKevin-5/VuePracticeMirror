/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 *    code:0,
 *    data:"成功",
 *    message:""
 * }
 */
import axios from 'axios'
import { Toast } from 'vant';

// 创建一个独立的axios实例
const service = axios.create({ 
    // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    // baseURL: '/api',
    // 定义统一的请求头部
    headers: {
    //    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        Authorization : "Bearer "+`${JSON.parse(localStorage.getItem("appToken"))}`
    },
    // 配置请求超时时间
    timeout: 10000, 
    // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
    withCredentials: true
});
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
// 请求拦截
service.interceptors.request.use(config => {
    // 自定义header，可添加项目token
    //debugger;// eslint-disable-line
    // config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
});
// 返回拦截
service.interceptors.response.use((response)=>{
    // 获取接口返回结果
    const res = response.data;
    // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
    if(res.code === 0|200){
        return res;
    }else if(res.code === 10000){
        // 10000假设是未登录状态码
        Toast(res.message);
        // 也可使用router进行跳转
        window.location.href = '/#/login';
        return res;
    }else{
        // 错误显示可在service中控制，因为某些场景我们不想要展示错误
        // Message.error(res.message);
        return res;
    }
},()=>{
    Toast.fail('网络请求异常，请稍后重试!');
});
// process.env.NODE_ENV === "production"? "":"http://localhost"
export default service;