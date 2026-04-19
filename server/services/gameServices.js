const feedBackService = require("./feedbackService");

const wordService = require("./wordService");

//tillfällig lagring i minnet för pågående spel.
//Nyckeln blir gameId och värdet blir själva spelobjektet
const games = new Map();

//funktion för att skapa ett nytt spel med unikt id
function createGameId() {
  return Math.random().toString(36).slice(2, 10); //genererar en slumpmässig sträng som används som gameId);
}

//En funktion som skapar ett nytt spel och sparar det i minnet
function createGame(settings) {
    const {wordLength, allowDuplicateLetters} = settings;

    //random ord genereras utifrån de valda inställningarna
    const secretWord = wordService.getRandomWord({
        wordLength, allowDuplicateLetters});

    const gameId = createGameId();

    const game = {
        gameId,
        secretWord,
        settings: {
            wordLength,
            allowDuplicateLetters,
        },
        startedAt: Date.now(),
        finishedAt: null,
        guesses: [],
        isFinished: false,
    };
    //sparar spelet i minnet på servern
    games.set(gameId, game);

    //skickar tillbaka bara den data frontend behöver
    return {
        gameId,
        wordLength,
        allowDuplicateLetters,
        status: "playing",
    };
}
//hämtar ett spel från minnet med hjälp av gameId
function getGameById(gameId) {
    return games.get(gameId);
}

//lägger till en gissning i ett spel som redan finns i minnet
function addGuessToGame(gameId, guess) {
    const game = games.get(gameId);

    if(!game){
        return {
            error: "NOT_FOUND",
        };
    }
    if (game.isFinished){
        return {
            error: "GAME_ALREADY_FINISHED",
        };
    }

    //gör om wordLength till en siffra om den råkat komma in som sträng
    const expectedLength = Number(game.settings.wordLength);

    if(guess.length !== expectedLength){
        return {
            error: "INVALID_GUESS_LENGTH",
            expectedLength,
        };
    }
    const feedback = feedBackService.getFeedBack(guess, game.secretWord);

    game.guesses.push({
        guess,
        feedback
    });
    const isWinningGuess = feedback.every((status)=> status === "correct");
    
    if(isWinningGuess){
        game.isFinished = true;
        game.finishedAt = Date.now();
    }
    return {
        game,
        isWinningGuess,
    };
}
//exporterar funktionerna så att de kan användas i controllers
module.exports = {
    createGame,
    getGameById,
    addGuessToGame,
};