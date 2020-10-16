<template>
  <div id="rank">
    <div class="rank_container">
      <div class="rank_head">
        <div
          class="head_item"
          v-for="(item,index) in rankEntRule"
          :key="index"
          @click="gotoEntFile(item)"
        >
          <span class="num">{{totalData[item.key]}}</span>
          <span class="name">{{item.name}}</span>
          <div class="precent_content">
            <span class="precent"></span>
          </div>
        </div>
      </div>
      <div class="rank_cen rank_box">
        <div class="rank_item rank_lt">
          <span class="bo_item bo_lt"></span>
          <span class="bo_item bo_rt"></span>
          <span class="bo_item bo_lb"></span>
          <span class="bo_item bo_rb"></span>
          <span class="bo_vItem bo_lt"></span>
          <span class="bo_vItem bo_rt"></span>
          <span class="bo_vItem bo_lb"></span>
          <span class="bo_vItem bo_rb"></span>
          <div class="item_header">
            <span class="subtitle">亩均效益综合指标</span>
          </div>
          <div class="mulTarget_box" id="mulChart"></div>
        </div>
        <div class="rank_item rank_rt">
          <span class="bo_item bo_lt"></span>
          <span class="bo_item bo_rt"></span>
          <span class="bo_item bo_lb"></span>
          <span class="bo_item bo_rb"></span>
          <span class="bo_vItem bo_lt"></span>
          <span class="bo_vItem bo_rt"></span>
          <span class="bo_vItem bo_lb"></span>
          <span class="bo_vItem bo_rb"></span>
          <div class="item_header">
            <span class="subtitle">企业领跑者名单</span>
          </div>
          <div class="mulTarget_box">
            <div class="ceb" v-if="isShow">
              <scroll :data="entList" :class-option="scrollOption" class="seamless-warp">
                <div
                  class="ent-tr"
                  v-for="(item,i) in entList"
                  style="min-width:2rem"
                  :key="i"
                  @click="gotoEnt(item.entName,item.creditcode)"
                >
                  <div class="ent_l">
                    <div :class="['circle',i<=2?'ranknum':'']">
                      <span>{{i+1}}</span>
                    </div>
                    <span>{{item.entName}}</span>
                  </div>
                  <span>{{item.point}}</span>
                </div>
              </scroll>
            </div>
          </div>
        </div>
      </div>
      <div class="rank_bottom rank_box">
        <div class="rank_item rank_lt">
          <span class="bo_item bo_lt"></span>
          <span class="bo_item bo_rt"></span>
          <span class="bo_item bo_lb"></span>
          <span class="bo_item bo_rb"></span>
          <span class="bo_vItem bo_lt"></span>
          <span class="bo_vItem bo_rt"></span>
          <span class="bo_vItem bo_lb"></span>
          <span class="bo_vItem bo_rb"></span>
          <div class="item_header">
            <el-select v-model="target" class="decision-select" @change="entRankIndicator">
              <el-option
                v-for="(item,i) in totalTarget"
                :key="item.key"
                :label="item.name"
                :value="(i+1)"
              ></el-option>
            </el-select>
          </div>
          <div class="mulTarget_box mul">
            <div id="entChart"></div>
            <div id="entChart1"></div>
          </div>
        </div>
        <div class="rank_item rank_rt">
          <span class="bo_item bo_lt"></span>
          <span class="bo_item bo_rt"></span>
          <span class="bo_item bo_lb"></span>
          <span class="bo_item bo_rb"></span>
          <span class="bo_vItem bo_lt"></span>
          <span class="bo_vItem bo_rt"></span>
          <span class="bo_vItem bo_lb"></span>
          <span class="bo_vItem bo_rb"></span>
          <div class="item_header">
            <span>企业评档占比</span>
            <el-select v-model="type" class="decision-select" @change="entRankEntTypes">
              <el-option
                v-for="item in rankEntRule1"
                :key="item.key"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="mulTarget_box" id="typeChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scroll from "vue-seamless-scroll";
import {
  totalTarget,
  multipleTartget,
  rankEntRule,
  rankCharts,
  colorList,
  entTypeOption,
  rankBar,
  rankEntRule1,
  rankLine,
  rankChartCircle
} from "@constant";
import {
  entRankEntType,
  entRankEntLeader,
  entRankMuIndicator,
  entRankIndicator,
  entRankCount
} from "@api/gov/decisionAnalysis.js";
export default {
  name: "entRankAnalysis",
  data() {
    return {
      rankEntRule,
      rankEntRule1,
      type: 1,
      target: 1,
      totalTarget: [],
      multipleTartget,
      muPerTaxChart: null,
      isShow: false,
      muMainIncomeChart: null,
      muConsumeIncomeChart: null,
      muEmissionsIncomeChart: null,
      researchRateChart: null,
      allWorkRateChart: null,
      mulChart: null,
      dataYear: 2018,
      scrollOption: {
        step: 0.3,
        limitMoveNum: 7,
        isSingleRemUnit: true
      },
      entList: [],
      totalData: {
        ruleUpNum: "",
        newRuleUpNum: "",
        leaderEntNum: ""
      },
      colorList: [...colorList]
    };
  },
  // 进入该页面时隐藏地图
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$emit("showMapToggle", false);
    });
  },
  // 离开页面时显示地图
  beforeRouteLeave(to, from, next) {
    this.$emit("showMapToggle", true);
    next();
  },
  mounted() {
    let arr = [...totalTarget];
    this.totalTarget = arr.slice(1);
    this.mulChart = echarts.init(document.getElementById("mulChart"));
    this.mulChart.setOption(rankCharts);

    this.typeChart = echarts.init(document.getElementById("typeChart"));
    this.typeChart.setOption(entTypeOption);
    this.entChart = echarts.init(document.getElementById("entChart"));
    this.entChart.setOption(rankBar);
    this.entChart1 = echarts.init(document.getElementById("entChart1"));
    this.entChart1.setOption(rankLine);
    let that = this;
    window.addEventListener("resize", function() {
      //解决vue-seamless-scroll无缝滚动插件 resize时内部div.seamless-warp>div宽度不够问题
      that.isShow = false;
      that.$nextTick(() => {
        that.isShow = true; //重新更新dom，使宽度撑起
      });
      //解决resize时页面混乱
      setTimeout(() => {
        that.mulChart.resize();
        that.entChart.resize();
        that.entChart1.resize();
        that.typeChart.resize();
      }, 500);
    });
    this.entRankCount();
    this.entRankEntLeader();
    this.entRankEntTypes();
    this.entRankIndicator();
    this.entRankMuIndicator();
  },
  methods: {
    gotoEntFile(item) {
      let value = item.value;
      if (item.key == "ruleUpNum" || item.key == "newRuleUpNum") {
        window.location.href = `/entFile.html#/entFileMain?entRule=${value}&dataYear=${this.dataYear}`;
      } else {
        window.location.href = `/entFile.html#/entFileMain?belongEntTag=${value}&dataYear=${this.dataYear}`;
      }
    },
    gotoEnt(entName, creditCode) {
      window.location.href = `/entFile.html#/entFileMain/entDetail?entName=${entName}&creditCode=${creditCode}`;
    },
    entRankMuIndicator() {
      let arr = this.colorList.slice(0, 3);
      entRankMuIndicator({ dataYear: this.dataYear }).then(res => {
        if (res.code == "0000") {
          let list = res.data || [];
          let ae = list.map((v, i) => {
            let data = [
              {
                name: "领跑者企业",
                value: v.leaderEntValue,
                itemStyle: {
                  normal: {
                    //颜色渐变
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      arr[0]
                    )
                  }
                }
              },
              {
                name: "规上企业",
                value: v.ruleUpValue,
                itemStyle: {
                  normal: {
                    //颜色渐变
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      arr[1]
                    )
                  }
                }
              },
              {
                name: "新上规企业",
                value: v.newRuleUpValue,
                itemStyle: {
                  normal: {
                    //颜色渐变
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      arr[2]
                    )
                  }
                }
              }
            ];
            return data;
          });
          this.mulChart.setOption({
            series: ae.map((val, i) => {
              return {
                data: val
              };
            })
          });
          this.$nextTick(() => {
            this.mulChart.resize();
          });
        } else {
          this.$message({
            type: "error",
            mseeage: res.msg
          });
        }
      });
    },
    entRankEntLeader() {
      entRankEntLeader({ dataYear: this.dataYear }).then(res => {
        if (res.code == "0000") {
          this.isShow = true; //解决vue-seamless-scroll无缝滚动插件 重新渲染时内部div.seamless-warp>div宽度不够问题
          this.entList = res.data || [];
        } else {
          this.$message({
            type: "error",
            mseeage: res.msg
          });
        }
      });
    },
    entRankIndicator() {
      let that = this;
      let arrList = this.colorList.slice(0, 3);
      entRankIndicator({ dataYear: this.dataYear, type: this.target }).then(
        res => {
          if (res.code == "0000") {
            let item = res.data;
            let data = [
              {
                name: "领跑者企业",
                value: item.leaderEntValue,
                unit: that.totalTarget[that.target - 1].unit,
                rate: (item.leaderEntRate * 100).toFixed(2)
              },
              {
                name: "规上企业",
                value: item.ruleUpValue,
                unit: that.totalTarget[that.target - 1].unit,
                rate: (item.ruleUpRate * 100).toFixed(2)
              },
              {
                name: "新上规企业",
                value: item.newRuleUpValue,
                unit: that.totalTarget[that.target - 1].unit,
                rate: (item.newRuleUpRate * 100).toFixed(2)
              }
            ];
            let barData = data.map((v, i) => {
              return {
                ...v,
                itemStyle: {
                  normal: {
                    //颜色渐变
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      arrList[i]
                    )
                  }
                }
              };
            });
            that.entChart.setOption({
              series: [{ data }]
            });
            that.entChart1.setOption({
              series: [{ data: barData }]
            });
            that.$nextTick(() => {
              that.entChart.resize();
              that.entChart1.resize();
            });
          } else {
            this.$message({
              type: "error",
              mseeage: res.msg
            });
          }
        }
      );
    },
    entRankCount() {
      entRankCount({ dataYear: this.dataYear }).then(res => {
        if (res.code == "0000") {
          if (res.data) this.totalData = { ...this.totalData, ...res.data };
        } else {
          this.$message({
            type: "error",
            mseeage: res.msg
          });
        }
      });
    },
    entRankEntTypes() {
      let that = this;
      entRankEntType({ dataYear: this.dataYear, type: this.type }).then(res => {
        if (res.code == "0000") {
          let data = res.data || [];
          data = data.map((v, i) => {
            return {
              value: v.value,
              name: v.name,
              itemStyle: {
                normal: {
                  //颜色渐变
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    that.colorList[i]
                  )
                }
              }
            };
          });
          that.typeChart.setOption({
            series: [
              {
                data
              }
            ]
          });
          that.$nextTick(() => {
            that.typeChart.resize();
          });
        } else {
          this.$message({
            type: "error",
            mseeage: res.msg
          });
        }
      });
    }
  },
  components: {
    scroll
  }
};
</script>

<style lang="less" scoped>
#rank {
  width: 100%;
  min-height: 100%;
  padding: 24px 0 100px;
  background: url(../../../assets/images/energyConsumeAnalysis-bj.jpg)
    center/100% 100% no-repeat;
  .rank_container {
    width: 13rem;
    min-height: 700px;
    // background: #ccc;
    margin: 0 auto;
    color: #fff;
    .rank_head {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .head_item {
        height: 124px;
        cursor: pointer;
        flex: 1;
        margin-right: 24px;
        background: rgba(0, 25, 35, 0.9);
        &:last-child {
          margin-right: 0;
        }
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        .num {
          font-size: 30px;
        }
        .name {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.65);
        }
        .precent_content {
          position: relative;
          height: 9px;
          width: 130px;
          background: #001e2a;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          .precent {
            height: 30%;
            width: 90%;
            background: linear-gradient(to right, #fa6400, #fff054);
          }
        }
        &:hover {
          opacity: 0.9;
          background-color: rgba(0, 36, 50, 1);
          box-shadow: 0px 2px 10px 0px rgba(50, 197, 255, 0.36),
            inset 0px 1px 30px 0px rgba(77, 205, 255, 0.65);
          border: 1px solid rgba(52, 195, 255, 1);
        }
      }
    }
    .rank_box {
      height: 7rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
    }
    .rank_cen {
      height: 7rem;
    }
    .rank_rt {
      width: 4.35rem;
    }
    .rank_lt {
      flex: 1;
      width: 8.3rem;
    }
    .rank_bottom {
      height: 4.5rem;
    }
    .rank_item {
      position: relative;
      .bo_item {
        position: absolute;
        display: inline-block;
        width: 14px;
        height: 3px;
        background-color: rgba(50, 197, 255, 0.8);
        &.bo_lt {
          top: -1px;
          left: -1px;
        }
        &.bo_rt {
          top: -1px;
          right: -1px;
        }
        &.bo_lb {
          bottom: -1px;
          left: -1px;
        }
        &.bo_rb {
          bottom: -1px;
          right: -1px;
        }
      }
      .bo_vItem {
        position: absolute;
        display: inline-block;
        width: 3px;
        height: 14px;
        background-color: rgba(50, 197, 255, 0.8);
        &.bo_lt {
          top: -1px;
          left: -1px;
        }
        &.bo_rt {
          top: -1px;
          right: -1px;
        }
        &.bo_lb {
          bottom: -1px;
          left: -1px;
        }
        &.bo_rb {
          bottom: -1px;
          right: -1px;
        }
      }
      background: rgba(0, 25, 35, 0.9);
      margin-right: 24px;
      border: 1px solid rgba(52, 195, 255, 0.35);
      &:last-child {
        margin-right: 0;
      }
      .item_header {
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 55px;
        width: 100%;
        border-bottom: 1px solid rgba(52, 195, 255, 0.35);
      }
      .subtitle {
        font-size: 18px;
      }
      .decision-select {
        margin-right: 0;
        box-shadow: none;
        /deep/ .el-input .el-input__inner {
          border: none;
          background: transparent;
        }
      }
    }
    .mulTarget_box {
      height: calc(100% - 55px);
    }
    .mul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div {
        flex: 1;
        width: 50%;
        height: 100%;
      }
    }
    .ceb {
      padding: 10px 28px 0;
      overflow: hidden;
      max-height: calc(100% - 24px);
      .seamless-warp {
        & > div {
          width: 100% !important;
          margin: 0;
        }
        overflow: hidden;
        height: calc(100% - 55px);
        .ent-tr {
          height: 0.5rem;
          line-height: 0.5rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.14rem;
          cursor: pointer;
          width: 100% !important;
          .ent_l {
            display: flex;
            flex: 1;
            align-items: center;
          }
          .circle {
            margin-right: 24px;
            width: 0.25rem;
            height: 0.25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            border-radius: 50%;
            background-color: rgba(50, 197, 255, 0.12);
            &.ranknum {
              background-color: rgba(50, 197, 255, 1);
            }
          }
        }
      }
    }
  }
}
</style> 