import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export const store = new Vuex.Store({
    //Prevents changes in components without store involvement
    // strict: true,
    state: {
      //Array with questions and answers which the moderator gets from the store
      questionBank: [
        {
          iths: [
            {
              question: 'Hur högt är Mount Everest i antal meter räknat?',
              correct_answer: 8848
            },
            {
              question: 'Hur många trappsteg är i ITHS trappuppgång?',
              correct_answer: 135
            },
            {
              question: 'Hur högt är Eiffel-tornet i antal meter räknat?',
              correct_answer: 324
            },
            {
              question: 'Hur många kort finns i en vanlig kortlek?',
              correct_answer: 32
            },
            {
              question: 'Hur många dollar tjänar Bill Gates per minut?',
              correct_answer: 23148
            },
          ]
        }
      ],
      //Array with bots
      bots: [
        {
          id: 1,
          name: 'Anna',
          guess: null,
          image: require("@/assets/kajsa.jpg"),
          isMyTurn: false,
          isHuman: false
        },
        {
          id: 2,
          name: 'Pelle',
          guess: null,
          image: require("@/assets/martin.jpg"),
          isMyTurn: false,
          isHuman: false
        },
      ],
      // question to be used by playgame
      question: {
        question: 'Hur högt är Mount Everest i antal meter räknat?',
        answer: 8848
      },
    //Players & bots in the active game
    activePlayers: [
      { id: 0, name: "Kalle", guess: null, image: require("@/assets/sixten.png"), isMyTurn: true, isHuman: true, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 1, name: "Grandma", guess: null, image: require("@/assets/grandma.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 2, name: "Pelle", guess: null, image: require("@/assets/bot2.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 3, name: "Wall-E", guess: null, image: require("@/assets/wall-e.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
    ],
    //This is the guess of players/bots, and moderator will get this number
    guessNumber: null,
    //If moderator says that the guess is too low, then it will become lowestNumber
    lowestNumber: 0,
    //If moderator says that the guess is too high, then it will become highestNumber
    highestNumber: 10000,
    //A boolean value to show or not show the modal box (winnerBox) when someone guessed correctly
    isWinnerBoxVisible: false,
    showRules: false,
    seconds: 10,
    round: 1,

    // Martin test
    gameState: true,
    correctGuess: 8848,
    moderatorAnswer: null,
    disableInputButton: false,
    time:10,
    //PlayGame use this
    i:0,
    
    timer:null,
    test:null,

  },
  
  // getters: {
  //     //Get QuestionBank
  //     getQuestionBank: (state) => state.questionBank,
  //     //Get guessNumber
  //     getGuess: (state) => state.guessNumber,
  //     //Get seconds
  //     getSeconds: (state) => state.seconds,
  //     //Get round
  //     round: (state) => state.round,
  // },
  mutations: {

    updateModeratorAnswer(state) {
      if (state.guessNumber < state.correctGuess) {
        state.moderatorAnswer = "The guess is too low!"
        this.dispatch('resetModeratorTalk')
      }
      else if (state.guessNumber > state.correctGuess) {
        state.moderatorAnswer = "The guess is too high!"
        this.dispatch('resetModeratorTalk')
      }
      else if (state.guessNumber == state.correctGuess) {
        state.moderatorAnswer = "The guess is correct!"
        state.gameState = false;
        this.dispatch('showResult')
      }
    },

    toggleInputButton(state){
      state.disableInputButton = !state.disableInputButton;
    },

    resetModeratorTalk(state) {
      state.moderatorAnswer = null;
    },

    resetPlayersGuess(state) {
      for (let i = 0; i < state.activePlayers.length; i++) {
        state.activePlayers[i].guess = null;
      }
    },

    submitGuessToStore(state, player) {
      state.activePlayers[player.id].guess = player.guess;
      if ((player.guess < state.questionBank[0].answer && player.guess > state.lowestNumber) || (player.guess < state.questionBank[0].answer && state.lowestNumber == null)) {
        state.lowestNumber = player.guess;
      }
      else if ((player.guess > state.questionBank[0].answer && player.guess < state.highestNumber) || (player.guess > state.questionBank[0].answer && state.highestNumber == null)) {
        state.highestNumber = player.guess;
      }

    },

    delayModeratorAnswer() {
      this.dispatch('delayModeratorAnswer')
    },

    seeWhosTurn(state, player) {
      if (state.gameState == true) {
        this.dispatch('delaySwitchTurn', player)
      }
    },

    //This function pushes the player into the "activePlayers array"
    addToActivePlayers: function (state, payload) {
      state.activePlayers.push(payload);
    },
    //Changes the value of lowestNumber if payload is larger
    setLowestNumber: function (state, payload) {
      if (payload > state.lowestNumber) {
        state.lowestNumber = payload;
      }

     },
       
    //changes the value of highestNumber if payload is lesser
    setHighestNumber: function (state, payload) {
      if (payload < state.highestNumber) {
        state.highestNumber = payload;
      }
    },
    //close modal box
    closeWinnerBox: function (state) {
      state.isWinnerBoxVisible = false;
    },
    //open modal box
    openWinnerBox: function (state) {
      state.isWinnerBoxVisible = true;
    },
    //changes the guessNumber
    updateLastGuess(state, guess) {
      state.guessNumber = guess;
    },
    //changes the active players turn
    switchTurn(state, player) {
      
      state.test+="enter switchTurn,"
          player.guess = null;
          if (state.activePlayers[player.id].id == state.activePlayers.length - 1) {
            state.test+="enter if inside switch turn";
            state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
            state.activePlayers[0].isMyTurn = !state.activePlayers[0].isMyTurn;
            state.i=0;
          } else {
            state.test+="enter else inside switch turn with id: "+player.id;
            state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
            state.activePlayers[player.id + 1].isMyTurn = !state.activePlayers[player.id + 1].isMyTurn;
            state.i++
          }
      
      /*if (state.gameState == true) {
        if (state.activePlayers[player.id].id == state.activePlayers.length - 1) {
          state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
          state.activePlayers[0].isMyTurn = !state.activePlayers[0].isMyTurn;
          state.round++;
          state.disableInputButton = !state.disableInputButton;
        } else {
          state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
          state.activePlayers[player.id + 1].isMyTurn = !state.activePlayers[player.id + 1].isMyTurn;
        }
      }


      // check if it is a bot's turn. If true - the "makeBotDecision" method runs
      for (let i = 0; i < state.activePlayers.length; i++) {
        if (state.activePlayers[i].isMyTurn == true && state.activePlayers[i].isHuman == false) {
          this.dispatch('makeBotDecision', state.activePlayers[i])
        }
      }*/
    },

    showRules(state) {
      state.showRules = !state.showRules;
    },

    setSeconds(state, nr) {
      state.seconds = nr;
    },

    //Resets round to 1
    resetRound: (state) => {
      state.round = 1;
    },
    //Adds +1 to guesses in active players
    addGuesses(state) {
      state.activePlayers.guesses++;
    },
    assignPlayerName(state, playerName) {
          if (playerName != null) {
            state.activePlayers[0].name = playerName;
          }
        },
        assignQuestion(state, selectedQuestion) {
          state.question.question = selectedQuestion.question;
          state.question.answer = selectedQuestion.correct_answer;
        },
        
        
  },
  actions: {

    //Martin Test
    resetModeratorTalk(context) {
      setTimeout(function () {
        context.commit("resetModeratorTalk");
        context.commit("resetPlayersGuess");
      }, 1000)
    },

    delaySwitchTurn(context, player) {
      setTimeout(function () {
        context.commit("switchTurn", player);
      }, 3000)
    },

    showResult(context) {
      setTimeout(function () {
        context.commit("openWinnerBox");
      }, 1500)
    },
    playGame(context){
      context.state.test+="enter playgame, "
      
      var player=context.state.activePlayers[context.state.i];
      //context.dispatch("startTimer");
      //Check if player is human and wait for user input
      context.state.test+="who is next?,";
      if(player.id==0){
        context.state.test+="players turn,";
        context.dispatch("userMethod", player);
                
              
          //Check if player is bot, 
          } else if (player.id!==0){
            console.log("bots turn");
            context.state.test+="bots turn,";
            context.dispatch("makeBotDecision", player);
           
          }
          
        
      },
      userMethod(context,player){
          
        if(context.state.guessNumber==null){ // Lägg in tidparameter här
          setTimeout(function(){ 
             context.dispatch("userMethod",player);
            },590); 

        } else{
          context.state.test+="reached end of userMethod";
          context.state.guessNumber=player.guess; // keep?
          context.dispatch("response",player);
        }
        
      },

    makeBotDecision(context, player) {

      context.state.test+="Reached botDecision,";
          let randomTime = 1000 + Math.floor(Math.random() * 5000);

          setTimeout(function(){
            
            switch (player.id) {
          
              case 1:
                //This bots logic: highestNumber - lowestNumber / 2
                player.guess = context.state.lowestNumber + Math.floor((context.state.highestNumber - context.state.lowestNumber) / 2)
                break;
              case 2:
                //This bots logic: highestNumber - lowestNumber * randomNumber
                player.guess = context.state.lowestNumber + (Math.floor(Math.random() * (context.state.highestNumber - context.state.lowestNumber)))
                break;
              case 3:
                //This bots logic: highestNumber - lowestNumber * 10% 
                player.guess = context.state.lowestNumber + (Math.floor(
                  (context.state.highestNumber - context.state.lowestNumber) * 0.1))
                break;
            }
            context.state.test+=player.guess+",";
            context.state.guessNumber=player.guess; // lägg in mutation
            context.dispatch("response",player);  
            
            },randomTime);

      /*

      let randomTime = 1000 + Math.floor(Math.random() * 8000);

      setTimeout(function () {
        switch (player.id) {
          case 1:
            player.guess = context.state.lowestNumber + Math.floor((context.state.highestNumber - context.state.lowestNumber) / 2)
            break;
          case 2:
            player.guess = context.state.lowestNumber + (Math.floor(Math.random() * (context.state.highestNumber - context.state.lowestNumber)))
            break;
          case 3:
            player.guess = context.state.lowestNumber + (Math.floor(Math.random() * (context.state.highestNumber - context.state.lowestNumber)))
            break;

        }

        context.commit("updateLastGuess", player.guess);
        context.commit("submitGuessToStore", player);
        context.dispatch("delayModeratorAnswer")
          ;
        context.commit("seeWhosTurn", player)

      }, randomTime);*/

    },
    response(context,player){
      context.state.test+="Reached response,";
      context.dispatch("stopTimer");
      context.dispatch("highLow");
        if(context.state.gamestate){
        setTimeout(function(){
          context.state.modTalk=""; // nollställer modTalk, använda Martins mutations istället?
          context.commit("switchTurn",player);
          context.state.test+="Reached this line,";
          context.dispatch("playGame");
          },2000);
        } 
       
      
      
    },

    highLow(context){
      context.state.test+="Reached HighLow,";
      
      var respons = null;
      if (context.state.guessNumber == context.state.question.answer) {
        context.state.test+="Reached correct response,"; 
        respons = "Correct!";
        context.state.gamestate=false; // kalla på martins mutation?
      } else if (context.state.guessNumber < context.state.question.answer) {
        context.state.test+="Reached too low response,"; 
        respons = "Too Low";
        // Send data to method submitGuessToStore
        context.commit("submitGuessToStore","low");
        
      } else if (context.state.guessNumber > context.state.question.answer) {
        respons = "Too High";
        // Send data to method submitGuessToStore
        context.commit("submitGuessToStore","high");
      } else if (context.state.guessNumber==null) {
        context.state.test+="Reached null response,";
        respons = "Times up!";
        
      }
      context.state.test+="Reached end of highLow";
      // Skicka respons till talk-variabel som moderator lyssnar på
      context.state.modTalk=respons;
      //skicka antal gissningar till player[]
      context.state.guessNumber=null;
      },

    delayModeratorAnswer(context) {
      setTimeout(function () {
        context.commit("updateModeratorAnswer")
      }, 1000)
    },
    startTimer(context){
      context.state.time=10; 
      context.state.timer= setInterval(()=>{
      context.commit("increaseTimer");
     },1000);
      
    },
    stopTimer(context){
      clearInterval(context.state.timer);

    },
    
         //Timer should be started via playGame
      startSecondCounter(seconds){
        seconds -= 1;
        
          if (seconds == -1){
            seconds = 10
          }
          return seconds;

      }
    },

  
  
})
