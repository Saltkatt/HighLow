<template>
<div class="main">
    

    <!-- avatar images and names -->
    <div class="text">Choose an Avatar and Name:</div>
    <div class="avatarWrapper">
        <div 
        class="avatar" v-for="avatar in avatars" :key="avatar.id" v-on:click="selectAvatar(avatar.id, avatar.image)">
            <div :id="'avatar'+avatar.id" style="cursor:pointer;">
                <div><img class="avatarImage" v-bind:src="avatar.image"></div>
                <div class="avatarName">{{ avatar.name }}</div>
            </div>
        </div>
    </div>

    <div class="input">
    <div class="playerName">
        <!-- Name input max length 15 -->
        <label id="nameInputLabel" for="nameInput">Name:</label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..." v-model="nameValue">
    </div>
    <div id="playerAvatar"></div>
    </div>


    <!-- Bots list -->
    <div class="botWrapper">
            <div 
            class="bot" v-for="bot in bots" :key="bot.id" v-on:click="selectBot(bot.id)">
                <div :id="'bot'+bot.id" style="cursor:pointer;">
                    <div><img class="botImage" v-bind:src="bot.image"></div>
                    <div class="botName">Name: {{ bot.name }}</div>
                    <div class="botDescription">- {{ bot.description }}</div>
                </div>
            </div>
    </div>

    <!-- Category list -->
    <div class="category">
        <label for="selectCategory">Choose Category:</label>
        <select name="selectCategory" id="selectCategory" v-model="categoryValue">
            <option value="0">ITHS</option>
            <option value="19">Science: Mathematics</option>
        </select>
    </div>

    <!-- Submit game setup to store -->
    <div class="btn">
        <router-link to="/game"><button @click="sendToStore(nameValue)" class="startBtn">Start!</button></router-link>
    </div>

</div>



</template>

<script>
import axios from 'axios';
import { setTimeout } from 'timers';

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
            
            arrSelectedBots: [], //update_29maj2019
            preparedPlayer: {},
            tempBotId: 1, //an id that will be extracted from "bot1", etc. as available with each bot div
            preparedBot: {},

            playerAvatarImage: require("@/assets/sixten.png") //updated to avatar image
        }
    },
    methods: {
        sendToStore(nameValue) {
            this.getCategoryQuestions(this.categoryValue); // get a random question in selected category
            this.preparedPlayer = {
                id: 0,
                name: nameValue,
                guess: null,
                image: this.playerAvatarImage, //require("@/assets/sixten.png"),
                isMyTurn: true,
                isHuman: true,
                guesses: 0,
                slateImage: require("@/assets/slate.png")
            }
            // alert("preparedPlayer: " + this.preparedPlayer);
            // this.$store.commit('assignPlayerName', nameValue);
            this.$store.commit('assignQuestion', this.selectedQuestion);
            // send user to store:
            this.$store.commit('addToActivePlayers', this.preparedPlayer);
            // send bots to store:
            // alert ("bot list length: " + this.arrSelectedBots.length);
            for (var botI=0; botI<this.arrSelectedBots.length; botI++) {
                // alert("botI:" +botI);
                this.tempBotId = this.arrSelectedBots[botI] //get from array in form bot1, bot3, etc.
                this.tempBotId = this.tempBotId.substring(3,4); //take "3" from "bot3"
                // alert("tempBotI:" +this.tempBotId);
    
                this.preparedBot = {
                    id: Number(this.tempBotId),
                    name: this.$store.state.bots[this.tempBotId].name,
                    guess: null,
                    image: this.$store.state.bots[this.tempBotId].image,
                    isMyTurn: false,
                    isHuman: false,
                    guesses: 0,
                    slateImage: require("@/assets/slate.png")
                }
               this.$store.commit('addToActivePlayers', this.preparedBot);
               
                  
               
            //    alert("add bot with id: " + this.preparedBot.id);
            }
            console.log("Was here");
            
            
            /*setTimeout(() => {
               this.$store.dispatch("playGame"); 
            }, 1000);*/

            // go to /game
        },
        getCategoryQuestions(categoryId) {
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

        //added selectBots function:
        selectBot: function(getBotId) {
            var botId = "bot" + getBotId;
            // "selected bot. add bot id. change style");
            document.getElementById(botId).style.animation = "none";
            // document.getElementById(botId).style.backgroundColor = "blue";
            // alert("bot: " + botId);
            // document.getElementById(botId).setAttribute('style','mask-image: radial-gradient(circle at 100% 100%, black 10%, rgba(255,165,0, 0.6) 50%);');
            // document.getElementById(botId).setAttribute('style','border: 5px solid green;');
            // document.getElementById(botId).setAttribute('style','background-color: orange;');
            this.arrSelectedBots.push(botId);
            // alert(this.arrSelectedBots);
        },


        //added selectBots function:
        selectAvatar: function(getAvatarId, getImage, avatarImageName) {
            document.getElementById("playerAvatar").innerHTML = 
                "<img width=100 src='" + 
                    getImage + "' " + 
                    `style =
                            border-radius: 50%;
                            border: 1px solid orange;
                            width: 100px;
                        ` +
                ">";
            this.playerAvatarImage = avatarImageName;   
            this.nameValue = this.$store.state.avatarsObjs[getAvatarId].name;
        },

    },
    computed: {
        bots() {
            return this.$store.state.bots;
        },

        avatars() {
            return this.$store.state.avatarsObjs;
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
    grid-template-rows: auto auto auto auto auto auto;
    /* justify-content: center; */
}

/* Choose avatar */
.text {
    grid-column: 1 / span 3;
    font-size: 3vw;
}

/* Name area */
.playerName {
    display: grid;
    grid-template-columns: 80% 80% 80%;
    grid-template-rows: auto auto;
    margin: 0 20% 0 20% ;
    width: 25%;
    align-items: center;
}

h2{
    grid-column: 1 / span 3;
    font-size: 3vw;
}

.input{
    grid-column: 1 / span 3;
}

#nameInputLabel{
    margin: 10px 0 0 50px;
}

#nameInput{
    background-color: black;
    font-family: 'Passion One', cursive;
    font-size: 180%;
    color: whitesmoke;
    text-align: center;
    border: 1px solid brown;
    width: 130%;
    /* height: 5vh; */
    margin-top: 2vh;
    border-radius: 15px;
}

/* Bot selection area */
.botWrapper {
    grid-column: 1 / span 3;
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
    /* padding: 45px; */
    margin: 0px auto;
    color: sienna;
    width: 150px;
    height: 230px;
}

.botImage {
    margin-top: 20px;
    width: 60%;
}

/* Question Categories */
.category {
    grid-column: 1 / span 3;
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
    margin-top: 2vh;
    border-radius: 10px;
}

.btn{
    grid-column: 1 / span 3;
}
.startBtn{
    font-family: 'Passion One', cursive;
    font-size: 180%;
    width: 30%;
    height: 10vh; 
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    border-radius: 10px;
    margin-top: 10px;
   
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


            #bot1 {
                /* up down animation */
                -webkit-animation: moveUpDownAnimation 2s linear infinite;
                -moz-animation: moveUpDownAnimation 2s linear infinite;
                -o-animation: moveUpDownAnimation 2s linear infinite;
                animation: moveUpDownAnimation 2s linear infinite;
                position: relative;
                left:0;
                bottom:0;

            }

            #bot2 {
                /* up down animation */
                -webkit-animation: moveUpDownAnimation 2s linear infinite;
                -moz-animation: moveUpDownAnimation 2s linear infinite;
                -o-animation: moveUpDownAnimation 2s linear infinite;
                animation: moveUpDownAnimation 2s linear infinite;
                position: relative;
                left:0;
                bottom:0;
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

                /* up down animation */
                -webkit-animation: moveUpDownAnimation 2s linear infinite;
                -moz-animation: moveUpDownAnimation 2s linear infinite;
                -o-animation: moveUpDownAnimation 2s linear infinite;
                animation: moveUpDownAnimation 2s linear infinite;
                position: relative;
                left:0;
                bottom:0;
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
    margin-top: 15px;
    font-size: 5vw;
}

#nameInput{
    background-color: black;
    font-family: 'Passion One', cursive;
    font-size: 5vw;
    color: whitesmoke;
    text-align: center;
    border: 1px solid brown;
    width: 40vw;
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

.botImage{
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

.startBtn{
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

/* Avatar */

.avatarWrapper {
    margin: auto;
    width:50%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

#avatar {

}


.avatarImage {
    border-radius: 50%;
    border: 1px solid orange;
    width: 100px;
}

.avatarName {
                /* */
}

}
</style>
