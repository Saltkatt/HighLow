<template>
  <div class="moderator">
    <div class="questionArea">{{question}}</div>

    <!-- <div class="lastGuess" v-show="getLastGuess != null">Last guess: {{getLastGuess}}</div> -->

    <div class="moderatorGrid">
      <div
        class="speechBubble"
        
        v-show="moderatorAnswer != null"
      ><p>{{moderatorAnswer}}</p></div>
      <img class="modImage" src="../assets/moderator.png">

    </div>
  </div>
</template>

<script>
export default {
  
  computed: {
    question() {
      return this.$store.state.question.question;
    },

    getLastGuess() {
      return this.$store.state.guessNumber;
    },

    moderatorAnswer() {
      return this.$store.state.moderatorAnswer;
    },

    players() {
      return this.$store.state.activePlayers;
    },

    getHighestGuess() {
      return this.$store.state.highestNumber;
    },

    getLowestGuess() {
      return this.$store.state.lowestNumber;
    },

    getCorrectAnswer() {
      return this.$store.state.questionBank[0].answer;
    }
  }
};
</script>

<style scoped>

.questionArea {
  color: black;
  border-radius: 15px;
  background-image: url("../assets/divbg.jpg");
  background-size: cover;
  background-repeat: repeat;
  padding: 10px;
  margin: 5px;
  font-family: 'Passion One', cursive;
  font-size: 3vw;
}
.lastGuess {
  background-image: url("../assets/divbg.jpg");
  background-size: cover;
  background-repeat: repeat;
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
}

.modImage {
  display: flex;
  align-self: center;
  grid-area: right;
  content: url("../assets/moderator.png");
  display: inline-block;
  width: 60%;
  border-radius: 14px;
  }

  .moderator {
  background: none;
  margin: 10px;
}

.moderatorGrid {
  margin: 3vw; 
  display: grid;
  grid-template-areas: "left middle right";
  grid-template-columns: 60% 10% 30%;
}

.speechBubble {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  grid-area: left;
  width: 100%;
  height: 50%;
  font-size:5vw;
  border-radius: 15px;
  background: whitesmoke;
  color: #000;
  padding: 5px;
  text-align: center;
  margin: 5px;
  position: relative;
  transition-property: height;
  transition-duration: 5s;
  transition-delay: 2s;
  font-family: 'Passion One', cursive;

}
.speechBubble:after {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 5vw solid whitesmoke;
  border-right: 5vw solid transparent;
  border-top: 15px solid whitesmoke;
  border-bottom: 15px solid transparent;
  right: -5vw;
  top: 30%;
}



/* DeskTop */
@media screen and (min-width: 501px){


}

/* Small screen */
@media screen and (max-width:500px){
div {
  font-size: 18px;
}

.lastGuess {
  background-image: url("../assets/divbg.jpg");
  background-size: cover;
  background-repeat: repeat;
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
}

.questionArea {
  color: black;
  border-radius: 15px;
  background-image: url("../assets/divbg.jpg");
  background-size: cover;
  background-repeat: repeat;
  padding: 10px;
  margin: 5px;
  font-family: 'Passion One', cursive;
  font-size: 5vw;
}

.moderator {
  background: none;
  margin: 10px;
}

.moderatorGrid {
  margin: 0vw;
  display: grid;
  grid-template-areas: "left middle right";
  grid-template-columns: 60% 10% 30%;
}

.speechBubble {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  grid-area: left;
  width: 100%;
  height: 50%;
  font-size:5vw;
  border-radius: 15px;
  background: whitesmoke;
  color: #000;
  padding: 5px;
  text-align: center;
  margin: 5px;
  position: relative;
  transition-property: height;
  transition-duration: 5s;
  transition-delay: 2s;
  font-family: 'Passion One', cursive;

}
.speechBubble:after {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 5vw solid whitesmoke;
  border-right: 5vw solid transparent;
  border-top: 15px solid whitesmoke;
  border-bottom: 15px solid transparent;
  right: -5vw;
  top: 30%;
}

.modImage {
  display: flex;
  align-self: center;
  grid-area: right;
  content: url("../assets/moderator.png");
  display: inline-block;
  width: 100%;
  border-radius: 14px;
  }
 }
  

</style>
