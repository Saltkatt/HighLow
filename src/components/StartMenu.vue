<template>
<div class="main">
    <div class="playerName">
        <!-- Name input max length 15 -->
        <!-- update: update input field v-model -->
        <label id="nameInputLabel" for="nameInput">Name:</label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..."
                v-model="userName">
        <!-- @click="selectBot" -->
    </div>
    <div>
        <div
        class="bot" 
        v-for="bot in bots" 
        :key="bot.id"
        >
            <div class="botImage"><img v-bind:src="bot.image"></div>
            <div class="botName">Name: {{ bot.name }}</div>
            <div class="botDescription">Description:<!-- add description --></div>
            <!-- add bot selection -->
        </div>
    </div>
    <div class="category">
        <label for="selectCategory">Category:</label>
        <select name="selectCategory" id="selectCategory" v-model="questionCategory">
            <option value="">Any</option>
            <option value="0">ITHS</option>
        </select>
        <!-- add api -->
    </div>
<div>
    <!-- Submit game setup to store. BL_update_3: make setupGame() send values based on variables in data() -->
    <button @click="setupGame()">Submit</button>
</div>
</div>


    
</template>

<script>
export default {
    name: "StartMenu",
    data() {
        //BL_update_1: added variables that will be computed and sent on setupGame() function
        return {
            userName: "Player1",
            userGuess: null,
            userLowestGuess: 0,
            userHighestGuess: 0,
            userNumberOfGuesses: 0,
            userScore: 0,
            UserIsHuman: true,
            userImageName: "playerImage1.jpg",
            questionCategory: "Any",
            arrQuestionAnswerObjects: [], //to be saved as questionBank content in store, eg: [{question: 'Hur många dollar tjänar Bill Gates per minut?',answer: 23148},...]
            userIsMyTurn: false,
            arrSelectedBotIds: [], //1, 2, ...
        }
    },
    methods: {
        //BL_update_2.2: added selectBots function
        selectBots: function() {
            alert("selected bot. add bot id. change style");
            },

        setupGame: function() {
            //BL_note: get questions and answer from API
            //BL_update_2.1: added setupGame function
            alert("setup... userName: " + this.userName +"\n" +
                    "userGuess: null, \n" +
                    "userLowestGuess: 0 \n" +
                    "userHighestGuess: 0 \n" +
                    "userNumberOfGuesses: 0 \n" +
                    "userScore: 0\n" + 
                    "userImageName: " + this.userImageName + "\n" +
                    "questionCategory: " + this.questionCategory + "\n" +
                    "userIsMyTurn: false, userIsHuman: true \n" +
                    "arrSelectedBotIds: " + this.arrSelectedBotIds);

            this.$store.commit({
                type:'gameSetup', 
                    //submit variable values that form the user detail object
                    userName: this.userName, //have
                    userGuess: null,
                    userLowestGuess: this.userLowestGuess,
                    userHighestGuess: this.userHighestGuess,
                    userNumberOfGuesses: this.userNumberOfGuesses,
                    userScore: this.userScore,
                    UserIsHuman: this.UserIsHuman,
                    userImage: this.userImageName, //have
                    questionCategory: this.questionCategory, //have
                    userIsMyTurn: this.userIsMyTurn,
                    userSelectedBots: this.arrSelectedBotIds //have
            });

        }
    },
    computed: {
        bots() {
            return this.$store.state.bots;
        },
    }
}
</script>

<style scoped>

/* update: add selected bot style */
.selectedBot {
    background: green;
}

.main {
    background: #3b3b3b;
    color: azure;
}

.playerName {
    display: grid;
    margin: auto;
    width: 25%;
}

.bot{
    display: grid;
    border-radius: 12px;
    border: 1px solid black;
    background: greenyellow;
    padding: 10px;
    margin: 5px auto;
    width: 50%;
}

.botImage {
    margin: auto;
    width: 100px;
    height: 100px;
}

.category {
    display: grid;
    margin: auto;
    width: 25%;
}
</style>
