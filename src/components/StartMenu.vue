<template>
<div class="main">


    <!-- avatar images and names -->
    <div class="statistics">
      
        <router-link to="/statistics"><li class="link">Statistics</li></router-link>
      
    </div>
    <div class="text">Choose an Avatar and Name:</div>
    <div class="avatarWrapper"> <!-- from the 6 columns: first for default, next 3 divs are for 3 avatars, 1 div is space, last div is selected avatar -->
        <!-- <div class="avatar" ><img id="defaultAvatar" :src=defaultPlayerAvatarImage style="cursor:pointer;" v-on:click="selectDefaultAvatar()" ></div> -->
        <div
        class="avatar" v-for="avatar in avatars" :key="avatar.id" v-on:click="selectAvatar(avatar.id, avatar.image, avatar.name)">
            <div :id="'avatar'+avatar.id">
                <div><img class="avatarImage" v-bind:src="avatar.image" v-bind:class="{'selected': avatar.selected}"></div>
                <div class="avatarName">{{ avatar.name }}</div>
            </div>
        </div>
        <!-- <div> </div> -->
        <!-- <div id="playerAvatar" class='avatarAnimation'></div> -->

    </div>

    <div class="input">
    <div class="playerName">
        <!-- Name input max length 15 -->
        <label id="nameInputLabel" for="nameInput">Name:</label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..." v-model="nameValue">
    </div>
    </div>


    <!-- Bots list -->
    <div class="text">Choose your opponents:</div>
    <div class="botWrapper">
        
            <div class="bot" v-for="bot in bots" :key="bot.id" v-on:click="selectBot(bot.id)" >
                <div :id="'bot'+bot.id">
                    <div><img class="botImage" v-bind:class="{'selected': bot.selected}" v-bind:src="bot.image"></div>
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

            preparedPlayer: {},
            tempBotId: 1, //an id that will be extracted from "bot1", etc. as available with each bot div

            defaultPlayerAvatarImage: require("@/assets/sixten.png"), //default image for player
            playerAvatarImage: require("@/assets/sixten.png") //update to avatar image
        }
    },

    methods: {
        sendToStore(nameValue) {
            this.getCategoryQuestions(this.categoryValue); // get a random question in selected category
            this.$store.commit('assignQuestion', this.selectedQuestion);

            this.$store.commit('resetActivePlayers');

            this.preparedPlayer = {
                id: 0,
                name: nameValue,
                guess: null,
                image: this.playerAvatarImage, //require("@/assets/sixten.png"),
                isMyTurn: true,
                isHuman: true,
                guesses: 0,
                slateImage: require("@/assets/slate.png")
            };
            // alert("preparedPlayer: " + this.preparedPlayer);

            // send user to store:
            this.$store.commit('addToActivePlayers', this.preparedPlayer);
            // send bots to store:
            this.$store.commit('putSelectedBotsInActivePlayers')
            // alert("was here");

            setTimeout(() => {
               this.$store.dispatch("playGame");
            }, 1000);

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

        //select Bots function:
        selectBot: function(getBotId) {
            var botId = "bot" + getBotId;
            document.getElementById(botId).style.animation = "none";
            for (var countI=0; countI<this.$store.state.bots.length; countI++) {
                if (this.$store.state.bots[countI].id == getBotId) {
                    //this was the bot clicked. toggle selected:
                    this.$store.state.bots[countI].selected = !this.$store.state.bots[countI].selected;
                    }
                }
        },

        //select default avatar
        selectDefaultAvatar: function() {
            this.playerAvatarImage = this.defaultPlayerAvatarImage;
            document.getElementById("defaultAvatar").style="border: 1px solid orange;";
            document.getElementById("playerAvatar").innerHTML = "";
        },

        //select Avatar function:
        selectAvatar: function(getAvatarId, getImage, avatarImageName) {
            //document.getElementById("defaultAvatar").style="";
            // document.getElementById("playerAvatar").innerHTML =
            //     "<img  src='" + getImage + "' " +
            //         "style = ' \
            //                 border-radius: 50%; \
            //                 width: 80%; \ margin-top: 15%; \
            //         ' >";
            this.$store.commit("toggleAvatar", getAvatarId);
            this.playerAvatarImage = getImage;
            this.nameValue = avatarImageName;
        },

    },

    computed: {
        bots() {
            return this.$store.state.bots;
        },

        avatars() {
            return this.$store.state.avatars;
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


.selected {
    background: #4f300b;
    border-radius: 5px;
    /* border: 3px solid black; */
    margin: 0px;
}

/* update: add selected bot style */
/* .selectedBot {
    background: green;
} */

.main {
    background: none;
    color:whitesmoke;
    /* display: grid;
    grid-template-rows: auto; */

}
/* Statistics Link */
.link{
  font-size: 3vw;
  text-decoration: none;
  color: #fff;
  display: inline-block;
  margin: 5px;
}

.link{
    color:white;
}

.link:hover{
    color: lightgoldenrodyellow;
}
.link:visited{
    color:lightgray;
}
/* End of Statistics Link */


/* Choose avatar */
.text {
    grid-column: 1 / span 3;
    font-size: 3vw;
}

/* Avatar Desktop */

/* .avatarWrapper {
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 50px 150px;
    grid-template-rows: auto;
    justify-content: center;
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    margin: 2%;
} */

.avatarWrapper{
    width: 50vw;
    display: flex;
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    margin-left: 25vw;
    margin-right: 25vw;
    justify-content: space-around;
}

.avatarImage {
    width: 6vw;

}

#defaultAvatar{
    width:80%;
}

.avatarAnimation {
    /* right left animation */
    -webkit-animation: moveRightLeftAnimation 2s linear infinite;
    -moz-animation: moveRightLeftAnimation 2s linear infinite;
    -o-animation: moveRightLeftAnimation 2s linear infinite;
    animation: moveRightLeftAnimation 2s linear infinite;
    position: relative;
    left:0;
    bottom:0;
}

/* end of Avatar Desktop */

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

#nameInput:focus { outline: none; }

/* End of name area - desktop */

/* Bot selection area */
/* .botWrapper {
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 20% 20% 20%;
    grid-template-rows: 20% 20% 20%;
    grid-gap: 10%;
    justify-content: center;
    margin: 2%;

} */

.botWrapper {
    display: flex;
    justify-content: space-around;
    margin-left: 25vw;
    margin-right: 25vw;
    height: 30vh;
    

}

.bot{
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    /* padding: 45px; */
    
    color: sienna;
    width: 12vw;
}

.botImage {
    margin-top: 3vh;
    width: 60%;
}
/* End of bot area - desktop */

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

/* End of category and button area - desktop */

/* Animation area */

/* Bot animation */
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

/* Avatar animation */
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

/* End of animation area */

/* Adding animation to bots */
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

}

/* Small screen */
@media screen and (max-width: 500px) {
.main{
    display: grid;
    grid-template-rows: auto auto auto auto auto auto;
}

.text{
    grid-column: 1 / span 3;
    font-size: 6vw;
}

/* Statistics Link */
.link{
  font-size: 4vw;
  text-decoration: none;
  text-align: left;
  color: #fff;
  display: inline-block;
  margin: 0;
}
.link{
    color:white;
}

.link:hover{
    color: lightgoldenrodyellow;
}
.link:visited{
    color:lightgray;
}
/* End of Statistics Link */

/* Avatar Small screen*/
.avatarWrapper {
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 20px 60px;
    grid-template-rows: auto;
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    margin: 2%;
}

.avatarImage {
    
    border: 1px solid orange;
    width: 80%;
    margin-top: 20%;
}

#defaultAvatar{
    margin-top: 15%;
    width: 100%;
}

.avatarAnimation {
    /* right left animation */
    -webkit-animation: moveRightLeftAnimation 2s linear infinite;
    -moz-animation: moveRightLeftAnimation 2s linear infinite;
    -o-animation: moveRightLeftAnimation 2s linear infinite;
    animation: moveRightLeftAnimation 2s linear infinite;
    position: relative;
    left:0;
    bottom:0;
}

.selected {
    background-color: chartreuse;
}

/* Name area */
.playerName {
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 80% 80% 80%;
    grid-template-rows: auto auto;
    margin: 0 20% 0 20% ;
    width: 25%;
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
    margin-top: 2vh;
    border-radius: 15px;
}

/* Bot selection area */
.botWrapper {
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 20% 20% 20%;
    grid-template-rows: auto ;
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
    grid-column: 1 / span 3;
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
    grid-column: 2;
    font-family: 'Passion One', cursive;
    font-size: 180%;
    width: 100%;
    background-image: url("../assets/divbg.jpg");
    background-size: cover;
    background-repeat: repeat;
    border-radius: 10px;
    margin: 10% 0 0 200%;

}


}
</style>
