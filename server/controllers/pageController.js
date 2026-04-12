//controller för vanliga sidor

function getHomePage(req, res) {
    res.send("Startsidan för Wordle kommer här.");
}

function getAboutPage(req, res) {
    res.send("Om-sidan för Wordle kommer här.");
}

function getHighscoresPage(req, res) {
    res.send("Highscore-sidan för Wordle kommer här.");
}

module.exports = {
    getHomePage,
    getAboutPage,
    getHighscoresPage
};