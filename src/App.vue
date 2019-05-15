<template>
  <div id="app">

    <!-- <Main></Main> -->
    <!-- <Player></Player> -->
    
    <div class="wrapper">
      <Main></Main>
    </div>
  </div>
</template>

<script>

import Main from './components/Main.vue'



export default {
  name: 'app',
  components: {
    Main

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

}

</style>
