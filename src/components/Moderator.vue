<template>
    <div>

    </div>
    
</template>

<script>
export default {

    data(){
        return{
            talk:
        }
    },
    methods:{
        hiLow: function(guess){
            var respons=null;
            if(this.$store.guess<this.$store.answer){
                respons="Too Low!";
                else{
                    respons="Too High!";
                }   

            }

            return respons
        },
         Talk: function(msg){
            this.talk=msg;

            return msg
        },

    }

}
</script>

<style>

</style>