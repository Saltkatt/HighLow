<template>
  <div>
    <div class="grid-container">
      <div class="item question-box">
        <p>Q: {{question}}</p>
      </div>
      <div class="item modImage">
        <img v-bind:src="image">
      </div>
      <div class="item response" v-show="getLastGuess != null">
        <!-- <div class="talkContainer">{{hiLow(this.getGuess)}}</div> -->
        <div v-show="getLastGuess < getCorrectAnswer">The guess is TOO LOW</div>
        <div v-show="getLastGuess > getCorrectAnswer">The guess is TOO HIGH</div>
        <div v-show="getLastGuess == getCorrectAnswer"></div>
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

<style scoped>

.item {
  font-family:Arial, Helvetica, sans-serif;
  text-align: left;
  padding: 5px;
  font-size: 20px;
}
.response {
  grid-area: res;
  background-color: antiquewhite;  
  padding-top: 2%;
  text-align: center;
}
.modImage {
  grid-area: mod;
  padding: 2%;
  width: 100%;
}
.question-box {
  grid-area: q; 
}

img {
  float: left;
  width: 80%;
  padding-left: 10px;
}

.grid-container {
  display: grid;
  grid-template-areas: 
  'mod mod q q q q'
  'mod mod res res . .';
}

@media screen and (max-width:500px){
  .grid-container {
    display: grid;
    grid-template-areas: 
    'q q q q q q'
    'mod res res res res .';
  }
  .item{
    font-size: 100%;
  }
  .question-box{
    text-align: center;
  }
  .modImage{
    width: 80%;
  }

}
</style>
