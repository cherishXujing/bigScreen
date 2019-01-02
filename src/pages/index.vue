<template>
  <div class="index">
    <div class="aside-section" style="width: 400px;">
      <aside-box>
        <h2 class="box-name">噪音总览</h2>
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
      <aside-box>
        <h2 class="box-name">PM2.5总览</h2>
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
    <div class="aside-section" style="min-width: 400px;">
      <div class="run-time">
        <h2>正常运行时间</h2>
        <div class="run-time-box">
          <span class="time-box">2018</span>
          <i> 天 </i>
          <span class="time-box">20</span>
          <i class="fw-bold">:</i>
          <span class="time-box">40</span>
          <i class="fw-bold">:</i>
          <span class="time-box">58</span>
        </div>
      </div>
      <ul class="detail-count mt-3">
        <li>
          <img src="../assets/img/enterprise.png" alt="" width="90" height="90">
          <p class="fs-32 fw-bold">102</p>
          <p class="fs-18 fw-lighter">接入企业</p>
        </li>
        <li>
          <img src="../assets/img/equipment.png" alt="" width="90" height="90">
          <p class="fs-32 fw-bold">360</p>
          <p class="fs-18 fw-lighter">接入测点</p>
        </li>
        <li>
          <img src="../assets/img/noise.png" alt="" width="90" height="90">
          <p class="fs-32 fw-bold">450</p>
          <p class="fs-18 fw-lighter">噪音设备</p>
        </li>
        <li>
          <img src="../assets/img/pm.png" alt="" width="90" height="90">
          <p class="fs-32 fw-bold">460</p>
          <p class="fs-18 fw-lighter">PM设备</p>
        </li>
      </ul>
      <div class="danger-list">
        <h2 class="fs-12 fw-normal">报警点</h2>
        <div class="danger-box">
          <div class="scroll scroll-title">
            <span>企业名称</span>
            <span>设备</span>
            <span>值</span>
          </div>
          <div class="scroll-box con1">
            <div class="scroll scroll-con" v-for="(item, index) in dangerList" :key="index">
              <span>{{ item.name }}</span>
              <span>{{ item.equipment }}</span>
              <span>{{ item.value }}</span>
            </div>
          </div>
          <div class="con2"></div>
        </div>
        <!--<table>
          <thead>
          <tr>
            <th>企业名称</th>
            <th>设备</th>
            <th>值</th>
          </tr>
          </thead>
          <tbody id="tbodys">
          <tr v-for="(item, index) in dangerList" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.equipment }}</td>
            <td>{{ item.value }}</td>
          </tr>
          </tbody>
        </table>-->
      </div>
    </div>
  </div>
</template>
<script>
import asideBox from '@/components/asideBox.vue'
import circles from '@/components/progressRing.vue'
import lineChart from '@/components/lineChart.vue'
import AMap from 'AMap'
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
      rData: null,
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
      dangerList: [ // rData
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
        },
        {
          name: '浙江某企业5',
          value: 40,
          equipment: 'PM5'
        }
      ]
    }
  },
  created () {
    // this.initWebSocket()
    let box = document.getElementsByClassName('scroll-box')
    let con1 = document.getElementsByClassName('con1')
    let con2 = document.getElementsByClassName('con2')
    let speed = 100
    con2.innerHTML = con1.innerHTML
    setInterval(function scrollUp () {
      if (box.scrollTop >= con1.scrollHeight) {
        box.scrollTop = 0
      } else {
        box.scrollTop++
      }
    }, speed)
  },
  mounted () {
    this.map = new AMap.Map('map', {
      resizeEnable: true,
      viewMode: '2D',
      zoom: 4,
      center: [108, 34],
      mapStyle: 'amap://styles/48c4449a46069bca1db43ad92925fcb3'
    })
  },
  methods: {
    initWebSocket () { // 初始化weosocket
      const wsuri = 'ws://ptpt.vaiwan.com:8081/im'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      let actions = {'test': '12345'}
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) { // 数据接收
      console.log(e)
      this.rData = JSON.parse(e.data)
      console.log(this.rData)
    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
    }
  }
}
</script>
<style lang="scss" scoped>
  .index {
    height: 1080px;
    overflow: hidden;
    padding: 20px 10px;
    background: #001133;
    color: #fff;
    font-size: .8rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    .box-name {
      font-weight: normal;
      font-size: 24px;
      margin-bottom: 15px;
    }
    .circle-box {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
    }
    // 右侧部分
    .run-time {
      h2 {
        font-size: 24px;
        font-weight: normal;
        margin-top: 32px;
        margin-bottom: 30px;
        position: relative;
        left: 5px;
      }
      .run-time-box {
        margin-bottom: 46px;
        .time-box {
          display: inline-block;
          padding: 0 13px;
          background: #002e62;
          font-size: 30px;
          height: 50px;
          line-height: 50px;
          border-radius: 3px;
        }
        i {
          font-size: 24px;
          padding: 0 5px;
        }
      }
    }
    .detail-count {
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
      flex-flow: row wrap;
      border: 2px solid #002667;
      li {
        padding: 15px 0;
        width: 49.5%;
        text-align: center;
        padding: 1rem 0;
        img {
          display: inline-block;
          margin-bottom: 25px;
        }
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
      h2 {
        margin-top: 36px;
        margin-bottom: 22px;
      }
      table {
        width: 100%;
        height: 385px;
        overflow: hidden;
        th {
          font-size: 20px;
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
            font-size: 16px;
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
    // 新的scroll 部分
    .danger-box{
      border: 2px solid #002667;
    }
    .scroll{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #002667;
      &.scroll-title {
        background-color: rgba(19, 19, 38, 0.41)!important;
        span{
          color: #ff9c00;
          font-size: 20px;
        }
      }
    }
    .scroll:last-child {
      border-bottom: none;
    }
    .scroll:nth-child(odd) {
      background-color: #001940;
    }
    .scroll span {
      display: inline-block;
      height: 52px;
      line-height: 52px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      width: 32%;
    }
    .margin-52{
      margin-top: -52px;
    }
    // 地图部分
    #map {
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0 auto;
    }
  }
</style>
