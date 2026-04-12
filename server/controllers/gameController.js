//controller för Spel via API:t

function startGame(req, res) {
    res.json({ message: "API för att starta spel är här." });
}

function submitGuess(req,res){
    res.json({ message: "API för att skicka gissning är här." });
}

module.exports = {
    startGame,
    submitGuess
};