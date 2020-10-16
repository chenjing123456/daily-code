<template>
    <div id='energyConsumeAnalysis'>
        <div class='left'>
            <div class='left-first color-div'>
                <div class='more-industry'>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class='iconfont icongengduo'></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item,index) in industryData" :key='index' @click.native='menuItemClick(item,index)'>{{item.industry}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-carousel :interval="5000" arrow="always" :autoplay='false' class='carousel-style' v-if='industryData && industryData.length>0' ref='carousel'>
                    <el-carousel-item v-for="index in 8" :key="index">
                        <div class='carousel-container'>
                            <div class='carousel-container-item'>
                                <div class='carousel-title'>{{industryData[4*index-4].industry}}</div>
                                <div class='carousel-content'>
                                    <div class='carousel-content-left'>
                                        <div>总能耗</div>
                                        <div>{{industryData[4*index-4].energyConsume}}</div>
                                        <div>吨 / 标准煤</div>
                                    </div>
                                    <div :id='"energyConsumeRate"+(4*index-4)' class='carousel-content-right'></div>
                                </div>
                            </div>
                            <div class='carousel-container-item'>
                                <div class='carousel-title'>{{industryData[4*index-3].industry}}</div>
                                <div class='carousel-content'>
                                    <div class='carousel-content-left'>
                                        <div>总能耗</div>
                                        <div>{{industryData[4*index-3].energyConsume}}</div>
                                        <div>吨 / 标准煤</div>
                                    </div>
                                    <div :id='"energyConsumeRate"+(4*index-3)' class='carousel-content-right'></div>
                                </div>
                            </div>
                            <div class='carousel-container-item'>
                                <div class='carousel-title'>{{industryData[4*index-2].industry}}</div>
                                <div class='carousel-content'>
                                    <div class='carousel-content-left'>
                                        <div>总能耗</div>
                                        <div>{{industryData[4*index-2].energyConsume}}</div>
                                        <div>吨 / 标准煤</div>
                                    </div>
                                    <div :id='"energyConsumeRate"+(4*index-2)' class='carousel-content-right'></div>
                                </div>
                            </div>
                            <div class='carousel-container-item' v-if='4*index-1<31'>
                                <div class='carousel-title'>{{industryData[4*index-1].industry}}</div>
                                <div class='carousel-content'>
                                    <div class='carousel-content-left'>
                                        <div>总能耗</div>
                                        <div>{{industryData[4*index-1].energyConsume}}</div>
                                        <div>吨 / 标准煤</div>
                                    </div>
                                    <div :id='"energyConsumeRate"+(4*index-1)' class='carousel-content-right'></div>
                                </div>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class='left-second color-div'>
                <div class='color-div-title color-div-title2'>
                    <span>各行业能耗情况</span>
                </div>
                <div id='industryConsumption'></div>
            </div>
            <div class='left-third'>
                <div class='left-third-sub1 color-div'>
                    <div class='color-div-title color-div-title2'>
                        <span>总能耗</span>
                    </div>
                    <div id='totalConsumption'></div>
                </div>
                <div class='left-third-sub2 color-div'>
                    <div class='color-div-title color-div-title2'>
                        <span>行政区域能耗排名</span>
                    </div>
                    <div class='town-rank'>
                        <div v-for='(item,index) in sortedDataList' :key='index' class='town-rank-item'>
                            <div class='item-town'>
                                <div :class='index<=2?"special-rank":""'>{{index+1}}</div>
                                <div>{{item.town}}</div>
                            </div>
                            <div>{{item.energyConsume}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='right'>
            <div class='right-first color-div'>
                <div class='color-div-title color-div-title1'>
                    <span>胶州市总能耗</span>
                    <i class='iconfont iconsystem-tipsxianbeifen'></i>
                </div>
                <div class='right-content'>
                    <div>{{totalEnergyConsume}}</div>
                    <div>吨标准煤</div>
                </div>
            </div>
            <div class='right-second color-div'>
                <div class='color-div-title color-div-title1'>
                    <span>单位能耗主营业务收入</span>
                    <i class='iconfont iconsystem-tipsxianbeifen'></i>
                </div>
               <div class='right-content'>
                    <div>{{muConsumeIncome}}</div>
                    <div>吨标准煤</div>
                </div>
            </div>
            <div class='right-third color-div'>
                <div v-for='(item,index) in rightIndex' :key='index' class='right-third-item'>
                    <div class='item-title'>
                        <span>
                            <span>{{item.name}}</span>
                            <i class='iconfont' :class='item.icon'></i>
                        </span>
                        <i class='iconfont iconsystem-tipsxianbeifen'></i>
                    </div>
                    <div class='item-content'>
                        <span>{{item.value}}</span><span>{{item.unit}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { energyConsumeAnalysisPieOption,energyConsumeAnalysisBarOption } from '@constant';
    import { consumeAnalysisByIndustry,consumeAnalysisByTown,consumeAnalysisTotalIndicator } from '@api/gov/decisionAnalysis.js'
    export default {
        name: "energyConsumeAnalysis",
        data() {
            return {
                //行业能耗柱状图
                industryConsumptionChart:null,
                //行业消耗数据
                industryData:[],
                //总能耗柱状图
                totalConsumptionChart:null,
                //总能耗数据
                originalDataList:[],
                //行政区域能耗排名
                sortedDataList:[],
                //右侧指标数据
                totalEnergyConsume:0,
                muConsumeIncome:0,
                rightIndex:[],
            }
        },
        // 进入该页面时隐藏地图
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$emit("showMapToggle",false)
            })
        },
        // 离开页面时显示地图
        beforeRouteLeave(to, from, next) { 
            this.$emit("showMapToggle",true)
            next()
        },
        mounted() {
            //初始化echarts
            this.industryConsumptionChart = echarts.init(document.getElementById('industryConsumption'));
            this.industryConsumptionChart.setOption(energyConsumeAnalysisBarOption);
            this.totalConsumptionChart = echarts.init(document.getElementById('totalConsumption'));
            this.totalConsumptionChart.setOption(energyConsumeAnalysisBarOption);
            let that = this;
            window.addEventListener("resize",function(){
                that.industryConsumptionChart.resize();
                that.totalConsumptionChart.resize();
            });
            //获取行业能耗数据
            this.getIndustryConsumptionData();
            //获取乡镇总能耗数据
            this.getTownTotalConsumptionData();
            //获取页面右侧指标数据
            this.getRightIndexData();
        },
        methods: {
            //获取行业能耗数据
            getIndustryConsumptionData(){
                consumeAnalysisByIndustry({dataYear:'2018'}).then(res=>{
                    if(res.code=='0000'){
                        this.industryData = res.data || [];
                        this.$nextTick(() => {
                            this.industryConsumptionChart.resize();
                        });
                        //渲染31行业饼状图
                        this.renderIndustryRadius();
                        //渲染行业能耗柱状图
                        this.renderIndustryConsumption();
                    }else{
                        this.$message.error(res.msg || '获取行业能耗数据失败');
                    }
                })
            },
            //渲染31行业饼状图
            renderIndustryRadius(){
                for(let i=0 ; i<31 ; i++){
                    let itemStyle={};
                    if(i%2==0){//偶数项
                        itemStyle={
                            normal:{
                                color:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#1E83FF'
                                    }, {
                                        offset: 1, color: '#3CFFD3'
                                    }],
                                    global: false
                                },
                                borderColor:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(185,202,205,0.04)'
                                    }, {
                                        offset: 0.45, color: 'rgba(202, 217, 218, 0.04)'
                                    },{
                                        offset: 0.85, color: 'rgba(161, 174, 176, 0.04)'
                                    },{
                                        offset: 1, color: 'rgba(212, 212, 212, 0.04)'
                                    }],
                                    global: false
                                },
                                borderWidth:8,
                            }
                        }
                    }else{
                        itemStyle={
                            normal:{
                                color:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#FFDD2D'
                                    }, {
                                        offset: 1, color: '#FA5B00'
                                    }],
                                    global: false
                                },
                                borderColor:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(185,202,205,0.04)'
                                    }, {
                                        offset: 0.45, color: 'rgba(202, 217, 218, 0.04)'
                                    },{
                                        offset: 0.85, color: 'rgba(161, 174, 176, 0.04)'
                                    },{
                                        offset: 1, color: 'rgba(212, 212, 212, 0.04)'
                                    }],
                                    global: false
                                },
                                borderWidth:8,
                            }
                        }
                    }
                    this.$nextTick(()=>{
                        this['industryRadiusChart'+i] = echarts.init(document.getElementById('energyConsumeRate' + i));
                        this['industryRadiusChart'+i].setOption(energyConsumeAnalysisPieOption);
                        this['industryRadiusChart'+i].setOption({
                            title:{
                                text:(this.industryData[i].energyConsumeRate*100).toFixed(2)+'%',
                                textStyle:{
                                    color:'#fff'
                                },
                                x: 'center',
                                y: 'center',
                            },
                            tooltip: {
                                formatter: "{a} <br/>{b}:{d}%"
                            },
                            series:[{
                                name:this.industryData[i].industry,
                                type:'pie',
                                data:[
                                    {
                                        name:'占比',
                                        value:this.industryData[i].energyConsumeRate*100,
                                        itemStyle:itemStyle
                                    },
                                    {
                                        name:'非占比',
                                        value:100-this.industryData[i].energyConsumeRate*100,
                                        itemStyle:{
                                            normal:{
                                                color:'#001A24',
                                                borderColor:{
                                                    type: 'linear',
                                                    x: 0,
                                                    y: 0,
                                                    x2: 0,
                                                    y2: 1,
                                                    colorStops: [{
                                                        offset: 0, color: 'rgba(185,202,205,0.04)'
                                                    }, {
                                                        offset: 0.45, color: 'rgba(202, 217, 218, 0.04)'
                                                    },{
                                                        offset: 0.85, color: 'rgba(161, 174, 176, 0.04)'
                                                    },{
                                                        offset: 1, color: 'rgba(212, 212, 212, 0.04)'
                                                    }],
                                                    global: false
                                                },
                                                borderWidth:8,
                                            }
                                        }
                                    }
                                ]
                            }]
                        })
                        let that = this;
                        window.addEventListener("resize",function(){
                            that['industryRadiusChart'+i].resize();
                        });
                    })
                }
            },
            //渲染行业能耗柱状图
            renderIndustryConsumption(){
                let xData=[],yData=[];
                this.industryData.map(cu=>{
                    xData.push(cu.industry);
                    yData.push(cu.energyConsume);
                })
                this.industryConsumptionChart.setOption({
                    title:{
                        text: '吨/标准煤',
                        textStyle:{
                            color:'rgba(255,255,255,0.65)',
                            fontSize:16,
                        },
                    },
                    grid:{
                        bottom:'20%',
                        containLabe:true,
                    },
                    xAxis:{
                        data: xData,
                        axisLabel:{
                            interval: 0,
                            rotate:45,
                            formatter:function(value){
                                if(value.length>8){
                                    return value.slice(0,8) + `\n` + value.slice(8);
                                }else{
                                    return value
                                }
                                
                            }
                        },
                    },
                    dataZoom:{
                        end:50,
                    },
                    series:[{
                        name: '各行业能耗情况',
                        data: yData,
                        itemStyle:{
                            normal:{
                                color:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#3CFFD3'
                                    }, {
                                        offset: 1, color: '#1E83FF'
                                    }],
                                    global: false
                                }
                            }
                        }
                    }]
                });
            },
            //获取乡镇总能耗数据
            getTownTotalConsumptionData(){
                consumeAnalysisByTown({dataYear:'2018'}).then(res=>{
                    if(res.code=='0000'){
                        this.originalDataList = res.data.originalDataList || [];
                        this.sortedDataList = res.data.sortedDataList || [];
                        this.$nextTick(() => {
                            this.totalConsumptionChart.resize();
                        });
                        //渲染总能耗柱状图
                        this.renderTownConsumptionChart();
                    }else{
                        this.$message.error(res.msg || '获取乡镇总能耗数据失败');
                    }
                })
                
            },
            //渲染总能耗柱状图
            renderTownConsumptionChart(){
                let xData=[],yData=[];
                this.originalDataList.map(cu=>{
                    xData.push(cu.town);
                    yData.push(cu.energyConsume);
                })
                this.totalConsumptionChart.setOption({
                    title:{
                        text: '总能耗对比',
                        textStyle:{
                            color:'rgba(255,255,255,1)',
                            fontSize:16,
                            lineHeight:30,
                        },
                        subtext:'总能耗对比',
                        subtextStyle:{
                            color:'rgba(255,255,255,0.65)',
                            fontSize:14,
                            lineHeight:30,
                        },
                        itemGap:20,
                    },
                    grid:{
                        top:'15%',
                        bottom:'20%',
                        containLabe:true,
                    },
                    xAxis:{
                        data: xData,
                        axisLabel:{
                            rotate:35,
                        },
                    },
                    series:[{
                        name: '总能耗对比',
                        data: yData,
                    }]
                });
            },
            //获取页面右侧指标数据
            getRightIndexData(){
                consumeAnalysisTotalIndicator({dataYear:'2018'}).then(res=>{
                    if(res.code=='0000'){
                        this.totalEnergyConsume = res.data.totalEnergyConsume || 0;
                        this.muConsumeIncome = res.data.muConsumeIncome || 0;
                        this.rightIndex = [
                            {name:'煤',icon:'iconmei',value:res.data.totalCoal || 0,unit:'吨'},
                            {name:'电',icon:'icondian',value:res.data.totalElectric || 0,unit:'千瓦时'},
                            {name:'水',icon:'iconshui',value:res.data.totalWater || 0,unit:'万立方米'},
                            {name:'天然气',icon:'iconzhuangxiujiajutianranqipaifengxianxing',value:res.data.totalNaturalGas || 0,unit:'万立方米'},
                            {name:'热力',icon:'iconrelitu',value:res.data.totalStream || 0,unit:'万立方米'},
                        ];
                    }else{
                        this.totalEnergyConsume = 0;
                        this.muConsumeIncome = 0;
                        this.rightIndex = [
                            {name:'煤',icon:'iconmei',value:0,unit:'吨'},
                            {name:'电',icon:'icondian',value:0,unit:'千瓦时'},
                            {name:'水',icon:'iconshui',value:0,unit:'万立方米'},
                            {name:'天然气',icon:'iconzhuangxiujiajutianranqipaifengxianxing',value:0,unit:'万立方米'},
                            {name:'热力',icon:'iconrelitu',value:0,unit:'万立方米'},
                        ];
                        this.$message.error(res.msg || '获取指标数据失败')
                    }
                })
            },
            //下拉菜单点击
            menuItemClick(item,index){
                let tempInt = parseInt(index/4);
                this.$refs.carousel.setActiveItem(tempInt);
            }
        },
        components: {},
    }
</script>

<style lang="less" scoped>
#energyConsumeAnalysis{
    display:flex;
    background:url(../../../assets/images/energyConsumeAnalysis-bj.jpg) center/100% 100% no-repeat;
    color:#fff;
    .left,.right{
        height:100%;
        padding:20px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        &-first,&-second,&-third{
            width:100%;
            margin-bottom:20px;
        }
    }
    .left{
        width:80%;
        &-first{
            height: 2.47rem;
            position:relative;
        }
        &-second{
            height:7.56rem;
            #industryConsumption{
                height:calc(100% - 0.5rem);
                padding:20px;
            }
        }
        &-third{
            height:8.49rem;
            display:flex;
            justify-content:space-between;
            &-sub1{
                height:100%;
                width:calc(70% - 20px);
                #totalConsumption{
                    height:calc(100% - 0.5rem);
                    padding:20px;
                }
            }
            &-sub2{
                height:100%;
                width:30%;
                .town-rank{
                    height:calc(100% - 0.5rem);
                    &-item{
                        height:calc(100% / 14);
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        padding:0 20px;
                        font-size:0.14rem;
                        .item-town{
                            display: flex;
                            div:nth-of-type(1){
                                margin-right:10px;
                                background-color: rgba(50, 197, 255, .12);
                                border-radius:50%;
                                text-align: center;
                                width: 0.3rem;
                                height: 0.3rem;
                                line-height: 0.3rem;
                            }
                            .special-rank{
                                background-color: #32C5FF !important;
                            }
                        }
                    }
                }
            }
        }
    }
    .right{
        width:20%;
        &-first{
            height: 1.65rem;
        }
        &-second{
            height:1.68rem;
        }
        &-third{
            height:7.37rem;
            &-item{
                height:calc(100% / 5);
                border-bottom: 1px solid rgba(50, 197, 255, 0.25);
                .item-title,.item-content{
                    display: flex;
                    padding:0 20px;
                    height:calc(100% / 2);
                }
                .item-title{
                    justify-content: space-between;
                    align-items:center;
                    span{
                        font-size:0.16rem;
                        i{
                            color:#32C5FF;
                            margin-left:10px;
                        }
                    }
                    i{
                        font-size:0.14rem;
                    }
                }
                .item-content{
                    align-items: center;
                    span:nth-of-type(1){
                        font-size:0.26rem;
                        margin-right:20px;
                    }
                    span:nth-of-type(2){
                        color:rgba(255,255,255,0.65);
                        font-size:0.16rem;
                    }
                }
            }
        }
        &-content{
            height:1.15rem;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            div:nth-of-type(1){
                font-size:0.26rem;
                line-height:0.5rem;
            }
            div:nth-of-type(2){
                font-size:0.16rem;
                color:rgba(255,255,255,.6);
            }
        }
    }
    .color-div{
        background-color: rgba(0, 100, 140, 0.36);
        box-shadow: 0px 2px 20px 0px rgba(0, 26, 36, 1);
        border: 1px solid rgba(50, 197, 255, 1);
        &-title{
            height:0.5rem;
            line-height:0.5rem;
            display: flex;
            justify-content: space-between;
            padding:0 20px;
            border-bottom: 1px solid rgba(50, 197, 255, 0.25);
        }
        &-title1{
            font-size:0.16rem;
            i{
                font-size:0.14rem;
            }
        }
        &-title2{
            font-size:0.18rem;
        }
    }
}
.more-industry{
    position:absolute;
    right:10px;
    top:10px;
    font-size:0.16rem;
    cursor:pointer;
    z-index: 3;
}
//轮播图样式
/deep/.carousel-style{
    height: 2.47rem;
    .el-carousel__container{
        height: 100%;
    }
    .el-carousel__arrow{
        width:0.3rem;
        height:0.8rem;
        border-radius:4px;
        background:#0E5472;
    }
    .el-carousel__arrow--left {
        left: 0px;
    }
    .el-carousel__arrow--right {
        right: 0px;
    }
    .el-carousel__indicators{
        display:none;
    }
    .carousel-container{
        height: 100%;
        display:flex;
        padding:0 0.5rem;
        justify-content:space-around;
        &-item{
            width: calc(100% / 4);
            padding:0.2rem;
            display:flex;
            flex-direction:column;
            .carousel-title{
                font-size:0.16rem;
                line-height:0.6rem;
                border-bottom:1px solid rgba(255,255,255,0.16);
                word-break: keep-all;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .carousel-content{
                flex:1;
                display:flex;
                justify-content:space-between;
                align-items:center;
                &-left{
                    div:nth-of-type(1){
                        font-size:0.16rem;
                    }
                    div:nth-of-type(2){
                        font-size:0.26rem;
                    }
                    div:nth-of-type(3){
                        font-size:0.14rem;
                        color:rgba(255,255,255,0.65);
                        word-break: keep-all;
                        white-space: nowrap;
                    }
                }
                &-right{
                    flex:1;
                    height:100%;
                }
            }
        }
    }
}
//下拉菜单样式
.el-dropdown-link {
    color: #fff;
}
.el-dropdown-menu{
    background-color:#0D1C22;
    box-shadow: 0px 2px 10px 0px rgba(65, 24, 1, 0.66);
    border: 1px solid #32c5ff;
    height:3rem;
    overflow:auto;
    .el-dropdown-menu__item{
        color:#fff;
    }
    .el-dropdown-menu__item:hover{
        background: #409EFF;
        font-weight: 700;
    }
    .popper__arrow{
        display:none;
    }
}
.el-dropdown-menu::-webkit-scrollbar{
  width: 8px;
  height: 8px;
}
.el-dropdown-menu::-webkit-scrollbar-track{
  background-color: rgba(147, 153, 165, 0.4);
  border-radius: 2em;
}
.el-dropdown-menu::-webkit-scrollbar-thumb{
  background-color: rgba(255,255,255);
  border-radius: 2em;
}
</style>