<template>
    <div id="placeholder">
        <div id="title">
            Gissa:
        </div>
        <div id="textBox">
            <input id="numberField" name="thisNumber" type="number"
                min="1" max="500000" step="10"
                v-bind="number" 
            >
        </div>
        <div id="submit">
            <input id="okButton" type="submit" value="Ok" @click="sendNumber(number)">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "Player",
            number: 0
        }
    },
    mounted() {
        alert("set focus");
        document.getElementById("numberField").focus();
        
    },
    methods: {        
        sendNumber (number) {
            //check if number in correct format:
            //patt = /^[0-9]*$/g

            // hiLow(number);
        },

        checkIfNumber () {
            alert(number);
        }

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
                background-color: greenyellow;
                height: 100px;
            }
        
            #okButton {
                margin: 10px;
                width: 150px;
                height: 90px;
                padding: 0px;
                background-color: gold;   
                text-align: center;
                font-size: 50px;
                font-family: Tahoma;
            }
        #okButton:hover {
            /* brightness(0.4);  /* 40% brightness */
            filter: brightness(120%);
        }

        #numberField {
            width:200px;
            height: 90px;
            font-size: 50px;
            
        }
        


</style>
