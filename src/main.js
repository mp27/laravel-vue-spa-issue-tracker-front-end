import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from './axios';
import can from './helpers/can';

Vue.config.productionTip = false;
Vue.prototype.$can = can;
let instance = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
});

axios.get('constants').then((response) => {
    Vue.prototype.$constants = response.data;

    instance.$mount('#app');
});

