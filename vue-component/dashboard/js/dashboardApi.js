const getTokenUrl = 'https://r.ymsl.com.cn/gcdn/test/authentication/getAccessTokenWithoutLogin'
const username = 'ADMIN'
const siteId = '6666'
const password = 'a123456'

const getAccessToken = (_this) =>{
    let url = getTokenUrl+"?username="+username+"&siteId="+siteId+"&password="+password
    _this.$http.post(url).then(function(res){
        saveToken(res.body.access_token)
    })
}
/**
 * 
 * @param {} _this 
 * @returns 
 */
const getSfcFinishToday = (_this) =>{
    return new Promise((resolve,reject)=>{
        let url = 'https://r.ymsl.com.cn/gcdn/test/analysis/oauth2/getSfcFinishToday'
        _this.$http.get(url,{
            'headers':{
                'Authorization':'bearer '+getToken(),
            },
        }).then(function(res){
            resolve(res.body);
        }).catch(function(err){
            console.log(err);
            reject();
        })
    })
}

const getSfcOrderFinishPercent = (_this) =>{
    return new Promise((resolve,reject)=>{
        let url = 'https://r.ymsl.com.cn/gcdn/test/analysis/oauth2/getSfcOrderFinishPercent'
        _this.$http.get(url,{
            'headers':{
                'Authorization':'bearer '+getToken(),
            },
        }).then(function(res){
            resolve(res.body);
        }).catch(function(err){
            console.log(err);
            reject();
        })
    })
}

const getSfcOrderUnfinishToday = (_this) =>{
    return new Promise((resolve,reject)=>{
        let url = 'https://r.ymsl.com.cn/gcdn/test/analysis/oauth2/getSfcOrderUnfinishToday'
        _this.$http.get(url,{
            'headers':{
                'Authorization':'bearer '+getToken(),
            },
        }).then(function(res){
            resolve(res.body);
        }).catch(function(err){
            console.log(err);
            reject();
        })
    })
}

const getSfcOrderScrapPercent = (_this) =>{
    return new Promise((resolve,reject)=>{
        let url = 'https://r.ymsl.com.cn/gcdn/test/analysis/oauth2/getSfcOrderScrapPercent'
        _this.$http.get(url,{
            'headers':{
                'Authorization':'bearer '+getToken(),
            },
        }).then(function(res){
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