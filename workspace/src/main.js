import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import 'common/stylus/include.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
window.Vue = Vue;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  mounted () {
    if (this.$router.currentRoute.path === '/') {
      this.$router.replace('/goods');
    }
  },
  ...App
});
// window.App = new Vue(App).$mount('#app');

