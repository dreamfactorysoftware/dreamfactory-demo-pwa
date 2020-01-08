import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Paginate from 'vuejs-paginate'
// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
// vue material
import { MdApp, MdDrawer, MdToolbar, MdButton, MdIcon, MdBottomBar } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// Styles
import './assets/styles/pagination.scss';
import './assets/styles/global.scss';
// map
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from 'vue2-google-maps/dist/components/cluster';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import store from "./store/main.store";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY, // google maps api key
    libraries: "places" // necessary for places input
  }
});
Vue.use(MdApp);
Vue.use(MdDrawer);
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdBottomBar);


Vue.component('gmap-cluster', GmapCluster);
Vue.component('paginate', Paginate);
Vue.component('ClipLoader', ClipLoader);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
