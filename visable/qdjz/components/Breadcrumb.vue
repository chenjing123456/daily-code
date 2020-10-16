<template>
  <div class="module-information">
    <div v-if="showLevel3Path" class="back-btn" @click="back">
      <i class="el-icon-back"></i>
    </div>
    <el-breadcrumb>
      <!--<el-breadcrumb-item v-if="routePaths[1].path === '/entTabControl'">经信档案&nbsp;&nbsp;/&nbsp;&nbsp;企业档案&nbsp;&nbsp;/&nbsp;&nbsp;企业标签管理</el-breadcrumb-item>-->
      <el-breadcrumb-item v-for="(path,index) in routePaths" :key="path._id">
        <span>{{ path.name }}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="showLevel3Path">{{ level3Path.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { getLocalStorage } from "../common/utils";

export default {
  data() {
    return {
      routePaths: [],
      level3Path: {},
      showLevel3Path: false
    };
  },
  created() {
    this.getRoutePaths();
  },
  watch: {
    $route(to, from) {
      this.getRoutePaths();
    }
  },
  methods: {
    back() {
      this.$router.push(this.$route.matched[0].path);
    },
    getRoutePaths() {
      let paths = this.$store.getters.getRoutePath;
      this.routePaths = paths.map(path => ({
        _id: path.id,
        path: `/${path.url}`,
        name: path.name
      }));
      if (this.routePaths.length > 0) {
        let last = this.routePaths[this.routePaths.length - 1];
        if (
          this.$route.path.includes(last.path) &&
          this.$route.path.length > last.path.length
        ) {
          let local = JSON.parse(getLocalStorage("editData")) || {};

          this.level3Path = {
            _id: 9999,
            name: this.$route.params.title
              ? this.$route.params.title
              : local.title
              ? local.title
              : this.$route.meta.title
          };
          this.showLevel3Path = true;
        } else if (window.location.hash.includes("#/entTabControl")) {
          this.level3Path = {
            _id: 10000,
            name: "企业标签管理"
          };
          this.showLevel3Path = true;
        } else {
          this.showLevel3Path = false;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-breadcrumb,
.back-btn {
  height: 40px;
  line-height: 40px;
}
.back-btn {
  margin-right: 8px;
  cursor: pointer;
  color: #606266;
  font-size: 18px;
}
.module-information {
  flex-shrink: 0;
  width: 100%;
  padding: 7px 32px;
  background: #fff url("../assets/breadcrumb_bg.png") no-repeat 90% top;
  background-size: auto 100%;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #f0f2f5;
  box-sizing: border-box;
  z-index: 999;
}
</style>

