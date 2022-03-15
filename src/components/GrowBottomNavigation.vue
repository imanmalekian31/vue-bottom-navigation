<template>
  <div class="btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="index"
      :class="{ ['btn-item']: true, ['btn-item-active']: button.selected }"
      @click="handleButtonClick(index)"
    >
      <div
        :class="{
          ['btn-container']: true,
          ['btn-container-active']: button.selected,
        }"
      >
        <div
          :class="{
            ['btn-icon']: true,
            ['btn-icon-active']: button.selected,
          }"
        >
          <i :class="`${button.icon}`" />
        </div>
        <div :class="{ ['btn-title']: true }">
          <span class="hidden-title">
            {{ button.title }}
          </span>
          <span
            :class="{
              ['animated-title']: true,
              ['animated-title-active']: button.selected,
            }"
          >
            {{ button.title }}
          </span>
          <div
            v-if="true"
            :class="{
              ['btn-bottom-line']: true,
              ['btn-bottom-line-active']: button.selected,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: "#74cbbb",
    },
  },
  data: () => ({
    prevSelected: null,
    currSelected: null,
    localOptions: [],
  }),
  created() {
    this.localOptions = this.options.slice();
  },
  computed: {
    cssVariables() {
      const activeTitle = (this.localOptions[this.currSelected] || {}).title;
      let activeWidth = 90;
      if (activeTitle && activeTitle.length * 15 > 110) {
        activeWidth = 90 + (activeTitle.length * 15 - 110) / 2;
      }

      const mainColor =
        (this.localOptions[this.currSelected] || {}).color || this.color;

      const styles = {
        "--color": mainColor,
        "--color-background": mainColor + "30",
        "--active-width": `${activeWidth}px`,
      };

      return styles;
    },
  },
  methods: {
    handleButtonClick(index) {
      this.currSelected = index;

      if (this.prevSelected !== null) {
        this.localOptions[this.prevSelected].selected = false;
      }

      this.$set(this.localOptions, index, {
        ...this.localOptions[index],
        selected: true,
      });

      this.prevSelected = this.currSelected;
    },
  },
};
</script>

<style scoped>
.btn-container-foreground {
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

.btn-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  flex-grow: 1;
  transition: all 0.3s;
}

@media (min-width: 576px) {
  .btn-item {
    cursor: pointer;
  }
}

.btn-item-active {
  background-color: var(--color-background);
  border-radius: 100px;
}

.btn-container {
  display: flex;
  position: relative;
  overflow: hidden;
  width: 24px;
  transition: all 0.3s ease;
  color: #0000008a;
}

.btn-container-active {
  width: var(--active-width);
}

.btn-container-active i {
  color: var(--color);
}

.btn-icon {
  font-size: 20px;
  transition: all 0.3s ease;
}

.btn-title {
  position: relative;
  color: var(--color);
  padding: 0px 5px;
  margin-left: 10px;
}

.hidden-title {
  visibility: hidden;
}

.animated-title {
  color: var(--color);
  position: absolute;
  left: 5px;
  bottom: -15px;
  transition: all 0.4s ease 0.1s;
}

.animated-title-active {
  bottom: 5px;
}

.btn-bottom-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: var(--color);
  transition: all 0.3s ease;
}

.btn-bottom-line-active {
  width: 100%;
}
</style>
