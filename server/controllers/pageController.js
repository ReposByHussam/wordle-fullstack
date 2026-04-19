//controller för vanliga sidor
const highscoreService = require("../services/highscoreService");

function getHomePage(req, res) {
    res.send('Gå till spelet via <a href="http://localhost:5173">Spela Wordle</a>');
  }

function getAboutPage(req, res) {
    res.render("about");
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