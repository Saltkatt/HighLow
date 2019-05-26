import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store';
import VueRouter from 'vue-router';
import Statistics from './components/Statistics.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/statistics', component: Statistics},
];

const router = new VueRouter({
    routes: routes
});

Vue.config.productionTip = false;

new Vue({
    router,
  store: store,
  render: h => h(App),
}).$mount('#app')
