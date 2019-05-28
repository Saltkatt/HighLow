<template>
<div class="main">
    <div class="playerName">
        <!-- Name input max length 15 -->
        <!-- update: update input field v-model -->
        <label id="nameInputLabel" for="nameInput">Name:</label>
        <input id="nameInput" name="nameInput" type="text" maxlength="15" placeholder="Enter your name..."
                v-model="userName">
        <!-- @click="selectBot" -->
    </div>
    <div>

        
        <div class="botWrapper">
                <div 
                class="bot" v-for="bot in bots" :key="bot.id" v-on:click="selectBot(bot.id)">
                    <div :id="'bot'+bot.id" style="cursor:pointer;">
                        <div class="botImage"><img v-bind:src="bot.image"></div>
                        <div class="botName">Name: {{ bot.name }}</div>
                        <div class="botDescription">Description:<!-- add description --></div>
                        <!-- add bot selection -->
                    </div>
                </div>
        </div>
    </div>
    <div class="category">
        <label for="selectCategory">Category:</label>
        <select name="selectCategory" id="selectCategory" v-model="questionCategory">
            <option value="">Any</option>
            <option value="0">ITHS</option>
        </select>
        <!-- add api -->
    </div>
<div>
    <!-- Submit game setup to store. BL_update_3: make setupGame() send values based on variables in data() -->
    <button @click="gameSetup()">Submit</button>
</div>
</div>


    
</template>

<script>
export default {
    name: "StartMenu",
    data() {
        return {
            //BL_update:27maj
            randNumsAlreadyGenereated : [],
            questionCategory: "any",
            userName: "Player1",
            arrSelectedBots: []
        }
    },
    methods: {
        //BL_update_2.2: added selectBots function
        selectBot: function(botId) {
            // alert("bot: " + botId);
            var  botId = "bot" + botId;
            // "selected bot. add bot id. change style");
            document.getElementById(botId).setAttribute('style','mask-image: radial-gradient(circle at 10% 10%, black 10%, rgba(255,165,0, 0.6) 50%);');
            document.getElementById(botId).style.removeProperty('animation');
            arrSelectedBots.push(botId);
        },

        //BL_update_27maj
        generateRandom1to4: function() {
            while (true) {
                this.rand1to4 = Math.floor(Math.random() * Math.floor(4)) + 1;
                if (!this.randNumsAlreadyGenereated.includes(this.rand1to4)) {
                    break;
                }
            }
            this.randNumsAlreadyGenereated.push(this.rand1to4);
            return this.rand1to4;
        },


        gameSetup: function() {

        },

    },
    computed: {
        bots() {
            return this.$store.state.bots;
        },
    },
    mounted() {

    }
}
</script>

<style scoped>

/* update: add selected bot style */
.selectedBot {
    background: green;
}

.main {
    background: #3b3b3b;
    color: azure;
}

.playerName {
    display: grid;
    margin: auto;
    width: 25%;
}

.botWrapper {
    display: grid;
    /* grid-template-columns: 1fr 1fr; */
    grid-template-columns: 50px 1fr;
    /* width: 100%; */
    /* border: 5px solid brown; */

}
/* .bot{
    /* display: grid;
    border: 1px solid black;
    background: greenyellow;
    padding: 10px;
    margin: 5px auto;
    width: 50%;
} */
.bot{
    /* display: grid; */
    /* border: 3px solid rgb(184, 82, 82); */
    background: greenyellow;
    padding: 10px;
    margin: 5px auto;
    width: 200px;
    /* width: 50%; */
}

.botImage {
    margin: auto;
    width: 100px;
    height: 100px;
}

.category {
    display: grid;
    margin: auto;
    width: 25%;
}



            @keyframes orbitAnimation {
                from { transform: rotate(0deg) translateX(10px) rotate(0deg); }
                to { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
            }
            @-o-keyframes orbitAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }
            @-moz-keyframes orbitAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }
            @-webkit-keyframes orbitAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }




            @keyframes moveUpDownAnimation {
                0%,100%  { bottom: -10px;}
                50% { bottom: 10px;}
            }

            @-o-keyframes moveUpDownAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }

            @-moz-keyframes moveUpDownAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }

            @-webkit-keyframes moveUpDownAnimation {
                0%,100%  { bottom: 0;}
                50% { bottom: 50px;}
            }



            @keyframes moveRightLeftAnimation {
                0%,100%  { left: 0;}
                50% { left: 50px;}
            }
            @-o-keyframes moveRightLeftAnimation {
                0%,100%  { left: 0;}
                50% { left: 50px; }
            }
            @-moz-keyframes moveRightLeftAnimation {
                0%,100%  { left: 0;}
                50% { left: 50px;}            
            }
            @-webkit-keyframes moveRightLeftAnimation {
                0%,100%  { left: 0;}
                50% { left: 50px;}            
            }



            @keyframes flickerAnimation {
                0%  { opacity: 1;}
                50% { opacity: 0;}
                100% { opacity: 1;}
            }

            @-o-keyframes flickerAnimation {
                0%  { opacity: 1;}
                50% { opacity: 0;}
                100% { opacity: 1;}
            }

            @-moz-keyframes flickerAnimation {
                0%  { opacity: 1;}
                50% { opacity: 0;}
                100% { opacity: 1;}
            }

            @-webkit-keyframes flickerAnimation {
                0%  { opacity: 1;}
                50% { opacity: 0;}
                100% { opacity: 1;}
            }


            #bot1 {
                /*orbit animation*/
                /* position: absolute; */
                position: relative;
                /* left: 315px; */
                left: 0px;
                /* top: 143px;         center for the circle */
                top: 0px;         /*center for the circle */
                -webkit-animation: orbitAnimation 3s linear infinite;
                -moz-animation: orbitAnimation 3s linear infinite;
                -o-animation: orbitAnimation 3s linear infinite;
                animation: orbitAnimation 3s linear infinite; /* Chrome, Firefox 16+,
                                                            IE 10+, Safari 5 */
            }


            #bot2 {
                /* flicker animation */
                -webkit-animation: flickerAnimation 1s infinite;
                -moz-animation: flickerAnimation 1s infinite;
                -o-animation: flickerAnimation 1s infinite;
                animation: flickerAnimation 1s infinite;
            }

            #bot3 {
                /* up down animation */
                -webkit-animation: moveUpDownAnimation 2s linear infinite;
                -moz-animation: moveUpDownAnimation 2s linear infinite;
                -o-animation: moveUpDownAnimation 2s linear infinite;
                animation: moveUpDownAnimation 2s linear infinite;
                position: relative;
                left:0;
                bottom:0;
            }

            #bot4 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }
                
            #bot5 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }

            #bot6 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }

            #bot7 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }

            #bot8 {
                /* right left animation */
                -webkit-animation: moveRightLeftAnimation 2s linear infinite;
                -moz-animation: moveRightLeftAnimation 2s linear infinite;
                -o-animation: moveRightLeftAnimation 2s linear infinite;
                animation: moveRightLeftAnimation 2s linear infinite;
                position: relative;
                left:100;
                top:200;
            }



</style>
