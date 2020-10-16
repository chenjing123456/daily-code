<template>
    <section class="noData">
        <div class="noData-img" :style="showExplain?'marginTop:130px':''"></div>
        <div class="noData-steps" v-if="showExplain" >
            <div class="step-item">
                <span class="step">1</span><span class="desc">选定年份下载模板</span><span class="divider"></span>                
            </div>
            <div class="step-item">
                <span class="step">2</span><span class="desc">填写核对数据</span><span class="divider"></span>
            </div>
            <div class="step-item">
                <span class="step">3</span><span class="desc">上传模板</span>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "EmptyData",
        props:{
            noData: {
                default: false,
                type: Boolean
            },
            showExplain: {  //是否展示上传说明
                default: false,
                type: Boolean
            }
        }
    }
</script>

<style lang="less" scoped>
    .noData {
        min-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;

        .noData-img {
            /*margin-top: 130px;*/
            width: 130px;
            height: 208px;
            background: url("../assets/mj/empty.png") no-repeat center center;
            background-size: contain;
        }
        .noData-steps {
            margin:49px 0;
            width: 934px;
            height: 100px;
            border-radius: 4px;
            border: 1px dashed rgba(216, 220, 230, 1);
            padding: 0 32px;
            display: flex;
            align-items: center;
            .step-item {
                display: flex;
                align-items: center;
                .step {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    background-color: rgba(216, 220, 230, 1);
                    color: rgba(255, 255, 255, 1);
                    font-size: 16px;
                    text-align: center;
                    font-family: HelveticaNeue;
                    border-radius: 16px;
                }
                .desc {
                    display: inline-block;
                    color: rgba(192, 196, 204, 1);
                    font-size: 16px;
                    font-family: PingFangSC-Regular;
                    margin: 0 14px 0 8px;
                }
                .divider {
                    display: inline-block;
                    width: 192px;
                    height: 1px;
                    background-color: rgba(233, 233, 233, 1);
                    margin-right: 16px;
                }
            }
        }
    }
</style>