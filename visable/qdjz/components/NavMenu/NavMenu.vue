<template>
    <Nav :routes="routes" :checkedRouteId="checkedRouteId" />
</template>

<script>
import Nav from "./nav";
import { getLocation, getUrlParam } from "@/common/utils/index";
export default {
    data() {
        return {
            routes: [],
            checkedRouteId: "-1"
        };
    },
    components: {
        Nav
    },
    created() {
        this.setRoutes();
    },
    methods: {
        setRoutes() {
            this.$store.commit("setPermissionFromStorage");
            
            let mainHash = getLocation().hash.split('/')[1] || '';

            this.routes = this.$store.getters.getRoutes.filter(route => route.url === getLocation().lastPathname); 
            let routePath = this.getLocalRoute(
                this.routes,
                getLocation().hash.split('/')[1]
            );

            this.$store.commit('setRoutePath', routePath);
        },

        /**
         * @desc 获取当前路由，返回当前路由的PathArr，最后一个是当前的route
         * @param { routes } 权限树
         * @param { pathArr } 不用传，是路由的path路径
         */
        getLocalRoute(routes, path, pathArr = []) {
            for (let i = 0; i < routes.length; i++) {
                let { child, ...route } = routes[i];
                if(this.checkedRouteId !== '-1'){
                    return pathArr;
                }

                if (route.url.endsWith('.html')) {
                    if (!route.cUrls || !child || child.length == 0) {
                        pathArr.unshift(route);
                        this.checkedRouteId = route.id + ""
                        return pathArr;
                    } else {
                        this.getLocalRoute(child || [], path, pathArr);
                    }
                } else if (route.cUrls.includes(path)) {
                        pathArr.unshift(route);
                        this.checkedRouteId = route.id + ""
                        return pathArr;                    
                } else  {
                    this.getLocalRoute(child || [], path, pathArr);
                }
            }

            return pathArr;
        }
    }
};
</script>


