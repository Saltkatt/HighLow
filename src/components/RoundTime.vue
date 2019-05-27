<template>
    <div class="grid-container">

        <div class="round">
            <h3>Round: {{ round }}</h3>
        </div>
        <div class="time" >
            <h3>Time: {{ seconds }}  </h3>
        </div>

    </div>
</template>

<script>

export default {
    name: 'RoundTime',
    
    computed: {
    
        round() {
            return this.$store.state.round;
        },
         seconds(){
             return this.$store.state.seconds;
         }
    }
}
</script>

<style scoped>
/* Round and Time container */
.grid-container {
  display: grid;
  grid-template-areas: 
  'r t'; 
  background-color: gold;
  padding: 10px;
}

.round {
  background-color: honeydew;
  grid-area: r;
}

.time {
  background-color: honeydew;
  grid-area: t;
}

@media screen and (max-width:500px){


}

</style>
