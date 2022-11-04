<template>
  <div class="rg-btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="`ring-btn-${index}`"
      class="rg-btn-container"
      @click="handleButtonClick(button, index)"
    >
      <div class="rg-btn-item">
        <div
          :class="[
            { 'rg-btn-border': button.selected },
            { 'rg-btn-border-deselect': button.deselect },
          ]"
        />
        <div
          :class="[
            'rg-btn-icon',
            { 'rg-btn-icon-active': button.selected },
            { 'rg-btn-icon-deselect': button.deselect },
          ]"
        >
          <slot name="icon" :props="button">
            <i :class="`${button.icon}`" />
          </slot>

          <div v-if="button.badge > 0" class="rg-btn-badge" />
        </div>

        <div
          :class="['rg-btn-title', { 'rg-btn-title-active': button.selected }]"
        >
          <slot name="title" :props="button">
            {{ button.title }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  modelValue: {
    default: null
  },
  options: {
    type: Array,
    required: true
  },
  iconColor: {
    type: String,
    default: '#669C35'
  },
  titleColor: {
    type: String,
    default: '#669C35'
  },
  borderColor: {
    type: String,
    default: '#4F7A28'
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
  badgeColor: {
    type: String,
    default: '#FBC02D'
  },
  replaceRoute: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const route = useRoute()

const prevSelected = ref(null)
const currSelected = ref(null)
const localOptions = ref([])
const enableWatch = ref(true)

const cssVariables = computed(() => ({
  '--border-color': props.borderColor,
  '--icon-color': props.iconColor,
  '--background-color': props.backgroundColor,
  '--title-color': props.titleColor,
  '--badge-color': props.badgeColor
}))

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal != oldVal && enableWatch.value) {
      const target = localOptions.value.findIndex(
        (option) => option.id == newVal
      )

      if (target > -1) {
        handleButtonClick(localOptions.value[target], target)
      }
    }
  }
)

function handleButtonClick (button, index) {
  if (index === currSelected.value) {
    return
  }

  currSelected.value = index

  if (prevSelected.value !== null) {
    const temp = prevSelected.value
    setTimeout(() => {
      localOptions.value[temp].deselect = false
    }, 100)

    localOptions.value[prevSelected.value].selected = false
    localOptions.value[prevSelected.value].deselect = true
  }

  localOptions.value[index].selected = true

  prevSelected.value = currSelected.value
  updateValue(button)
}

function updateValue (button) {
  emit('update:modelValue', button.id)

  enableWatch.value = false
  setTimeout(() => {
    enableWatch.value = true
  }, 0)

  if (button.path && Object.keys(button.path).length) {
    if (props.replaceRoute) {
      router.replace(button.path).catch(() => {})
    } else {
      router.push(button.path)
    }
  }
}

localOptions.value = props.options.slice()
const index = localOptions.value.findIndex(
  (item) =>
    item.id == props.modelValue ||
        (item.path || {}).name == (route || {}).name
)

if (index > -1) {
  currSelected.value = index
  prevSelected.value = index

  localOptions.value[index].selected = true
}
</script>

<style scoped>
.rg-btn-container-foreground {
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

.rg-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
  padding-bottom: 10px;
}

@media (min-width: 576px) {
  .rg-btn-container {
    cursor: pointer;
  }
}

.rg-btn-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

.rg-btn-icon {
  position: relative;
}

.rg-btn-icon-active {
  color: var(--icon-color);
  animation: ring-button-selected 0.2s ease-out forwards;
}

.rg-btn-icon-deselect {
  animation: ring-button-deselect 0.1s ease-out forwards;
}

.rg-btn-border {
  position: absolute;
  top: 0;
  height: 2px;
  background-color: var(--border-color);
  animation: ring-border-top 0.2s ease-in-out forwards;
}

.rg-btn-border-deselect {
  position: absolute;
  top: 0;
  height: 2px;
  background-color: var(--border-color);
  animation: ring-border-top-deselect 0.1s ease-in-out forwards;
}

.rg-btn-badge {
  position: absolute;
  top: -1px;
  right: -4px;
  width: 6px;
  height: 6px;
  border-radius: 100px;
  background-color: var(--badge-color);
}

.rg-btn-title {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

.rg-btn-title-active {
  color: var(--title-color);
}

@keyframes ring-border-top {
  0% {
    width: 5px;
  }
  100% {
    width: 90%;
  }
}

@keyframes ring-border-top-deselect {
  0% {
    width: 90%;
  }
  100% {
    width: 0px;
  }
}

@keyframes ring-button-selected {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1.3);
  }
}

@keyframes ring-button-deselect {
  0% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
