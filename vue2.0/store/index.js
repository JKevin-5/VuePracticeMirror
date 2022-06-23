// vuex 3.0
var store = new Vuex.Store({
    state:{
        user:{
            userName:'',
            userCode:'',
            roleList:[]
        }
    },
    mutations: {
        login: function (state,data) {
            state.user = data.user;
            localStorage.setItem('user',JSON.stringify(data.user));
        },
        logout: function (state) {
            state.user = {
                userName:'',
                userCode:'',
                roleList:[]
            };
            localStorage.removeItem('user');
        }
    }
})