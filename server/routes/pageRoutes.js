//Hämta router från Express
const express = require("express");
const router = express.Router();

//Hämta page controller
const pageController = require("../controllers/pageController");

//startsidan
router.get("/", pageController.getHomePage);

//informationssida
router.get("about", pageController.getAboutPage);

//highscore sida
router.get("/highscores", pageController.getHighscoresPage);

//exportera router så att den kan användas i app.js
module.exports = router;


