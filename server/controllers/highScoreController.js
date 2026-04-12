//controller för highscores via API
function saveHighscore(req, res) {
    res.json({ message: "API för att spara highscore är här." });
}

module.exports = {
    saveHighscore
};

