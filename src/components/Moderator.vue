<template>
  <div>
    <div class="grid-container">
      <div class="grid-item question-box">
        <p>Q: {{question}}</p>
        <!-- <button class="btn" @click="onBtnClick">New Q {{count}}</button> -->
      </div>
      <div class="grid-item item1" v-show="getLastGuess != null">
        <!-- <div class="talkContainer">{{hiLow(this.getGuess)}}</div> -->
        <div v-show="getLastGuess < getCorrectAnswer">The guess is TOO LOW</div>
        <div v-show="getLastGuess > getCorrectAnswer">The guess is TOO HIGH</div>
        <div v-show="getLastGuess == getCorrectAnswer"></div>
      </div>
      <div class="grid-item modImage">
        <img v-bind:src="image">
      </div>
    </div>
  </div>
</template>

<script>
import moderatorImage from "../assets/Moderator.jpg";
import { mapGetters } from "vuex";
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
    //talk() conveys information such hiLow() respons, rules, and phrases
    //which allows moderator to interact with player.
    talk: function(msg) {
      return msg;
    },

    onBtnClick() {
      this.count++;
      this.questions();
      this.answers();
    },
    
    //Retrieves answer from Store
    //Receives guess from  and checks correct, too high or too low. Sends response.
    hiLow: function(guess) {
      var respons = null;
      var answer = this.answers();
      if (guess == answer) {
        respons = "Correct!";
      } else if (guess < answer) {
        respons = "Too Low"
        //Sends guess to mutation in Store
        this.$store.commit("setLowestNumber", guess);
      } else if (guess > answer) {
        respons = "Too High"
        //Sends guess to mutation in Store
        this.$store.commit("setHighestNumber", guess);
      }

      return this.talk(respons);

    }

  },
  computed: {
    // ...mapGetters(['getQuestionBank', 'getGuess']),

    question() {
      return this.$store.state.questionBank[0].question;
    },
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
  width: 100%;
  height: 100% ;
}
</style>
