<template>
  <div class="btn-containrt_foreground" :style="cssVariables">
    <div class="btn-containrt">
      <template v-for="(button, index) in options">
        <input
          class="btn-item"
          type="radio"
          name="bottom-navigation"
          :value="button.id"
          :id="`btn-${index}`"
          :key="index"
          :checked="button.id === value"
          @input="updateValue"
        />

        <label
          :key="`label-${index}`"
          :class="`btn-item-${index} labels`"
          plain
          :for="`btn-${index}`"
        >
          <div class="active-label">
            <div class="btn-badge" v-if="button.badge">
              {{ button.badge }}
            </div>
            <i :class="`${button.icon}`" />
          </div>
          <div class="btn-title">{{ button.title }}</div>
        </label>
      </template>

      <div id="sweep" v-show="value">
        <div id="sweep-right"></div>
        <div id="sweep-center"></div>
        <div id="sweep-left"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "update",
  },
  props: {
    value: {
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: "#42A5F5",
    },
    badgeColor: {
      type: String,
      default: "#FBC02D",
    },
  },
  mounted() {
    this.cssLoader();
    window.addEventListener("resize", this.onResize);
  },
  computed: {
    cssVariables() {
      const styles = {
        "--color": this.color,
        "--color-badge": this.badgeColor,
      };

      return styles;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    cssLoader() {
      let customStyle = "";
      const containerWidth =
        document.querySelector(".btn-containrt").offsetWidth ||
        window.innerWidth;
      const sweepWidth = document.getElementById("sweep").offsetWidth;

      this.options.forEach((item, index) => {
        customStyle += `
        .btn-item-${index} {
          padding: 10px;
          transition: transform 100ms ease;
          width : ${containerWidth / this.options.length}px !important;
          display: flex;
          justify-content :center;
          align-items : center;
          position: relative;
          z-index: 10;
        }

        #btn-${index}:checked ~ #sweep {
          transform: translateX(${(index * containerWidth) /
            this.options.length +
            containerWidth / this.options.length / 4}px);
          transition: transform 500ms ease;
        }
        `;
      });

      document.getElementById("sweep").style.left = `
      ${containerWidth / this.options.length / 4 - sweepWidth / 2}px`;

      var head = document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      style.id = "bottom-navigation-style";

      if (style.styleSheet) {
        style.styleSheet.cssText = customStyle;
      } else {
        style.appendChild(document.createTextNode(customStyle));
      }

      head.appendChild(style);
    },
    updateValue(value) {
      this.$emit("update", value.target.value);
    },
    onResize() {
      setTimeout(() => {
        const styleElement = document.getElementById("buttom-navigation-style");
        styleElement && styleElement.remove();
      }, 0);

      this.cssLoader();
    },
  },
};
</script>

<style scoped>
input {
  display: none;
}

.btn-containrt_foreground {
  overflow: hidden;
  position: fixed;
  direction: ltr;
  display: flex;
  align-items: flex-end;
  bottom: 0;
  width: 100%;
  z-index: 2147483647;
  height: 60px;
  background: var(--color);
}

.btn-containrt {
  overflow: hidden;
  direction: ltr;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  width: 100%;
  height: 55px;
}

.active-label {
  width: 35px;
  height: 35px;
  border-radius: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease;
  position: absolute;
  top: 10px;
  background: white;
  color: rgba(0, 0, 0, 0.54);
}

.btn-title {
  position: absolute;
}

.btn-badge {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 25px;
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
  background: var(--color-badge);
}

input:checked + .labels .active-label {
  transform: translateY(-10px);
}

input:checked + .labels .btn-title {
  animation: fadein 200ms;
  position: absolute;
  top: 38px;
  font-size: 12px;
}

input:not(:checked) + .labels .active-label {
  background: transparent;
}

input:not(:checked) + .labels .btn-title {
  visibility: hidden;
}

#sweep {
  height: 100%;
  width: 135px;
  display: flex;
  position: absolute;
  left: 0;
  top: 5px;
}

#sweep-center {
  height: 38px;
  display: flex;
  flex: 1;
  background: var(--color);
  border-radius: 0 0 45% 45%;
}

#sweep-left {
  height: 33px;
  width: 45px;
  overflow: hidden;
  position: relative;
  right: 2px;
}

#sweep-left:before {
  content: "";
  display: block;
  width: 220%;
  height: 200%;
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  box-shadow: -40px -40px 0 0 var(--color);
}

#sweep-right {
  height: 33px;
  width: 45px;
  overflow: hidden;
  position: relative;
  left: 2px;
}

#sweep-right:before {
  content: "";
  display: block;
  width: 220%;
  height: 200%;
  position: absolute;
  border-radius: 50%;
  top: 0;
  right: 0;
  box-shadow: 40px -40px 0 0 var(--color);
}

@media screen and (min-width: 576px) {
  .labels {
    cursor: pointer;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
