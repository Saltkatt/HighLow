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
             return this.$store.state.time;
        }
       
    }
}
</script>

<style scoped>
/* Round and Time container */

h3{
    margin: 0px;
}
.grid-container {
  display: flex;
  justify-content: center;
  background-color: none;
  color: white;
  font-family: 'Passion One', cursive;
  font-size: 5vw;
  
}

.round{
    margin: 0px 20px;
    padding: 0px;
}

.time{
    margin: 0px 20px;
    padding: 0px;

}


</style>
