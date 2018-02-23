<template>
  <div id="app">
    <transition
      name="slide-fade"
      mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import "./styles/main";

body,
html {
  background: linear-gradient(80deg, $ORANGE, $LIGHT_ORANGE 60%);
}

#app {
  font-family: "system-ui", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(100vw);
    opacity: 0;
  }
}
</style>
