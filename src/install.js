import BottomNavigation from "./components/BottomNavigation";

const plugin = {
  install(Vue) {
    Vue.component(BottomNavigation.name, BottomNavigation);
  },
};

BottomNavigation.install = plugin.install;

let GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(BottomNavigation);
}

export default BottomNavigation;
