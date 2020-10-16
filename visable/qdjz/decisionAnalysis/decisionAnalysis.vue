<template>
    <el-container>
        <el-header>
            <div class='header-title' @click="gotoIndex()">
                <i class="iconfont iconlogo"></i>
                <span>胶州市亩产效益综合评价</span>
            </div>
            <div class='header-menu'>
                <div v-for="(item,i) in menuUrls.child"  :key='i' @click='menuClick(item,i)' :class='"/"+item.url==menuIndex?"active":""'>{{item.name}}</div>
            </div>
        </el-header>
        <el-main>
            <div class="bodyContent">
                <div  id="map-main" v-show="isShowMap" class="commonMap" ></div>
                <router-view  :map="map"
                              @chearMap="clearMap"
                              @refreshInfoWindow="refreshInfoWindow"
                              @showMapToggle="showMapToggle"
                              :activeName="activeName" 
                              :polygonList="polygonList"
                              :streets="streets"
                              :citysCenter="citysCenter"></router-view>
            </div>
            
            
        </el-main>
    </el-container>
</template>

<script>
import BasePage from "@/components/BasePage";
import {
    mapInit,
    getZheJBounds,
    renderPolyline,
    rendPolygon,
    iconPoint,
    pointShow,
    wzLevel
} from '@/components/amap/amap'
import {getBounds} from "../../components/amap/amap";
import { getLocalStorage,setLocalStorage, removeLocalStorage } from "@/common/utils/index";

import { region } from "@constant"

export default {
  data() {
    return {
        menuIndex:'/keyEntAnalysis',
        menuUrls:{
            url: 'decisionAnalysis.html',
            cUrls: '',
            name: "决策分析",
            child: [
                // {
                //     url: 'keyEntAnalysis',
                //     name: "重点企业分析",
                // },
                // {
                //     url: 'entRankAnalysis',
                //     name: "企业排名分析",
                // },
                // {
                //     url: 'townStreetAnalysis',
                //     name: "镇街分析",
                // },
                // {
                //     url: 'industryAnalysis',
                //     name: "行业分析",
                // },
                // {
                //     url: 'landAnalysis',
                //     name: "土地专属分析",
                // },
                // {
                //     url:'energyConsumeAnalysis',
                //     name:'能耗专题分析'
                // }
            ],
            regionLevel: [...wzLevel],
            citys: region,
            citysCenter:[],
            
        },
        map:{},
        activeName:'',
        polygonList:[],
        citysCenter:[],
        isShowMap:true,
        streets:[],
    };
  },
  created() {
      this.menuUrls.child = JSON.parse(getLocalStorage('curl')).find(v=>v.url ==='decisionAnalysis.html').child;
      this.menuIndex = this.$route.path;
      this.currentUrl = window.location.hash.split("/")[1];
  },
  mounted(){
      this.map = mapInit('map-main',{viewMode: '3D',},'amap://styles/069da364079e3b5bdce1f621f8ac52ea');
      if(this.map){
          this.setMapCenterSpot(120.02382574526537,36.212799916381756);
          this.setMapZoom(10.9);
          this.setMapPitch(50);
          this.initMap('胶州市');
          
      }
      
  },
  methods: {
      //菜单点击
      menuClick(item,index){
          this.menuIndex = '/'+item.url;
          this.$router.push(item.url);
          this.currentUrl = window.location.hash.split("/")[1];
          
          this.clearMassMarkers();
          this.polygonList.map(cu=>{
              cu.setOptions({
                  fillOpacity: 0.5,
                  fillColor: 'rgba(195, 244, 255, 0.46)',
              })
          })
          this.setMapCenterSpot(120.02382574526537,36.212799916381756);
          this.setMapZoom(10.9);
          if(this.currentUrl == 'landAnalysis'){
              this.polygonList.map(cu=>{
                  cu.off('click',this.polygonClick)
              })
          }else{
              this.polygonList.map(cu=>{
                  cu.on('click',this.polygonClick)
              })
          }
      },
      //跳转首页
      gotoIndex(){
          location.href='/index.html'
      },
      //覆盖物点击事件
      polygonClick(e){
        this.activeName = e.target.getExtData().areaName;
        this.refreshInfoWindow();    
      },
      initMap(para) {
          let that = this;
          getBounds({
              searchName: para,
          }).then(res => {
            //   console.log(res);
              let originalBounds = res.boundaries;
              setLocalStorage('originalBounds',JSON.stringify(originalBounds));
              this.citysCenter = res.districtList.map(item => {
                  return {
                      name:item.name,
                      center:item.center
                  }
              });

              this.citys = this.citysCenter.map(v => v.name);
              let bounds = originalBounds.filter(v => v.length > 300);
              let opts = {
                  level: 'district',
                  subdistrict: 1
              };
              // if (bounds) {
              //     renderPolyline(bounds, {
              //         strokeColor: 'red',
              //         strokeWeight: 4
              //     })
              // }
              rendPolygon({
                  citys: this.citys,
                  opts,
                  usePolyline: true,
                  polygonOpts: {
                      fillColor:'rgba(195, 244, 255, 1)',
                      strokeOpacity:0.6,
                      strokeColor: '#0015A5',
                      strokeWeight: 4,
                  },
                  polyLineOpts:{

                  },
                  mapClearFlag: true,
                  linearColor:false,
              }).then(({polygons, streets}) => {
                  let that = this;
                  that.polygonList = polygons;
                  that.streets = streets;
                  if(this.currentUrl == 'landAnalysis'){
                        polygons.map(cu=>{
                            cu.off('click',this.polygonClick)
                        })
                    }else{
                        polygons.map(cu=>{
                            cu.on('click',this.polygonClick)
                        })
                    }
                  // 设置区县文字
                  this.map.add(
                      streets.map((city,i)=>{
                          let citys = new AMap.Text({
                              text: city.name,
                              cursor: 'default',
                              position: city.center,
                              color: 'white'
                          })
                          citys.setStyle({
                              'background-color': 'transparent',
                              color: '#0015A5',
                              'font-size': '50%',
                              border: 'none'
                          });
                          return citys

                      })
                  )
              });
          });

      },
      //刷新infoWindow
      refreshInfoWindow(cityName) {
          const that = this;
          this.activeName = cityName?cityName:this.activeName;
          let polygon = this.polygonList.find( v => v.getExtData().areaName == this.activeName);
          let city = this.citysCenter.find( v => v.name == this.activeName);

          this.districtEvent(
              'street',
              polygon.getExtData(),
              city.center
          )
          this.resetPolygon(polygon)


      },
      districtEvent(regionLevel, extData, lnglat) {
          this.currentLevel = regionLevel
          if (regionLevel === 'street') {
              this.currentDistrict = extData.areaName;
              let arr = this.map.getAllOverlays('marker')
              for (let i = 0; i < this.citys.length; i++) {
                  if (extData.areaName == this.citys[i]) {
                      //为了找中心点
                      let positionCenter = lnglat;

                      this.setMapCenterSpot(positionCenter.lng,positionCenter.lat);

                  }
              }

          }
      },
      resetPolygon(newPolygon, options) {
          if (this.currentPolygon) {
              this.currentPolygon.setOptions({
                  fillOpacity: 0.5,
                  fillColor: 'rgba(195, 244, 255, 0.46)',
              })
          }
          newPolygon.setOptions({
              fillOpacity: 1,
              fillColor: '#54CFFF',
          });
          this.currentPolygon = newPolygon
      },

      setMapCenterSpot(lng, lat) {
          // 数组
          let _arr = [lng, lat]
          // 设置
          this.map.setCenter(_arr)
      },
      setMapZoom(zoom) {
          this.map.setZoom(zoom)
      },
      setMapPitch(pitch) {
          this.map.setPitch(pitch)
      },
      // 清除所有覆盖物
      clearMap() {
          this.map.clearMap()
      },
      //清除覆盖物（除了轮廓和文字）
      clearMassMarkers(){
          let layers = this.map.getAllOverlays();
          if(layers && layers.length>0){
              let massMarkerLayers = layers.filter(cu=>{
                //   console.log(cu.CLASS_NAME);

                  return (cu.CLASS_NAME !=="AMap.Text" &&  cu.CLASS_NAME !=="AMap.Polygon")
              }) || [];
              this.map.remove(massMarkerLayers)
          }
      } ,
      showMapToggle(val){
          this.isShowMap = val ;
      }
      
  },
  beforeDestroy(){
     removeLocalStorage('originalBounds')
  },
  components: {
    BasePage
  }
};
</script>

<style lang="less" scoped>
@import "./less/decisionAnalysis.less";
.el-container{
    height:100%;
    width:100%;
    .el-header{
        padding:0;
        display: flex;
        justify-content: space-between;
        color:#fff;
        height: 66px !important;
        background-color: rgba(0, 35, 49, 1);
        box-shadow: 0px 4px 20px 0px rgba(0, 48, 66, 1);
        color:rgba(255,255,255,.65);
        .header-title{
            font-size:20px;
            margin-left:30px;
            line-height:66px;
            cursor:pointer;
            letter-spacing: 2px;
            color:rgb(255,255,255);
            span.sub{
                // color:rgba(50, 197, 255, 1);
            }
            i{
                font-size: 18px;
                margin-right: 10px;
            }
        }
        .header-menu{
            line-height:66px;
            font-size:16px;
            /*flex:1;*/
            display:flex;
            padding-right:60px;
            justify-content: flex-end;
            margin-left:80px;
            div{
                /*flex:1;*/
                width:180px;
                margin:0 auto;
                cursor:pointer;
                text-align: center;
                line-height: 66px;
                &.active{
                    color: #fff;
                    background: url(../../assets/images/header_select.png) center/100% 100% no-repeat;
                }
            }
            div:hover{
                color: #32C5FF;
            }
        }
    }
    .el-main{
        padding:0;
        position: relative;
        overflow-x:hidden;
    }
    .el-main::-webkit-scrollbar{
        width: 8px;
        height: 8px;
    }
    .el-main::-webkit-scrollbar-track{
        background-color: rgba(147, 153, 165, 0.4);
        border-radius: 2em;
    }
    .el-main::-webkit-scrollbar-thumb{
        background-color: rgba(255,255,255);
        border-radius: 2em;
    }
}
</style>
