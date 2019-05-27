<template>
<div>
    
    <header>
        <!-- Navigation Bar -->
            <nav>
                <ul class="navBar">
                    <li>Main Menu</li>
                    <li>HighScore</li>
                    <li>Statistics</li>
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

.navBar{
    display: flex;
    justify-content: space-evenly;
}
nav {
    font-size: 5vw;
    background-color: none;
    padding: 2px;
    color: white;
}
ul {
    align-items: baseline;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0px;
}

.rulesButton{
    font-family: 'Passion One', cursive;
    background: none;
    border: none;
    background-image: url("../assets/treerings.png");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 5px 10px 5px 10px;
    margin: 0%;
    color: black;
    font-size: 5vw;
    float: right;
    border-radius: 12px;
    text-align: center;
}

.rulesButton:focus { outline: none; }



</style>
