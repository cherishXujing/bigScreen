<template>
  <div class="index">
    <div class="aside-section" style="width: 400px;">
      <aside-box class="mb-08">
        <h2 class="fs-09 fw-normal mb-05">噪音总览</h2>
        <div class="circle-box">
          <circles
            :bgColor="success"
            :titleTxt="'正常'"
            :totalNum="100"></circles>
          <circles
            :bgColor="warning"
            :titleTxt="'预警'"
            :totalNum="200"></circles>
          <circles
            :bgColor="danger"
            :titleTxt="'报警'"
            :totalNum="20">
          </circles>
        </div>
      </aside-box>
      <aside-box class="mb-08">
        <div style="height: 280px; width: 400px">
          <line-chart
            id="'noise'"
            :titleText="noise.title"
            :yName="noise.yName"
            :xAxisData="noise.xAxisData"
            :warningData="noise.warningData"
            :dangerData="noise.dangerData"
            :pointName="noise.pointName">
          </line-chart>
        </div>
      </aside-box>
      <aside-box class="mb-08">
        <h2 class="fs-1 fw-normal mb-05">PM2.5总览</h2>
        <div class="circle-box">
          <circles
            :bgColor="success"
            :titleTxt="'正常'"
            :totalNum="100"></circles>
          <circles
            :bgColor="warning"
            :titleTxt="'预警'"
            :totalNum="200"></circles>
          <circles
            :bgColor="danger"
            :titleTxt="'报警'"
            :totalNum="20">
          </circles>
        </div>
      </aside-box>
      <aside-box>
        <div style="height: 280px; width: 400px">
          <line-chart
            id="'pm'"
            :titleText="pm.title"
            :yName="pm.yName"
            :xAxisData="pm.xAxisData"
            :warningData="pm.warningData"
            :dangerData="pm.dangerData"
            :pointName="pm.pointName">
          </line-chart>
        </div>
      </aside-box>
    </div>
    <div class="middle-section text-ct pos-rel" style="width: 100%;">
      <div class="logo margin">
        <img src="../assets/img/logo.png" alt="" width="353" height="124">
      </div>
      <div id="map"></div>
    </div>
    <div class="aside-section" style="min-width: 300px;">
      <div class="run-time">
        <h2 class="fs-09 mb-08">正常运行时间</h2>
        <div class="mb-12">
          <span class="time-box fs-1 fw-bold">2018</span>
          <i class="fs-09 padding-rl-03"> 天 </i>
          <span class="time-box fs-1 fw-bold">20</span> :
          <span class="time-box fs-1 fw-bold">40</span> :
          <span class="time-box fs-1 fw-bold">58</span>
        </div>
      </div>
      <ul class="detail-count mt-3">
        <li>
          <img src="../assets/img/enterprise.png" alt="" width="90" height="90">
          <p class="fs-1 fw-bold">102</p>
          <p class="fs-07 fw-lighter">接入企业</p>
        </li>
        <li>
          <img src="../assets/img/equipment.png" alt="" width="90" height="90">
          <p class="fs-1 fw-bold">360</p>
          <p class="fs-07 fw-lighter">接入测点</p>
        </li>
        <li>
          <img src="../assets/img/noise.png" alt="" width="90" height="90">
          <p class="fs-1 fw-bold">450</p>
          <p class="fs-07 fw-lighter">噪音设备</p>
        </li>
        <li>
          <img src="../assets/img/pm.png" alt="" width="90" height="90">
          <p class="fs-1 fw-bold">460</p>
          <p class="fs-07 fw-lighter">PM设备</p>
        </li>
      </ul>
      <div class="danger-list">
        <h2 class="fs-09 mt-12 mb-12">报警点</h2>
        <table>
          <thead>
          <tr>
            <th>企业名称</th>
            <th>设备</th>
            <th>值</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in dangerList" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.equipment }}</td>
            <td>{{ item.value }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import asideBox from '@/components/asideBox.vue'
import circles from '@/components/progressRing.vue'
import lineChart from '@/components/lineChart.vue'
import AMap from 'AMap'
// lbs.amap.com/dev/mapstyle/mapshare/1e0b0e179b7c0595329479fddcdb4522 （自定义地图分享链接）
export default {
  name: 'index',
  components: {
    asideBox: asideBox,
    circles: circles,
    lineChart: lineChart
  },
  data () {
    return {
      map: null,
      warning: '#ff9500',
      success: '#00b200',
      danger: '#ff0000',
      noise: {
        title: '噪音历史状况',
        yName: '工地数量（个）',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        warningData: [22, 20, 23, 20, 19, 20],
        dangerData: [1, 10, 2, 5, 3, 2, 0],
        pointName: '噪音'
      },
      pm: {
        title: 'PM2.5历史状况',
        yName: '工地数量（个）',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        warningData: [22, 20, 23, 20, 19, 20],
        dangerData: [1, 10, 2, 5, 3, 2, 0],
        pointName: 'PM2.5'
      },
      dangerList: [
        {
          name: '浙江某企业',
          value: 30,
          equipment: '噪音'
        },
        {
          name: '浙江某企业1',
          value: 60,
          equipment: '噪音1'
        },
        {
          name: '浙江某企业2',
          value: 90,
          equipment: '噪音2'
        },
        {
          name: '浙江某企业3',
          value: 40,
          equipment: 'PM3'
        },
        {
          name: '浙江某企业4',
          value: 40,
          equipment: 'PM4'
        },
        {
          name: '浙江某企业5',
          value: 40,
          equipment: 'PM5'
        }
      ]
    }
  },
  mounted () {
    this.map = new AMap.Map('map', {
      resizeEnable: true,
      viewMode: '2D',
      zoom: 4,
      center: [108, 34],
      mapStyle: 'amap://styles/48c4449a46069bca1db43ad92925fcb3'
    })
    // this.map.setMapStyle('amap://styles/48c4449a46069bca1db43ad92925fcb3')
  },
  methods: {
    /* AMapUI.load(['ui/misc/PointSimplifier', 'lib/utils', 'lib/$'], function(PointSimplifier, utils, $) {
      if (!PointSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！')
        return;
      }
      /!**
       * 自定义的分组绘制引擎，仅作示例,功能类似于 PointSimplifier.Render.Canvas.GroupStyleRender
       * @param {PointSimplifier} pointSimplifierIns 关联的PointSimplifier实例
       * @param {Object} opts   配置
       *!/
      function MyCanvasRender(pointSimplifierIns, opts) {
        //直接调用父类的构造函数
        MyCanvasRender.__super__.constructor.apply(this, arguments)
      }
      //继承自默认的Canvas引擎（https://webapi.amap.com/ui/1.0/ui/misc/PointSimplifier/render/canvas.js）
      utils.inherit(MyCanvasRender, PointSimplifier.Render.Canvas)
      utils.extend(MyCanvasRender.prototype, {
        /!**
         * 重新实现点的绘制方法
         * @param  {number} zoom       当前的地图级别
         * @param  {Array} activePoints 可以正常绘制的点
         * @param  {Array} shadowPoints 空间被占用的点
         *!/
        renderNormalPoints: function(zoom, activePoints, shadowPoints) {
          //先按默认逻辑处理shadowPoints
          MyCanvasRender.__super__.renderNormalPoints.call(this, zoom, null, shadowPoints)
          let pointStyle = this.getOption('pointStyle'),
          getPointsGroupKey = this.getOption('getPointsGroupKey'),
          pointStyleGroup = this.getOption('pointStyleGroup'),
          pointSimplifierIns = this.getPointSimplifierInstance(),
          groups = {}
          //按key分组
          for (var i = 0, len = activePoints.length; i < len; i++) {
            let point = activePoints[i],
            dataIndex = point.idx,
            dataItem = pointSimplifierIns.getDataItemByIndex(dataIndex)
            let key = getPointsGroupKey.call(this, dataItem, dataIndex)
            if (!groups[key]) {
              groups[key] = []
            }
            groups[key].push(activePoints[i])
          }
          //分组绘制
          for (let k in groups) {
            //继承pointStyle中的默认属性
            let styleOptions = utils.extend({}, pointStyle, pointStyleGroup[k])
            //调用父类的绘制函数
            this.drawPointsWithStyleOptions(groups[k], styleOptions)
          }
        }
      })
      let intSimplifierIns = new PointSimplifier({
        zIndex: 300,
        map: this.map,
        getPosition: function(item) {
          if (!item) {
            return null;
          }
          var parts = item.split(',')
          return [parseFloat(parts[0]), parseFloat(parts[1])]
        },
        getHoverTitle: function(dataItem, idx) {
          return '序号: ' + idx
        },
        //赋值为 MyCanvasRender
        renderConstructor: MyCanvasRender,
        renderOptions: {
          getPointsGroupKey: function(dataItem, dataIndex) {
            //这里直接按索引取余，仅作示意
            return 'g' + dataIndex % 5;
          },
          //分组配置
          pointStyleGroup: {
            'g0': {
              fillStyle: '#3366cc'
            },
            'g1': {
              fillStyle: '#dc3912'
            },
            'g2': {
              fillStyle: '#ff9900'
            },
            'g3': {
              fillStyle: '#109618'
            },
            'g4': {
              fillStyle: '#990099'
            }
          }
        }
      })
      $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body)
      $.get('https://a.amap.com/amap-ui/static/data/10w.txt', function(csv) {
        let data = csv.split('\n')
        pointSimplifierIns.setData(data)
        $('#loadingTip').remove()
      })
    }) */
  }
}
</script>
<style lang="scss" scoped>
  .index {
    height: auto;
    padding: 20px 10px;
    background: #001133;
    color: #fff;
    font-size: .8px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    .aside-section {
      /*width: 25%;*/
    }
    .circle-box {
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
    }
    // 右侧部分
    .time-box {
      display: inline-block;
      padding: .2rem .5rem;
      background: #002e62;
    }
    .detail-count {
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
      flex-flow: row wrap;
      border: 2px solid #002667;
      li {
        width: 49.5%;
        text-align: center;
        padding: 1rem 0;
      }
      li:nth-child(even) {
        border-left: 2px solid #002667;
      }
      li:nth-child(1) {
        border-bottom: 2px solid #002667;
      }
      li:nth-child(2) {
        border-bottom: 2px solid #002667;
      }
    }
    .danger-list{
      table {
        width: 100%;
        th {
          font-size: .7rem;
          color: #ff9c00;
          background-color: #000b27;
          text-align: center;
          line-height: 50px;
        }
        tbody {
          tr {
            background-color: #000e2d;
          }
          tr:nth-child(odd) {
            background-color: #001940;
          }
          td {
            font-size: .6rem;
            color: #fff;
            text-align: center;
            line-height: 45px;
            &:last-child {
              width: 25%;
            }
          }
        }
      }
    }
    // 地图部分
    #map {
      width: 100%;
      height: 100%;
      /*position: absolute;*/
      text-align: center;
      /*background: url("../assets/img/map-bg.png") no-repeat center;*/
      margin: 0 auto;
      /*top: 55px;*/
    }
  }
</style>
