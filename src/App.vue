<template>
  <div id="app">
      <router-view></router-view>

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

/* Desktop */

@media screen and (min-width: 501px){
  @import url('https:fonts.googleapis.com/css?family=Passion+One&display=swap');
    body{
        font-family: 'Passion One', cursive;
        margin: 0px;
        background-image: url("./assets/bg.jpg");
        background-size: cover;
        color: white;
    }
    #app{
      text-align: center;
      margin: 0px;
    }
    div{
     border-radius: 12px;
     
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
        color: white;
    }
    #app{
      text-align: center;
      margin: 0px;
    }
    /* div{
     border-radius: 12px;
    } */


}

</style>
