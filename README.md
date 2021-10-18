# vue-bottom-navigation

<p align="center">
<img align="center"  src="https://user-images.githubusercontent.com/58827166/132668893-d7912fe1-40da-4735-a171-90553a92fecd.gif"/>
</p>

# Table of Contents

- [**Demo**](#demo)

- [**Installation**](#installation)

- [**Usage**](#usage)

- [**Constructor Options**](#constructor-options)

- [**Route**](#route)

- [**Slots**](#slots)

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
        {
          id: 1,
          icon: "fas fa-home",
          title: "Home",
          childs: [
            { id: 101, icon: "fas fa-tshirt", title: "Products" },
            { id: 102, icon: "fas fa-tag", title: "Discount" },
            { id: 103, icon: "fas fa-gifts", title: "Gifts", badge: 7 },
          ],
        },
        { id: 2, icon: "fas fa-wallet", title: "Wallet" },
        {
          id: 3,
          icon: "fas fa-plus",
          title: "Setting",
          childs: [
            { id: 301, icon: "fas fa-bookmark", title: "Bookmarks" },
            { id: 302, icon: "fas fa-tasks", title: "Tasks" },
            { id: 303, icon: "fas fa-tachometer-alt", title: "Dashboard" },
            { id: 304, icon: "fas fa-ticket-alt", title: "Tickets" },
          ],
        },
        { id: 4, icon: "fas fa-bell", title: "Notification", badge: 15 },
        { id: 5, icon: "fas fa-user", title: "Account" },
      ],
    }),
  };
</script>
```

## Constructor Options

| Key               | Type           | Description                                                                 | Default    |
| :---------------- | -------------- | --------------------------------------------------------------------------- | ---------- |
| `value`           | String, Number | selected button                                                             | `null`     |
| `options`         | Array          | list of buttons                                                             | `required` |
| `foregroundColor` | String         | color of the foreground                                                     | `#42A5F5`  |
| `badgeColor`      | String         | color of the button badge                                                   | `#FBC02D`  |
| `replaceRoute`    | Boolean        | default routes are pushed but with this option you can change it to replace | `false`    |

Your options need `id` and `icon`, which icon is **Font Awesome** class but you can customize it with icon slot.
Additionally, you can add `title` for buttons.

## Route

For change route you can add `path` field to your option items like below : <br />
_Note_ : your path field must be an Object (For more information read [vue router](https://router.vuejs.org/guide/) guides).

```js
[
  { id: 1, icon: "fas fa-home", title: "Home", path: { name: "home" } },
  {
    id: 2,
    icon: "fas fa-wallet",
    title: "Wallet",
    childs: [
      {
        id: 201,
        icon: "fas fa-bookmark",
        title: "Bookmarks",
        path: { name: "bookmarks", query: { bookmark: "important" } },
      },
    ],
  },
];
```

## Slots

| Key           | Description        | Scoped |
| :------------ | ------------------ | ------ |
| `icon`        | main button icons  | `yes`  |
| `title`       | main button titles | `yes`  |
| `child-icon`  | child button icons | `yes`  |
| `child-title` | child button title | `yes`  |

You can use **Icon Slot** , **Title Slot** , **Child Icon Slot** and **Child Title Slot** to customize your icon and title like below.

```html
<template>
  <VueBottomNavigation :options="options" v-model="selected">
    <template #icon="{ props }"> <v-icon>{{ props.icon }}</v-icon> </template>
    <template #title="{ props }"> <b>{{ props.title }}</b> </template>

    <!-- child -->
    <template #child-icon="{ props }">
      <v-icon>{{ props.icon }}</v-icon>
    </template>
    <template #child-title="{ props }"> <b>{{ props.title }}</b> </template>
  </VueBottomNavigation>
</template>
```

# License

[The MIT License](http://opensource.org/licenses/MIT)
