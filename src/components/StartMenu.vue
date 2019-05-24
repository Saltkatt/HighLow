<template>
<div class="main">
    <div class="playerName">
        <!-- Name input max length 15 -->
        <label id="nameInputLabel" for="nameInput">Name:</label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..." v-model="nameValue">
        <!-- @click="selectBot" -->
    </div>
    <div>
        <div
        class="bot" 
        v-for="bot in bots" 
        :key="bot.id"
  
        >
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
            <option value="">Any</option>
            <option value="0">ITHS</option>
        </select>
        <!-- add api -->
    </div>
<div>
    <!-- Submit game setup to store -->
    <button @click="setupGame(nameValue, categoryValue, botList)">Submit</button>
</div>
</div>


    
</template>

<script>
export default {
    name: "StartMenu",
    data() {
        return {
            nameValue: null,
            categoryValue: ""
        }
    },
    methods: {
        selectBot: function() {
            alert("selected bot. add bot. change style");
            },

        setupGame(nameValue, categoryValue, BotIdArray) {
        //update: add setupGame function
            alert("setup");
            this.$store.commit({
                    type:'gameSetup', 
                    userName: nameValue,
                    userCategory: categoryValue,
                    userSelectedBots: BotIdArray
                }); //BL: have function setupGame in store

            // Todo: add bot selection and send to store.
            // send categoryValue to store, make a getter for category,
            // current question variable to store a question from that category
        }
    },
    computed: {
        bots() {
            return this.$store.state.bots;
        }
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
