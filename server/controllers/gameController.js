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

function submitGuess(req, res) {
    res.json({message: "API för att skicka en gissning fungerar.",});
}

module.exports = {
    startGame,
    submitGuess,
};
