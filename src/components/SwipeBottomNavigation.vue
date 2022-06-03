<template>
  <div class="sm-btn-container-foreground" :style="cssVariables">
    <div
      v-for="(button, index) in localOptions"
      :key="`simple-btn-${index}`"
      ref="btnContainer"
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
    <div ref="borderSwiper" class="border-swiper" />
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
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    iconColor: {
      type: String,
      default: '#8066C7'
    },
    swiperColor: {
      type: String,
      default: '#8066C7'
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
    enableWatch: true,

    btnItemWidth: 0
  }),
  computed: {
    cssVariables() {
      const styles = {
        '--swiper-color': this.swiperColor,
        '--icon-color': this.iconColor,
        '--background-color': this.backgroundColor
      };

      return styles;
    }
  },
  watch: {
    currSelected(newVal) {
      this.$refs.borderSwiper.style.transform = `translateX(${
        this.btnItemWidth * newVal
      }px)`;
    },
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
  mounted() {
    this.cssLoader();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
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
    cssLoader() {
      this.btnItemWidth = this.$refs.btnContainer[0].offsetWidth;
      this.$refs.borderSwiper.style.width = this.btnItemWidth + 'px';
      this.$refs.borderSwiper.style.transform = `translateX(${
        this.btnItemWidth * this.currSelected
      }px)`;
    },
    onResize() {
      this.cssLoader();
    },
    handleButtonClick(button, index) {
      this.currSelected = index;

      if (this.prevSelected !== null) {
        this.localOptions[this.prevSelected].selected = false;
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
