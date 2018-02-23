import Vue from 'vue';
import Router from 'vue-router';

import AthleteTracker from '@/views/AthleteTracker';
import ZwiftLogin from '@/views/ZwiftLogin';
import StravaLogin from '@/views/StravaLogin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/zwift'
    },
    {
      path: '/tracker',
      name: 'AthleteTracker',
      component: AthleteTracker
    },
    {
      path: '/strava',
      name: 'StravaLogin',
      component: StravaLogin
    },
    {
      path: '/zwift',
      name: 'ZwiftLogin',
      component: ZwiftLogin
    }
  ]
});
