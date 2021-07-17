/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }
   addPhraseToDisplay(){
       const phrase = document.querySelector('#phrase')
       const ul = phrase.firstElementChild;
       const letter = this.phrase.split('');
       for(let i = 0; i < letter.length; i++){
           const li = document.createElement('li');
           if(letter[i].includes(' ')){
               li.setAttribute('class', 'space');
               
           }else{
               li.setAttribute('class', `hide letter ${letter[i]}`);
             
           }
        
           ul.appendChild(li);
           li.innerHTML = letter[i];
       }
       
   }
   /**
    * function to check if letter is in phrase;
    * @param {string} letter to check;
    * @return checked letter;
    */

   checkLetter(letter){
       return this.phrase.includes(letter)
   }
   /**
    * Display letter on screen after a match found;
    * @param {string} letter will display;
    */
   showMatchedLetter(letter){
         const board = document.querySelectorAll('#phrase ul li');
         for(let i = 0; i < board.length; i++){
             if(board[i].textContent === letter){
                 board[i].classList.remove('hide');
                 board[i].classList.add('show');
             }
         }
         
   }

   
}




