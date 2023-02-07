import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 用来存储数据
const state = {
    isShow: false,
}
// 响应组件中的事件
const actions = {

}
// 操作数据
const mutations = {
    // 展示loading的方法
    showLoading(state) {
        state.isShow = true
    },
    // 隐藏loading的方法
    hideLoading(state) {
        state.isShow = false
    },
}
// 用来将state数据进行加工
const getters = {

}
// 新建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
