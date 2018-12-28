<template>
  <div :id="id" class="chart_box" style="width:100%; height:100%;"></div>
</template>
<script>
export default {
  name: 'lineChart',
  components: {},
  data () {
    return {
    }
  },
  props: {
    id: String,
    titleText: String, // 图表标题
    yName: String, // y轴标题
    xName: String,
    xAxisData: Array, // x轴数据名称
    warningData: Array, // 预警数据
    dangerData: Array, // 报警数据
    unit: String,
    title: Array,
    pointName: String // 折现点名称
  },
  mounted () {
    this.drawLine()
  },
  watch: { // 监测数据 重新绘制
    xAxisData: {
      handler (newName, oldName) {
        this.drawLine()
      }
    },
    opData: {
      handler (newName, oldName) {
        this.drawLine()
      }
    }
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echart.init(document.getElementById(this.id))
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.titleText,
          // text: '噪音历史状况',
          textStyle: {
            color: '#fff',
            fontWeight: '400'
          }
        },
        tooltip: {
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['预警', '报警'],
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: this.yName,
          nameTextStyle: {
            color: '#ffbf00'
          },
          nameGap: 28,
          nameLocation: 'center',
          axisLabel: { // 设置x，y轴文字颜色
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: [
          {
            name: '预警',
            type: 'line',
            symbol: 'circle',
            // data: [11, 11, 15, 13, 12, 13, 10],
            data: this.warningData
          },
          {
            name: '报警',
            type: 'line',
            symbol: 'circle',
            data: this.dangerData,
            itemStyle: {// 设置折线图的颜色
              normal: {
                color: '#ffbf00',
                lineStyle: {
                  color: '#ffbf00'
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .chart_box {
    width: 100%;
    height: 100%;
    /*margin-left: 20px;*/
  }
</style>
