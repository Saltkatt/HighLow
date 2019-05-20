<template>
    <div id="placeholder">

        <!-- <div id="textBox"> -->
            <input id="numberField" placeholder="0000" name="thisNumber" type="number" v-bind="number"
            min="-500000" max="500000" step="1">
        <!-- </div> -->
        <!-- <div id="submit"> -->
            <input id="okButton" type="submit" value="OK" @click="sendNumber(number)">
        <!-- </div> -->

    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "Player",
            number: null
        }
    },
    mounted() {
        // alert("set focus");
        document.getElementById("numberField").focus();
        
    },
    methods: {        
        sendNumber () {
            // var reg = /^\d+$/;
            // var numStr = this.number.toString();
            // if (this.numStr == null) { alert ("Input is not all numbers"); }
            
            // alert (this.number);
            this.$store.commit("setGuessNumber", this.number);
        },

    },
}
</script>

<style scoped>
        #placeholder {
            box-sizing: border-box;
        }

        #numberField {
            margin: auto;
            padding: 16px 32px;
            width: 60%;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 16px;
            cursor: pointer;
        }
        
        #okButton {
            background-color: gold;
            border: 1px solid black;
            border-radius: 8px;
            padding: 16px 32px;
            width:25%;
            display: inline-block;
            font-size: 16px;
            margin: auto;
            cursor: pointer;
        }
        #okButton:hover {
            /* brightness(0.4);  /* 40% brightness */
            filter: brightness(120%);
        }

       
        


</style>
