<template>
  <div class="gr-btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="`grow-button-${index}`"
      :class="[
        'gr-btn-container',
        { 'gr-btn-container-active': button.selected }
      ]"
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
              { 'gr-animated-title-active': button.selected }
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
      default: () => []
    },
    color: {
      type: String,
      default: '#74cbbb'
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
      const activeTitle = (this.localOptions[this.currSelected] || {}).title;
      let activeWidth = 95;
      if (activeTitle && activeTitle.length * 15 > 110) {
        activeWidth = 95 + (activeTitle.length * 15 - 110) / 2;
      }

      const mainColor =
        (this.localOptions[this.currSelected] || {}).color || this.color;

      const styles = {
        '--color': mainColor,
        '--color-background': mainColor + '30',
        '--active-width': `${activeWidth}px`
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

      this.$set(this.localOptions, index, {
        ...this.localOptions[index],
        selected: true
      });
    }
  },
  methods: {
    handleButtonClick(button, index) {
      this.currSelected = index;

      if (this.prevSelected !== null) {
        this.localOptions[this.prevSelected].selected = false;
      }

      this.$set(this.localOptions, index, {
        ...this.localOptions[index],
        selected: true
      });

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
        this.$router[!this.replaceRoute ? 'push' : 'replace'](
          button.path
        ).catch(() => {});
      }
    }
  }
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
