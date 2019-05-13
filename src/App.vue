<template>
  <div id="app">
    <!-- <Main></Main> -->
    <Moderator></Moderator>

  </div>
</template>

<script>

import Main from './components/Main.vue'
import Moderator from './components/Moderator'
import Bot from './components/Bot.vue'
import Player from './components/Player.vue'


export default {
  name: 'app',
  components: {
    Moderator,
    Player,
    Main,
    Bot

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
