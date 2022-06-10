<template>
  <div class="gr-btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="`grow-button-${index}`"
      :class="[
        'gr-btn-container',
        { 'gr-btn-container-active': button.selected },
      ]"
      :to="button.path"
      @click="handleButtonClick(button, index)"
    >
      <div :class="['gr-btn-item', { 'gr-btn-item-active': button.selected }]">
        <div
          :class="['gr-btn-icon', { 'gr-btn-icon-active': button.selected }]"
        >
          <slot name="icon" :props="button">
            <i :class="`${button.icon}`" />
          </slot>
        </div>
        <div class="gr-btn-title">
          <span class="gr-hidden-title">
            <slot name="title" :props="button">
              {{ button.title }}
            </slot>
          </span>
          <span
            :class="[
              'gr-animated-title',
              { 'gr-animated-title-active': button.selected },
            ]"
          >
            <slot name="title" :props="button">
              {{ button.title }}
            </slot>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  props: {
    modelValue: {
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: "#74cbbb",
    },
    replaceRoute: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();

    const prevSelected = ref(null);
    const currSelected = ref(null);
    const localOptions = ref([]);
    const enableWatch = ref(true);

    const cssVariables = computed(() => {
      const activeTitle = (localOptions.value[currSelected.value] || {}).title;
      let activeWidth = 95;
      if (activeTitle && activeTitle.length * 15 > 110) {
        activeWidth = 95 + (activeTitle.length * 15 - 110) / 2;
      }

      const mainColor =
        (localOptions.value[currSelected.value] || {}).color || props.color;

      const styles = {
        "--color": mainColor,
        "--color-background": mainColor + "30",
        "--active-width": `${activeWidth}px`,
      };

      return styles;
    });

    watch(
      () => props.modelValue,
      (newVal, oldVal) => {
        if (newVal != oldVal && enableWatch.value) {
          const target = localOptions.value.findIndex(
            (option) => option.id == newVal
          );

          if (target > -1) {
            handleButtonClick(localOptions.value[target], target);
          }
        }
      }
    );

    function handleButtonClick(button, index) {
      if (index === currSelected.value) {
        return;
      }

      currSelected.value = index;

      if (prevSelected.value !== null) {
        localOptions.value[prevSelected.value].selected = false;
      }

      localOptions.value[index].selected = true;

      prevSelected.value = currSelected.value;
      updateValue(button);
    }

    function updateValue(button) {
      emit("update:modelValue", button.id);

      enableWatch.value = false;
      setTimeout(() => {
        enableWatch.value = true;
      }, 0);

      if (button.path && Object.keys(button.path).length) {
        if (props.replaceRoute) {
          router.replace(button.path).catch(() => {});
        } else {
          router.push(button.path);
        }
      }
    }

    localOptions.value = props.options.slice();
    const index = localOptions.value.findIndex(
      (item) =>
        item.id == props.modelValue ||
        (item.path || {}).name == (route || {}).name
    );

    if (index > -1) {
      currSelected.value = index;
      prevSelected.value = index;

      localOptions.value[index].selected = true;
    }

    return {
      cssVariables,
      handleButtonClick,
      localOptions,
    };
  },
};
</script>

<style scoped>
.gr-btn-container-foreground {
  position: fixed;
  direction: ltr;
  display: flex;
  align-items: center;
  bottom: 0;
  width: 100%;
  z-index: 2147483647;
  height: 64px;
  background: #fff;
  box-shadow: 0 0 5px 0 #eee;
}

.gr-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  flex-grow: 1;
  transition: all 0.3s;
}

@media (min-width: 576px) {
  .gr-btn-container {
    cursor: pointer;
  }
}

.gr-btn-container-active {
  background-color: var(--color-background);
  border-radius: 100px;
}

.gr-btn-item {
  display: flex;
  position: relative;
  overflow: hidden;
  width: 24px;
  transition: all 0.3s ease;
  color: #0000008a;
}

.gr-btn-item-active {
  width: var(--active-width);
}

.gr-btn-icon {
  font-size: 20px;
  transition: all 0.3s ease;
  margin: 0px !important;
}

.gr-btn-icon-active {
  color: var(--color);
}

.gr-btn-title {
  position: relative;
  color: var(--color);
  padding: 0px 5px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gr-hidden-title {
  visibility: hidden;
}

.gr-animated-title {
  color: var(--color);
  position: absolute;
  left: 5px;
  bottom: -15px;
  transition: bottom 0.4s ease 0.1s;
}

.gr-animated-title-active {
  bottom: 2px;
}
</style>
