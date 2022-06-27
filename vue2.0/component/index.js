// 全局组件存放
Vue.component('button-counter', {
    template: `
      <div>
        <button v-on:click="count++">You clicked me {{ count }} times.</button>
        <button v-on:click="showName">showme</button>
      </div>`,
    data: function () {
      return {
        count: 0
      }
    },
    methods: {
      showName(){
        debugger
        alert(this.count)
      }
    }
    
})
