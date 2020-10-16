<template>
    <el-dialog class="chart-enlarge" title="" :fullscreen="true" :visible.sync="chartEnlarge.isShow" @close='closeDialog' @opened="openDialog">
        <div class="dialog-content">
            <div class="dialog-body">
                <div id="enlargeChart" v-show="!chartEnlarge.chartType"></div>
                <div id="dbdb" v-if="chartEnlarge.chartType === 'dbdb'">
                    <table class="right-top-table" border="1">
                        <thead>
                        <tr>
                            <th width="49%">工作指标</th>
                            <th width="33%">年度目标</th>
                            <th width="49%">1-10月完成情况</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="item in tableData">
                            <template v-if="typeof item.fulfil === 'string'">
                                <tr>
                                    <td>{{item.name}}</td>
                                    <td>{{item.merits}}</td>
                                    <td>{{item.fulfil}}</td>
                                </tr>
                            </template>
                            <template v-else>
                                <template  v-for="(val, i) in item.fulfil">
                                    <tr>
                                        <td v-show="i == 0" :rowspan="item.fulfil.length">{{item.name}}</td>
                                        <td v-show="i == 0" :rowspan="item.fulfil.length">{{item.merits}}</td>
                                        <td>{{val}}</td>
                                    </tr>
                                </template>
                            </template>
                        </template>
                        </tbody>
                    </table>
                </div>
                <div id="micro" v-else-if="chartEnlarge.chartType === 'micro'">
                    <div class="charts-outer">
                        <div class="chart-tabs">
                            <div class="chart-tabs-item" @click="changeTab(1)" :class="{'active':type==1}">
                                达标企业
                            </div>
                            <div class="chart-tabs-item" @click="changeTab(2)" :class="{'active':type==2}">
                                当月达标
                            </div>
                        </div>
                        <div v-show="type == 1" id="dabiaoChart2"></div>
                        <div class="rank-outer" v-show="type == 2">
                            
                            <div class="flex-end">
                                <el-select class="month-select" :popper-append-to-body="false" v-model="dataMonth" placeholder="请选择月份" size="small" @change="refreshData">
                                    <el-option
                                        v-for="item in months"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>                            
                            <div class="rank-outer-head">
                                <div class="head-first-item">
                                    排名
                                </div>
                                <div class="head-second-item">
                                    区县名称
                                </div>
                                <div class="head-third-item">
                                    达标企业数（家）
                                </div>
                            </div>
                            <div class="rank-outer-body">
                                <div class="rank-outer-body-item" v-for="(item,index) in chartEnlarge.chartData.rankData" :key='index'>
                                    <div class="item-first">{{item.rank}}</div>
                                    <div class="item-second">{{item.name}}</div>
                                    <div class="item-third flex-box">
                                        <span>{{item.value}}</span>
                                        <div class="percentage" >                                            
                                            <div class="percentage-data" :style="{width:item.value/chartEnlarge.chartData.maxValue*100+'%'}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
                <div id="radar" v-else-if="chartEnlarge.chartType === 'radar'">
                    <div class="charts-outer">
                        <div class="rank-outer-head">
                            <div class="head-first-item">
                                区县名称
                            </div>
                            <div class="head-second-item">
                                亩均税收
                            </div>
                        </div>
                          <div id="taxCharts">
                            <div class="tax-item" v-for="(item,index) in chartEnlarge.chartData.rankData" :key="index">
                                <div class="area-name">
                                    {{item.area}}
                                </div>
                                <div class="progress">
                                    <div class="inner-progress green" :style="{width:item.point/chartEnlarge.chartData.maxData*100+'%'}" >
                                    </div>
                                </div>
                                <div class="count">
                                    {{item.point}}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div id="industryRank" v-else-if="chartEnlarge.chartType === 'industryRank' || chartEnlarge.chartType === 'outputRank'" >
                    <div class="rank-outer">
                        <div class="rank-outer-head">
                            <template  v-if="chartEnlarge.chartType === 'industryRank'">
                                <div class="head-first-item">
                                    排名
                                </div>
                                <div class="head-second-item">
                                    行业名称
                                </div>
                                <div class="head-third-item">
                                    工业增加值（亿元）
                                </div>
                            </template>
                            <template v-else-if="chartEnlarge.chartType === 'outputRank'">
                                <div class="head-first-item">
                                    排名
                                </div>
                                <div class="head-second-item">
                                    区县名称
                                </div>
                                <div class="head-third-item">
                                    工业产值（亿元）
                                </div>
                            </template>
                        </div>
                        <div class="rank-outer-body">
                            <div class="rank-outer-body-item" v-for="(item,index) in chartEnlarge.chartData.rankData" :key='index'>
                                <div class="item-first">{{item.rank}}</div>
                                <div class="item-second">{{item.name}}</div>
                                <div class="item-third">
                                    <span>{{item.value}}</span>
                                    <div class="percentage" >
                                        <div class="percentage-data" :style="{width:item.value/chartEnlarge.chartData.maxValue*100+'%'}">                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div id="upIndustry" v-else-if="chartEnlarge.chartType === 'upIndustry'">
                    <div class="charts-outer">
                        <div class="chart-tabs">
                            <div class="chart-tabs-item" @click="changeUpIndustryTab(1)" :class="{'active':upIndustryType==1}">
                                趋势
                            </div>
                            <div class="chart-tabs-item" @click="changeUpIndustryTab(2)" :class="{'active':upIndustryType==2}">
                                区县排名
                            </div>
                        </div>
                        <div id="upIndustryChart2"></div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    
    import { Dialog } from "element-ui";
    import {commonChart, yxjc_dbdb_data} from "../common/constant/index";
    import {monthesFromNowInYear} from "../common/utils";
    import {getZhuZhuangTu} from "../common/interface/api/gov";
    import {upIndustryChart} from "../gov/yxjc/js/chart";
    

    export default {
        name: "chartEnlargeDialog",
        components: {
            'el-dialog':Dialog
        },
        data(){
            return {
                isShow:false,
                tableData: yxjc_dbdb_data,
                type: 1, //小升规tabs
                upIndustryType: 1,//规上企业tabs
                months: monthesFromNowInYear(new Date().getFullYear(), '月').reverse(),
                dataMonth:new Date().getMonth()+1,
            }
        },
        computed:{
            chartEnlarge:{
                get:function () {
                    return this.$store.state.chartEnlargeDialog
                },
                set:function () {
                    this.$store.commit('setChartEnlargeDialog',{
                        isShow:false,
                    });
                }
            },
        },
        created(){
            
        },
        mounted() {
            
        },
        methods:{
            closeDialog(){
                if (this.chartEnlarge.myChart) {
                    this.enlargeChart.clear();
                }
                this.$store.commit('setChartEnlargeDialog',{
                    isShow:false,
                });
                
            },
            openDialog(){
                if (!this.chartEnlarge.myChart) {
                    return;
                }
                
                if (this.chartEnlarge.chartType === 'upIndustry') {
                    this.createChart();
                    return;
                }
                
                let id = this.chartEnlarge.chartType === 'micro' ? 'dabiaoChart2' : 'enlargeChart';
                
                
                this.enlargeChart = commonChart(id);
                let options = this.chartEnlarge.myChart.getOption();
                const dom = this.chartEnlarge.myChart.getDom();
                
                    
                    if($(dom).prop('id') == 'szjjChart') {
                        options.legend[0].data = ['数字经济核心制造业增加值增速','规上工业增加值增速'];
                        options.series[0].name = '数字经济核心制造业增加值增速';
                    }
                
                
                this.enlargeChart.setOption(options);
                
                
                this.enlargeChart.setOption({
                    title:{
                        textStyle:{
                            fontSize:24
                        },
                    },
                    tooltip: {
                        textStyle:{
                            fontSize:24
                        }
                    },
                    legend: {
                        show:true,
                        left:'right',
                        textStyle:{
                            fontSize:22,
                            color: '#FFF',
                        },
                    },
                    yAxis:[{
                        axisTick:{
                            show:true,
                        },
                        axisLabel:{
                            show:true,
                            color: '#FFF',
                            fontSize:22,
                        }
                    }],
                    xAxis:{
                        axisTick:{
                            show:true,
                        },
                        axisLabel:{
                            show:true,
                            color: '#FFF',
                            fontSize:22,
                            rotate:50,
                        }
                    },
                    grid:{
                        // bottom:60,
                        top:60,
                        right:0,
                        left:60,
                        bottom:'3%',
                        containLabel: true
                    },
                    textStyle:{
                        fontSize:22
                    },
                    series:[{
                        barWidth:50,
                        label:{
                            fontSize:30
                        }
                    },{
                        barWidth:50,
                        label:{
                            fontSize:30
                        }
                    }]
                });
                const that = this;
                window.addEventListener("resize",function(e){
                    that.enlargeChart.resize();
                });
            },
            
            /** 小升规监测 Start */
            changeTab(val){
                if(val == this.type){
                    return ;
                }
                this.type = val;
                
                if (this.type == 1) {
                    
                } 
            },
            refreshData() {
                let rankData = [], maxValue = 0;
                getZhuZhuangTu({ dataMonth: this.dataMonth }).then(res=>{
                    let data = res.data;
                    data.sort(function(a,b){
                        return b.achieveGoal - a.achieveGoal
                    })
                    data.map((v,i)=>{
                        if(maxValue < v.achieveGoal){
                            maxValue = v.achieveGoal
                        }

                        rankData.push({
                            rank:(i+1),
                            name:v.county,
                            value:v.achieveGoal ? v.achieveGoal :0
                        })
                    });
                    
                    this.chartEnlarge.chartData.rankData = rankData;
                    this.chartEnlarge.chartData.maxValue = maxValue;
                })
            },
            /** 小升规监测 End */
            
            /** 规上工业增加值 Start */
            createChart(){
                if(this.upIndustryType == 1){
                    this.createTrendChart()
                }else{
                    this.createCountChart()
                }
            },
            createCountChart(){
                let data = this.chartEnlarge.chartData.countyData;
                data.sort(function(a,b){
                    return b.industryValueAdd-a.industryValueAdd
                })
                let industryValueAdd = [];
                let xAxisCate = [];
                let type=this.upIndustryType;
                data.map(v=>{
                    industryValueAdd.push(v.industryValueAdd);
                    xAxisCate.push(`${v.areaName}`)
                })
                this.enlargeChart = upIndustryChart({xAxisCate,industryValueAdd,type, id: 'upIndustryChart2'})
                this.enlargeChart.setOption({
                    title:{
                        textStyle:{
                            fontSize:24
                        },
                    },
                    tooltip: {
                        textStyle:{
                            fontSize:24
                        }
                    },
                    legend: {
                        show:true,
                        left:'right',
                        textStyle:{
                            fontSize:22,
                            color: '#FFF',
                        },
                    },
                    yAxis:[{
                        axisTick:{
                            show:true,
                        },
                        axisLabel:{
                            show:true,
                            color: '#FFF',
                            fontSize:22,
                        }
                    }],
                    xAxis:{
                        axisTick:{
                            show:true,
                        },
                        axisLabel:{
                            show:true,
                            color: '#FFF',
                            fontSize:22,
                            rotate:50,
                        }
                    },
                    grid:{
                        // bottom:60,
                        top:60,
                        right:0,
                        left:60,
                        bottom:'3%',
                        containLabel: true
                    },
                    textStyle:{
                        fontSize:22
                    },
                });
                const that = this;
                window.addEventListener("resize",function(e){
                    that.enlargeChart.resize();
                });
            },
            createTrendChart(){
                let data = this.chartEnlarge.chartData.trendData;
                let industryValueAdd = [];
                let xAxisCate = [];
                let type=this.upIndustryType;

                data.map(v=>{
                    industryValueAdd.push(v.industryAddGrowth);
                    xAxisCate.push(`${v.dataYear}年${v.dataMonth}月`)
                })
                this.enlargeChart = upIndustryChart({xAxisCate,industryValueAdd,type, id: 'upIndustryChart2'})
                this.enlargeChart.setOption({
                    title:{
                        textStyle:{
                            fontSize:24
                        },
                    },
                    tooltip: {
                        textStyle:{
                            fontSize:24
                        }
                    },
                    legend: {
                        show:true,
                        left:'right',
                        textStyle:{
                            fontSize:22,
                            color: '#FFF',
                        },
                    },
                    yAxis:[{
                        axisTick:{
                            show:true,
                        },
                        axisLabel:{
                            show:true,
                            color: '#FFF',
                            fontSize:22,
                        }
                    }],
                    xAxis:{
                        axisTick:{
                            show:true,
                        },
                        axisLabel:{
                            show:true,
                            color: '#FFF',
                            fontSize:22,
                            rotate:50,
                        }
                    },
                    grid:{
                        // bottom:60,
                        top:60,
                        right:0,
                        left:60,
                        bottom:'3%',
                        containLabel: true
                    },
                    textStyle:{
                        fontSize:22
                    },
                });
                const that = this;
                window.addEventListener("resize",function(e){
                    that.enlargeChart.resize();
                });
            },
            changeUpIndustryTab(val){
                if(val == this.upIndustryType){
                    return ;
                }
                this.upIndustryType = val;
                this.createChart()
            },
            /** 规上工业增加值 End */
        },
    }
</script>
<!--<style lang="less">
    .el-dialog{
        background-color: #293D94;
        padding:.2rem .4rem;
    }
</style>-->
<style lang="less" scoped>
    .chart-enlarge{
        padding: 0 .5rem;
        .dialog-content{
            border-radius: 6px;
            background-color: #293D94;
            height:100%;
            .dialog-body{
                padding: .2rem .4rem;
                height:100%;
            }
        }
        /deep/ .el-dialog{
            background: transparent;
            .el-dialog__header{
                height:20px;
                .el-dialog__headerbtn{
                    top:0px;
                    right:0px;
                    background: transparent;
                    .el-dialog__close{
                        font-size: 36px;
                        color: #fff;
                        font-weight: bold;
                    }
                }
            }
            .el-dialog__body{
                height:calc(~'100% - 60px - .3rem');
                /*padding: 0;*/
                background: #fff;
                border-radius: 6px;
                padding: .15rem;
            }
        }
        #enlargeChart, #dbdb{
            width:100%;
            height:100%;
        }
        
        #dbdb {
            overflow: auto;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        
        .right-top-table {
            width:100%;
            height:100%;
            color:#fff;
            border:#419EC6;
            table-layout: fixed;
            border-spacing: 0;
            border-collapse: collapse;
            thead{
                background-color: #21327B;
                th{
                    text-align: left;
                    font-size: 16px;
                    line-height: .5rem;
                }
            }
            tbody{
                //background-color: #2A3E92;
                td{
                    text-align: left;
                    padding: 0 .1rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    line-height: .4rem;
                }
            }
        }

        #industryRank,#micro,#upIndustry {
            width:100%;
            height: 100%;
            position: relative;
            
        }
        
        .rank-outer{
            width:100%;
            height: 100%;
            &-head{
                background: rgba(12, 26, 70, 0.53);
                height: 40px;
                display: flex;
                line-height: 40px;
                opacity: 0.65;
                color: rgba(255, 255, 255, 1);
                font-size: 14px;
                text-align: left;

                .head-first-item{
                    width:15%;
                    text-align: center;
                }
                .head-second-item{
                    width:20%;
                }
                .head-third-item{
                    flex: 1;
                }
            }
            &-body{
                overflow: auto;
                &::-webkit-scrollbar {
                    display: none;
                }
                height:calc(~"100% - 40px");
                /*padding-bottom:20px;*/
                &-item{
                    height: 40px;
                    display: flex;
                    line-height: 40px;
                    color: rgba(255, 255, 255, 1);
                    // font-size: 12px;
                    text-align: left;
                    .item-first{
                        width:15%;
                        text-align: center;
                    }
                    .item-second{
                        width:20%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .item-third{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        /*justify-content: center;*/

                        &>span {
                            display: inline-block;
                            width: 100px;
                        }
                        .percentage{

                            position: relative;
                            width:calc(~"100% - 100px");
                            height: 16px;
                            z-index: 2;
                            .percentage-data{
                                position: relative;
                                background:rgba(38, 232, 255, 1);
                                height: 100%;
                                line-height: 16px;
                                font-size: 12px;
                                text-indent: 10px;
                                overflow-x: visible;
                                white-space: nowrap;
                            }
                            &:before {

                                content:'';
                                position: absolute;
                                left:0px;
                                top:0px;
                                width:100%;
                                height: 100%;
                                background-color: rgba(25, 31, 45, 0.51);
                                z-index: -1;
                            }
                        }
                    }
                    // &:nth-child(even){
                    //      background: rgba(12, 26, 70, 0.53);
                    // }
                    // &:nth-child(odd){
                    //      background: transparent;
                    // }
                }
            }
        }
        
        #radar {
            width:100%;
            height:100%;
            
            .rank-outer-head {
                .head-first-item {
                    text-align: left;
                    padding-left: 5%;
                }
            }
            #taxCharts{
                width:100%;
                height:100%;                            
                overflow: auto;
               

                .tax-item{
                    display: flex;
                    height: 40px;
                    width:100%;
                    padding:0px 20px;
                    margin:2px 0px;
                    align-items: center;
                    justify-content: space-between;
                    .area-name{
                        width: 15%;
                        opacity: 0.65;
                        color: rgba(255, 255, 255, 1);
                        font-size: 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        padding-left: 5%;
                    }
                    .progress{
                        flex: 1;
                        margin:0px 10px;
                        width:150px;
                        .inner-progress{
                            height: 10px;
                            width:0%;

                        }
                        .green{
                            background:#26E8FF
                        }
                        .blud-color{
                            background-color: #1B68FD ;
                        }
                    }
                    .count{
                        width:60px;
                        line-height: 11px;
                        color: rgba(38, 232, 255, 1);
                        font-size: 11px;
                        text-align: right;

                    }
                }
            }
        }

        #micro,#upIndustry {
            .month-select {
                width: 118px;
                height: 40px;
                border-radius: 2px;
                background-color: transparent;
                margin-bottom: 10px;
                /deep/.el-input .el-input__inner {
                    
                    background-color: transparent;
                    color: #fff;
                }
            }
            .rank-outer{
                padding-top: 50px;
                &-body{
                    &-item{
                        .item-third{

                            .percentage{
                                .percentage-data{
                                    background:rgba(27, 104, 253, 1);
                                }
                                &:before{
                                    background-color: rgba(25, 31, 45, 0.51);
                                }
                            }
                        }
                    }
                }
            }
            #dabiaoChart2, #upIndustryChart2 {
                width:100%;
                height: 100%;
                position: relative;
                z-index: 8;
                padding-top: 50px;
            }
        }
                
        .chart-tabs{
            display: flex;
            position: absolute;
            right:10px;
            z-index: 10;
            &-item{
                text-align: center;
                line-height: 35px;
                width:100px;
                height:35px;
                background:rgba(16, 41, 90, 1);
                color:rgba(255,255,255,.6);
                cursor: pointer;
                &.active{
                    background:rgba(27, 104, 253, 1);
                    color:#fff;
                }
            }
        }
    }
</style>