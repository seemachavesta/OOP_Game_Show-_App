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
       const phraseObj = [
           {
               phrase: 'A fish out of water'
            },
           {
               phrase: 'A Sorry sight'
            },
            {
                phrase: 'A Sea change'

            },
            {
                phrase: 'Age before beauty'

            },
            {
                phrase: 'A drop in the ocean'

            }

       ]
       return phraseObj;
    }
    /**
     * Selects random phrase form phrases property;
     * @return {object} phrases
     */
    getRandomPhrase(){
        let randomPhrase =  Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomPhrase].phrase;
        
    }
    startGame(){
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
        const randomPhrase = this.getRandomPhrase();
        const phrases = new Phrase(randomPhrase);
        phrases.addPhraseToDisplay();
        this.activePhrase = phrases;  
        
        
    }
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

    // function to replace liveHeart img with lostHeart;
    removeLife(){
        let missed = this.missed ++;
        const imgs = document.querySelectorAll('img');
   
        if(missed < imgs.length){
            imgs[missed].src = "images/lostHeart.png" ;
        }else{
            game.gameOver(this.checkForWin());
        }  
        
    }
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

    handleInteraction(e){       
        const button = e.target;
        const letter = e.target.textContent;

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

