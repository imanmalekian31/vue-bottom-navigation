<template>
  <div class="wn-btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="`windows-btn-${index}`"
      class="wn-btn-container"
      @click="handleButtonClick(button, index)"
    >
      <div class="wn-btn-item">
        <div
          :class="[
            'wn-btn-icon',
            { 'wn-btn-icon-active': button.selected },
            { 'wn-btn-icon-deselect': button.deselect }
          ]"
          :style="`color:${button.color}`"
        >
          <slot name="icon" :props="button">
            <i :class="`${button.icon}`" />
          </slot>

          <div v-if="button.badge > 0" class="wn-btn-badge">
            {{ button.badge }}
          </div>
        </div>

        <div
          :class="[
            'wn-btn-border',
            { 'wn-btn-border-selected': button.selected },
            { 'wn-btn-border-deselect': button.deselect }
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    borderColor: {
      type: String,
      default: '#9B9B9B'
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    badgeColor: {
      type: String,
      default: '#828282'
    },
    replaceRoute: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    prevSelected: null,
    currSelected: null,
    localOptions: [],
    enableWatch: true
  }),
  computed: {
    cssVariables() {
      const styles = {
        '--border-color': this.borderColor,
        '--background-color': this.backgroundColor,
        '--badge-color': this.badgeColor
      };

      return styles;
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal != oldVal && this.enableWatch) {
          const target = this.localOptions.findIndex(
            (option) => option.id == newVal
          );

          if (target > -1) {
            this.handleButtonClick(this.localOptions[target], target);
          }
        }
      }
    }
  },
  created() {
    this.localOptions = this.options.slice();

    const index = this.localOptions.findIndex(
      (item) =>
        item.id == this.value ||
        (item.path || {}).name == (this.$route || {}).name
    );

    if (index > -1) {
      this.currSelected = index;
      this.prevSelected = index;

      if ('$set' in this) {
        this.$set(this.localOptions, index, {
          ...this.localOptions[index],
          selected: true
        });
      } else {
        this.localOptions[index].selected = true;
      }
    }
  },
  methods: {
    handleButtonClick(button, index) {
      if (index === this.currSelected) {
        return;
      }

      this.currSelected = index;

      if (this.prevSelected !== null) {
        const temp = this.prevSelected;
        setTimeout(() => {
          this.localOptions[temp].deselect = false;
        }, 300);

        this.localOptions[this.prevSelected].selected = false;
        this.localOptions[this.prevSelected].deselect = true;
      }

      if ('$set' in this) {
        this.$set(this.localOptions, index, {
          ...this.localOptions[index],
          selected: true
        });
      } else {
        this.localOptions[index].selected = true;
      }

      this.prevSelected = this.currSelected;
      this.updateValue(button);
    },
    updateValue(button) {
      this.$emit('update', button.id);

      this.enableWatch = false;
      setTimeout(() => {
        this.enableWatch = true;
      }, 0);

      if (button.path && Object.keys(button.path).length) {
        if (this.replaceRoute) {
          this.$router.replace(button.path).catch(() => {});
        } else {
          this.$router.push(button.path);
        }
      }
    }
  }
};
</script>

<style scoped>
.wn-btn-container-foreground {
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

.wn-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
}

@media (min-width: 576px) {
  .wn-btn-container {
    cursor: pointer;
  }
}

.wn-btn-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.wn-btn-icon {
  position: relative;
  font-size: 22px;
}

.wn-btn-icon-active {
  animation: windows-button-selected 0.7s ease-out forwards;
}

.wn-btn-icon-deselect {
  animation: windows-button-deselect 0.2s ease-in forwards;
}

.wn-btn-border {
  position: absolute;
  bottom: 11px;
  height: 4px;
  border-radius: 5px;
  background-color: var(--border-color);
}

.wn-btn-border-selected {
  animation: windows-border-bottom 0.2s ease-in-out 0.1s forwards;
}

.wn-btn-border-deselect {
  animation: windows-border-bottom-deselect 0.1s ease-in-out forwards;
}

.wn-btn-badge {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 2px;
  right: -3px;
  width: 12px;
  height: 12px;
  border-radius: 100px;
  font-size: 10px;
  color: #ffffff;
  background-color: var(--badge-color);
}

@keyframes windows-border-bottom {
  0% {
    width: 0px;
  }
  100% {
    width: 14px;
  }
}

@keyframes windows-border-bottom-deselect {
  0% {
    width: 14px;
  }
  100% {
    width: 0px;
  }
}

@keyframes windows-button-selected {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.6);
  }
  40% {
    transform: scale(1) translateY(-4px);
  }
  60% {
    transform: scale(1.2);
  }
  80% {
    transform: scale(1.2) translateY(2px);
  }
  100% {
    transform: scale(1.2) translateY(0px);
  }
}

@keyframes windows-button-deselect {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
