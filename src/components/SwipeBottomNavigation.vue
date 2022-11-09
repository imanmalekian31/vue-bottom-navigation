<template>
  <div class="sm-btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="`simple-btn-${index}`"
      ref="btnContainerRef"
      class="sm-btn-container"
      @click="handleButtonClick(button, index)"
    >
      <div class="sm-btn-item">
        <div
          :class="['sm-btn-icon', { 'sm-btn-icon-active': button.selected }]"
        >
          <slot name="icon" :props="button">
            <i :class="`${button.icon}`" />
          </slot>
        </div>

        <div
          :class="['sm-btn-title', { 'sm-btn-title-active': button.selected }]"
        >
          <slot name="title" :props="button">
            {{ button.title }}
          </slot>
        </div>
      </div>
    </div>
    <div ref="borderSwiperRef" class="border-swiper" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";

import type { SwipeOption } from "@/types";

type SwipeProps = {
  modelValue: number | string | null;
  options: SwipeOption[];
  swiperColor?: string;
  backgroundColor?: string;
  iconColor?: string;
  replaceRoute?: boolean;
}

const props = withDefaults(defineProps<SwipeProps>(), {
  modelValue: null,
  options: () => [],
  backgroundColor: "#FFFFFF",
  iconColor: "#8066C7",
  swiperColor: "#8066C7",
  replaceRoute: false,
});
const emit = defineEmits(["update:modelValue"]);

const router = useRouter();
const route = useRoute();

const prevSelected = ref<number>(0);
const currSelected = ref<number>(0);
const localOptions = ref<SwipeOption[]>([]);
const enableWatch = ref<boolean>(true);
const btnItemWidth = ref<number>(0);
const borderSwiperRef = ref<HTMLElement>();
const btnContainerRef = ref<HTMLElement>();

const cssVariables = computed(() => ({
  "--swiper-color": props.swiperColor,
  "--icon-color": props.iconColor,
  "--background-color": props.backgroundColor,
}));

watch(
  () => currSelected.value,
  (newVal) => {
    if (borderSwiperRef.value) {
      borderSwiperRef.value.style.transform = `translateX(${
        btnItemWidth.value * newVal
      }px)`;
    }
  }
);

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

function cssLoader() {
  if (btnContainerRef.value && Array.isArray(btnContainerRef.value)) {
    btnItemWidth.value = btnContainerRef.value[0].offsetWidth;
  }
  if (borderSwiperRef.value) {
    borderSwiperRef.value.style.width = btnItemWidth.value + "px";
    borderSwiperRef.value.style.transform = `translateX(${
      btnItemWidth.value * currSelected.value
    }px)`;
  }
}
function onResize() {
  cssLoader();
}

function handleButtonClick(button: SwipeOption, index: number) {
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

function updateValue(button: SwipeOption) {
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

onMounted(() => {
  cssLoader();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => window.removeEventListener("resize", onResize));

localOptions.value = props.options.slice();
const index = localOptions.value.findIndex((item) => {
  if (item.id == props.modelValue) {
    return true;
  }

  if (typeof item.path === "object") {
    return (item.path || {}).name == (route || {}).name;
  }

  return false;
});

if (index > -1) {
  currSelected.value = index;
  prevSelected.value = index;

  localOptions.value[index].selected = true;
}
</script>

<style scoped>
.sm-btn-container-foreground {
  position: fixed;
  display: flex;
  align-items: flex-end;
  direction: ltr;
  bottom: 0;
  width: 100%;
  z-index: 2147483647;
  height: 64px;
  background: var(--background-color);
  box-shadow: 0 0 5px 0 #eee;
}

.sm-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  transition: all 0.3s;
}

@media (min-width: 576px) {
  .sm-btn-container {
    cursor: pointer;
  }
}

.sm-btn-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0000008a;
}

.sm-btn-icon {
  font-size: 18px;
  transition: all 0.17s ease-in-out;
}
.sm-btn-icon-active {
  color: var(--icon-color);
  margin-bottom: 20px;
}

.sm-btn-title {
  position: absolute;
  color: var(--icon-color);
  transition: all 0.15s ease-in-out;
  top: 70px;
  font-size: 14px;
}
.sm-btn-title-active {
  color: var(--icon-color);
  top: 35px;
}

.border-swiper {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--swiper-color);
  transition: all 0.3s;
}
</style>
