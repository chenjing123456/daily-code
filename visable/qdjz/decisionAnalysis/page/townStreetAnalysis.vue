<template>
    <div id='townStreetAnalysis' class='analysis-container  mapAnalysis'>
        <div class='select-position'>
            <el-select v-model="param.town" class='decision-select' @change='townSelectClick'>
                <el-option
                v-for="item in agencyOptions"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
            <el-cascader
                v-model="entRule"
                :options="entRuleOptions"
                @change="handleChange" class='decision-select'>
            </el-cascader>
            <el-select v-model="param.dataYear" class='decision-select' @change='getTownData'>
                <el-option
                v-for="item in dataYearOptions"
                :key="item"
                :label="item+'年度'"
                :value="item">
                </el-option>
            </el-select>
        </div>
        <div class='text-position'>
            <div class='text-position-vr'>
                <div><i class='iconfont iconVR'></i></div>
                <div><el-link :href="vrLink" target="_blank" :underline='false'>{{vrText}}</el-link></div>
                <div @click='goToPage'><i class='el-icon-arrow-right'></i></div>
            </div>
            <div class='text-position-first'>胶州市地图</div>
            <div class='text-position-second'>企业分布经纬度坐标分布图</div>
        </div>
        <transition name="animate-right">
            <div class="dataset_box" v-show='divShow'>
                <section class="box_head">
                    <div class="left_head">
                        <span class="title_or1 head_item">{{param.town}}</span>
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
                            <span class="totals">{{toHtmlStr(rightIndexData[item.key],'-')}}</span>
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
                        <div class="row_item" v-for="(item,index) in totalTarget" :key="index" :class="index==totalTargetIndex?'row_item_active':''">
                        <div class="row_items spe_num">
                            <span class="totals">{{toHtmlStr(rightIndexData[item.key]>=0?(rightIndexData[item.key]).toFixed(item.tofixed):'-','-')}}</span>
                            <span class="read_more">
                            <i class="el-icon-arrow-right" @click='indexClick(item,index)'></i>
                            </span>
                        </div>
                        <div class="row_items">
                            <span>{{item.name}}</span>
                        </div>
                        <div class="row_items">
                            <span class="unit">{{item.unitTown}}</span>
                        </div>
                        <div class="row_items precent_items">
                            <div class="all_precent">
                            <div class="precent_content">
                                <span class="precent" :style="'width:'+(rightIndexData[item.key+'Rate']>=0?rightIndexData[item.key+'Rate']+'%':'0%')"></span>
                            </div>
                            </div>
                            <span class="num">{{rightIndexData[item.key+'Rate']>=0?rightIndexData[item.key+'Rate']+'%':'-'}}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
    import { jzTowns,entRuleKe,totalTarget, multipleTartget,getYearList } from "@constant"
    import { getTownAnalysis,townTarget } from "@api/gov/decisionAnalysis.js"
    import { toHtmlStr } from '@utils'
    import bangbangImg from'../../../assets/images/xw_ly.png'
    import { barLayer } from '@/components/amap/amap'
    export default {
        name: "townStreetAnalysis",
        data() {
            return {
                //下拉选参数
                param:{
                    town:'胶州市',
                    entRule:'0,1,2',
                    dataYear:2018,
                },
                //vr参数和链接
                vrText:'青岛临空区航空数字化招商观摩系统',
                vrLink:'https://720yun.com/t/03vkuldy7pm?scene_id=37905445',
                entRule:'0,1,2',
                //下拉选
                agencyOptions:['胶州市',...jzTowns],
                entRuleOptions:entRuleKe,
                dataYearOptions:getYearList(3),
                //右侧指标数据
                divShow:false,
                multipleTartget,//综合指标
                totalTarget,//总量指标
                totalTargetIndex:null,
                rightIndexData:{},//后台返回的综合指标、总量指标
                toHtmlStr,
            }
        },
        props:{
            map:{
                type:Object,
                default:null
            },
            activeName:{
                type:String,
                default:''
            },
            polygonList:{
                type:Array,
                default:()=>{return []}
            },
            citysCenter:{
                type:Array,
                default:()=>{return []}
            },
            streets:{
                type:Array,
                default:()=>{return []}
            },
        },
        watch:{
            //监听此值，有值代表地图加了点击事件
            activeName(newValue,oldValue){
                if(newValue){
                    this.param.town = newValue.indexOf('街道')!=-1?newValue+'办事处':newValue;
                    this.townSelectClick();
                }
            },
        },
        mounted() {
            //页面div动画
            this.divShow=true;
            //获取乡镇数据
            this.getTownData();
        },
        //路由离开时清空3d柱状图
        beforeRouteLeave(to, from, next){
            this.clear3DBar()
            next()
        },
        methods: {
            //获取乡镇数据
            getTownData(){
                getTownAnalysis(this.param).then(res=>{
                    if(res.code == '0000'){
                        this.rightIndexData = res.data || {};
                        for(let item in this.rightIndexData){
                            if(item =='industValue' || item == 'mainBusinessIncome' || item == 'taxRevenue' || item =='researchMoney'){
                                this.rightIndexData[item] = this.rightIndexData[item]/10000;
                            }
                        }
                    }else{
                        this.$message.error(res.msg || '获取数据失败')
                    }
                })
            },
            //企业规模级联筛选改变
            handleChange(value) {
                this.param.entRule = value && value.length>0 ? value[value.length-1] : '';
                this.getTownData();
            },
            //跳转页面
            goToPage(){
                window.open(this.vrLink);
            },
            //总量指标点击
            indexClick(item,index){
                this.totalTargetIndex = index;
                this.clearIcon();
                this.clearLightTown();
                let tempKey = '';
                switch(item.key){
                    case 'total':tempKey = 'entTotal';break;
                    case 'landArea':tempKey = 'land_area';break;
                    case 'industValue':tempKey = 'indust_value';break;
                    case 'mainBusinessIncome':tempKey = 'main_business_income';break;
                    case 'taxRevenue':tempKey = 'tax_revenue';break;
                    case 'researchMoney':tempKey = 'research_money';break;
                    case 'allEnergyConsume':tempKey = 'all_energy_consume  ';break;
                    case 'emissionsPollutant':tempKey = 'emissions_pollutant';break;
                    case 'yearAverageWorkers':tempKey = 'year_average_workers';break;
                }
                townTarget({entRule:this.param.entRule,dataYear:this.param.dataYear,param:tempKey}).then(res=>{
                    if(res.code == '0000'){
                        //清空3d柱状图
                        this.clear3DBar();
                        //设置3d柱状图
                        this.set3DBar(res.data,item);
                    }else{
                        this.$message.error(res.msg || '获取数据失败')
                    }
                })
            },
            //乡镇街道下拉选点击
            townSelectClick(){
                this.totalTargetIndex =null;
                //获取乡镇数据
                this.getTownData();
                //地图操作--高亮当前乡镇街道
                //清空3d柱状图
                this.clear3DBar();
                if(this.param.town == '胶州市'){
                    this.clearIcon();
                    this.clearLightTown();
                    this.map.setCenter([120.02382574526537,36.212799916381756]);
                }else{
                    this.lightTown();
                }
            },
            //清除之前高亮的的乡镇街道
            clearLightTown(){
                this.polygonList.map(cu=>{
                    cu.setOptions({
                        fillOpacity: 0.5,
                        fillColor: 'rgba(195, 244, 255, 0.46)',
                    });
                })
            },
            //高亮当前乡镇街道
            lightTown(){
                //清除之前高亮的的乡镇街道
                this.clearLightTown();
                //高亮、移中心、设置图标
                let center = [];
                this.streets.map(cu=>{
                    if(cu.name == this.param.town.replace('办事处','')){
                        center = cu.center;
                    }
                });
                this.polygonList.map(cu=>{
                    let extData = cu.getExtData();
                    if(extData.areaName == this.param.town.replace('办事处','')){
                        cu.setOptions({
                            fillOpacity: 1,
                            fillColor: '#54CFFF',
                        });
                        this.map.setCenter(center);
                    }
                });
                //设置icon图标
                this.setMapIcon(center);
            },
            //设置icon图标
            setMapIcon(center){
                //清空之前存在的icon 
                this.clearIcon();
                // 创建一个 Icon
                var startIcon = new AMap.Icon({
                    size: new AMap.Size(23,60),
                    image: bangbangImg,
                });
                // 将 icon 传入 marker
                this.startMarker = new AMap.Marker({
                    position: center,
                    icon: startIcon,
                    offset: new AMap.Pixel(-13, -60)
                });
                this.map.add(this.startMarker);
            },
            //清空icon图标
            clearIcon(){
                if(this.startMarker){
                    this.map.remove(this.startMarker);
                }
            },
            //设置3d柱状图
            set3DBar(data,indexData){
                if(data){
                    let list = [];
                    this.streets.map(cu=>{
                        let value = 0;
                        for(let item in data){
                            if(item.replace('办事处','') == cu.name){
                                value = data[item] || 0
                            }
                        }
                        list.push({coord:cu.center.toString(),value:value,name:indexData.name,unit:indexData.unit});
                    })
                    //排序
                    list.sort(function(a,b){
                        return b.value - a.value
                    })
                    //柱状图
                    this.layer = barLayer(this.map,list);
                }else{
                    this.layer.setMap(null);
                }
            },
            //清空3d柱状图
            clear3DBar(){
                if(this.layer){
                    this.layer.setMap(null);
                }
            }
        },
        components: {},
    }
</script>

<style lang="less" scoped>
@import "../less/decisionAnalysis.less";
.row_item_active{
    color:#32C5FF;
    .unit{
        color:#32C5FF !important;
    }
    .precent{
        background: linear-gradient(to right, #1E83FF, #3CFFD3)  !important;
    }
}
</style>