import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import can from './helpers/can';

Vue.config.productionTip = false;
Vue.prototype.$can = can;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
