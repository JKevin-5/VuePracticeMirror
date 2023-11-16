<template>
  <OutlineVue>
      <van-calendar
        :poppable="false"
        :min-date="minDate"
        :max-date="maxDate"
        ref="calendar"
        @select="show"
      >
        <template #footer>
          <div>
            <van-button block type="danger" @click="changeDate">
              选择日期
            </van-button>
            <van-popup v-model="showFlag" position="bottom" :style="{ height: '40%' }" round>
              <van-datetime-picker
                item-height='35'
                v-model="currentDate"
                type="date"
                title="选择年月日"
                :min-date="minDate1"
                :max-date="maxDate1"
                @confirm="onConfirm"
                @cancel="showFlag = false"
                style="height: 100%;"
              />
            </van-popup>
          </div>
        </template>
      </van-calendar>
  </OutlineVue>
</template>

<script>
import OutlineVue from './layout/Outline.vue'
export default {
  components:{
    OutlineVue
  },
  data() {
    return {
      minDate: new Date(2023, 0, 1),
      maxDate: new Date(),
      minDate1: new Date(2020, 0, 1),
      maxDate1: new Date(),
      showFlag: false,
      currentDate: new Date()
    }
  },
  created() {

  },
  methods:{
    show(value){
      console.log(value)
    },
    changeDate(){
      this.showFlag = true
    },
    onConfirm(value){
      this.minDate = value
      this.$refs.calendar.reset(this.minDate)
      this.showFlag = false
    }
  }
}
</script>

<style>

</style>