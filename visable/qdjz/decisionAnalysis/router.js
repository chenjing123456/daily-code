import Vue from 'vue'
import Router from 'vue-router'
import keyEntAnalysis from './page/keyEntAnalysis'
import entRankAnalysis from './page/entRankAnalysis'
import townStreetAnalysis from './page/townStreetAnalysis'
import industryAnalysis from './page/industryAnalysis'
import landAnalysis from './page/landAnalysis'
import energyConsumeAnalysis from './page/energyConsumeAnalysis'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
          path:'/keyEntAnalysis',
          component: keyEntAnalysis,
          meta: {
              title: '重点企业分析',
          },
      },
      {
          path:'/entRankAnalysis',
          component: entRankAnalysis,
          meta: {
              title: '企业排名分析',
          },
      },
      {
          path:'/townStreetAnalysis',
          component: townStreetAnalysis,
          meta: {
              title: '镇街分析',
          },
      },
      {
          path:'/industryAnalysis',
          component: industryAnalysis,
          meta: {
              title: '行业分析',
          },
      },
      {
          path:'/landAnalysis',
          component: landAnalysis,
          meta: {
              title: '土地专属分析',
          },
      },
      {
          path:'/energyConsumeAnalysis',
          component: energyConsumeAnalysis,
          meta: {
              title: '能耗专题分析',
          },
      },
  ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next()
});
export default router;