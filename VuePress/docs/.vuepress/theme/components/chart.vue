<template>
  <div class="submission-chart">
    <div class="calendar">
      <div class="weeks">
        <div class="week">Tues</div>
        <div class="week">Thur</div>
        <div class="week">Sat</div>
      </div>
      <div class="column" v-for="(columnData, columnIndex) in dateData" :key="columnIndex">
        <div class="title">{{columnData.title}}</div>
        <div 
          class="date-wrapper" 
          v-for="(dateData, dateIndex) in columnData.data" 
          :key="dateIndex" 
          :style="`background:${getColor(dateData.number)};`" 
        >
        <!-- <Tooltip placement="top" :delay="300" :content="`${dateData.date}：${dateData.number}次通过`"> -->
          <div class="date"></div>
        <!-- </Tooltip> -->
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="slider">
        <!-- <div class="slider-desc">0</div>
        <div style="width:120px;">
         <Slider :value="sliderValue" :max="12" range :tip-format="sliderFormat" @on-change="sliderChange"></Slider>
        </div>
        <div class="slider-desc">12+</div> -->
      </div>
      <div class="legend">
        <div class="level-desc">少</div>
        <div class="level level-1"></div>
        <div class="level level-2"></div>
        <div class="level level-3"></div>
        <div class="level level-4"></div>
        <div class="level level-5"></div>
        <div class="level-desc">多</div>
      </div>
    </div>
  </div>
</template>
 
<script>
  import moment from 'moment'
  export default {
    name: 'chart',
    data () {
      return {
        dateData: [],
        submissionRecord: {},
        sliderValue: [0, 12]
      }
    },
    props: {
      profile: {
        default: {},
        type: Object
      }
    },
    mounted () {
      this.formatProblemData()
      this.init()
      window.addEventListener('resize', ()=>{
        this.init();
      });
    },
    methods: {
      init () {
        // 上一年信息
        let prevYear = moment().format('YYYY') - 1
        let prevTodayFormatStr = prevYear + '-' + moment().format('MM-DD')
        // 移动端界面 或较小宽度界面显示4个月内的活动记录
        if(window.innerWidth<900){
          prevYear = moment().subtract(3.5,'months').format('YYYY')
          prevTodayFormatStr = prevYear + '-' + moment().subtract(3.5,'months').format('MM-DD')
        }
        let prevToday = moment(prevTodayFormatStr).format('YYYY-MM-DD')
        // 上年今日的是星期几
        let prevTodayWeekNum = moment(prevToday).weekday() || 7
        // 初始日期（上年临近的星期一）
        let firstMondayDate = prevTodayWeekNum > 1 ? moment(prevToday).add(8 - prevTodayWeekNum, 'days').format('YYYY-MM-DD') : prevToday
        // 初始日期至今日的天数，包括今日
        let days = moment().diff(moment(firstMondayDate), 'days') + 1
        // 每周天数
        let columns = 7
        // 最大列数（周数）
        let lineNums = Math.ceil(days / columns)
        // 绘制图表的源数据
        let dateData = []
        let monthCN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let startSliderNum = this.sliderValue[0]
        let endSliderNum = this.sliderValue[1]
        for (let i = 0; i < lineNums; i++) {
          // 最近一星期不一定满的
          let weekColumn = (i === lineNums - 1 ? days % columns ? days % columns : columns : columns)
          // 开始计算title（月份的图例）
          // 思路：第一列直接根据第一天的月份
          //      之后的嘛列数根据上一周的最后一天减去第一天的月份，如果大于1代表月份发生了改变，下一列的title显示最新的月份
          let theWeekStartMonth = moment(firstMondayDate).add(i * 7, 'days').format('M')
          let theWeekEndMonth = moment(firstMondayDate).add(i * 7 + weekColumn, 'days').format('M')
          let ifSwitchMonth = false
          if (theWeekEndMonth - theWeekStartMonth) {
            ifSwitchMonth = true
          }
          let title = (i === 0 && !ifSwitchMonth) ? monthCN[theWeekStartMonth - 1] : ''
          // i 大于0 ，说明不在第一周， 月份是否发生改变
          if (i && dateData[i - 1].ifSwitchMonth) {
            title = monthCN[theWeekEndMonth - 1]
          }
          // 图表源数据格式：columns：列数，title：列标题，ifSwitchMonth：月份是否发生改变，data：每格数据
          dateData.push({
            columns: weekColumn,
            title: title,
            ifSwitchMonth: ifSwitchMonth,
            data: []
          })
          for (let j = 0; j < dateData[i].columns; j++) {
            let date = moment(firstMondayDate).add(i * 7 + j, 'days').format('YYYY-MM-DD')
            let number = 0
            // 提交次数在slider范围内再进行次数赋值
            if ((this.submissionRecord[date] >= startSliderNum && this.submissionRecord[date] < endSliderNum) ||
             (this.submissionRecord[date] > 12 && endSliderNum === 12)) {
              number = this.submissionRecord[date]
            }
            // number：提交次数，date：提交日期
            dateData[i].data.push({
              number: number,
              date: date
            })
          }
        }
        this.dateData = dateData
      },
      formatProblemData () {
        let submissionRecord = {}
        // let OIProblems = this.profile.oi_problems_status.problems || {}
        // // 格式化profile中oi的提交记录数据，创建submissionRecord对象，将create_time作为key进行存储
        // Object.keys(OIProblems).forEach(problemID => {
        //   if (OIProblems[problemID]['status'] === 0) {
        //     let date = moment(OIProblems[problemID]['create_time']).format('YYYY-MM-DD')
        //     // 第一次出现提交次数设置1，之后每次出现提交次数+1
        //     submissionRecord[date.toString()] = submissionRecord[date] ? ((submissionRecord[date])) + 1 : 1
        //   }
        // })
 
        // 处理你的业务逻辑
        // submissionRecord 最后的格式应为 {'2020-01-01':10, '2020-01-02': 11}
        // this.submissionRecord = submissionRecord
        this.submissionRecord = this.profile
      },
      getColor (number) {
        // level color
        // 左闭右开
        let color = '#EBEDF0'
        if (number >= 12) {
          color = '#196127'
        } else if (number >= 8) {
          color = '#239A3B'
        } else if (number >= 4) {
          color = '#7BC96F'
        } else if (number >= 1) {
          color = '#C6E48B'
        } else {
          color = '#EBEDF0'
        }
        return color
      },
      sliderFormat (val) {
        return '提交次数: ' + val
      },
      sliderChange (val) {
        // 没有使用v-model绑定sliderValue而是采用回调的原因
        // 1.拖拽1px sliderValue都会引起组件重绘，此组件计算嵌套了2个for循环，导致页面出现卡顿slider不流畅的情况
        this.sliderValue = val
        this.init()
      }
    }
  }
</script>
<style lang="less" scoped>
  .submission-chart {
    // width: 820px;
    // height: 180px;
    // background-color: #fff;
    margin: auto;
    margin-top: 20px;
    padding: 0px 0;
    font-size: 12px;
 
    .calendar {
      margin-left: 16px;
      margin-right: 16px;
      display: flex;
 
      .weeks {
        width: 30px;
        margin-right: 3px;
        margin-top: 22px;
 
        .week {
          margin-top: 13px;
          width: 30px;
          height: 14px;
        }
      }
 
      .column {
        width: 11px;
        margin-right: 3px;
 
        .title {
          width: 14px;
          height: 14px;
          margin-bottom: 8px;
          text-align: left;
          overflow: visible;
          white-space: nowrap;
        }
 
        .date-wrapper { 
          width: 11px;
          height: 11px;
          background: #EBEDF0;
          margin-bottom: 3px;
 
          .date {
            width: 11px;
            height: 11px;
 
            :hover {
              width: 13px;
              height: 13px;
            }
          }
        }
      }
    }
    
    .operation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
 
      .slider {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
 
        .slider-desc {
          width: 11px;
          margin: 0 8px;
        }
      }
 
      .legend {
        display: flex;
        justify-content:center;
        align-items: center;
 
        .level-desc {
          margin-right: 6px;
          margin-left: 3px;
        }
 
        .level {
          margin-right: 3px;
          width: 11px;
          height: 11px;
        }
 
        .level-1 {
          background: #EBEDF0;
        }
 
        .level-2 {
          background: #C6E48B;
        }
 
        .level-3 {
          background: #7BC96F;
        }
 
        .level-4 {
          background: #239A3B;
        }
 
        .level-5 {
          background: #196127;
        }
      }
    }
  }
</style>