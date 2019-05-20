<template>
    <div>
        <div class="grid-container">
            <div class="grid-item question-box">
                <p>Q: {{questions()}}</p>
                <button class="btn" @click="onBtnClick">New Q {{count}}</button>
            </div>
            <div class="grid-item item1">
                <div class="talkContainer">{{hiLow(this.getGuess)}}</div>
            </div>
            <div class="grid-item modImage">
                <img v-bind:src="image">
            </div>
            
        </div>

    </div>

</template>

<script>
import moderatorImage from '../assets/logo.png';
import { mapGetters } from 'vuex';
export default {

    name: "Moderator",
    data() {
        return {
            image: moderatorImage,
            rules: [
                {
                    rule1: "All questions have numerical answers and I expect you answer using digits."
                },
                {
                    rule2: "Everyone will have one opportunity to answer once per round."
                },
                {
                    rule3: "The game will continue until someone has answered correctly."
                }
            ],
            phrases: [
                {
                    phrase1: "This was a difficult one"
                },
                {
                    phrase2: "Hurry up slowpoke!!"
                }
            ],
            count: 0
            
        }

    },

    methods:{
        
        //talk() conveys information such hiLow() respons, rules, and phrases 
        //which allows moderator to interact with player.
         talk: function(msg){

            return msg
        },

        onBtnClick(){
            this.count++;
            this.questions()
            this.answers()

        }, 
        //Retrieves questions from the questionBank array
        questions(){
            var q = this.getQuestionBank;
            
            for(var i = 0; i < q.length; i++){
                
                if(this.count == q.length) {
                this.count = 0;
                }
                console.log(q[i + this.count].question )
                return q[i + this.count].question 
                
            } 
            

            
        },
        //Retrieves answers from questionBank array 
        answers(){
            var q = this.getQuestionBank;
           
            for(var i = 0; i < q.length; i++){
                 if(this.count == q.length) {
                this.count = 0;
                }
            console.log(q[i + this.count].answer)
                return q[i + this.count].answer
            } 
            
        },

        //Retrieves answer from answer()
        //Receives guess from XXX and checks correct, too high or too low. Sends response.
        hiLow: function(guess){
            var respons = null;
            var answer = this.answers();
            if(guess == answer){
                respons = "Correct!";
            }
            else if(guess < answer) {
                respons = "Too low!";
                this.$store.commit('setLowestNumber', guess)
            }
            else if (guess > answer) {
                respons = "Too high";
                this.$store.commit('setHighestNumber', guess)

            } 
        
            return this.talk(respons)
        },

    },
    computed: mapGetters(['getQuestionBank', 'getGuess'])
    
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
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    padding: 5px;
    font-size: 25px;
}
.item1{
    grid-column: 1 / span 2;
    grid-row: 2 / span 2 ;
    background-color:lavender;
    padding-top: 2%;
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
