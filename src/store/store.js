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
          question: 'Hur högt är Mount Everest i antal meter räknat?',
          answer: 8848
        },
        {
          question: 'Hur många trappsteg är i ITHS trappuppgång?',
          answer: 135
        },
        {
          question: 'Hur högt är Eiffel-tornet i antal meter räknat?',
          answer: 324
        },
        {
          question: 'Hur många kort finns i en vanlig kortlek?',
          answer: 32
        },
        {
          question: 'Hur många dollar tjänar Bill Gates per minut?',
          answer: 23148
        },
      ],
      //Array with bots
      // bots: [
      //   {
      //     id: 1,
      //     name: 'RoboCop',
      //     image: kalleAsset
      //   },
      //   {
      //     id: 2,
      //     name: 'Terminator',
      //     image: martinAsset
      //   },
      // ],
      //Players & bots in the active game
      activePlayers: [
        { id: 0, name: "Kalle", guess: null, image: require("@/assets/kalle.jpg"), isMyTurn: true, isHuman: true },
        { id: 1, name: "Anna", guess: null, image: require("@/assets/kajsa.jpg"), isMyTurn: false, isHuman: false },
        { id: 2, name: "Pelle", guess: null, image: require("@/assets/martin.jpg"), isMyTurn: false, isHuman: false },
        { id: 3, name: "Wall-E", guess: null, image: require("@/assets/walle.jpg"), isMyTurn: false, isHuman: false},
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
      modTalk: "",
      time:10,
      //PlayGame use this
      i:null,
      test:null,
      question:{
        question:"How high is..",
        answer:8848
      },

      phrases: [
        "This is very easy! My guess is... ",
        "Tricky one! Let's guess...",
        "Not the most interesting question. I say..."
      ]
    },
    getters: {
        //Get QuestionBank
        getQuestionBank: (state) => state.questionBank,
        //Get guessNumber
        getGuess: (state) => state.guessNumber
    },
    mutations: {

      submitGuessToStore(state, highLow,guess) {
        switch(highLow){
          case low:
            if (guess>state.lowestNumber){
              state.lowestNumber=guess;

              }
          case high:
            if(guess<state.highestNumber){
             state.highestNumber=guess; 
            }  
        }
       return;
        },

        
      
      //This function pushes the player into the "activePlayers array"
        addToActivePlayers: function(state, payload) {
          state.activePlayers.push(payload);
        },
        //Changes the value of lowestNumber if payload is larger
        setLowestNumber: function(state, payload) {
          if (payload > state.lowestNumber) {
            state.lowestNumber = payload;
          }
        },
        //changes the value of highestNumber if payload is lesser
        setHighestNumber: function(state, payload) {
          if (payload < state.highestNumber) {
            state.highestNumber = payload;
          }
        },
        //close modal box
        closeWinnerBox: function(state) {
            state.isWinnerBoxVisible = false;
        },
        //open modal box
        openWinnerBox: function(state) {
            state.isWinnerBoxVisible = true;
        },
        //changes the guessNumber
        updateLastGuess(state, guess) {
          state.guessNumber = guess;
         
        },
        //changes the active players turn
        switchTurn(state, player) {
          player.guess = null;
          if (state.activePlayers[player.id].id == state.activePlayers.length - 1) {
            state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
            state.activePlayers[0].isMyTurn = !state.activePlayers[0].isMyTurn;
            state.i=0;
          } else {
            state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
            state.activePlayers[player.id + 1].isMyTurn = !state.activePlayers[player.id + 1].isMyTurn;
            state.i++
          }
             
        },

        showRules(state){
          state.showRules = !state.showRules;
        }
    },
    actions: {
      playGame(context){
      context.state.i=0;
      var gamestate=true;
        while(gamestate){
          var player=context.state.activePlayers[context.state.i];
          //Check if player is human and wait for user input
          context.state.test="who is next?,";
          if(player.id==0){
              if (context.state.guessNumber==null){
                context.state.test+="players turn,";
                
                //setTimeout( () => dispatch( sillyMethod() ), 250 );
                //setTimeout(sillyMethod,100);
                }
              
          //Check if player is bot, 
          } else if (player.id!==0){
            context.state.test="bots turn";
            context.commit("makeBotDecision", player); 
          }
          context.state.test+="Is about to send to HighLow,";
          

          //Send gues to highLow function,
          context.dispatch('highLow').then(() => {
            //call method to switch no next player
           context.commit("switchTurn",player);
          })
          
          
        
        }
      },
          
        
        sillyMethod(context){
          context.state.test="reached sillyMethod";
          return true;
        },
      
      highLow(context){
        context.state.test+="Reached HighLow,";
        var guess=context.state.guessNumber;
        var respons = null;
        if (guess == context.question.answer) {
          context.state.test+="Reached correct response,"; 
          respons = "Correct!";
          gamestate=false;  // skall denna hinna ge respons bör det sättas en fördröjning
        } else if (guess < context.question.answer) {
          respons = "Too Low";
          // Send data to method submitGuessToStore
          context.commit("submitGuessToStore",low,guess);
          
        } else if (guess > context.question.answer) {
          respons = "Too High";
          // Send data to method submitGuessToStore
          context.commit("submitGuessToStore",high,guess);
        } else if (context.state.guessNumber==null) {
          context.state.test+="Reached null response";
          respons = "Times up!";
          
        }
        context.state.test+="Reached end";
        // Skicka respons till talk-variabel som moderator lyssnar på
        context.state.modTalk=respons;
        //skicka antal gissningar till player[]
        context.state.guessNumber=null;
        },
      
        makeBotDecision(context,player) {

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
        context.state.guessNumber=player.guess;
        return;
      }
    }
    })

        /*let randomTime = 1000 + Math.floor(Math.random() * 8000);

        setTimeout(function () {
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

          context.commit("updateLastGuess", player.guess);
          context.commit("submitGuessToStore", player);
          setTimeout(function () {


            context.commit("switchTurn", player)
          }, 3000)
        }, randomTime);

      }
    }*/
    
//})