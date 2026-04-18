//controller för vanliga sidor
const highscoreService = require("../services/highscoreService");

function getHomePage(req, res) {
    res.send("Startsidan för Wordle kommer här.");
}

function getAboutPage(req, res) {
    res.send("Om-sidan för Wordle kommer här.");
}

async function getHighscoresPage(req, res) {
    try{
        const highscores = await highscoreService.getHighscores();

        res.render("highscores", {
            highscores,
        });
    }catch(error){
        console.error("Fel när highscores skulle hämtas", error);
        res.status(500).send("Ett fel inträffade när highscores sidan skulle hämtas");
    }
}

module.exports = {
    getHomePage,
    getAboutPage,
    getHighscoresPage
};