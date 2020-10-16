<template>
    <div id="map-main" class="commonMap">
        
    </div>
</template>

<script>
import {
   mapInit,
   getZheJBounds,
   renderPolyline,
   rendPolygon,
   iconPoint,
    pointShow,
   wzLevel
} from '@/components/amap/amap'
import { region } from "@constant"

import {getLocalStorage, toHtmlStr,notEmpty,removeLocalStorage,} from "../../../../common/utils";
import {getBounds} from "../../../../components/amap/amap";
    export default {
        props:{
            commonData:{
                type:Object,
                default(){
                    return {
                        currentLevel:'district',//  district 胶州市   street 镇街  company 企业
                        currentName:'胶州市',// 所在市级或者乡镇的名称
                        companyName:'',//企业名称
                        entRule:null, //规上/规下
                        year:null,    //年份
                    }
                }
            }
        },
        data() {
            return {
                regionLevel: [...wzLevel],
                citys: region,
                citysCenter:[],
                pointData:[
                    {entName:'杭州有数1',lng:120.05382574526537,lat:36.312799916381756},
                    {entName:'杭州有数2',lng:120.05455877115702,lat:36.3110814715973},
                    {entName:'杭州有数3',lng:120.05343062822665,lat:36.31087746308892},
                    {entName:'杭州有数4',lng:120.05550191894791,lat:36.30373909257232},
                    {entName:'杭州有数5',lng:120.0563528643327,lat:36.29941407787691},
                    {entName:'杭州有数6',lng:120.05587081342003,lat:36.29659853418806},
                    {entName:'杭州有数7',lng:120.05280246020504,lat:36.2956060149428},
                ],
            }
        },
        created(){
            
        },
        mounted() {
            // this.map = mapInit('map-main',{viewMode: '3D',},'amap://styles/069da364079e3b5bdce1f621f8ac52ea');
            // if(this.map){
            //     this.clearMap();
            //     this.setMapCenterSpot(120.02382574526537,36.212799916381756);
            //     this.setMapZoom(10.9);
            //     this.setMapPitch(50);
            //     this.setCurrentCity(this.commonData);
            // }
            
        },
        methods: {
            setCurrentCity(commonData){
                this.commonData = commonData;
                this.initMap({name:'胶州市'})
            },
            initMap(para,) {
                let that = this;
                getBounds({
                    searchName: para.name,
                }).then(res => {
                    console.log(res);
                    let originalBounds = res.boundaries;
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
                        that.polygonList = polygons;
                        polygons.map(v => {
                            v.on('click', function(e) {
                               that.activeName = e.target.getExtData().areaName;
                               that.setCommon('street',that.activeName,'');
                               that.refreshInfoWindow();
                               
                            })
                        });
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
                    this.renderPoint();    
                });

            },
            //设置散点图
            renderPoint(data){
                let that = this;
                pointShow(this.map,function(current){
                    console.log(current);
                    iconPoint(that.map,function(curr){
                        that.setCommon('company',that.activeName,curr.entName);
                    },[current])
                    
                },that.pointData)
            },
            setCommon(currentLevel,currentName,companyName){
                let item = {
                    currentLevel,//  district 胶州市   street 镇街  company 企业
                    currentName,// 所在市级或者乡镇的名称
                    companyName,//企业名称
                    entRule:null, //规上/规下
                    year:null,    //年份
                }
                this.$emit('selectItem',item)
            },

            //刷新infoWindow
            refreshInfoWindow() {
                const that = this;

                let polygon = this.polygonList.find( v => v.getExtData().areaName == this.activeName);
                let city = this.citysCenter.find( v => v.name == this.activeName);
                console.log(city);
                this.districtEvent(
                    this.commonData.currentLevel,
                    polygon.getExtData(),
                    city.center
                )
                this.resetPolygon(polygon)


            },
            districtEvent(regionLevel, extData, lnglat) {
                console.log(regionLevel, extData, lnglat);
                this.currentLevel = regionLevel
                if (regionLevel === 'district') {
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
        },
        components: {},
    }
</script>

<style lang="less" scoped>
    
    

</style>