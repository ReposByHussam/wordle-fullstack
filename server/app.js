//importera express biblioteket så att servern kan skapas
const express = require("express");

//importera route filer
const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");

//skapa express appen
const app = express();

//tilldelda porten som servern kommer att lyssna på
const PORT = 5080;

//Gör så att express kan läsa JSON data i request body
app.use(express.json());

//koppla routes till appen
app.use("/", pageRoutes);