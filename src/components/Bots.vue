<template>
  <div>

<div>Hur många bultar finns det i Ölandsbron?</div>


    <div class="grid-container" v-for="(person, index) in persons" v-bind:key="index" v-bind:class="{myTurn: person.isMyTurn}">
      <div class="grid1">
        <img v-bind:src="person.image">
      </div>
      <div class="grid2">{{ person.name }}</div>
      <div class="grid3">
        <div class="bubble">This is very difficult. My guess is... {{ person.guess }}</div>
      </div>
    </div>
    <button @click="changePlayer">Change player</button>



  </div>
</template>

<script>
import kalleAsset from "../assets/kalle.jpg";
import kajsaAsset from "../assets/kajsa.jpg";
import martinAsset from "../assets/martin.jpg";

export default {
  data() {
    return {
      persons: [
        { name: "Kalle", image: kalleAsset, guess: 15, isMyTurn: false },
        { name: "Anna", image: kajsaAsset, guess: 34000, isMyTurn: false  },
        { name: "Martin", image: martinAsset, guess: 654, isMyTurn: false  }
      ],
      turn: -1,
    };
  },

  methods: {
    changePlayer: function(){
      this.turn++;
      if(this.turn == 3){
        this.turn = 0;
      }
      for(let i = 0; i < this.persons.length; i++){
        this.persons[i].isMyTurn = false
      }
      this.persons[this.turn].isMyTurn = true;
      
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

.myTurn{
  opacity: 1;
  border: 4px solid gold;
  margin: 0px;
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
  margin: 5px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 12px;
  background: lightpink;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
</style>
