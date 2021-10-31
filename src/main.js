import Vue from "vue";
import App from "./App.vue";

import VueRouter from 'vue-router'
Vue.use(VueRouter)


Vue.config.productionTip = false;
import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'
import router from './router'


Vue.use(mdiVue, {
  icons: mdijs
})


new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
