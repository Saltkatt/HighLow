<template>

<div class="container">

    <header>
        <!-- Navigation Bar -->
            <nav class="nav-bar">
                <ul>
                    <router-link to="/"><li class="link">Main Menu</li></router-link>
                    <router-link to="/statistics"><li class="link">Statistics</li></router-link>
                    <button class="btn playButton" @click="play()">Play</button>
                    <button class="btn rulesButton" @click="showRules()">?</button>
                </ul>

            </nav>
    </header>

    <RoundTime></RoundTime>

    <!-- Moderator component -->
    <Moderator></Moderator>

    <!-- Player and Bots -->
    <Players></Players>

    <Rules></Rules>
     <!-- Modal box component -->
    <WinnerBox></WinnerBox>


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
        },
        play(){

            this.$store.dispatch("playGame");
        }
    }
}
</script>

<style scoped>

nav {
    font-size: 3vw;
    padding: 2px;
    color: white;
}

.nav-bar{
    display: flex;
    justify-content: space-evenly;
}

ul {
    align-items: baseline;
    padding: 0;
    margin: 0;
    font-size: 2vw;
}

li {
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

.btn{
    font-family: 'Passion One', cursive;
    background: none;
    border: none;
    background-size: contain;
    background-repeat: no-repeat;
    color: black;
    float: right;
    text-align: center;
    align-items: baseline;
    
}

.rulesButton{

    background-image: url("../assets/divbg.jpg");
    background-size: contain;
    background-repeat: repeat;

    font-size: 2vw;
    border-radius: 12px;
    padding: 0px 1vw;
    margin: 5px 0 0 10px;
}

.rulesButton:focus { outline: none; }

.playButton{
    font-size: 3vw;
    background-image: url("../assets/planka3.png");
    background-size: contain;
    background-repeat: no-repeat;
    margin: 2% 0;
}

/* Small screen */
@media screen and (max-width: 500px) {
   nav{
       font-size: 5vw;
   }
}


</style>
