<template>
  <div class="bar-data">
    <div class="data-content">
      <div v-show="!hideChart" :id="chartId" style="width: 100%; height: 100%"></div>
      <div v-show="hideChart" class="no-data">暂无数据</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BAR_DATA'

  export default {
    name: COMPONENT_NAME,
    props: {
      chartId: {
        type: String,
        default: 'bar'
      }
    },
    data() {
      return {
        tabIndex: 0,
        hideChart: false,
        myChart: '',
        data: {
          x: ['1月1号', '1月2号', '1月3号', '1月4号', '1月5号', '1月6号', '1月7号'],
          series: [[], [], []]
        }
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.$set(this.data.series, 0, this.random(7, 300))
      this.$set(this.data.series, 1, this.random(7, 300))
      this.$set(this.data.series, 2, this.random(7, 300))
    // this.drawBar(this.data, '退货数')
    },
    beforeDestroy() {
      this.myChart = ''
      window.removeEventListener('resize', this.resize) // 取消监听
    },
    methods: {
      resize() {
        this.myChart && this.myChart.resize()
      },
      random(itemNumber, max) {
        return new Array(itemNumber).fill(1).map((item, index) => {
          return Math.ceil(Math.random() * max)
        })
      },
      // 纵向柱状图
      drawBar(data, rate) {
        // let sec = this.chartId.slice(3)
        // if (!data.xAx.length) {
        //   this.hideChart = true
        //   // this.$emit('noData', sec - 1)
        //   return
        // }
        // this.$emit('hasData', sec - 1)
        this.hideChart = false
        this.$nextTick(() => {
          let xAxisData = data.xAx.length > 0 ? data.xAx : this.data.x
          let seriesData = data.series.length > 0 ? data.series : this.data.series
          let el = document.getElementById(this.chartId)
          this.$echarts.dispose(el) // 销毁之前的实例
          let myChart = this.$echarts.init(el)
          this.myChart = myChart
          console.log(this.myChart, 123)
          window.addEventListener('resize', this.resize) // 加监听
          let color = ['#5f45ff', '#0090ff', '#02cdff']
          myChart.setOption(this.createBar(xAxisData, seriesData, color))
        })
      },
      // 纵向柱状图
      createBar(xAxisData, seriesData, color, rate = false) {
        console.log(xAxisData, seriesData, color, 111)
        return {
          legend: {
            show: true,
            data: ['自营订单', '线上商城', '乘务主扫']
          },
          grid: {
            left: '40',
            right: '40',
            bottom: '30',
            top: '20',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: xAxisData.length <= 5,
            data: xAxisData,
            offset: 10,
            nameGap: 20,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#F0F3F5',
                width: 0.5
              }
            },
            axisLabel: {
              color: '#666',
              fontSize: 12,
              align: 'center',
              formatter: function(value) {
                return value.slice(0, 4)
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ccc',
                width: 0.5
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ccc',
                width: 0.5
              }
            }
          },
          yAxis: {
            minInterval: 1,
            type: 'value',
            offset: 10.5,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#F0F3F5',
                width: 0.5
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#00a1e4',
                width: 0.5
              }
            },
            axisLabel: {
              padding: [0, 10, 0, 0],
              formatter: function(data) {
                return data + (rate ? '%' : '')
              },
              color: '#999'
            },
            axisLine: {
              show: false,
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            }
          },
          tooltip: {
            trigger: 'item',
            padding: [5, 10],
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                opacity: 0
              }
            },
            formatter(prams) {
              console.log(prams, 112)
              return `${prams.name}：${prams.value}${rate ? '%' : ''}`
            }
          },
          series: [
            {
              type: 'bar',
              data: seriesData[0],
              stack: 'one',
              barWidth: '20px',
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: color[0]
                }
              }
            },
            {
              type: 'bar',
              data: seriesData[1],
              stack: 'one',
              barWidth: '20px',
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: color[1]
                }
              }
            },
            {
              type: 'bar',
              data: seriesData[2],
              stack: 'one',
              barWidth: '20px',
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: color[2]
                }
              }
            }
          ]
        }
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .bar-data
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
  .data-content
    width: 100%
    height: 100%
    position: relative
    #barData
      width: 100%
      height: 100%
    .no-data
      width: 100%
      height: 100%
      position: absolute
      left: 0
      top: 0
      display: flex
      align-items: center
      justify-content: center
      color: #666
      font-size: $font-size-14
      font-family: $font-family-regular
</style>
