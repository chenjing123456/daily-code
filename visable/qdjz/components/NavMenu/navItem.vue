<template>
    <!--&lt;!&ndash; 当前路由 &ndash;&gt;-->
    <!--<el-menu-item :index="route.id + ''" v-if="!route.url.endsWith('.html') && route.cUrls">-->
         <!--&lt;!&ndash;<i v-if='route.class' class="route.class"></i>&lt;!&ndash; 根据class 来判断是否显示导航小图标&ndash;&gt;&ndash;&gt;-->
                            <!--{{ route.name }}-->
    <!--</el-menu-item>-->

    <!--<el-submenu :index="route.id  + ''" v-else :key="route.name + route.url">-->
        <!--<template slot="title">-->
            <!--<i class="iconfont" :class="route.icon"></i>-->
            <!--<span>{{ route.name }}</span>-->
        <!--</template>-->

        <!--&lt;!&ndash; 子路由 &ndash;&gt;-->
        <!--<el-menu-item-group>-->
            <!--<navitem  v-for="routeChild in route.child" :route="routeChild" :key="routeChild.name + routeChild.url"></navitem>-->
        <!--</el-menu-item-group>-->
    <!--</el-submenu>-->

    <el-submenu :index="route.id+''" v-if="(/html$/).test(route.url) && route.child && route.child.length > 0" :key="route.name + route.url">
        <template slot="title">
            <i class="iconfont" :class="route.icon"></i>
            <span>{{ route.name }}</span>
        </template>

        <!-- 子路由 -->
        <el-menu-item-group>
            <navitem  v-for="routeChild in route.child" :route="routeChild" :key="routeChild.name + routeChild.url"></navitem>
        </el-menu-item-group>
    </el-submenu>

    <el-menu-item :index="route.id+''" v-else>
        <i v-if='route.icon' class="iconfont" :class="route.icon"></i><!-- 根据class 来判断是否显示导航小图标-->
        {{ route.name }}
    </el-menu-item>
</template>

<script>
/**
 * menuItem的递归组件，递归出menu
 * @param route 路由的数组
 *
 */
export default {
    name: 'navitem',
    props: {
        route: {
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="less" scoped>
    .iconfont{
        margin-right:10px;
    }
    .el-menu-item.is-active{
        color: #ffffff;
        background: linear-gradient(to right, #32C5FF,#61E4FF);
    }
</style>
