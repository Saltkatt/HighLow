<template>
  <div>
    <div class="grid-container">
      <div class="grid-item question-box">
        <p>Q: {{question}}</p>
        <!-- <button class="btn" @click="onBtnClick">New Q {{count}}</button> -->
      </div>
      <div class="grid-item item1" v-show="getLastGuess != null">
        <!-- <div class="talkContainer">{{hiLow(this.getGuess)}}</div> -->
        <div v-if="getLastGuess < getCorrectAnswer">The guess is TOO LOW</div>
        <div v-if="getLastGuess > getCorrectAnswer">The guess is TOO HIGH</div>
        <div v-if="getLastGuess == getCorrectAnswer">The guess is CORRECT {{open()}}</div>
      </div>
      <div class="grid-item modImage">
        <img v-bind:src="image">
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import moderatorImage from '../assets/logo.png';
import { mapGetters } from 'vuex';
=======
import moderatorImage from "../assets/Moderator.jpg";
import { mapGetters } from "vuex";
>>>>>>> master
export default {
  name: "Moderator",
  data() {
    return {
      image: moderatorImage,
      rules: [
        {
          rule1:
            "All questions have numerical answers and I expect you answer using digits."
        },
        {
          rule2: "Everyone will have one opportunity to answer once per round."
        },
        {
          rule3: "The game will continue until someone has answered correctly."
        }
      ],
      phrases: [
        {
          phrase1: "This was a difficult one"
        },
        {
          phrase2: "Hurry up slowpoke!!"
        }
      ],
      count: 0
    };
  },

  methods: {
    //This function calls for "openWinnerBox" in Store
    open: function() {
        this.$store.commit('openWinnerBox');
    },

<<<<<<< HEAD
            return msg
        },
        PlayGame(){
	        while(gameState){ // Gamestate måste deklareras
                //logic(activePlayers[0]) //Anropar Compenent bots method logic(id), argument id för spelare/bot så Component vet vilken logik som skall returneras
                const guess=5; // Endast test, värdet skall hämtas från metod ovan, skall raderas när logic() är på plats
                this.hiLow(guess) //// -HighLow/ ge respons
                //- Skicka tidåtkomst till Store, skall detta skickas via hilow()?
	            //-gamestate=false (Endast när gissning är rätt och spel skall avslutas) Skall detta ske via hilow()?
	            this.nextRound()//- Change next player too activePLayer[0].
	
	}
// anropar sida för avslutat spel, presentation av vem som vunnit
    },
    nextRound(){
        // Sortera array activePLayer[]
        const hold=activePLayer[activePLayer.length-1] // sparar ner värdet av activePLayers högsta index
        // activePLayer[activePLayer.length-1]=activePLayer[0];//Placerar första index till sista
        
        const i; // Deklarerar variabel till for-loop 

        for (i=0;i<activePLayer.length-1;i++){
            activePLayer[i]=activePLayer[i+1];
        }

        activePLayer[activePLayer.length-2]=hold; // Lägg in spelare med högst index på nästhögsta index

    },
        
=======
    //talk() conveys information such hiLow() respons, rules, and phrases
    //which allows moderator to interact with player.
    talk: function(msg) {
      return msg;
    },
>>>>>>> master

    onBtnClick() {
      this.count++;
      this.questions();
      this.answers();
    },
    //Retrieves questions from the questionBank array
    // questions(){
    //     var q = this.getQuestionBank;

    //     for(var i = 0; i < q.length; i++){

    //         if(this.count == q.length) {
    //         this.count = 0;
    //         }
    //         console.log(q[i + this.count].question )
    //         return q[i + this.count].question

    //     }


    //Retrieves answer from answer()
    //Receives guess from XXX and checks correct, too high or too low. Sends response.
    hiLow: function(guess) {
      var respons = null;
      var answer = this.answers();
      if (guess == answer) {
        respons = "Correct!";
        //Open modal box
        this.open();
      } else if (guess < answer) {
        respons = "Too low!";
        this.$store.commit("setLowestNumber", guess);
      } else if (guess > answer) {
        respons = "Too high";
        this.$store.commit("setHighestNumber", guess);
      }

      return this.talk(respons);

<<<<<<< HEAD
        //Retrieves answer from answer()
        //Receives guess from XXX and checks correct, too high or too low. Sends response.
        hiLow: function(guess){
            var respons = null;
            var answer = this.answers();
            if(guess == answer){
                respons = "Correct!";
            }
            else if(guess < answer) {
                respons = "Too low!";
                this.$store.commit('setLowestNumber', guess)
            }
            else if (guess > answer) {
                respons = "Too high";
                this.$store.commit('setHighestNumber', guess)
            } 
        
            return this.talk(respons)
        },
=======
    }
  },
  computed: {
    // ...mapGetters(['getQuestionBank', 'getGuess']),
>>>>>>> master

    question() {
      return this.$store.state.questionBank[0].question;
    },
<<<<<<< HEAD
    computed: mapGetters(['getQuestionBank', 'getGuess'])
    
}
=======
    getLastGuess() {
      return this.$store.state.guessNumber;
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
>>>>>>> master
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-gap: 5px;
  background-color: blueviolet;
  padding: 5px;
}
.grid-item {
  background-color: lavender;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  padding: 5px;
  font-size: 25px;
}
.item1 {
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  background-color: lavender;
  padding-top: 2%;
}
.modImage {
  grid-column: 3;
  grid-row: 2 / span 2;
  
}
.question-box {
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: left;
}
.modContainer {
  background-color: aquamarine;
}
img {
  float: center;
  width: 40%;
  height: 40% ;
}
</style>
