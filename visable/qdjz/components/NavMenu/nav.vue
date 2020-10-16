<template>
        <el-aside>
            <div class="logo flex-center" @click="gotoIndex">
                <svg width="204px" height="19px" viewBox="0 0 204 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                                <stop stop-color="#61E4FF" offset="0%"></stop>
                                <stop stop-color="#32C5FF" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="企业档案--列表备份" transform="translate(-18.000000, -22.000000)">
                                <g id="编组-2">
                                    <g id="编组" transform="translate(18.000000, 20.000000)">
                                        <text id="胶州市亩产效益综合评价" font-family="PingFangSC-Medium, PingFang SC" font-size="16" font-weight="400" fill="#FFFFFF">
                                            <tspan x="28" y="17">胶州市亩产效益综合评价</tspan>
                                        </text>
                                        <g id="jz" transform="translate(0.000000, 2.000000)" fill="url(#linearGradient-1)" fill-rule="nonzero">
                                            <path d="M17.1250091,10.8933354 L10,0 L2.87499094,10.8933354 L0,12.6666696 L10,19 L20,12.6666696 L17.1250091,10.8933354 Z M2.37500302,12.6666696 L3.5000033,11.9066695 L10,15.200004 L16.4999967,11.9066695 L17.624997,12.6666696 L10,17.4800132 L2.37500302,12.6666696 Z" id="形状"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
            </div>
            <el-row class="tac">
                <el-col :span="24">
                    <el-menu
                        :default-active="checkedRouteId"
                        class="el-menu-vertical-demo"
                        @select="handleSelect"
                        unique-opened
                        
                    >
                        <!-- 第一层路由 -->
                        <nav-item
                            v-for="routeChild in routes"
                            :route="routeChild"
                            :key="routeChild.name + routeChild.url"
                        ></nav-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
</template>

<script>
import navItem from "./navItem.vue";
import loginMassage from "@/common/constant/base.config.js"; //登陆基本配置
import { gotoBaseURL,getLocation } from "@/common/utils/index";

export default {
    data() {
        return {
            config: loginMassage
        };
    },
    props: {
        routes: {
            type: Array,
            required: true
        },
        checkedRouteId: {
            type: String,
            required: true
        }
    },
    components: {
        navItem
    },
    methods: {
        
        handleSelect(key, keyPath) {

            let route = this.getPagePath(key, this.routes);
            if (!route) {

                this.routes.forEach(r => {
                    route = this.getPagePath(key, r.child);

                    // if (location.href.includes(route.url)) {
                    //     return;
                    // }
                    
                    if (route) {
                        this.setNewRoutes(route.url);
                        this.$router.push({ path: '/' + route.url });
                        return;
                    }
                })
                return;
            }
            this.setNewRoutes(route.url);
            
            // if (location.href.includes(route.url)) {
            //     return;
            // }

            location.href= `${location.origin}/${route.url}`
        },

        getPagePath(keyPath, routes) {
            let route = routes.find(route =>route.id == keyPath);
            return route;             

        },
        setNewRoutes(url) {
            let routePath = this.getNowRoute(
                this.routes,
                url,
            );
            this.$store.commit('setRoutePath', routePath);
        },

        /**
         * @desc 获取当前路由，返回当前路由的PathArr，最后一个是当前的route
         * @param { routes } 权限树
         * @param { pathArr } 不用传，是路由的path路径
         */
        getNowRoute(routes, path, pathArr = []) {
            for (let i = 0; i < routes.length; i++) {
                let { child, ...route } = routes[i];
                if (route.url === path) {
                    // url === path的时候unshift并结束回调
                    pathArr.unshift(route);
                    return pathArr;
                } else if (child && child.length && child[0].url) {

                    // 有child的时候回调，当回调结束的时候判断是否选中，选中unshift
                    this.getNowRoute(child, path, pathArr);
                    // pathArr.unshift(route)
                }
            }

            return pathArr;
        },
        gotoIndex(){
            location.href="/index.html"; 
        },
        
    }
};
</script>

<style lang="less">

    @header_height: 64px;
    
    .el-aside {
        z-index: 2;
    }
    .el-menu {
        border-right: none;
        text-align: left;
        background-color: rgba(7, 29, 37, 1);
        
        .el-submenu__title{
            color: #ffffff;
            height: 40px ;
            line-height: 40px;
            background: transparent;
            i {
                color: #ffffff;
            }
        }

        .el-menu-item-group {
            .el-menu-item-group__title{
                padding:0px;
            }
            .el-menu-item{
                height: 40px;
                line-height: 40px;
                color: rgba(255, 255, 255, 0.65);

                &:hover, &.is-active {
                    color: #ffffff;
                    background: linear-gradient(to right, #32C5FF,#61E4FF);
                }
            }
        }
    }

    .logo{
        width:100%;
        height:@header_height;
        cursor: pointer;
        box-sizing: border-box;
        background-color: #000B0F;
    }
    .container-outer .el-aside {
        width: 240px !important;
        overflow-x: hidden;
        background-color: rgba(7, 29, 37, 1);
        box-shadow: 2px 0px 10px 0px rgba(0, 95, 133, 0.79);
    }

    
 
</style>


