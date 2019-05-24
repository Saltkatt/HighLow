<template>
  <div id="app">

<<<<<<< HEAD

    <!-- <Player></Player> -->
    <!-- <PlayerInteract></PlayerInteract> -->
=======
    <!-- <Main></Main> -->

>>>>>>> tonny
    <div class="wrapper">
      <Main></Main>
    </div>
  </div>
</template>

<script>

import Main from './components/Main.vue'
<<<<<<< HEAD
// import Bot from './components/Bot.vue'
// import Player from './components/Player.vue'
import PlayerInteract from './components/PlayerInteract.vue'
=======
>>>>>>> tonny


export default {
  name: 'app',
  components: {
<<<<<<< HEAD
    // Player,
    Main,
    // Bot,
    // PlayerInteract
=======
    Main
>>>>>>> tonny

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
/* Desktop */
@media screen and (min-width: 401px){
  .wrapper{
    max-width: 100%;
    margin: auto;
    overflow: auto;
    padding: 5px;
  }
}
/* Small screen */
@media screen and (max-width:400px){
    body{
        background-color: navy;
        color: antiquewhite;
    }
    .wrapper{
      overflow: auto;
    }

}

</style>
