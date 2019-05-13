<template>
    <div>
        <div class="grid-container">
            <div class="grid-item question-box">
                <h3>Q:</h3>
            </div>
            <div class="grid-item item1">
                <div class="talkContainer">{{hiLow(20)}}</div>
            </div>
            <div class="grid-item modImage">
                <img v-bind:src="image">
            </div>
            
            
        </div>

        
        

    </div>

</template>

<script>
import moderatorImage from '../assets/logo.png';

export default {
    name: "Moderator",
    data() {
        return {
            image: moderatorImage,
            rules: [
                {
                    
                }
            ]
            
        }

    },

    methods:{
        //Receives guess from XXX and checks correct, too high or too low. Sends response.
        hiLow: function(guess){
            var respons = null;
            var answer = 15;
            if(guess == answer){
                respons = "Correct!";
            }
            else if(guess < answer) {
                respons = "Too low!";
                //save to array
            }
            else if (guess > answer) {
                respons = "Too high";
                //save to array
            } 
        
            return this.talk(respons)
        },
         talk: function(msg){

            return msg
        },

    }
    

}

</script>

<style>
.grid-container{
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    grid-gap: 5px;
    background-color: blueviolet;
    padding: 5px;
}
.grid-item{
    background-color: lavender;
    text-align: center;
    padding: 5px;
    font-size: 25px;
}
.item1{
    grid-column: 1 / span 2;
    grid-row: 2 / span 2 ;
    background-color:lavender;
}
.modImage{
    grid-column: 3;
    grid-row: 2 / span 2;
    background-color: chartreuse;
}
.question-box{
    grid-column: 1 / span 3;
    grid-row: 1;
    text-align: left;
}
.modContainer{
    background-color: aquamarine;

}
img{
    float: center;
    width: 50px;
    height: 50px;
}

</style>
