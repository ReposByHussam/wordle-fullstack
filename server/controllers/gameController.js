const gameService = require('../services/gameServices');

//startar en ny spelomgång
function startGame(req, res) {
    try{
        const {wordLength, allowDuplicateLetters} = req.body;

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
        const {guess} = req.body;

        //simpel kontroll av att en gissning faktiskt har skickts in
        if(!guess){
            return res.status(400).json({
                message: "Ingen gissning skickades in",
            });
        }
        const game = gameService.getGameById(gameId);

        //om spelet inte hittas så skickas ett 404 svar
        if(!game){
            return res.status(404).json({
                message: "Spelet hittades inte",
            });
        }

        //tillfälligt test-svar
        return res.status(200).json({
            message: "Spelet hittade och gissningen togs emot",
            gameId: game.gameId,
                guess,
                wordLength: game.settings.wordLength,
                guessCount: game.guesses.length,
                ifFinished: game.isFinished,
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
