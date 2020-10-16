<template>
    <div id="app">
        <el-container class="container-outer">
            <nav-menu v-if="isReload" />
            <el-container class="container-outer-column">
                <Header @reloadAside="reloadAside" :navShow="navShow"></Header>
                <bread-crumb ref="bread"/>
                <el-main class="flex-col">
                    <slot></slot>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import "@/common/less/reset.less";
import NavMenu from "@/components/NavMenu/NavMenu";
import BreadCrumb from "@/components/Breadcrumb";
import Header from "@/components/header";

import "@/assets/font/iconfont.css";

export default {
    data() {
        return {
            isReload:true,
            navShow:'',
            routePaths: []
        };  
    },
    props:{
    },
    methods:{
        reloadAside(){
            this.isReload = false;
            this.$nextTick(()=>{
                this.isReload = true; //重新渲染子组件
            })
        },
    },
    components: {
        NavMenu,
        BreadCrumb,
        // Footer,
        Header
    },
};
</script>

<style lang="less" scoped>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        overflow-x: hidden;
    }
    .container-outer-column{
        flex:1;
        display: flex;
        flex-direction: column;
    }
    .container-outer{
        height: 100%;
    }
    .el-main {
        background: #f0f2f5;
        position: relative;
        overflow-x: hidden;

    }

    .flex-col {
        display: flex;
        flex-direction: column;
        position: relative;
    }
</style>
