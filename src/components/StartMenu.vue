<template>
<div>
    <div>
        <!-- Name input max length 15 -->
        <label id="nameInputLabel" for="nameInput">Name</label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..." v-model="nameValue">
    </div>
<ul>
    <li><h2>BotList</h2></li>
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
        }
    }
}
</script>

<style scoped>

</style>
