import CurvedBottomNavigation from "./components/CurvedBottomNavigation.vue";
import GrowBottomNavigation from "./components/GrowBottomNavigation.vue";
import SwipeBottomNavigation from "./components/SwipeBottomNavigation.vue";
import RingBottomNavigation from "./components/RingBottomNavigation.vue";
import WindowsBottomNavigation from "./components/WindowsBottomNavigation.vue";

export default {
  install(Vue) {
    Vue.component("CurvedBottomNavigation", CurvedBottomNavigation);
    Vue.component("GrowBottomNavigation", GrowBottomNavigation);
    Vue.component("SwipeBottomNavigation", SwipeBottomNavigation);
    Vue.component("RingBottomNavigation", RingBottomNavigation);
    Vue.component("WindowsBottomNavigation", WindowsBottomNavigation);
  },
};

export {
  CurvedBottomNavigation,
  GrowBottomNavigation,
  SwipeBottomNavigation,
  RingBottomNavigation,
  WindowsBottomNavigation
};
