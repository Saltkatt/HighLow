<template>
<div>
    <Rules></Rules>
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
   /*  created() {
        this.secondCounter()
    }, */
    data() {
        return {
            seconds: 20
        }
    },
    methods: {
        //Countdown funktion currently implemented by created()
        /* secondCounter(){
            // var second = 10;
            function incrementSeconds(){
                this.seconds -= 1;
                if(this.seconds == -1){
                    this.seconds = 10;
                }
                console.log(this.seconds)

            }
            var cancel = setInterval(incrementSeconds.bind(this), 1000);
            return second;
        } */

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

.container1{
    background-color: chartreuse;
    padding: 10px;
    margin: auto;
}

.container2{
    background-color: orange;
    padding: 10px;
    margin: auto;
}

.container3{
    background-color: crimson;
    padding: 10px;
    margin: auto;
}

.container4{
    display: grid;
    grid-template-columns: auto auto;
    background-color: deeppink;
    padding: 10px;
}

.container5{
    background-color:lavender;
    padding: 10px;
    margin: auto;
}

.round{
    background-color: honeydew;
}

.time{
    background-color: turquoise;
}

.rulesButton{
    background: yellow;
    padding: 5px 10px 5px 10px;
    margin: 0% 5% 0% 0%;
    
    float: right;
    border-radius: 12px;
}

.rulesButton:focus { outline: none; }



</style>
