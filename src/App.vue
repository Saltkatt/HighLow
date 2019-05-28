<template>
  <div id="app">
      <router-view></router-view>
      <router-link to="/statistics">Statistics</router-link>

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
  margin: 0px;

}
/* Desktop */

@media screen and (min-width: 501px){
  body{
    margin: 0px;
  }

}
/* Small screen */
@media screen and (max-width:500px){
  @import url('https:fonts.googleapis.com/css?family=Passion+One&display=swap');
    body{
        font-family: 'Passion One', cursive;
        margin: 0px;
        background-image: url("./assets/bg.jpg");
        background-size: cover;
    }
    #app{
      text-align: center;
      margin: 0px;
    }
   div{
     border-radius: 12px;
   }


}

</style>
