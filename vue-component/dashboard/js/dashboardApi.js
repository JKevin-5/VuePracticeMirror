const getTokenUrl = 'https://r.ymsl.com.cn/gcdn/test/authentication/getAccessTokenWithoutLogin'
const BASE_URL = 'https://r.ymsl.com.cn/gcdn/test'
const username = 'ADMIN'
const siteId = '6666'
const password = 'a123456'

const URL_REFRESH_TOKEN = '/authentication/refreshToken'
// const URL_SIGN_IN = '/authentication/getAccessTokenByPassword'
const URL_SIGN_IN = '/authentication/getAccessTokenWithoutLogin'


const getAccessToken = () =>{
    let url = getTokenUrl+"?username="+username+"&siteId="+siteId+"&password="+password
    return new Promise((resolve,reject)=>{
    	Vue.http.post(url).then(function(res){
    		saveToken(res.body.access_token)
    		resolve()
    	})
    })
}

//刷新token
const refreshToken = function(){
    var url = BASE_URL+URL_REFRESH_TOKEN;
    var body = {
        refreshToken:getRefreshToken()
    }
    return Vue.http.post({url,body})
}

const getSfcOrderFinishPercent = (_this) =>{
    return new Promise((resolve,reject)=>{
        let url = BASE_URL+'/analysis/oauth2/getSfcOrderFinishPercent'
        Vue.http.get(url).then(function(res){
            resolve(res.body);
        }).catch(function(err){
            console.log(err);
            reject();
        })
    })
}

const getSfcOrderScrapPercent = (_this) =>{
    return new Promise((resolve,reject)=>{
        let url = BASE_URL+'/analysis/oauth2/getSfcOrderScrapPercent'
        Vue.http.get(url).then(function(res){
            resolve(res.body);
        }).catch(function(err){
            console.log(err);
            reject();
        })
    })
}

const addToken = (request, token) =>{
    if (typeof token !== 'string' || token.trim().length === 0) {
        return request;
    }
    return request.headers.set("Authorization", token);
}

const saveToken = function (token) {
    localStorage.setItem("currentToken", token);
};

const getToken = function () {
    return localStorage.getItem("currentToken");
};

const saveRefreshToken = function (token) {
    debugger
    localStorage.setItem("refreshToken", token);
};

const getRefreshToken = function () {
    return localStorage.getItem("refreshToken");
};

// 头部添加token
const addTokenToHeader = function(request, token) {
    if (typeof token !== 'string' || token.trim().length === 0) {
        return request;
    }
    return request.headers.set("Authorization", 'bearer '+token);
};

//401 重新请求token
const handle401Error = function(request, next) {
    var isRefreshingToken = false;
    if (!isRefreshingToken) {
        isRefreshingToken = true;
        return refreshToken().then((result) => {
            isRefreshingToken = false;
            return next(request);
        }).catch(() => {
            isRefreshingToken = false;
            alert("数据请求异常！")
        })
    }

}