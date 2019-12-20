import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import Paginate from 'vuejs-paginate'

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

// vue material
import { MdApp, MdDrawer, MdToolbar, MdButton, MdIcon } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// Styles

import './assets/styles/pagination.scss';


Vue.use(MdApp);
Vue.use(MdDrawer);
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdIcon);

Vue.component('paginate', Paginate);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
