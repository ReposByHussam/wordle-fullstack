const { all } = require('../routes/pageRoutes');
const gameService = require('../services/gameServices');

//Bygger en hihscore lista från ett färdigt spel
function buildHighScoreFromGame(gameId, name){
    const game = gameService.getGameById(gameId);

    if(!game){
        return {
            error: "NOT_FOUND",
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
    
    highScoreData = {
        name: name.trim(),
        durationMs,
        guesses: game.guesses.map((entry) => entry.guess),
        guessCount: game.guesses.length,
        wordLength: Number(game.settings.wordLength),
        allowDuplicateLetters: game.settings.allowDuplicateLetters,
        createdAt: new Date().toISOString(),
    };
    return {
        highScoreData,
    };
}
module.exports = {
    buildHighScoreFromGame,
};