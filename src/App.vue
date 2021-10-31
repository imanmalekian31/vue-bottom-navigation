<template>
  <div id="btn-app">
    <h1>Vue Bottom Navigation</h1>
    <a
      href="https://github.com/imanmalekian31/vue-bottom-navigation"
      target="blank"
    >
      <img width="40" height="40" :src="require('./assets/github-logo.png')" />
    </a>

    <div>
      <div class="color-picker-container">
        <span>Foreground</span>
        <input
          type="color"
          name="foreground"
          value="#42A5F5"
          id="foreground"
          v-model="foregroundColor"
        />
        <span class="pick-color">{{ foregroundColor }}</span>
      </div>

      <div class="color-picker-container">
        <span>Badge</span>
        <input
          type="color"
          id="badge"
          name="badge"
          value="#FBC02D"
          v-model="badgeColor"
        />
        <span class="pick-color">{{ badgeColor }}</span>
      </div>
    </div>

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
      { id: 1, icon: "npm", title: "npm", route: "https://www.npmjs.com/" },
      {
        id: 2,
        icon: "google",
        title: "google",
        route: "https://www.google.com/",
      },
      {
        id: 3,
        icon: "twitter",
        title: "Twitter",
        route: "https://twitter.com",
      },
      {
        id: 4,
        icon: "linkedin",
        title: "linkedin",
        badge: 15,
        route: "https://www.linkedin.com/login",
      },
      { id: 5, icon: "account-circle", title: "Account", route: "/home" },
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