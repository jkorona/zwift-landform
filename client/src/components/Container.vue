<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 80vw;
  height: 80vh;

  background-color: #f9672b;

  margin: 0 auto;
  border: white groove 3px;
  border-radius: 10px;

  padding: 10px;
  margin-top: 10vw;

  overflow: scroll;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
</style>
