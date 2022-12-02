import CurvedBottomNavigation from './components/CurvedBottomNavigation.vue';
import GrowBottomNavigation from './components/GrowBottomNavigation.vue';
import RingBottomNavigation from './components/RingBottomNavigation.vue';
import SwipeBottomNavigation from './components/SwipeBottomNavigation.vue';
import WindowsBottomNavigation from './components/WindowsBottomNavigation.vue';

const plugin = {
  install(Vue: any) {
    Vue.component('CurvedBottomNavigation', CurvedBottomNavigation);
    Vue.component('GrowBottomNavigation', GrowBottomNavigation);
    Vue.component('SwipeBottomNavigation', SwipeBottomNavigation);
    Vue.component('RingBottomNavigation', RingBottomNavigation);
    Vue.component('WindowsBottomNavigation', WindowsBottomNavigation);
  },
};

export {
  CurvedBottomNavigation,
  GrowBottomNavigation,
  RingBottomNavigation,
  SwipeBottomNavigation,
  WindowsBottomNavigation,
};

export default plugin;
