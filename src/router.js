import Vue from 'vue'
import Router from 'vue-router'
import Bookshelf from './views/Tabbar/Bookshelf.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Bookshelf',
      component: Bookshelf
    },
    {
      path: '/Classification',
      name: 'Classification',

      component: () => import('./views/Tabbar/Classification.vue'),



    },
      {
          path: '/Search',
          name: 'Search',

          component: () => import('./views/Tabbar/Search.vue')
      },
      {
          path: '/Ranking',
          name: 'Ranking',

          component: () => import('./views/Tabbar/Ranking.vue')
      },
      {
          path: '/profile',
          name:'profile',
          component:() => import('./views/SubClassification.vue'),
          props:true
      },
      {
          path: '/SearchList',
          name:'SearchList',
          component:() => import('./views/SearchList.vue'),
          props:true
      },
      {
          path: '/details',
          name:'details',
          component:() => import('./views/details.vue'),
          props:true
      },
      {
          path: '/chapter',
          name:'chapter',
          component:() => import('./views/chapter.vue'),
          props:true
      },
      {
          path: '/linkBook',
          name:'linkBook',
          component:() => import('./views/linkBook.vue'),
          props:true
      },
      {
          path: '/ranking',
          name:'ranking',
          component:() => import('./views/ranking.vue'),
          props:true
      }
  ],
    linkActiveClass: 'active'
})
