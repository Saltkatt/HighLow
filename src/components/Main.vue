<template>

<div class="container">

    <header>
        <!-- Navigation Bar -->
            <nav class="nav-bar">
                <ul>
                    <router-link to="/"><li class="link"> Main Menu </li></router-link>
                    <router-link to="/statistics"><li class="link"> Statistics </li></router-link>
                    <button class="rulesButton" @click="showRules()">?</button>
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

.rulesButton{
    font-family: 'Passion One', cursive;
    background: none;
    border: none;
    background-image: url("../assets/treerings.png");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 1px 15px 5px 20px;
    margin: 0 0 0 15px;
    color: black;
    font-size: 5vw;
    float: right;
    border-radius: 12px;
    text-align: center;
}

.rulesButton:focus { outline: none; } 

.container{
    background-image: url("../assets/bg.jpg");
    /* margin: 2vw; */
}

/* Small screen */
@media screen and (max-width: 500px) {
   nav{
       font-size: 5vw;
   }
}


</style>
