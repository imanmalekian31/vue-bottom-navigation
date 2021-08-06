# vue-bottom-navigation

![Image of Navigation](https://user-images.githubusercontent.com/58827166/128373429-cf68662c-0f6e-4a25-ba1b-d26b32956d16.png)

# Table of Contents

- [**Demo**](#demo)

- [**Installation**](#installation)

- [**Usage**](#usage)

- [**Constructor Options**](#constructor-options)

* [**License**](#license)

# Demo

[**Demo**](https://vue-bottom-navigation.herokuapp.com/)

# Installation

```shell

# npm

$ npm install bottom-navigation-vue


#yarn

$ yarn add bottom-navigation-vue

```

```js
import Vue from "vue";

import VueBottomNavigation from "bottom-navigation-vue";

Vue.use(VueBottomNavigation);
```

# Usage

```html
<template>
  <VueBottomNavigation :options="options" v-model="selected" />
</template>

<script>
  import VueBottomNavigation from "bottom-navigation-vue";
  export default {
    components: { VueBottomNavigation },
    data: () => ({
      selected: 1,
      options: [
        { id: 1, icon: "fas fa-home", title: "Home", badge: 1 },
        { id: 2, icon: "fas fa-layer-group", title: "Category" },
        { id: 3, icon: "fas fa-cog", title: "Setting" },
        { id: 4, icon: "fas fa-user", title: "Account", badge: 15 },
        { id: 5, icon: "fas fa-bell", title: "Notifcation" },
      ],
    }),
  };
</script>
```

## Constructor Options

| Key          | Type           | Description               | Default    |
| :----------- | -------------- | ------------------------- | ---------- |
| `value`      | String, Number | selected button           | `null`     |
| `options`    | Array          | list of buttons           | `required` |
| `color`      | String         | color of the foreground   | `#42A5F5`  |
| `badgeColor` | String         | color of the button badge | `#FBC02D`  |

Your options need `id` and `icon`, which is Font Awesome class.
Additionally, you can add `title` for buttons.

# License

[The MIT License](http://opensource.org/licenses/MIT)
