<template>
  <div class="container">
    <header>
      <h1 class="title">{{ title }}</h1>
    </header>
    <main class="content">
      <slot/>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' }
  }
};
</script>


<style lang="scss" scoped>
@import '../styles/main';

.title {
  height: 5vh;
  padding-left: 25px;
  font-size: 52px;
}

.content {
  width: 80vw;
  height: 80vh;

  background-color: $ORANGE;

  margin: 0 auto;
  border: white groove 3px;
  border-radius: 10px;

  padding: 10px;

  overflow: scroll;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
