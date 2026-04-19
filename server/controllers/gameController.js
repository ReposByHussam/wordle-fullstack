const gameService = require('../services/gameServices');

//startar en ny spelomgång
function startGame(req, res) {
    try{
      
        const {wordLength, allowDuplicateLetters} = req.body || {};

        //en enkel validering av input så att vi inte går med tom eller konstig data
        if(!wordLength || typeof allowDuplicateLetters !== "boolean"){
            return res.status(400).json({message: "Ogiltiga inställningar",

            });

        }
        const newGame = gameService.createGame({wordLength, allowDuplicateLetters,

        });
        return res.status(201).json(newGame);
    }catch(error){
        console.error("Fel när spelet skulle startas", error);

        return res.status(500).json({message: "Ett fel inträffade när spelet skulle startas"});

    }
}
//tar emot en gissning och försöker hitta rätt spel
function submitGuess(req, res) {
    try{
        const {gameId} = req.params;
        const {guess} = req.body || {};

        //simpel kontroll av att en gissning faktiskt har skickts in
        if(!guess){
            return res.status(400).json({
                message: "Ingen gissning skickades in",
            });
        }
        const result = gameService.addGuessToGame(gameId, guess);

        //om spelet inte hittas så skickas ett 404 svar
        if(result.error === "NOT_FOUND"){
            return res.status(404).json({
                message: "Spelet hittades inte",
            });
        }
        if(result.error === "GAME_ALREADY_FINISHED"){
            return res.status(400).json({
                message: "Spelet är redan avslutat",
            });
        }
        if(result.error === "INVALID_GUESS_LENGTH"){
            return res.status(400).json({
                message: `Gissningen måste vara ${result.expectedLength} bokstäver lång`,
            });
        }
        const {game, isWinningGuess } = result;

        return res.status(200).json({
            message: isWinningGuess
                ? "Grattis! Du gissade rätt ord! Spelet är nu avslutat."
                : "Din gissning sparades i spelet.",
            gameId: game.gameId,
                guess,
                wordLength: game.settings.wordLength,
                guessCount: game.guesses.length,
                isFinished: game.isFinished,
                isWinningGuess,
                guesses: game.guesses,
            });
        }catch(error){
            console.error("Fel när gissning skulle hanteras", error);

            return res.status(500).json({
                message: "Ett fel inträffade när gissningen skulle hanteras",
            });
        }
}

module.exports = {
    startGame,
    submitGuess,
};
