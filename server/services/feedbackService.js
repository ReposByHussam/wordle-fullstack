//räkna ut feedback för en gissning jämfört med det hemliga ordet
function getFeedBack(guess, secretWord){
    const feedback = new Array(guess.length).fill("incorrect");

    //gör om secretWord till en ny array
    const remainingLetters = secretWord.split("");

    //markera alla bokstäver som är på rätt plats
    for(let i=0; i<guess.length; i+= 1){
        if(guess[i] === secretWord[i]){
            feedback[i] = "correct";
            remainingLetters[i] = null;
        }
    }
    //för bokstäver som inte är "correct", kolla om de finns kvar nånstans i ordet
    for (let i = 0; i<guess.length; i+=1){
        if (feedback[i]=== "correct"){
            continue;
        }
        const foundIndex = remainingLetters.indexOf(guess[i]);

        if(foundIndex !== -1){
            feedback[i]="misplaced";
            remainingLetters[foundIndex]=null;
        }
    }
    return feedback;
}
module.exports={
    getFeedBack,
};