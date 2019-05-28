<template>
<div class="container">
    <Rules></Rules>

    <header>
        <!-- Navigation Bar -->
            <nav>
                <ul>
                    <router-link to="/"><li>Main Menu</li></router-link>
                    <router-link to="/statistics"><li>Statistics</li></router-link>
                    <button class="rulesButton" @click="showRules()">?</button>
                </ul>

            </nav>
    </header>

    <RoundTime></RoundTime>
    <WinnerBox></WinnerBox>

    <!-- Moderator component -->
    <Moderator></Moderator>

    <!-- Player and Bots -->
    <Players></Players>

</div>

</template>

<script>
import Moderator from '../components/Moderator'
import Players from '../components/Players.vue'
import WinnerBox from '../components/WinnerBox.vue'
import Rules from '../components/Rules.vue'
import RoundTime from '../components/RoundTime'



export default {
    name: "Main",
    components: {
        Moderator,
        Players,
        WinnerBox,
        Rules,
        RoundTime,
    },

    methods: {

        showRules(){

            this.$store.commit("showRules");
        }
    }

}
</script>

<style scoped>

nav {
    font-size: 18px;
    background-color: gainsboro;
    padding: 2px;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}

.rulesButton{
    background: yellow;
    padding: 5px 10px 5px 10px;
    margin: 0% 5% 0% 0%;

    float: right;
    border-radius: 12px;
}

.rulesButton:focus { outline: none; } 

.container{
    background-color: burlywood;
}


</style>
