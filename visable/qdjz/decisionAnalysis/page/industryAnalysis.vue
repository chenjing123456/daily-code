<template>
  <div id="industryAnalysis" class="analysis-container mapAnalysis">
    <div class="select-position">
      <el-select v-model="param.industry" class="decision-select" @change="search(),industryChange()">
        <el-option
          v-for="item in industrys"
          :key="item.code"
          :label="item.industryname"
          :value="item.code"
        ></el-option>
      </el-select>
      <el-cascader
        v-model="entRule"
        :options="entRuleOptions"
        @change="handleChange"
        class="decision-select"
      ></el-cascader>
      <el-select v-model="param.dataYear" class="decision-select" @change="search(),industryChange()">
        <el-option
          v-for="item in dataYearOptions"
          :key="item"
          :label="item+'年度'"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <div class="text-position">
      <div class="text-position-first">胶州市地图</div>
      <div class="text-position-second">企业分布经纬度坐标分布图</div>
    </div>
    <div class="dataset_box" v-show="isShow">
      <section class="box_head">
        <div class="left_head">
          <span class="title_or1 head_item">{{industryname}}</span>
        </div>
      </section>
      <section class="box_contain">
        <section class="contain_item">
          <div class="sub_title">
            <i class="iconfont iconzonghezhibiao"></i>
            <span>综合指标</span>
          </div>
          <section class="flx_column">
            <div class="col_item" v-for="(item,index) in multipleTartget" :key="index">
              <div class="col_left">
                <span>{{item.name}}</span>
                <span class="unit">{{item.unit}}</span>
              </div>
              <div class="col_right">
                <span
                  class="totals"
                >{{dataSet[item.key]?dataSet[item.key].toFixed(item.tofixed):'-'}}{{item.key=='researchRate'&&dataSet[item.key]?'%':''}}</span>
                <!-- <div class="right_box">
                  <i class="iconfont iconzhibiao"></i>
                  <span class="otherNum">26.2</span>
                </div>-->
              </div>
            </div>
          </section>
        </section>
        <div class="contain_item">
          <div class="sub_title">
            <i class="iconfont iconzongliangzhibiao"></i>
            <span>总量指标</span>
          </div>
          <div class="flx_row">
            <div class="row_item" v-for="(item,index) in totalTarget" :key="index">
              <div class="row_items spe_num">
                <span class="totals">{{dataSet[item.inKey]?dataSet[item.inKey].toFixed(item.tofixed):'-'}}</span>
                <span class="read_more">
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
              <div class="row_items">
                <span>{{item.name}}</span>
              </div>
              <div class="row_items">
                <span class="unit">{{item.unit}}{{ dataSet['entCount'] }}</span>
              </div>
              <div class="row_items precent_items">
                <div class="all_precent">
                  <div class="precent_content">
                    <span class="precent" :style="'width:'+(dataSet[item.inKey+'Rate']>=0?dataSet[item.inKey+'Rate']+'%':'0%')"></span>
                  </div>
                </div>
                <span class="num">{{dataSet[item.inKey+'Rate']>=0?dataSet[item.inKey+'Rate']+'%':'-'}}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { totalTarget, multipleTartget, entRuleKe, region } from "@constant";
import {
  mapInit,
  getZheJBounds,
  renderPolyline,
  rendPolygon,
  getBounds,
  iconPoint,
  wzLevel
} from "@/components/amap/amap";
import { log } from "util";
import { getDictIndustry, getEntIndustry,getHotMap } from "@api/gov/decisionAnalysis";
import {getYearList} from "../../../common/constant";
import { getLocalStorage, removeLocalStorage } from "@/common/utils/index";

export default {
  name: "industryAnalysis",
  data() {
    return {
      param: {
        industry: "",
        entRule: '0,1,2',
        dataYear: 2018
      },
      entRule:'0,1,2',
      isShow: true,
      citys: region,
      entRuleOptions: entRuleKe,
      industryname: "",
      industrys: [],
      dataYearOptions: getYearList(3),
      totalTarget,
      multipleTartget,
      dataSet: {},
      layer: null,
      heatmapData: [],
      heatmap:null,
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
    },
  },
  mounted() {
      if (Object.keys(this.map).length) {
          if (this.industry) {
              this.search();
          } else {
              this.getIndustry();
          }
      }
  },
  watch: {
      map(val, old) {
          if (Object.keys(val).length) {
              if (this.industry) {
                  this.search();
              } else {
                  this.getIndustry();
              }
          }
        }
  },
  methods: {
    industryChange(item){
      let obj = this.industrys.find((v)=>{
        return v.code === this.param.industry
      })
      if(obj) this.industryname= obj.industryname;
    },
    renderHotmap(con) {
      let that = this;
        let originalBounds = JSON.parse(getLocalStorage('originalBounds'))[0];
        let newArr = [];
        originalBounds.map(v=>{
            newArr.push([v.lng,v.lat])
        });
        console.log(newArr);
        that.heatmapData = [];
        getHotMap(Object.assign({areaGeoCodeJson:JSON.stringify(newArr)},con)).then(res=>{
        if(res.code =='0000'){
          that.heatmapData = res.data.all||[];
          that.map.plugin(["AMap.Heatmap"], function() {
          //初始化heatmap对象
          that.heatmap = new AMap.Heatmap(that.map, {
            radius: 30, //给定半径
            opacity: [0, 0.8],
            gradient: {
              0.5: "#393AF7",
              0.65: "#C8F81C",
              0.7: "#FFDE5B",
              1.0: "#FB411C"
            }
          });
          //设置数据集：该数据为北京部分“公园”数据
          that.heatmap.setDataSet({
            data: that.heatmapData,
            max: 20
          });
        });
        }else{
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      })
      
      
    },
    search() {
     
      let { industry, dataYear } = this.param;
      // let arr = this.param.entRule;
      // let entRule = arr.length > 0 ? arr[arr.length - 1] : "0,2";
        let entRule = this.param.entRule;
        let con = { entRule, industry, dataYear };
        getEntIndustry(con).then(res => {
        if (res.code == "0000") {
          if (res.data) this.dataSet = { ...res.data };
            this.renderHotmap(con);
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
      
    },
    handleChange(value) {
        this.param.entRule = value && value.length>0 ? value[value.length-1] : '';
      this.search();
    },
    getIndustry() {
      getDictIndustry().then(res => {
        if (res.code == "0000") {
          this.industrys = res.data || [];
          this.param.industry = this.industrys[0].code;
          this.industryname = this.industrys[0].industryname;
          this.search();
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    }
  },
  beforeRouteLeave(to, from, next){
    if(this.heatmap) this.heatmap.hide()
    next()
  },
  components: {}
};
</script>

<style lang="less" scoped>
// #industryAnalysis {
//   height: 100%;
// }
</style>