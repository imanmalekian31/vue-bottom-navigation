<template>
  <div class="hill-btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="`ring-btn-${index}`"
      class="hill-btn-container"
      @click="handleButtonClick(button, index)"
    >
      <div class="hill-btn-item">
        <div
          :class="[
            'hill-btn-icon',
            { 'hill-btn-icon-active': button.selected },
            { 'hill-btn-icon-deselect': button.deselect },
          ]"
        >
          <slot name="icon" :props="button">
            <i :class="`${button.icon}`" />
          </slot>

          <div v-if="(button.badge || 0) > 0" class="hill-btn-badge" />
        </div>
      </div>
    </div>

    <div id="hill" class="hill">
      <div class="hill-left"></div>
      <div class="hill-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import type { HillOption } from '@/types';

type HillProps = {
  modelValue: number | string | null;
  options: HillOption[];
  color?: string;
  backgroundColor?: string;
  badgeColor?: string;
  replaceRoute?: boolean;
};

const props = withDefaults(defineProps<HillProps>(), {
  modelValue: null,
  options: () => [],
  color: '#8B5CF6',
  backgroundColor: '#FFFFFF',
  badgeColor: '#FBC02D',
  replaceRoute: false,
});
const emit = defineEmits(['update:modelValue']);

const router = useRouter();
const route = useRoute();

const prevSelected = ref<number>(0);
const currSelected = ref<number>(0);
const localOptions = ref<HillOption[]>([]);
const enableWatch = ref<boolean>(true);

const cssVariables = computed(() => ({
  '--color': props.color,
  '--background-color': props.backgroundColor,
  '--badge-color': props.badgeColor,
}));

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

function cssLoader() {
  const containerWidth =
    document.querySelector('.hill-btn-container')?.clientWidth || 0;

  (document.querySelector('#hill') as HTMLElement).style.left = `
      ${containerWidth / 2 - 13 + currSelected.value * containerWidth}px`;
}

function handleButtonClick(button: HillOption, index: number) {
  if (index === currSelected.value) {
    return;
  }

  currSelected.value = index;

  if (prevSelected.value !== null) {
    const temp = prevSelected.value;
    setTimeout(() => {
      localOptions.value[temp].deselect = false;
    }, 100);

    localOptions.value[prevSelected.value].selected = false;
    localOptions.value[prevSelected.value].deselect = true;
  }

  localOptions.value[index].selected = true;

  prevSelected.value = currSelected.value;
  updateValue(button);

  const containerWidth =
    document.querySelector('.hill-btn-container')?.clientWidth || 0;

  (document.querySelector('#hill') as HTMLElement).style.left = `${
    containerWidth / 2 - 13 + index * containerWidth
  }px`;
}

function updateValue(button: HillOption) {
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
  window.addEventListener('resize', cssLoader);
});

onBeforeUnmount(() => window.removeEventListener('resize', cssLoader));

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
.hill-btn-container-foreground {
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
  color: #0000008a;
  box-sizing: border-box;
  line-height: 1.5 !important;
}

.hill-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
}

.hill-btn-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #0000008a;
}

.hill-btn-icon {
  position: relative;
}

.hill-btn-icon-active {
  color: var(--color);
  animation: hill-button-selected 0.2s ease-out forwards;
}

.hill-btn-icon-deselect {
  animation: hill-button-deselect 0.1s ease-out forwards;
}

.hill-btn-badge {
  position: absolute;
  top: -1px;
  right: -4px;
  width: 6px;
  height: 6px;
  border-radius: 100px;
  background-color: var(--badge-color);
}

.hill {
  position: absolute;
  bottom: -1rem;
  left: 2.75rem;
  background-color: var(--color);
  transition-property: all;
  transition-duration: 300ms;
  width: 1.5rem;
  height: 2rem;
  border-radius: 9999px;
}

.hill-left {
  position: absolute;
  left: -1rem;
  bottom: 50%;
  background-color: #ffffff;
  width: 1.25rem;
  height: 1.25rem;
  border-bottom-right-radius: 1.5rem;
  box-shadow: 0 10px 0 var(--color);
  background: var(--background-color);
}

.hill-right {
  position: absolute;
  right: -1rem;
  bottom: 50%;
  background-color: #ffffff;
  width: 1.25rem;
  height: 1.25rem;
  border-bottom-left-radius: 1.5rem;
  box-shadow: 0 10px 0 var(--color);
  background: var(--background-color);
}

@keyframes hill-button-selected {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(-5px) scale(1.1);
  }
}

@keyframes hill-button-deselect {
  0% {
    transform: translateY(-5px) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}
</style>
