<template>
<div>
    <header>
        <!-- Navigation Bar -->
            <nav>
                <ul>
                    <li>Main Menu</li>
                    <li>HighScore</li>
                    <li>Statistics</li>
                    <button class="rulesButton" @click="showRules()">?</button>
                </ul>
                
            </nav>
    </header>
    <!-- Modal box component -->
    <WinnerBox></WinnerBox>
    <Rules></Rules>
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


export default {
    name: "Main",
    components: {
        Moderator,
        Players,
        WinnerBox,
        Rules


    },
  
    data() {
        return {
            seconds: 20
        }
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
    background-color: gainsboro;
    padding: 5px;
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
    margin-right: 5%;
    float: right;
    border-radius: 12px;
}

.rulesButton:focus { outline: none; }



</style>
