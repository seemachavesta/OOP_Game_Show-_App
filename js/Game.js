/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;

    }

    /**
* Creates phrases for use in game
* @return {array} An array of phrases that could be used in the game
*/
    createPhrases(){
        const phraseContainer = ['A fish out of water', 'A Sorry sight', 'A Sea change', 'Age before beauty', 'A drop in the ocean'];
        const phraseObj = [];
        phraseContainer.forEach(phrase => {
            phraseObj.push(new Phrase(phrase));
        })
       
     return phraseObj     
       
    }

    /**
     * Selects random phrase form phrases property;
     * @return {object} phrases
     */
    getRandomPhrase(){
        let randomPhrase =  Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomPhrase];
        
    }

    // Start game by selecting a random phrasee and displaying it to user
    startGame(){
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
          
    }

    /**
     * Check to see if user has guessed all letter;
     * @returns {boolean} true if game has been won, false if  lost
     */
    checkForWin(){  
        const arr = [];
        const board = document.querySelector('#phrase ul').children; 
        const phrase = this.activePhrase.phrase.split('')
     
        for(let i = 0; i < board.length; i++){
            if(board[i].classList.contains('show') || board[i].classList.contains('space')){
                arr.push(board[i].textContent);  
            }
        }

       const sameLength = arr.length === phrase.length;
       for(let i = 0; i < arr.length; i++){
           for(let j = 0; j < phrase.length; j++){
               if(arr[i] === phrase[j] && sameLength){
                   return true;
               }else{
                  return false;
               }
           }
       }

    }

    /**
     * Increase the value of missed property;
     * Remove a life form heart
     * Check if player has remaining live heart and end the game if player is out;
     */
    removeLife(){
        const imgs = document.querySelectorAll('img');
        this.missed++
        if(this.missed < imgs.length){
            imgs[this.missed].src = "images/lostHeart.png" ;
        }else{
            game.gameOver(this.checkForWin());
        }  
        
    }
    
   /**
    * Display the message when player won or lose ;
    * @param {boolean} gamewon 
    */
    gameOver(gamewon){
        const overlay = document.querySelector('#overlay');
        overlay.style.display = '';
        const h1 = document.querySelector('#game-over-message');
        if(gamewon){
            h1.textContent = 'You have won the game 🏆'
            overlay.setAttribute('class', 'win');
            this.resetGame();
        }else{
            h1.textContent = 'Sorry better luck next time 😞'
            overlay.setAttribute('class', 'lose');
            this.resetGame();
        }
       
    }
/**
 * Handle onscreen keyboard button clicks;
 * @param {HTMLButtonElement} button - The clicked button element
 * @param {HTMLButtontextContent} string - The clicked button text content; 
 */
    handleInteraction(button, letter){       

        if(!game.activePhrase.checkLetter(letter)){
            button.disabled = true;
            button.classList.add('wrong');
            this.removeLife();
        }else{
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);  
            
        }
       if(this.checkForWin()){
           this.gameOver(true); 

       }
        
       
    }
   
    // reset the game after game is over 
    resetGame(){
        this.missed = 0;
        const phrase = document.querySelector('#phrase')
        const ul = phrase.firstElementChild;
        const key = document.querySelectorAll('.key')
        key.forEach(button => {
            button.classList.remove('chosen');
            button.classList.remove('wrong');
            button.disabled = false; 
        })
        const img = document.querySelectorAll('img');
        img.forEach(imgs => imgs.src = "images/liveHeart.png")
        if(ul.innerHTML.trim() !== ""){
            ul.innerHTML = '';
        }

    }


       

}

