import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import 'common/stylus/include.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
/* eslint-disable no-new */
window.App = new Vue(App).$mount('#app');
if (window.App.$router.currentRoute.path === '/') {
  window.App.$router.replace('/goods');
}

