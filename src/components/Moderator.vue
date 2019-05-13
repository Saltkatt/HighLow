<template>
    <div>

    </div>
    
</template>

<script>
import moderatorImage from "../assets/logo.png";
export default {

    data(){
        return{
            moderator[
                {name:"Moderator",image:moderatorImage}
            ]

        }
    },
    methods:{
        // Receive guess from xx end send respons
        hiLow: function(guess){
            const respons=null;
                if(guess==this.$store.state.answer)
                    respons="Correct!";
                else if(guess<this.$store.state.answer){
                    respons="Too Low!";
                        // Save guess to array in store
                        else if(guess<this.$store.state.answer){
                            respons="Too Low!";
                            // Save guess to array in store
                        }   

                }

            return respons
        },
         Talk: function(msg){
            

            return msg
        },

    }

}
</script>

<style>

</style>