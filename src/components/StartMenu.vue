<template>
<div>
    <div>
        <!-- Name input max length 15 -->
        <label id="nameInputLabel" for="nameInput">Name</label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..." v-model="nameValue">
    </div>
    <div>
        <div 
        class="bot" 
        v-for="(bot, index) in bots" 
        v-bind:key="index">
            <div class="botImage">
                <img v-bind:src="bot.image">
            </div>
            <div class="botName">Name: {{ bot.name }}</div>
            <div class="botDescription">Description:<!-- add description --></div>
        </div>
    </div>
<ul>
    <li><h2>Categories</h2></li>
</ul>
<div>
    <!-- Submit game setup to store -->
    <button @click="sendToStore(nameValue)">Submit</button>
</div>
</div>


    
</template>

<script>
export default {
    name: "StartMenu",
    data() {
        return {
            nameValue: null
        }
    },
    methods: {
        sendToStore(nameValue) {
            this.$store.commit('gameSetup', nameValue);
            // Todo: add bot selection and send to store.
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
.bot{
  border: 1px solid black;
  background: greenyellow;
  padding: 10px;
  margin: 5px;
}

.botImage {
    margin: auto;
    width: 100px;
    height: 100px;
}
</style>
