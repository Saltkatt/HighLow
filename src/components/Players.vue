<template>
  <div>
    <div
      class="grid-container"
      v-for="(player, index) in players"
      v-bind:key="index"
      v-bind:class="{myTurn: player.isMyTurn}"
    >
      <div class="grid1">
        <img v-bind:src="player.image">
      </div>
      <div class="grid2">{{ player.name }}</div>
      <div class="grid3">
        <div
          class="bubble"
          v-show="player.isMyTurn"
        >This is very difficult. My guess is... {{ Math.floor((highest-lowest)/2) }}</div>
      </div>
    </div>
    <button @click="changePlayer">Change player</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      turn: 0
    };
  },

  methods: {
    // takes players id to do correct logic.
    logic(id) {
      switch (id) {
        case 0:
          //returns player logic
          break;

          case 1:
          //returns bot logic
          break;

          case 2:
          //returns another bot logic
          break;
      
        default:
          break;
      }
    },
    changePlayer: function() {
      if (this.turn == this.players.length) {
        this.turn = 0;
      }

      this.$store.commit("changePlayerTurn", this.turn);
      this.turn++;
      if (this.turn == 3) {
        this.turn = 0;
      }
      this.$store.commit("changePlayerTurn", this.turn);
    }
  },

  computed: {
    players() {
      return this.$store.state.activePlayers;
    },

    lowest() {
      return this.$store.state.lowestNumber;
    },

    highest() {
      return this.$store.state.highestNumber;
    }
  }
};
</script>

<style scoped>
.grid-container {
  opacity: 0.2;
  height: 60px;
  margin: 5px;
  border: 1px solid black;
  border-radius: 12px;
  padding: 8px;
  background: lightcyan;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "grid1 grid1 grid3 grid3 grid3 grid3" "grid1 grid1 grid3 grid3 grid3 grid3" "grid2 grid2 grid3 grid3 grid3 grid3";
}

.myTurn {
  opacity: 1;
  border: 2px solid gold;
}

.grid1 {
  grid-area: grid1;
  background: lightcyan;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
}

.grid2 {
  grid-area: grid2;
  background: lightcyan;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}

.grid3 {
  grid-area: grid3;
  background: lightcyan;

  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-width: 100%;
  height: auto;
  max-height: 100%;
  border: 2px solid black;
  border-radius: 6px;
}

.bubble {
  padding: 10px;
  border: 1px solid black;
  border-radius: 12px;
  background: lightpink;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

button {
  margin-top: 5px;
}
</style>
