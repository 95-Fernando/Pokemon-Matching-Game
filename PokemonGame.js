//Variables
let flippedCards = 0;
let cardOne = null;
let firstResult = null;
let cardTwo = null;
let secondResult= null;
let movementsCounter = 0;
let hitsCounter = 0;
let timer = false;
let timeCounter = 40;
let regressiveTime = null;

//Audios
let clickAudio = new Audio("assets/sounds/click.mp3")
let loseAudio = new Audio("/assets/sounds/lose.mp3")
let rightAudio = new Audio("/assets/sounds/right.wav")
let winAudio = new Audio("/assets/sounds/win.mp3")
let wrongAudio = new Audio("/assets/sounds/wrong.wav")

//HTML connections
let showMovements = document.getElementById("movements");
let showHits = document.getElementById("hits")
let firstContainer = document.getElementById("firstContainer")
let secondContainer = document.getElementById("secondContainer")
let statisticsTitle = document.getElementById("statisticsTitle")
let congratulations = document.getElementById("texts")
let winnerButton = document.getElementById("winnerButton")
let hitsContainer = document.getElementById("hitsContainer")
let timeContainer = document.getElementById("timeContainer")
let movementsContainer = document.getElementById("movementsContainer")
let timeStatistic = document.getElementById("time")
let loserText = document.getElementById("loserText")



//Generar numeros del array aleatoreamente
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(() => {return Math.random() - 0.5});
console.log(numbers)

//Función contenedora de los elementos al terminar el juego, ya sea ganar o perder 
const endGame = () => {
    firstContainer.classList.add("hide");
    statisticsTitle.classList.add("hide")
    winnerButton.classList.remove("hide")
    hitsContainer.classList.replace("statistics", "statistics__winner")
    timeContainer.classList.replace("statistics", "statistics__winner")
    movementsContainer.classList.replace("statistics", "statistics__winner")
}
const time = () => {
   const regressiveTime = setInterval(() =>{
        timeCounter--;
        timeStatistic.innerHTML = `${timeCounter} s`
        if(timeCounter == 0){
            clearInterval(regressiveTime)
            loseAudio.play();
            endGame();
            secondContainer.classList.replace("container", "winner__container")
            secondContainer.classList.add("loser__container")
            loserText.classList.remove("hide")
        } else if(hitsCounter == 8){
            clearInterval(regressiveTime)
            }
    },1000);
}
// Función a ejutar a la hora de voltear las tarjetas
const flip = (id) => {
    if(timer == false){
        time();
        timer = true // se pone el valor true despues de ejecutar, para hacer que la función unicamente se ejecute una vez
    }

    flippedCards++
    console.log(flippedCards)

    if(flippedCards == 1){ // Ejecución cuando el contador es 1
        clickAudio.play();
        cardOne = document.getElementById(id);
        firstResult = `<img src="/assets/images/${numbers[id]}.png" alt="">`;
        cardOne.innerHTML = firstResult;
    
        //Deshabilitar el boton uno
       cardOne.setAttribute("disabled","true")
    } else if (flippedCards == 2){ // Ejecución cuando el contador es 2
        cardTwo = document.getElementById(id);
        secondResult = `<img src="/assets/images/${numbers[id]}.png" alt="">`;
        cardTwo.innerHTML = secondResult;
        
        //Deshabilitar segundo botón
        cardTwo.setAttribute("disabled","true")

        //Incrementar movimientos
        movementsCounter++
        showMovements.innerHTML = movementsCounter

        //Encerar el contador de tarjetas destapadas
        flippedCards = 0
        
        //Consultar si la primer resultado es igual al segundo resulado
        if(firstResult == secondResult){
            rightAudio.play();
            cardOne.classList.replace("card", "card__right")
            cardTwo.classList.replace("card", "card__right")
            hitsCounter++
            showHits.innerHTML = hitsCounter 
        } else { // Caso contrario en que los 2 resultados no sean iguales
            setTimeout(() =>{
                wrongAudio.play();
                cardOne.innerHTML = ""
                cardTwo.innerHTML = ""
                cardOne.removeAttribute("disabled")
                cardTwo.removeAttribute("disabled")
            }, 500 ) ;
        }
    }
    if(hitsCounter == 8){ //Preguntar si el usuario hizo 8 aciertos
        //Mostrar mensaje de Felicitaciones
       winAudio.play();
       endGame()
       secondContainer.classList.replace("container", "winner__container")
       congratulations.classList.remove("hide")
    }
}

const refresh = () =>{
    location.reload()
}




