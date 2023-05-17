<template>
  <div class="fl-btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="`flashlight-btn-${index}`"
      ref="btnContainerRef"
      class="fl-btn-container"
      @click="handleButtonClick(button, index)"
    >
      <div class="fl-btn-item">
        <div
          :class="['fl-btn-icon', { 'fl-btn-icon-active': button.selected }]"
        >
          <slot name="icon" :props="button">
            <i :class="`${button.icon}`" />
          </slot>
        </div>
      </div>
    </div>
    <div ref="flashlightRef" class="fl-flashlight"></div>
    <div ref="flashlightShadowRef" class="fl-flashlight-shadow"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';

import type { FlashlightOption } from '@/types';

type FlashlightProps = {
  modelValue: number | string | null;
  options: FlashlightOption[];
  flashlightColor?: string;
  backgroundColor?: string;
  iconColor?: string;
  replaceRoute?: boolean;
};

const props = withDefaults(defineProps<FlashlightProps>(), {
  modelValue: null,
  options: () => [],
  backgroundColor: '#646365',
  iconColor: '#312F31',
  flashlightColor: '#FFFFFF',
  replaceRoute: false,
});
const emit = defineEmits(['update:modelValue']);

const router = useRouter();
const route = useRoute();

const prevSelected = ref<number>(0);
const currSelected = ref<number>(0);
const localOptions = ref<FlashlightOption[]>([]);
const enableWatch = ref<boolean>(true);
const btnItemWidth = ref<number>(0);
const flashlightRef = ref<HTMLElement>();
const flashlightShadowRef = ref<HTMLElement>();
const btnContainerRef = ref<HTMLElement>();

const FLASHLIGHT_WIDTH = 70;
const FLASHLIGHT_SHADOW_WIDTH = 64;

const cssVariables = computed(() => {
  const hex = props.flashlightColor.slice(1);
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  return {
    '--swiper-color': props.flashlightColor,
    '--flashlight-color-rgb': `${red}, ${green}, ${blue}`,
    '--icon-color': props.iconColor,
    '--background-color': props.backgroundColor,
  };
});

watch(currSelected, newVal => {
  if (flashlightShadowRef.value) {
    flashlightShadowRef.value.style.transform = `translateX(${
      btnItemWidth.value * (newVal + 1) -
      (btnItemWidth.value / 2 + FLASHLIGHT_SHADOW_WIDTH / 2)
    }px)`;
  }

  if (flashlightRef.value) {
    flashlightRef.value.style.transform = `translateX(${
      btnItemWidth.value * (newVal + 1) -
      (btnItemWidth.value / 2 + FLASHLIGHT_WIDTH / 2)
    }px)`;
  }
});

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal != oldVal && enableWatch.value) {
      const target = localOptions.value.findIndex(
        option => option.id == newVal
      );

      if (target > -1) {
        handleButtonClick(localOptions.value[target], target);
      }
    }
  }
);

watch(
  route,
  newRoute => {
    if (newRoute) {
      nextTick(() => {
        const target = localOptions.value.findIndex(
          (option: FlashlightOption) => {
            if (typeof option.path === 'string') {
              return option.path === newRoute.path;
            } else {
              return (option.path || {}).name === newRoute.name;
            }
          }
        );
        if (target > -1) {
          handleButtonClick(localOptions.value[target], target);
        }
      });
    }
  },
  { immediate: true }
);

function cssLoader() {
  if (btnContainerRef.value && Array.isArray(btnContainerRef.value)) {
    btnItemWidth.value = btnContainerRef.value[0].offsetWidth;
  }
  if (flashlightShadowRef.value) {
    flashlightShadowRef.value.style.width = FLASHLIGHT_SHADOW_WIDTH + 'px';
    flashlightShadowRef.value.style.transform = `translateX(${
      btnItemWidth.value * (currSelected.value + 1) -
      (btnItemWidth.value / 2 + FLASHLIGHT_SHADOW_WIDTH / 2)
    }px)`;
  }
  if (flashlightRef.value) {
    flashlightRef.value.style.transform = `translateX(${
      btnItemWidth.value * (currSelected.value + 1) -
      (btnItemWidth.value / 2 + FLASHLIGHT_WIDTH / 2)
    }px)`;
  }
}
function onResize() {
  cssLoader();
}

function handleButtonClick(button: FlashlightOption, index: number) {
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

function updateValue(button: FlashlightOption) {
  emit('update:modelValue', button.id);

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
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => window.removeEventListener('resize', onResize));

localOptions.value = props.options.slice();
const index = localOptions.value.findIndex(item => {
  if (item.id == props.modelValue) {
    return true;
  }

  if (typeof item.path === 'object') {
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
.fl-btn-container-foreground {
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

.fl-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  transition: all 0.3s;
}

@media (min-width: 576px) {
  .fl-btn-container {
    cursor: pointer;
  }
}

.fl-btn-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fl-btn-icon {
  color: var(--icon-color);
  font-size: 18px;
  transition: all 0.17s ease-in-out;
}
.fl-btn-icon-active {
  color: var(--flashlight-color);
}

.fl-flashlight-shadow {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--flashlight-color);
  transition: all 0.3s;
  height: 80%;
  background: linear-gradient(
    to bottom,
    rgba(var(--flashlight-color-rgb), 0.7),
    rgba(var(--flashlight-color-rgb), 0.6),
    rgba(var(--flashlight-color-rgb), 0.5),
    rgba(var(--flashlight-color-rgb), 0.4),
    rgba(var(--flashlight-color-rgb), 0.3),
    rgba(var(--flashlight-color-rgb), 0.2),
    rgba(var(--flashlight-color-rgb), 0.1),
    rgba(var(--flashlight-color-rgb), 0)
  );
  clip-path: polygon(12% 0, 88% 0, 100% 100%, 0% 100%);
}

.fl-flashlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 70px;
  height: 4px;
  border-radius: 10px;
  background: var(--flashlight-color);
  transition: all 0.3s;
}
</style>
