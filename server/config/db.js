const mongoose = require("mongoose");

// Anslut till MongoDB
async function connectToDatabase() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Ansluten till MongoDB");
    } catch (error) {
        console.error("Fel vid anslutning till MongoDB:", error);
        process.exit(1); // Avsluta processen om anslutningen misslyckas
    }
}
module.exports = connectToDatabase;