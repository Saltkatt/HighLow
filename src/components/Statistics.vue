<template>
    <!-- The scoreboard containing players and guesses -->
    <div class="container">
        <div class="one">
          <h2>1.</h2>
        </div>
        <div class="two">
          <h2>2.</h2>
        </div>
        <div class="three">
          <h2>3.</h2>
        </div>
        <div class="four">
          <h2>4.</h2>
        </div>
        <div class="five">
          <h2>5.</h2>
        </div>
        <div class="six">
          <h2>6.</h2>
        </div>
        <div class="seven">
          <h2>7.</h2>
        </div>
        <div class="eight">
          <h2>8.</h2>
        </div>
        <div class="nine">
          <h2>9.</h2>
        </div>
        <div class="ten">
          <h2>10.</h2>
        </div>
        <div>
          <router-link to="/game">
            <button class="back-button" type="button">Back</button>
          </router-link>
        </div>
    </div>
</template>

<script>
export default {
    computed: {

    },
    methods: {

    }
}
</script>

<style lang="css" scoped>
.back-button{
  font-family: 'Passion One', cursive;
  font-size: 2vw;
  width: 6%;
  height: 5.5vh;
  background-image: url("../assets/divbg.jpg");
  background-size: cover;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
