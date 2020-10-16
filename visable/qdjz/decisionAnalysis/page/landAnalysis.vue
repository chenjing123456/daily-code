<template>
  <div id="landAnalysis" class="analysis-container mapAnalysis">
    <div class="select-position">
      <el-autocomplete
        class="decision-input"
        v-model="keyword"
        :fetch-suggestions="querySearchAsync1"
        value-key="entName"
        prefix-icon="el-icon-search"
        clearable
        :trigger-on-focus="false"
        placeholder="请输入企业名称进行查询"
        @select="handleSelect1"
      ></el-autocomplete>
      <!-- <div id="pickerBox">
        <input id="pickerInput" class="decision-input" placeholder="输入关键字选取地点" />
        <div id="poiInfo"></div>
      </div>-->
      <el-select v-model="type" placeholder="请选择" @change="changeItem" class="decision-select">
        <el-option
          v-for="item in landMuOption"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="dictList">
        <div class="dict_item" v-for="(items,i) in dictList" :key="i">
          <span class="i_btn" :style="{background:landMuColors[i].color,borderColor:items.color,borderStyle:'solid',borderWidth:'1px'}"></span>
          <span>{{items.label}}</span>
        </div>
      </div>
    </div>
    <div class="text-position">
      <div class="text-position-first">胶州市地图</div>
      <div class="text-position-second">企业分布经纬度坐标分布图</div>
    </div>
    <div class="cash_box">
      <div class="cash_item" @click="changeLay">
        <i class="iconfont iconweixing"></i>
        <span>卫星地图</span>
      </div>
      <span>|</span>
      <div class="cash_item" @click="startDraw" :style="pickUpStyle">
        <i class="iconfont iconbianqushibie"></i>
        <span>边界拾取</span>
      </div>
      <span>|</span>
      <div class="cash_item" @click="resetDraw">
        <span style="">清除</span>
      </div>
    </div>
    <div class="dataset_box" v-show="isShowRight">
      <section class="box_head">
        <div class="left_head">
          <span class="title_or1 head_item">企业边界信息</span>
        </div>
      </section>
      <section class="boundary_content">
        <div>
          面积：
          <span>{{boundaryInfo.mapArea}}</span>平方米
          <span>{{boundaryInfo.area2}}</span>亩
        </div>
        <div>
          企业名称：
          <el-autocomplete
            v-model="boundaryInfo.entName"
            :fetch-suggestions="querySearchAsync"
            value-key="entName"
            placeholder="请搜索"
            clearable
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div>
          经纬度范围：
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入经纬度范围"
            v-model="boundaryInfo.locationRange"
            disabled
          ></el-input>
        </div>
        <div>
          经纬度点：
          <el-input v-model="boundaryInfo.lngLat" placeholder="请输入经纬度点" disabled></el-input>
        </div>
      </section>
      <section class="boundary_footer">
        <span @click="cancalBind">取消</span>
        <span @click="confirmBind">确定</span>
      </section>
    </div>
  </div>
</template>

<script>
import {
  landAnalysisEntList,
  landAnalysisEntFuzzySearch,
  landAnalysisEntDetail,
  landAnalysisUpdateEntRange
} from "@api/gov/decisionAnalysis";
import { landMuOption, landMuColors } from "@constant";
import { iconPoint, pointShow } from "@/components/amap/amap";
AMapUI.setDomLibrary($);
export default {
  name: "landAnalysis",
  data() {
    return {
      type: 1,
      dataYear: 2018,
      keyword: "",
      dictList: [],
      landMuColors,
      pickUpStyle:{
        color:'#fff'
      },
      polygonFloorList: [], //所有楼块的Poly合集
      landMuOption: [...landMuOption],
      controlBar: null,
      mouseTool: null, //绘制polyon工具(面积)
      poiPicker: null, //poi搜索点
      isShowRight: false,
      buildingLayer: null, //楼板图层
      satelliteLayer: null, //卫星图层
      isShowSateLay: false,
      areas:[],//所有已经存在后台的楼块
      currentIndex:0,//当前点击的楼块index，用于重新绘制某个楼块时使用
      overlays: [], //已经绘制的图形
      currentOverLaysIndex:0,//当前点击的已经绘制的图形polygon的index，用于还未保存的polygon在重新绘制时使用
      boundaryInfo: {
        //边界信息
        id: "",
        mapArea: "",
        area2: 0.5,
        entName: "",
        creditCode: "",
        locationRange: "",
        lngLat: ""
      }
    };
  },
  props: {
    map: {
      type: Object,
      default: null
    },
    activeName: {
      type: String,
      default: ""
    },
    polygonList: {
      type: Array,
      default: ""
    },
    citysCenter: {
      type: Array,
      default: ""
    }
  },
  watch: {
    map(val, old) {
      if (Object.keys(val).length) {
        this.initSearch();
      }
    }
  },
  mounted() {
    this.dictList = landMuOption[0].list;
    if (Object.keys(this.map).length) {
      this.mouseTool = null;
      this.initSearch();
    }
  },
  methods: {
    cancalBind() {
      this.isShowRight = false;
    },
    querySearchAsync(queryString, cb) {
      queryString
        ? this.fuzzySearchEnt(queryString, 1).then(results => {
            cb(results);
          })
        : [];
    },
    querySearchAsync1(queryString, cb) {
      queryString
        ? this.fuzzySearchEnt(queryString, 2).then(results => {
            cb(results);
          })
        : [];
    },
    handleSelect1(item) {
      if (item.lat && item.lng) {
        this.map.setZoomAndCenter(17, [item.lng, item.lat]);
        var infoWindow = new AMap.InfoWindow({
          isCustom: true, //使用自定义窗体
          content: `
                <div class="messageInfo" style="background-color: #222F3A;padding:2px 12px;color:#fff;">${item.entName}</div>
            `,
          offset: new AMap.Pixel(60, 0)
        });
        infoWindow.open(this.map, [item.lng, item.lat]);
      } else {
        this.$message({
          type: "warning",
          message: "该企业没有经纬度数据"
        });
      }
    },
    async fuzzySearchEnt(queryString, type) {
      let con = {
        keyword: queryString
      };
      if (type == 1) con = { ...con, checkLocationRange: 1 };
      let results = await new Promise((resolve, reject) => {
        landAnalysisEntFuzzySearch(con).then(res => {
          if (res.code == "0000") {
            resolve(res.data);
          } else {
            this.$message.error(res.msg);
            reject();
          }
        });
      });
      return results;
    },
    handleSelect(item) {
      this.boundaryInfo.id = item.id;
      this.boundaryInfo.creditCode = item.creditCode;
      this.boundaryInfo.entName = item.entName;
      this.boundaryInfo.dataYear = item.dataYear;
      this.boundaryInfo.lngLat = item.lng + "," + item.lat;
    },
    resetDraw() {
      if (this.overlays.length > 0) {
        this.map.remove(this.overlays);
        this.overlays = [];
        this.isShowRight = false;
      }
      
    },
    resetBoundary() {
      this.boundaryInfo = {
        //边界信息
        id: "",
        mapArea: "",
        area2: 0.5,
        entName: "",
        creditCode: "",
        locationRange: "",
        lngLat: ""
      };
    },
    confirmBind() {
      let that = this;
      let {
        id,
        creditCode,
        entName,
        dataYear,
        mapArea,
        locationRange
      } = this.boundaryInfo;
      let con = { id, creditCode, entName, dataYear, mapArea, locationRange };
      if (id && entName) {
        landAnalysisUpdateEntRange(con).then(res => {
          if (res.code == "0000") {
            that.isShowRight = false;
            that.getbuildingLayer();
            that.$message({
              type: "success",
              message: "绘制成功"
            });
            that.resetBoundary();
          } else {
            that.$message({
              type: "error",
              message: res.msg
            });
          }
        });
      } else {
        that.$message({
          type: "warning",
          message: "请选择绘制范围的公司"
        });
      }
    },
    startDraw() {
      let that = this;
      this.pickUpStyle = {
        color:'#54CFFF'
      }
      //边界拾取 - 绘制polyon
      this.mouseTool.polygon({
        fillColor: "#00b0ff",
        strokeColor: "#80d8ff"
      });
      //   that.mouseTool.close(); //绘制结束后先关闭绘制工具   that.mouseTool.close(true)关闭绘制并清除绘制图形
      this.mouseTool.on("draw", function(e) {
        //结束绘制
        let obj = e.obj;
        that.overlays.push(obj);
        that.mouseTool.close();
        that.pickUpStyle = {
          color:'#fff'
        }
        obj.on("dblclick", function(event) {
          that.isShowRight = true;
          let arr = obj.getPath();
          let lngLat =
            arr && arr.length > 0
              ? arr
                  .map((v, i) => {
                    return v.lng + "," + v.lat;
                  })
                  .join(",")
              : "";
          that.boundaryInfo.locationRange = lngLat;
          let area = obj.getArea();
          that.boundaryInfo.mapArea = area;
          that.boundaryInfo.area2 = (area * 0.0015).toFixed(2);
        });
      });
    },
    changeLay() {
      //卫星图层的显示隐藏
      this.isShowSateLay = !this.isShowSateLay;
      if (this.isShowSateLay) {
        this.map.add(this.satelliteLayer);
      } else {
        this.map.remove(this.satelliteLayer);
      }
    },
    initSearch() {
      let that = this;
      //卫星图层
      this.satelliteLayer = new AMap.TileLayer.Satellite();
      //楼块图层
      this.buildingLayer = new AMap.Buildings({
        zIndex: 130,
        merge: false,
        sort: false,
        heightFactor: 2,
        zooms: [16, 18]
      });
      this.map.setFeatures(["bg", "road", "building", "point"]);
      this.map.setLayers([new AMap.TileLayer({}), this.buildingLayer]);
      this.map.setPitch(60);
      this.map.setRotation(35);
      //调视角控件
      this.map.plugin(["AMap.ControlBar"], function() {
        let Options = {
          position: {
            bottom: "-100px",
            right: 0
          }
        };
        that.controlBar = new AMap.ControlBar(Options);
        that.map.addControl(that.controlBar);
      });
      this.mouseTool = new AMap.MouseTool(this.map);
      this.mouseTool.close();
      //拿到所有楼块的位置并设置
      this.getbuildingLayer();
    },
    setMapCenterZoom(zoomLevel, center) {
      this.map.setZoomAndCenter(zoomLevel, center);
    },
    getbuildingLayer() {
      let that = this;
      landAnalysisEntList({ type: this.type, dataYear: 2018 }).then(res => {
        let arr = res.data || [];
        let options = {};
        let allData = arr.map((v, i) => {
          let eveItemData = v.data.map(val => {
            return {
              rejectTexture: true, //是否屏蔽自定义地图的纹理
              color1: that.landMuColors[i].color1,
              color2: that.landMuColors[i].color2,
              entName: val.entName,
              creditCode: val.creditCode,
              lng: val.lng,
              lat: val.lat,
              entType: val.entType,
              fillColor: that.landMuColors[i].color,
              borderColor: that.landMuColors[i].borderColor,
              path: val.rangeList || []
            };
          });
          return eveItemData;
        });
        //所有楼块的位置
        that.areas = allData.reduce(function(a, b) {
          return a.concat(b);
        }).filter((v)=>{
          return v.lng&&v.lat;
        });
        //设置楼块的位置
        that.buildingLayer.setStyle({
          hideWithoutStyle: false,
          areas: that.areas
        });
        //所有楼块上面的地面矩形Polygon
        this.polygonFloorList = that.areas.map((v, i) => {
          let somePolygon = new AMap.Polygon({
            bubble: true,
            fillColor: v.fillColor || "green",
            // fillOpacity: 0.2,
            strokeWeight: 1,
            strokeColor: v.borderColor,
            strokeWeight: 2,
            path: v.path,
            map: that.map
          });
          //地面Polygon设置点击事件-清除当前楼层
          // somePolygon.on("click", function(e) {
          //   that.currentIndex = i;
          //   // console.log(that.currentIndex);
          //   that.clearLayBuding();
          // });
          return somePolygon;
        });
        //给每个楼块标记点marker
        pointShow(
          this.map,
          function(current) {
            iconPoint(that.map, function(curr) {}, [current], 2); //2表示土地的infowindow
          },
          that.areas,
          2
        );
      });
    },
    clearLayBuding() {
      let that = this;
      //清除当前楼层 - 拿不到当前polygon上的楼层- （去掉areas中当前点击的index之后重新设置style的areas）
      let areas = [...that.areas];
      areas.splice(that.currentIndex, 1);
      that.buildingLayer.setStyle({
        hideWithoutStyle: false,
        areas
      });
      //清除当前楼层下polygon
      let current = this.polygonFloorList[this.currentIndex];
      current.setMap(null);
      current = null;
    },
    changeItem(item) {
      if (this.type) this.dictList = this.landMuOption[this.type - 1].list;
      this.buildingLayer.setStyle({
        hideWithoutStyle: false,
        areas: []
      });
      //清除polygon
      // this.polygonFloorList.forEach(current => {
      //   current.setMap(null);
      //   current = null;
      // });
      // this.buildingLayer.setMap(null); //清除楼层
      this.getbuildingLayer();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.mouseTool.close();
    this.map.removeControl(this.controlBar);
    //清除polygon
    this.polygonFloorList.forEach(current => {
      current.setMap(null);
      current = null;
    });
    this.buildingLayer ? this.buildingLayer.setMap(null) : ""; //清除楼层
    this.map.remove(this.satelliteLayer);
    next();
  },
  components: {}
};
</script>

<style lang="less" scoped>
#landAnalysis {
  width: 100%;
  height: 100%;
  #landAnalysisMap {
    width: 100%;
    height: 100%;
  }
  .rightBox {
    height: 100%;
    width: 4rem;
    background: #fff;
    border: 1px solid #ccc;
    z-index: 1000;
    position: absolute;
    right: 0;
    top: 0;
  }

  .dictList {
    display: inline-block;
    background-color: rgba(0, 36, 50, 0.8);
    box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.5),
      inset 0px 4px 18px 0px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(50, 197, 255, 1);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: fit-content;
    color: #fff;
    max-width: 7.2rem;
    padding: 0 10px 0 20px;
    box-sizing: border-box;
    .dict_item {
      display: flex;
      margin-right: 10px;
    }
    .i_btn {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
  .text-position {
    bottom: 50px;
  }
  .select-position {
    display: flex;
    flex-wrap: nowrap;
  }
  .decision-input {
    border: none;
    width: 3.4rem;
    // height: 40px;
    margin-right: 20px;
    // padding: 0 12px;
    // border: 1px solid #32c5ff;
    // background-color: #002432;
    // color: #fff;
    /deep/ .el-input__inner {
      border: 1px solid #32c5ff;
      color: #fff;
      background-color: #002432;
    }
    // &::-webkit-input-placeholder{
    //     color: rgba(255, 255, 255, 0.5);
    // }
    // &::-moz-placeholder{/* Mozilla Firefox 19+ */
    //     color: rgba(255, 255, 255, 0.5);
    // }
    // &:-moz-placeholder{/* Mozilla Firefox 4 to 18 */
    //     color: rgba(255, 255, 255, 0.5);
    // }
    // &:-ms-input-placeholder{
    //     color: rgba(255, 255, 255, 0.5);
    // }
  }
  .cash_box {
    width: 300px;
    height: 40px;
    display: flex;
    color: #fff;
    background-color: rgba(0, 36, 50, 0.8);
    box-shadow: undefined, inset 0px 4px 18px 0px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(50, 197, 255, 1);
    justify-content: space-around;
    position: absolute;
    bottom: 55px;
    left: 260px;
    padding: 0 8px;
    align-items: center;
    .cash_item {
      cursor: pointer;
      span {
        margin-left: 10px;
      }
    }
  }
}
.boundary_content {
  flex: 1;
  height: calc(100% - 80px - 0.63rem);
  padding: 30px 26px;
  /deep/.el-autocomplete {
    width: 80%;
    .el-autocomplete-suggestion {
      background: #002432;
      .el-autocomplete-suggestion__list {
        li {
          color: #fff !important;
        }
      }
    }
  }
  div {
    margin-bottom: 28px;
    font-size: 0.14rem;
    line-height: 0.5rem;
    span {
      font-size: 0.3rem;
      margin: 0 10px 0 28px;
    }
    /deep/.el-input .el-input__inner,
    /deep/.el-textarea .el-textarea__inner {
      border: 1px solid rgba(50, 197, 255, 1);
      color: #fff;
      background-color: rgba(0, 36, 50, 1);
    }
  }
}
.boundary_footer {
  height: 80px;
  width: 100%;
  border: 1px solid rgba(50, 197, 255, 0.4);
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  & > span {
    display: inline-block;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    border: 1px solid rgba(50, 197, 255, 0.4);
    &:last-child {
      background: #32c5ff;
      margin-left: 30px;
    }
  }
}
</style>