<template>
  <div class="btn-child-parent">
    <div
      class="btn-child"
      v-for="(child, idx) in childs"
      :key="idx"
      @click.stop="$emit('update', child.id)"
    >
      <i :class="`${child.icon}`" />
      <span class="btn-child-title">{{ child.title }}</span>
      <div class="btn-child-badge" v-if="child.badge">
        {{ child.badge }}
      </div>
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
.btn-child-badge {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -4px;
  left: 20px;
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
  background: var(--color-badge);
  opacity: 0;
}

.btn-child-parent {
  position: absolute;
  bottom: -35px;
  width: 35px;
  height: 35px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-foreground);
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
  color: rgba(0, 0, 0, 0.54);
}

.btn-child-title {
  font-size: 10px;
  opacity: 0;
  position: absolute;
  top: 35px;
}

.unchecked .btn-child-parent {
  background: transparent;
}

.checked .btn-class-showable .btn-child-parent {
  animation: chil-background 500ms ease-in-out forwards;
}

.checked .btn-class-showable .btn-child-title {
  animation: child-title 500ms ease-in-out forwards;
}

.checked .btn-class-showable .btn-child-badge {
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

@keyframes chil-background {
  0% {
    bottom: -30px;
    background: transparent;
  }

  25% {
    bottom: 20px;
    width: 35px;
    height: 35px;
  }

  40% {
    bottom: 20px;
    width: 35px;
    height: 40px;
  }

  100% {
    bottom: 20px;
    width: 100%;
    height: 40px;
  }
}
</style>
