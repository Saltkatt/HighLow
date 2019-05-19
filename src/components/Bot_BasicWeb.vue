<template>
    <div id="placeholder">
        <div id="title">
            Vänta... Boten gissar...
        </div>
        <div id="textBox">
        
        </div>
    </div>
</template>

<script>
export default {
    name: "Bot_BasicWeb",
    data() {
        return {
            // name: "Player",
            arrGuessedNumbers: [],
        }
    },
    mounted() {
        // alert("set focus");
        document.getElementById("numberField").focus();
        
    },
    methods: {        
        startGuess () {
            //logic for guessing -> result number
            //send to store. get reply "too low/too high/correct" -> save to its array
        },

    },
}
</script>

<style scoped>
            #placeholder {
                display: grid;
                border: 1px solid green;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-auto-rows:200px;

                width: 90%;
                padding: 5px;
                background-color: rgb(46, 190, 247);
                height: 100px;
            }
        
        #textBox {
            background-color: rgba(0, 0, 255, 0.404);
            height: 100px;
        }
        


</style>
