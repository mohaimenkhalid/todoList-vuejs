// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {store} from './store/store'
import VueRouter from 'vue-router'
import Master from './components/layouts/Master'
import routes from './routes'

Vue.config.productionTip = false
window.eventBus = new Vue();
Vue.use(VueRouter);



const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } 

  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    
    if (store.getters.loggedIn) {
      next({
        name: 'todo',
      })
    } 

    else {
      next()
    }
  } 




  else {
    next() // make sure to always call next()!
  }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { Master },
  template: '<Master/>'
})
