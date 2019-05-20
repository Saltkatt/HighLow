<template>
<div>  
    <header>
        <!-- Navigation Bar -->
            <nav>
                <ul>
                    <li>Main Menu</li>
                    <li>HighScore</li>
                    <li>Statistics</li>
                </ul>
            </nav>
    </header>

    <!-- Moderator component -->
    <Moderator></Moderator>
    <!-- Player and Bots -->
    <Players></Players>


    


    <!-- User input  -->
    
</div>
    
</template>

<script>
import Moderator from '../components/Moderator'
import Players from '../components/Players.vue'

import PlayerInteract from '../components/PlayerInteract.vue'

export default {
    name: "Main",
    components: {
        Moderator,
        Players,
        PlayerInteract,

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



</style>

