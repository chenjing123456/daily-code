<template>
  <div id="echarts">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import echarts from "echarts";
import '../../node_modules/echarts/map/js/china.js';

export default {
  el: 'echarts',
  data () {
    return {
      msg: 'hello world'
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
