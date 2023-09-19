<template>
  <div id="app">
    
    <div class="layout">
      <div class="monitor"></div>
      <div class="box">
        <transition name="action" @after-enter="func" @before-leave="func" @after-leave="close" mode="out-in">
          <div v-show="isShow" class="inner-box">
            <div :class="leftClass" id="left-door"></div>
            <div :class="rightClass" id="right-door"></div>
          </div>
        </transition>
      </div>
    </div>

    <div class="small-box">
      <button @click="isShow=!isShow">action</button>
      <!-- <button @click="isOpen=!isOpen">action</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      isShow: false,
      isOpen: false,
      leftClass: 'left-door',
      rightClass: 'right-door'
    }
  },
  watch: {

  },
  methods: {
    func(){
      console.log("动画结束");
      this.isOpen = !this.isOpen;
      if(this.isOpen){
        this.leftClass = 'left-door-open'
        this.rightClass = 'right-door-open'
      }else{
        this.leftClass = 'left-door-close'
        this.rightClass = 'right-door-close'
      }
    },
    close(){
      this.leftClass = 'left-door'
      this.rightClass = 'right-door'
    }
  },
  mounted() {
    this.isShow = true;
  },
}
</script>

<style>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
  }
  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .monitor {
    width: 100px;
    height: 50px;
    background-color: #4f98eb;
  }
  .box {
    width: 500px;
    height: 700px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 0.5rem solid;
  }
  .small-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 7ch;
    height: 150px;
    background-color: #f0f0f0;
    margin-left: 20px;
    z-index: 2;
  }
  .inner-box {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 400px;
    height: 600px;
    background-color: #f0f0f0;
  }

  .left-door {
    width: 50%;
    height: 100%;
    border: 0.5rem solid;
    border-right-width: 0.25rem;
  }

  .right-door {
    width: 50%;
    height: 100%;
    border: 0.5rem solid;
    border-left-width: 0.25rem;
  }

  @keyframes action {
    from {
      transform: translateY(-140%);
    }
    to {
      transform: translateY(0px);
    }
  }

  .action-enter-active {
    animation: action 1.2s;
    z-index: -1;
  }
  

  .action-leave-active {
    animation: action 2s reverse;
    z-index: -1;
  }

  @keyframes right {
    from {
      transform: translateX(0px);
    }

    to {
      transform: translateX(100%);
    }
  }

  .right-door-open {
    width: 50%;
    height: 100%;
    border: 0.5rem solid;
    border-left-width: 0.25rem;
    animation: right 1.2s;
    transform: translateX(100%);
  }

  .right-door-close {
    width: 50%;
    height: 100%;
    border: 0.5rem solid;
    border-left-width: 0.25rem;
    animation: right 1.2s reverse;
  }

  @keyframes left {
    from {
      transform: translateX(0px);
    }

    to {
      transform: translateX(-100%);
    }
  }

  .left-door-open {
    animation: left 1.5s;
    width: 50%;
    height: 100%;
    border: 0.5rem solid;
    border-right-width: 0.25rem;
    transform: translateX(-100%);
    z-index: -1;
  }

  .left-door-close {
    width: 50%;
    height: 100%;
    border: 0.5rem solid;
    border-right-width: 0.25rem;
    animation: left 1.5s reverse;
    z-index: -1;
    /* transform: translateX(0px); */
  }
</style>
