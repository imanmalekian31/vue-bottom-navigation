<template>
<div>
  <router-view/>
    <BottomNavigation
      :options="options"
      :badge-color="badgeColor"
      :foreground-color="foregroundColor"
      v-model="selected"
    />
  </div>
</template>

<script>
import BottomNavigation from "./components/BottomNavigation";
export default {
  name: "App",
  components: { BottomNavigation },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: "home", title: "Home", route: "/" },
      {
        id: 2,
        icon: "bell-outline",
        title: "Notifcation",
        badge: 15,
        route: "/notification",
      },
      {
        id: 3,
        icon: "cog-outline",
        title: "Setting",
        route: "/settings",
      },

      {
        id: 4,
        icon: "account-circle",
        title: "Account",
        route: "/profile",
      },
    ],
    iconColor: "red",
    foregroundColor: "#42A5F5",
    badgeColor: "#FBC02D",
  }),
};
</script>

<style scoped>
#btn-app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
}

.color-picker-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.color-picker-container input {
  width: 150px;
  height: 40px;
  margin: 20px 10px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
}

.pick-color {
  border: 1px solid #eee;
  padding: 5px 10px;
  border-radius: 8px;
  box-shadow: 0 0 5px 0 #eee;
  color: gray;
}
</style>