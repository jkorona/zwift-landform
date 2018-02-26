<template>
  <div id="app">
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
