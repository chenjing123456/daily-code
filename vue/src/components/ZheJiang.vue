<template>
  <div class="echarts">
      <div :style="{height:'800px',width:'100%'}" ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import '../../node_modules/echarts/map/js/china.js';

export default {
  name: 'HelloWorld',
  props: ["userJson"],
  data () {
    return {
      msg: 'echarts map',
      chart:null
    }
  },
  mounted(){
    this.chinaConfigure();
  },
  beforeDestroy() {
        if (!this.chart) {
          return;
        }
        this.chart.dispose();
        this.chart = null;
  },
  methods:{
    chinaConfigure(){
        let myChart = echarts.init(this.$refs.myEchart);
        window.resize = myChart.resize();
        myChart.setOption({
          backgroundColor: "#02AFDB",
          tooltip: {
            formatter:'{b}'
          }, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: false,
            min: 0,
            max: 1000,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'yellow', 'lightskyblue']
          },
           geo: { // 这个是重点配置区
              map: 'china', // 表示中国地图
              roam: true,
              label: {
                normal: {
                  show: true, // 是否显示对应地名
                  textStyle: {
                    color: 'rgba(0,0,0,0.4)'
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                  areaColor: null,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            },
           series: [{
                 type: 'scatter',
                 coordinateSystem: 'geo' // 对应上方配置
               },
               {
                 name: '启动次数', // 浮动框的标题
                 type: 'map',
                 geoIndex: 0,
                 data: [{
                   "name": "浙江",
                   "value": 599
                 }]
               }
             ]
        })
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
