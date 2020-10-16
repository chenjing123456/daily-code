<template>
    <div id='keyEntAnalysis' class='analysis-container mapAnalysis' >
        <div class='select-position'>
            <el-select v-model="commonData.currentName" class='decision-select' @change="changeCityName()">
                <el-option
                    v-for="item in agencyOptions"
                    :key="item.town"
                    :label="item.town"
                    :value="item.town">
                    <!--<span style="float: left">{{ item.town }}</span>-->
                    <!--<span style="float: right">{{ item.focusEntNum }}</span>-->
                </el-option>
            </el-select>
            <el-cascader
                @change="handleChange"
                v-model="entRule"
                :options="entRuleOptions"
                class='decision-select'>
            </el-cascader>
            <el-select v-model="commonData.year" class='decision-select' @change="townEntNum(),focusEntAnalysis()">
                <el-option
                    v-for="(item) in dataYearOptions"
                    :key="item"
                    :label="item+'年度'"
                    :value="item">
                    
                </el-option>
            </el-select>
        </div>
        <div class="msg">
            <div class="msg-city" v-if="commonData.currentLevel !=='company'">
                <div class="msg-city-name header">
                    <span>{{ commonData.currentName }}</span>
                    <span v-show="commonData.currentLevel === 'street'" @click="setCommon('district','胶州市','')"><i class="iconfont iconqiehuan"></i>切换全市</span>
                </div>
                <div class="msg-city-total">
                    <div class="total-ent">
                        <span>企业总数 <span class="unit">（家）</span></span>
                        <span>{{ toHtmlStr(entAnalysis.totalEntNum,'-')}}</span>
                    </div>
                    <div class="total-ent">
                        <span><i class="iconfont iconzhongdianquyu"></i>重点企业<span class="unit">（家）</span></span>
                        <span>{{ toHtmlStr(entAnalysis.focusEntNum,'-')}}</span>
                    </div>
                </div>
            </div>
            <div v-else class="dataset_box">
                <section class="box_head">
                    <div class="left_head">
                        <span class="title_or1 head_item">{{ commonData.companyName }}</span>
                        <div class="head_item" @click="setCommon('district','胶州市','')"><i class="iconfont iconqiehuan"></i><span>切换全市</span></div>
                    </div>
                    <div class="right_head">
                        <i class="el-icon-close" @click="setCommon('district','胶州市','')"></i>
                    </div>
                </section>
                <section class="box_contain">
                    <section class="contain_item">
                        <div class="sub_title">
                            <i class="iconfont iconzonghezhibiao"></i><span>综合指标</span>
                        </div>
                        <section class="flx_column">
                            <div class="col_item" v-for="(item,index) in multipleTartget" :key="index">
                                <div class="col_left">
                                    <span>{{item.name}}</span><span class="unit">{{item.unit}}</span>
                                </div>
                                <div class="col_right">
                                    <span class="totals">{{ toHtmlStr(entMsg[item.key],'-') }}</span>
                                    <div class="right_box"><i class="iconfont iconzhibiao"></i><span class="otherNum">{{ toHtmlStr(entMsg[item.average],'-') }}</span></div>
                                </div>
                            </div>
                        </section>
                    </section>
                    <div class="contain_item">
                        <div class="sub_title">
                            <i class="iconfont iconzongliangzhibiao"></i><span>总量指标</span>
                        </div>
                        <div class="flx_row">
                            <div class="row_item" v-for="(item,index) in totalTarget.filter(v=> v.name != '企业数')" :key="index">
                                <div class="row_items spe_num">
                                    <span class="totals">{{ toHtmlStr(entMsg[item.key],'-') }}</span>
                                </div>
                                <div class="row_items">
                                    <span>{{item.name}}</span>
                                </div>
                                <div class="row_items">
                                    <span class="unit">{{item.unit}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
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
        <div class='data-container'></div>
    </div>
</template>

<script>
import {entRuleKe,totalTarget,multipleTartget,region} from "@constant"
import {  toHtmlStr } from "@/common/utils/index";
import {
    iconPoint,
    pointShow,
} from '@/components/amap/amap'
import * as api  from "@api/gov/decisionAnalysis";
import {getYearList} from "../../../common/constant";

    export default {
        name: "keyEntAnalysis",
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
                default:''
            },
            citysCenter:{
                type:Array,
                default:''
            }
        },
        watch:{
            activeName(newValue,oldValue){
                if(newValue === '胶州市'){
                   this.setCommon('district','胶州市','')
                }else{
                   this.commonData.currentName = newValue.indexOf('街道')!=-1?newValue+'办事处':newValue;
                   this.setCommon('street',this.commonData.currentName,'')
                }
                
                this.clearMarkers();
            },
            map(val,old) {
                if(Object.keys(val).length) {
                    this.focusEntAnalysis();
                }
            }
        },
        data() {
            return {
                totalTarget,multipleTartget,toHtmlStr,
                param:{
                    town:'胶州市办事处',
                    entRule:2,
                    dataYear:2019,
                },
                commonData:{
                    currentLevel:'street',//  district 胶州市   street 镇街  company 企业
                    currentName:'胶州市',// 所在市级或者乡镇的名称
                    companyName:'',//企业名称
                    entRule:'0,1,2', //规上/规下
                    year:2018,    //年份
                },
                entRule:null,
                agencyOptions:[],
                entRuleOptions:entRuleKe,
                dataYearOptions:getYearList(3),
                citys: region,
                vrText:'胶州厂房调查案例',
                vrLink:'https://720yun.com/t/fcvkiqdmO8b?scene_id=35881504',
                pointData:[],
                entAnalysis:{
                    focusEntNum:'',
                    totalEntNum:'',
                    dataList:[]
                },
                entMsg:{},
                isShowIcon:true,
            }
        },
        mounted() {
            if(Object.keys(this.map).length) {
                this.focusEntAnalysis();
            }
            this.townEntNum();
            
        },
        methods: {
            //获取各地区重点企业数
            townEntNum(){
                api.listTownWithFocusEnt({dataYear:this.commonData.year}).then(res=>{
                    if(res.code==='0000'){
                        this.agencyOptions = res.data || [];
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(err=>{
                    this.$message.error('获取数据失败')
                });
            },
           
            changeCityName(){
                let cityName = this.commonData.currentName.replace('办事处','');
                if(cityName !=='胶州市'){
                    this.$emit('refreshInfoWindow',cityName)
                }else{
                    this.setCommon('district','胶州市','');
                    this.polygonList.map(cu=>{
                        cu.setOptions({
                            fillOpacity: 0.5,
                            fillColor: 'rgba(195, 244, 255, 0.46)',
                        });
                    })
                }
                
            },
            //企业规模级联筛选改变
            handleChange(value) {
                this.commonData.entRule = (value && value.length==2) ? value[1] : value[0];
                this.focusEntAnalysis();
            },
            //获取街道乡镇的企业数和重点企业数
            focusEntAnalysis(){
                let params = {
                    town:this.commonData.currentName==='胶州市'?null:this.commonData.currentName,
                    dataYear:this.commonData.year,
                    entRule:this.commonData.entRule,
                };
                api.focusEntAnalysis(params).then(res=>{
                    if(res.code==='0000'){
                        let data = res.data;
                        if(this.commonData.currentName==='胶州市'){
                            this.entAnalysis={
                                    focusEntNum:data.focusEntNum,
                                    totalEntNum:data.totalEntNum,
                                    dataList:[]
                            };
                            data.dataList.map(v=>{
                                if(v.focusEnts.length>0){
                                    v.focusEnts.map(t=>{
                                        this.entAnalysis.dataList.push(t)
                                    })
                                }
                            });

                        }else{
                            this.entAnalysis={
                                focusEntNum:data.dataList[0].countyFocusEntNum,
                                totalEntNum:data.dataList[0].countyTotalEntNum,
                                dataList:data.dataList[0].focusEnts || [],
                            }; 
                        }
                        this.renderPoint();
                    }else{
                        this.$message.error(res.msg);
                    }
                })
                
                
            },
            //设置散点图
            renderPoint(data){
                let that = this;
                pointShow(this.map,function(current){
                    iconPoint(that.map,function(curr){

                    },[current]);
                    
                    that.setCommon('company',that.activeName,current.entName);
                    that.getEntMess(current);
                },that.entAnalysis.dataList)
            },
            //获取单个企业信息
            getEntMess(current){
                let item = {
                    dataYear:this.commonData.year,
                    creditCode:current.creditCode,
                };
                api.focusEntAnalysisDetail(item).then(res=>{
                    if(res.code==='0000'){
                        this.entMsg = res.data;
                    }
                })
            },
            goToPage(){
                window.open(this.vrLink);
            },
            clearMarkers(){
                let layers = this.map.getAllOverlays();
                if(layers && layers.length>0){
                    let massMarkerLayers = layers.filter(cu=>{
                        return cu.CLASS_NAME ==="AMap.Marker"
                    }) || [];
                    this.map.remove(massMarkerLayers)
                }

                this.focusEntAnalysis();
                
            },
            setCommon(currentLevel,currentName,companyName){
                this.commonData = {
                    currentLevel,//  district 胶州市   street 镇街  company 企业
                    currentName:currentName?currentName:this.commonData.currentName,// 所在市级或者乡镇的名称
                    companyName,//企业名称
                    entRule:this.commonData.entRule, //规上/规下
                    year:this.commonData.year,    //年份
                };
                if(currentName ==='胶州市'){
                    this.map.setZoom(10.9);
                    this.polygonList.map(cu=>{
                        cu.setOptions({
                            fillOpacity: 0.5,
                            fillColor: 'rgba(195, 244, 255, 0.46)',
                        });
                    })
                    this.clearMarkers();
                }
                // this.focusEntAnalysis();
            },
        },
        
    }
</script>

<style lang="less" scoped>
#keyEntAnalysis{
    position: absolute;
    height:100%;
    .select-position{
        position: absolute;
        top:30px;
        left:20px;
    }
} 


.msg{
    .header{
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        border-bottom: 1px solid rgba(227, 234, 239, 0.1);
        color:#fff;
        span:nth-child(1){
            font-size: 20px;
        }
        span:nth-child(2){
            i{
                margin-right: 6px;
            }
            font-size: 14px;
        }
    }
    .msg-city{
        position: absolute;
        right:24px;
        top:30px;
        width:400px;
        /*height:200px;*/
        /*opacity: 0.8;*/
        background:linear-gradient(to bottom,rgba(0, 24, 34, 0.85),rgba(0, 0, 0, 1));
        box-shadow: 0px 2px 10px 0px rgba(9, 15, 19, 0.65), inset 0px 1px 40px 0px rgba(148, 225, 255, 0.3);
        border: 1px solid rgba(50, 197, 255, 1);
        padding:20px;
        color:#fff;
        
        &-total{
            
            .total-ent{
                display: flex;
                justify-content: space-between;
                line-height: 40px;
                i{
                   color:#F7B500;
                   font-size: 16px;
                    margin-right:4px;
                }
                span:nth-child(1){
                    font-size: 16px;
                }
                span:nth-child(2){
                    font-size: 24px;
                }
            }
            .unit{
                color:#9BA4A9;
                font-size: 16px !important;
            }
        }
    }
    .msg-company{
        position: absolute;
        top:0;
        right:0;
        width: 25%;
        height:100%;
        /*opacity: 0.8;*/
        background-color: rgba(0, 36, 50, 1);
        box-shadow: 0px 2px 10px 0px rgba(0, 25, 35, 1);
        border-left: 1px solid rgba(52, 195, 255, 0.71);
        .header{
            line-height: 64px;
            
        }
    }
}
    .flx_row{
        justify-content: unset !important;
    }
</style>