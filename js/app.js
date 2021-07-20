/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */



const game = new Game();

const startButton = document.querySelector(`#btn__reset`);
// listen click event on start button;
startButton.addEventListener('click', () => {
     game.startGame();   
}
)


// listen the click even on virtual keyboard;
const keyBoard = document.querySelector('#qwerty');

keyBoard.addEventListener('click', (e) => {
    const button = e.target;
    const letter = e.target.textContent
    if(e.target.tagName === "BUTTON"){
       game.handleInteraction(button, letter);
       
    }
   
    
})

// event listener for physical keyboard;
document.addEventListener('keydown', e => {
    const letter = e.key;
    const keys = document.querySelectorAll('.key');
    const overlay = document.querySelector('#overlay');
    if(overlay.style.display === 'none'){
        keys.forEach((key) => {
        if(key.textContent === letter){
            game.handleInteraction(key, letter)
           
        }
      
         })
        
    } 

})
