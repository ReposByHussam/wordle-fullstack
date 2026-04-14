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

    //tillfälligt testord
    const secretWord = "apple";

    const gameId = createGameId();

    const game = {
        gameId,
        secretWord,
        settings: {
            wordLength,
            allowDuplicateLetters,
        },
        startedAt: Date.now(),
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

//exporterar funktionerna så att de kan användas i controllers
module.exports = {
    createGame,
    getGameById,
};