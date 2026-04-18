const highscoreService = require("../services/highscoreService");

//controller för highscores via API
async function saveHighscore(req, res){ 
    try{ 
        const {name, gameId} = req.body || {};
        
        const result = await highscoreService.saveHighScoreFromGame(gameId, name);

        if(result.error === "GAME_NOT_FOUND"){
            return res.status(404).json({
                message: "Spelet hittades inte",
            });
        }
        if(result.error === "GAME_NOT_FINISHED"){
            return res.status(400).json({
                message: "Spelet är inte avslutat än",
            });
        }
        if(result.error === "INVALID_NAME"){
            return res.status(400).json({
                message: "Namn måste skickas in och får inte vara tomt",
            });
        }
        return res.status(201).json({
            message: "Highscore skapad",
            highscore: result.highscore,
        });
    }catch(error){
        console.error("Fel när highscore skulle sparas", error);

        return res.status(500).json({message: "Ett fel inträffade när highscore skulle sparas",

        });
    }
}
module.exports = {
    saveHighscore,
};