<template>
<div class="main">
    <div class="playerName">
        <!-- Name input max length 15 -->
        <h2>Current Player: {{currentName().name}}</h2>
        <div class="input">
        <label id="nameInputLabel" for="nameInput">Name: </label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..." v-model="nameValue">
        </div>
    </div>
   <div>


        <div class="botWrapper">
                <div
                class="bot" v-for="bot in bots" :key="bot.id" v-on:click="selectBot(bot.id)">
                    <div :id="'bot'+bot.id" style="cursor:pointer;">
                        <div class="botImage"><img class="image" v-bind:src="bot.image"></div>
                        <div class="botName">Name: {{ bot.name }}</div>
                        <div class="botDescription">Description:<!-- add description --></div>
                        <!-- add bot selection -->
                    </div>
                </div>
        </div>
    </div>


    <div class="category">
        <label for="selectCategory">Category:</label>
        <select name="selectCategory" id="selectCategory" v-model="categoryValue">
            <option value="0">ITHS</option>
            <option value="19">Science: Mathematics</option>
        </select>
        <div>
    <!-- Submit game setup to store -->
    <router-link to="/game"><button class="submitBtn" @click="sendToStore(nameValue)">Submit</button></router-link>
    </div>
    </div>



</div>



</template>

<script>
import axios from 'axios';

export default {
    name: "StartMenu",
    data() {
        return {
            nameValue: null,
            rawResponse: null,
            bankQuestions: [],
            apiQuestions: [],
            categoryValue: "0",
            selectedQuestion: null,
            arrSelectedBots: [] //update_29maj2019
        }
    },
    methods: {
      //This method gets the human player out of the array and gets displayed as the current player.
      currentName() {
        var players = this.$store.state.activePlayers;

        for(var i = 0; i < players.length; i++) {
            if(players[i].isHuman == true) {
                return players[i];
            }
        }
      },
        sendToStore(nameValue) {
            // Todo: add bot selection and send to store.
            this.getCategoryQuestions(this.categoryValue); // get a random question in selected category
            // send setup to store
            this.$store.commit('assignPlayerName', nameValue);
            this.$store.commit('assignQuestion', this.selectedQuestion);
            // go to /game
            //Calls function to reset the gameState to true.
            this.$store.commit('defaultGameState');
        },
        getCategoryQuestions: async function(categoryId) {
            categoryId = Number(categoryId);

            if (categoryId == 19) {
                // assign a random question
                let randomNumber = Math.floor(Math.random() * Math.floor(this.apiQuestions.length));
                let randomQuestion = this.apiQuestions[randomNumber];
                this.selectedQuestion = randomQuestion;

            }
            else if (categoryId == 0) {

                // assign a random question
                let randomNumber = Math.floor(Math.random() * Math.floor(this.bankQuestions.length));
                let randomQuestion = this.bankQuestions[randomNumber];
                this.selectedQuestion = randomQuestion;
            }
            else {
                console.log('Wrong category id! categoryId: '+categoryId);
            }
        },

        //update: added selectBots function
        selectBot: function(botId) {
            var  botId = "bot" + botId;
            // "selected bot. add bot id. change style");
            document.getElementById(botId).style.animation = "none";
            // document.getElementById(botId).style.backgroundColor = "blue";
            // alert("bot: " + botId);
            document.getElementById(botId).setAttribute('style','mask-image: radial-gradient(circle at 100% 100%, black 10%, rgba(255,165,0, 0.6) 50%);');
            arrSelectedBots.push(botId);
        },

    },
    computed: {
        bots() {
            return this.$store.state.bots;
        }
    },
    mounted() {
        // get questions from questionBank
        this.bankQuestions = this.$store.state.questionBank[0].iths;

        // get api questions
        const getQuestions = async () => {
            try {
                return await axios.get('https://opentdb.com/api.php?amount=26&category=19&type=multiple')
            } catch (error) {
                console.error(error)
            }
        }
        const countQuestions = async () => {
            this.rawResponse = await getQuestions()

            if (this.rawResponse.data.results) {
                for(let i = 0; i < this.rawResponse.data.results.length; i++) {
                    if (this.rawResponse.data.results[i].correct_answer.match(/^[0-9]*$/g)) {
                        this.apiQuestions.push(this.rawResponse.data.results[i])
                    }
                }
                console.log(`Got ${Object.entries(this.rawResponse.data.results).length} questions`)
            }
        }
        countQuestions()
    }
}
</script>

<style scoped>

/* Desktop */
@media screen and (min-width: 501px) {

/* update: add selected bot style */
.selectedBot {
    background: green;
}

.main {
    background: none;
    color:whitesmoke;
    display: grid;
    grid-template-rows: auto auto auto auto;
    /* justify-content: center; */
}
/* Name area */
.playerName {
    display: grid;
    grid-template-columns: 80% 80% 80%;
    grid-template-rows: auto auto;
    margin: 0 20% 0 20% ;
    width: 25%;
}

h2{
    grid-column: 1 / span 3;
    font-size: 3vw;
}

.input{

    grid-column: 1 / span 3;

}

#nameInputLabel{
    margin-top: 10px;
}

#nameInput{
    background-color: black;
    font-family: 'Passion One', cursive;
    font-size: 180%;
    color: whitesmoke;
    text-align: center;
    border: 1px solid brown;
    width: 100%;
    /* height: 5vh; */
    margin-top: 2vh;
    border-radius: 15px;
}

/* Bot selection area */

.botWrapper {
    display: grid;
    grid-template-columns: 20% 20% 20%;
    grid-template-rows: 20% 20% 20%;
    grid-gap: 10%;
    justify-content: center;
    margin: 2%;
   
}

.bot{
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    padding: 10px;
    margin: 0px auto;
    color: sienna;
}

.image{
    width: 60%;
}

/* Question Categories */
.category {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 2%;
    justify-content: center;
    margin: auto;
    
}
label{
    margin-top:10%;
    font-size: 200%;
}

#selectCategory{
    background-color: black;
    font-family: 'Passion One', cursive;
    font-size: 180%;
    color: whitesmoke;
    text-align: center; 
    border: 1px solid brown;
    width: 100%;
    /* height: 5vh; */
    margin-top: 2vh;
    /* border-top-left-radius: 10px; */
    border-radius: 10px;
}

.submitBtn{
    font-family: 'Passion One', cursive;
    font-size: 180%;
    width: 100%;
    /* height: 5vh; */
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    border-radius: 10px;
    margin-top: 10px;
    
}



            @keyframes orbitAnimation {
                from { transform: rotate(0deg) translateX(10px) rotate(0deg); }
                to { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
            }
            @-o-keyframes orbitAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }
            @-moz-keyframes orbitAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }
            @-webkit-keyframes orbitAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }




            @keyframes moveUpDownAnimation {
                0%,100%  { bottom: -10px;}
                50% { bottom: 10px;}
            }

            @-o-keyframes moveUpDownAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }

            @-moz-keyframes moveUpDownAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }

            @-webkit-keyframes moveUpDownAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }



            @keyframes moveRightLeftAnimation {
                0%,100%  { left: 0;}
                50% { left: 50px;}
            }
            @-o-keyframes moveRightLeftAnimation {
                0%,100%  { left: 0;}
                50% { left: 50px; }
            }
            @-moz-keyframes moveRightLeftAnimation {
                0%,100%  { left: 0;}
                50% { left: 50px;}
            }
            @-webkit-keyframes moveRightLeftAnimation {
                0%,100%  { left: 0;}
                50% { left: 50px;}
            }



            @keyframes flickerAnimation {
                0%  { opacity: 1;}
                50% { opacity: 0;}
                100% { opacity: 1;}
            }

            @-o-keyframes flickerAnimation {
                0%  { opacity: 1;}
                50% { opacity: 0;}
                100% { opacity: 1;}
            }

            @-moz-keyframes flickerAnimation {
                0%  { opacity: 1;}
                50% { opacity: 0;}
                100% { opacity: 1;}
            }

            @-webkit-keyframes flickerAnimation {
                0%  { opacity: 1;}
                50% { opacity: 0;}
                100% { opacity: 1;}
            }


            #bot1 {
                /*orbit animation*/
                /* position: absolute; */
                position: relative;
                /* left: 315px; */
                left: 0px;
                /* top: 143px;         center for the circle */
                top: 0px;         /*center for the circle */
                -webkit-animation: orbitAnimation 3s linear infinite;
                -moz-animation: orbitAnimation 3s linear infinite;
                -o-animation: orbitAnimation 3s linear infinite;
                animation: orbitAnimation 3s linear infinite; /* Chrome, Firefox 16+,
                                                            IE 10+, Safari 5 */
            }


            #bot2 {
                /* flicker animation */
                -webkit-animation: flickerAnimation 1s infinite;
                -moz-animation: flickerAnimation 1s infinite;
                -o-animation: flickerAnimation 1s infinite;
                animation: flickerAnimation 1s infinite;
            }

            #bot3 {
                /* up down animation */
                -webkit-animation: moveUpDownAnimation 2s linear infinite;
                -moz-animation: moveUpDownAnimation 2s linear infinite;
                -o-animation: moveUpDownAnimation 2s linear infinite;
                animation: moveUpDownAnimation 2s linear infinite;
                position: relative;
                left:0;
                bottom:0;
            }

            #bot4 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }

            #bot5 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }

            #bot6 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }

            #bot7 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }

            #bot8 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }
}

/* Small screen */
@media screen and (max-width: 500px) {

/* Name area */
.playerName {
    display: grid;
    grid-template-columns: 80% 80% 80%;
    grid-template-rows: auto auto;
    margin: 0 20% 0 20% ;
    width: 25%;
}

h2{
    grid-column: 1 / span 3;
    font-size: 6vw;
}

.input{

    grid-column: 1 / span 3;

}

#nameInputLabel{
    margin-top: 10px;
    font-size: 6vw;
}

#nameInput{
    background-color: black;
    font-family: 'Passion One', cursive;
    font-size: 6vw;
    color: whitesmoke;
    text-align: center;
    border: 1px solid brown;
    width: 100%;
    /* height: 5vh; */
    margin-top: 2vh;
    border-radius: 15px;
}


/* Bot selection area */

.botWrapper {
    display: grid;
    grid-template-columns: 20% 20% 20%;
    grid-template-rows: 10% 10% ;
    grid-gap: 5%;
    justify-content: center;
    margin: 2%;
}

.bot{
    background-image:url("../assets/divbg.jpg");
    background-size: cover;
    padding: 1%;
    color: sienna;
}

.image{
    width: 80%;
}

/* Question Categories */

.category {
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 2%;
    justify-content: center;
    margin: auto;
    
}
label{
    margin-top:10%;
    font-size: 200%;
}

#selectCategory{
    background-color: black;
    font-family: 'Passion One', cursive;
    font-size: 180%;
    color: whitesmoke;
    text-align: center; 
    border: 1px solid brown;
    width: 100%;
    margin-top: 2vh;
    border-radius: 10px;
}

.submitBtn{
    grid-row: 2;
    grid-column: 2;
    font-family: 'Passion One', cursive;
    font-size: 180%;
    width: 100%;
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    border-radius: 10px;
    margin-top: 10px;
    
}

}

</style>
