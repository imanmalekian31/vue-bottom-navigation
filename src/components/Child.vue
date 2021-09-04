<template>
  <div class="btn-child-parent">
    <div class="btn-child" v-for="(child, idx) in childs" :key="idx">
      <i :class="`${child.icon}`" />
      <span class="btn-child-title">{{ child.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    childs: {
      type: Array,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.btn-child-parent {
  position: absolute;
  bottom: -35px;
  width: 35px;
  height: 35px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-child {
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-child-title {
  font-size: 10px;
  opacity: 0;
  position: absolute;
  top: 35px;
}

input:checked + .labels .btn-child-parent {
  animation: foreground 500ms ease-in-out forwards;
}

input:checked + .labels .btn-child-title {
  animation: child-title 500ms ease-in-out forwards;
}

@keyframes child-title {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes foreground {
  0% {
    bottom: -30px;
  }

  10% {
    background: #42a5f5;
  }

  25% {
    bottom: 20px;
    width: 35px;
    height: 35px;
    background: #42a5f5;
  }

  40% {
    bottom: 20px;
    width: 35px;
    height: 40px;
    background: #42a5f5;
  }

  100% {
    bottom: 20px;
    width: 100%;
    height: 40px;
    background: #42a5f5;
  }
}
</style>
