<template>

<div class="main">
    <div id="placeholder">
        <div id="cards">
            Cards
        </div>
        <div id="pointForRandom" ref="pointForRandom">
        </div>
        <div id="randomNumber">
            25
        </div>
        <div id="okButton">
            OK
        </div>

        <div id="card">
            <figure class="front">Front Side</p></figure>
            <figure class="back">Back Side</p></figure>
        </div>

        <br>https://codepen.io/bravotanmoy/pen/NbKgJB
        <br>https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness
    </div>
</div>
    
</template>

<script>
export default {
    name: "Player",
    methods: {
        createRandomNumber() {
            ranNum = Math.floor(Math.random()*1000);
            document.getElementById("randomNumber").innerHTML = ranNum;
            alert('random...');
        },
    
        registerCard() {
            cardsPlace = document.getElementById("cards");            
            newCard = document.createElement('div');
            newCard.setAttribute("id", "card");
            newCard.innerHTML = `
                <figure class='front'>#</p></figure>
                <figure class='back'>#</p></figure>
                `;            
            cardsPlace.appendChild(newCard)
        },
    
        // document.getElementById("pointForRandom").addEventListener("mouseover", function() {
        //     createRandomNumber();
        // })

        // document.getElementById("okButton").addEventListener("click", function() {
            //     registerCard();
        //  })
    },
    mounted() {
        console.log("--" + this.$refs["pointForRandom"]);
        this.$refs["pointForRandom"].addEventListener("mouseover", function() {
            this.createRandomNumber;            
        })
    }
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
        
    #cards {
        margin: 10px;
        width: 100%;
        height: 90px;
        padding: 0px;
        background-color: palegreen;
    }
        
    #pointForRandom {
        margin: 10px;
        width: 150px;
        height: 90px;
        padding: 0px;
        background-color: darkseagreen;
    }


    #randomNumber {
        margin: 10px;
        width: 150px;
        height: 90px;
        padding: 0px;
        background-color: darkseagreen;   
        text-align: center;
        font-size: 50px;
        font-family: Tahoma;
    }
        
    #okButton {
        margin: 10px;
}        width: 150px;
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
        
        
        
        
#card {
  border:solid 1px #000;
  width: 50px;
  height: 50px;
  /*position: absolute;*/
    display: inline-block;
  -webkit-transition: -webkit-transform 0.4s;
  -moz-transition: -moz-transform 0.4s;
  -o-transition: -o-transform 0.4s;
  transition: transform 0.4;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

figure {
  display: block;
  height: 100%;
  width: 100%;
  line-height: 50px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  position: absolute;
  margin: 0;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.front {background: red;}

.back {
  background: blue;
  -webkit-transform: rotateY( 180deg);
  -moz-transform: rotateY( 180deg);
  -o-transform: rotateY( 180deg);
  transform: rotateY( 180deg);
}
#card:hover {transform:rotateY(180deg);}
        
        
</style> 

