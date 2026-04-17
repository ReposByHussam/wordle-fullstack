const mongoose = require("mongoose");

const highscoreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    durationMs: {
        type: Number,
        required: true,
    },
    guesses: {
        type: [String],
        equired: true,
    },
    guessCount: {
        type: Number,
        required: true,
    },
    wordLength: {
        type: Number,
        required: true,
    },
    allowDuplicateLetters: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const highscoreModel = mongoose.model("Highscore", highscoreSchema);

module.exports = highscoreModel;