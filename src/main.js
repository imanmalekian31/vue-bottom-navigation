import Vue from "vue";
import App from "./App.vue";

import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;

import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'


Vue.use(mdiVue, {
  icons: mdijs
})


new Vue({
  render: (h) => h(App),
}).$mount("#app");
