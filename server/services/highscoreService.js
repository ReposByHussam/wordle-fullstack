const gameService = require('../services/gameServices');
const Highscore = require('../models/Highscore');

//Bygger en hihgscore lista från ett färdigt spel och sparar det i databasen
async function saveHighScoreFromGame(gameId, name){
    const game = gameService.getGameById(gameId);

    if(!game){
        return {
            error: "GAME_NOT_FOUND",
        };
    }
    if(!game.isFinished){
        return {
            error: "GAME_NOT_FINISHED",
        };
    }
    if (!name ||  !name.trim()){
        return {
            error: "INVALID_NAME",
        };
    }
    const durationMs = game.finishedAt - game.startedAt;
    
   const highScoreData = {
        name: name.trim(),
        durationMs,
        guesses: game.guesses.map((entry) => entry.guess),
        guessCount: game.guesses.length,
        wordLength: Number(game.settings.wordLength),
        allowDuplicateLetters: game.settings.allowDuplicateLetters,
    };

    const highscoreDocument = new Highscore(highScoreData);
    const savedHighscore = await highscoreDocument.save();
    return {
        highScore: savedHighscore,
    };
}

//Hämtar alla highscores från databasen sorterade på snabbaste tid
async function getHighscores(){
    const highScores = await Highscore.find({})
    .sort({
        durationMs: 1,
        guessCount: 1,
            createdAt: 1,
    })
        .lean();
        return highScores;
    }
module.exports = {
    saveHighScoreFromGame,
    getHighscores,
};