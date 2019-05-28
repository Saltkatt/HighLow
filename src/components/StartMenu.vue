<template>
<div class="main">
    <div class="playerName">
        <!-- Name input max length 15 -->
        <label id="nameInputLabel" for="nameInput">Name:</label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..." v-model="nameValue">
    </div>
    <div>
        <div 
        class="bot" 
        v-for="bot in bots" 
        :key="bot.id">
            <div class="botImage">
                <img v-bind:src="bot.image">
            </div>
            <div class="botName">Name: {{ bot.name }}</div>
            <div class="botDescription">Description:<!-- add description --></div>
            <!-- add bot selection -->
        </div>
    </div>
    <div class="category">
        <label for="selectCategory">Category:</label>
        <select name="selectCategory" id="selectCategory" v-model="categoryValue">
            <option value="0">ITHS</option>
            <option value="19">Science: Mathematics</option>
        </select>
    </div>
<div>
    <!-- Submit game setup to store -->
    <button @click="sendToStore(nameValue)">Submit</button>
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
            selectedQuestion: null
        }
    },
    methods: {
        sendToStore(nameValue) {
            // Todo: add bot selection and send to store.
            // get a random question in selected category
            this.getCategoryQuestions(this.categoryValue);
            // send setup to store
            console.log('selectedQuestion before sending: '+this.selectedQuestion.question);
            //this.$store.commit('gameSetup', nameValue, this.selectedQuestion);
            this.$store.commit('assignPlayerName', nameValue);
            this.$store.commit('assignQuestion', this.selectedQuestion);
        },
        getCategoryQuestions: async function(categoryId) {
            categoryId = Number(categoryId);

            if (categoryId == 19) {
                // assign a random question
                let randomNumber = Math.floor(Math.random() * Math.floor(this.apiQuestions.length));
                let randomQuestion = this.apiQuestions[randomNumber];
                console.log('randomQuestion: '+randomQuestion);
                this.selectedQuestion = randomQuestion;

            }
            else if (categoryId == 0) {
                
                // assign a random question
                let randomNumber = Math.floor(Math.random() * Math.floor(this.bankQuestions.length));
                let randomQuestion = this.bankQuestions[randomNumber];
                console.log('randomQuestion: '+randomQuestion);
                this.selectedQuestion = randomQuestion;
            }
            else {
                console.log('Wrong category id! categoryId: '+categoryId);
            }
        }
    },
    computed: {
        bots() {
            return this.$store.state.bots;
        }
    },
    mounted() {
        //axios.get('https://opentdb.com/api_token.php?command=request').then(response => (this.tokenResponse = response.data.token, this.tokenResponseCode = response.data.response_code));

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
