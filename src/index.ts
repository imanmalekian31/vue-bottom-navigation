import { App, Plugin } from 'vue';

import CurvedBottomNavigation from './components/CurvedBottomNavigation.vue';
import GrowBottomNavigation from './components/GrowBottomNavigation.vue';
import RingBottomNavigation from './components/RingBottomNavigation.vue';
import SwipeBottomNavigation from './components/SwipeBottomNavigation.vue';
import WindowsBottomNavigation from './components/WindowsBottomNavigation.vue';
import HillBottomNavigation from './components/HillBottomNavigation.vue';
import FlashlightBottomNavigation from './components/FlashlightBottomNavigation.vue';

const plugin: Plugin = {
  install(app: App) {
    app.component('CurvedBottomNavigation', CurvedBottomNavigation);
    app.component('GrowBottomNavigation', GrowBottomNavigation);
    app.component('SwipeBottomNavigation', SwipeBottomNavigation);
    app.component('RingBottomNavigation', RingBottomNavigation);
    app.component('WindowsBottomNavigation', WindowsBottomNavigation);
    app.component('HillBottomNavigation', HillBottomNavigation);
    app.component('FlashlightBottomNavigation', FlashlightBottomNavigation);
  },
};

export {
  CurvedBottomNavigation,
  GrowBottomNavigation,
  RingBottomNavigation,
  SwipeBottomNavigation,
  WindowsBottomNavigation,
  HillBottomNavigation,
  FlashlightBottomNavigation,
};

export default plugin;
