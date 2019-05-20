<template>
  <div class="playerArea">
    <div 
    class="player" 
    v-for="(player, index) in players" 
    v-bind:key="index" 
    v-bind:class="{myTurn: player.isMyTurn}">
      {{player.name}}s answer is ...
      <div v-show="player.isHuman && player.isMyTurn">
          <input type="number" v-model.number.lazy="player.guess">
            <input type="submit" @click="makeGuess(player)" :disabled="!player.isMyTurn">
      </div>
      <div v-show="!player.isHuman">
          {{player.guess}}
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
 
  methods: {
    makeGuess(player) {
      this.$store.commit("updateLastGuess", player.guess);
      this.$store.commit("submitGuessToStore", player);
      this.$store.commit("switchTurn", player)
    },
    
  },

  computed: {
    players() {
      return this.$store.state.activePlayers;
    },
  }
};
</script>

<style scoped>
div {
  font-size: 18px;
}

.playerArea{
  margin: 10px;
  border: 1px solid black;
  background: lightskyblue;
  
}

.player{
  border: 1px solid black;
  background: greenyellow;
  padding: 10px;
  opacity: 0.2;
  margin: 5px;
}
.myTurn{
  border: 1px solid black;
  background: greenyellow;
  padding: 10px;
  opacity: 1;
  margin: 5px;
}
</style>
