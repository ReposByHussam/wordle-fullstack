//Hämta router från Express
const express = require("express");
const router = express.Router();

//Hämta controller för API:t
const gameController = require("../controllers/gameController");
const higheScoreController = require("../controllers/highscoreController");

//starta nytt spel
router.post("/games", gameController.startGame);

//skicka en gissning
router.post("/games/:gameId/guesses", gameController.submitGuess);

//Spara highscore
router.post("/highscores", higheScoreController.saveHighscore);

//exportera router så att den kan användas i app.js
module.exports = router;

