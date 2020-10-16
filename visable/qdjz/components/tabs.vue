<template>
    <div class="tab_content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item) in tabName" :key="item.label" :label="item.label" :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <div class="tab_cont">
            <component v-bind:is="currentTabComponent" :creditCode="creditCode" :ids="ids" :entName="entName"></component>
        </div>
    </div>
</template>
<script>
    import Operate from "@/components/business/operate";
    import RelateSpectrum from "@/components/business/relateSpectrum";
    import ProfileSpectrum from "@/components/business/profileSpectrum";
    import FinalProfile from "@/components/business/finalProfile";
    import IntellctualRight from "@/components/business/intellctualRight";
    import IntellctualManage from "@/components/business/intellctualManage";
    import JudicialLitigation from "@/components/business/judicialLitigation";
    import entTrends from "@/components/business/entTrends";
    import muperData from "@/components/business/muperData";

    
    export default {
        props: {
            tabName:{
                type:Array,
                default:[]
            },
            creditCode:{
                type:String,
                default:''
            },
            entName:{
                type:String,
                default:'',
            },
            ids:{
                type:Number,
                //default:0
            }
        },
        data() {
            return {
                activeName: "0",
                labName: '',
                currentTabComponent:'',
            };
        },
        mounted() {
            this.labName = this.tabName[this.activeName].label;
            // this.labName = this.tabName[this.activeName].label;
            this.renderComponent();
        },
        methods: {
            handleClick(tab, event) {
                if (this.labName === tab.label) return;
                this.labName = tab.label;
                this.activeName = tab.name;
                this.renderComponent();
            },
            renderComponent() {
                const label = this.labName;

                if (label === '基础信息') {
                    this.currentTabComponent = IntellctualManage;
                }else  if (label === '亩均数据') {
                    this.currentTabComponent = muperData;
                }else  if (label === '企业动态') {
                    this.currentTabComponent = entTrends;
                }else if (label === '关系图谱') {
                    this.currentTabComponent = RelateSpectrum;
                }else if (label === '最终持股人') {
                    this.currentTabComponent = FinalProfile;
                } else if (label === '知识产权') {
                    this.currentTabComponent = IntellctualRight;
                }

                // if (label === '基础信息') {
                //     this.currentTabComponent = IntellctualManage;
                // }else  if (label === '亩均数据') {
                //     this.currentTabComponent = muperData;
                // }else  if (label === '企业动态') {
                //     this.currentTabComponent = entTrends;
                // }else if (label === '关系图谱') {
                //     this.currentTabComponent = RelateSpectrum;
                // } else if (label === '持股人图谱') {
                //     this.currentTabComponent = ProfileSpectrum;
                // } else if (label === '最终持股人') {
                //     this.currentTabComponent = FinalProfile;
                // } else if (label === '知识产权') {
                //     this.currentTabComponent = IntellctualRight;
                // }

            }
        },
        components: {
            Operate,
            RelateSpectrum,
            ProfileSpectrum,
            FinalProfile,
            IntellctualRight,
            IntellctualManage,
            JudicialLitigation
        },
        watch: {
            creditCode(newV,oldV) {
                //  console.log(this.creditCode,'21')
            }
        }
    }

</script>
<style lang="less" scoped>
    .tab_content{
        background: #fff;
        /deep/ .el-tabs__header{
            .el-tabs__nav-wrap{
                padding:0 24px;
            }
        }
        .tab_cont{
            padding:24px;
        }
    }
</style>

