import Vue from 'vue'
import Router from 'vue-router'
import AthleteTracker from '@/components/AthleteTracker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AthleteTracker',
      component: AthleteTracker
    }
  ]
})
