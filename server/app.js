//MongoDB anslutningssträng från .env filen
require("dotenv").config();

//använda cors
const cors = require("cors");

//importera express biblioteket så att servern kan skapas
const express = require("express");

const connectToDatabase = require("./config/db");
//importera route filer
const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");

//skapa express appen
const app = express();

//tilldelda porten som servern kommer att lyssna på
const PORT = 5080;

app.use(cors({
    origin: "http://localhost:5173",
})
);

//Gör så att express kan läsa JSON data i request body
app.use(express.json());

//koppla API routes till appen
app.use("/api", apiRoutes);

//koppla routes till appen
app.use("/", pageRoutes);

async function startServer() {
    await connectToDatabase();

    //startar severn
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});
}
startServer();
