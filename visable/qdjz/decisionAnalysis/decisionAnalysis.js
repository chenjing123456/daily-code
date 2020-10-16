import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@less/reset.less";
import './less/decisionAnalysis.less'

import App from './decisionAnalysis.vue'
// import store from '../../store'
import router from './router'

Vue.config.productionTip = false;

Vue.use(ElementUI)
new Vue({
    router,
    // store,
    render: h => h(App)
}).$mount('#app')
