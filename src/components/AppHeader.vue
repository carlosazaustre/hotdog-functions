<template>
  <header :class="{ green: isHotdog }">
    <span v-if="isHotdog">Hotdog!</span>
    <span v-else>Not Hotdog!</span>
    <span class="icon" :class="{ iconGreen: isHotdog }">🌭</span>
  </header>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    isHotdog: Boolean
  }
}
</script>

<style scoped>
  header {
    background-color: red;
    color: yellow;
    font-size: 1.25em;
    height: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid white;
    padding-top: 1em;
    margin: 0;
    text-shadow: 0px 0px 3px #222;
  }

  .green {
    background-color: green;
    color: yellow;
  }

  .icon {
    background-color: red;
    border-radius: 50%;
    position: relative;
    top: 0em;
    text-align: center;
    width: 2em;
    height: 2em;
    padding: 1rem;
    font-size: 1.5em;
  }

  .iconGreen {
    background-color: green;
  }
</style>

