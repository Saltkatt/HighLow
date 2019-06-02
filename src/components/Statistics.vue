<template>
    <!-- The scoreboard containing players and guesses -->
    <div class="container">
        <ol class="list-scores">
          <li  v-for="players in sortedScoreBoard">
            [{{ players.name }}]  {{ players.guesses }} guesses
          </li>
        </ol>
        <div>
          <router-link to="/">
            <button class="back-button" type="button">Back</button>
          </router-link>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
      //Function which gets the scoreBoard from store, then sorts it.
      sortedScoreBoard: function() {
        var list = this.$store.state.scoreBoard;

        list.sort(function(a, b) {
          return a.guesses - b.guesses;
        });
        return list;
      },
    },
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
  
  border-radius: 15px;
}
</style>
