const express = require("express");
const app = express();
const fsPromises = require("fs/promises");

// Endpoint de home
app.get("/", (request, response) => {
  response.send("Endpoint de home, API está funcionando modificado");
});

// Enpoint
app.get("/koders", async (request, response) => {
  const db = await fsPromises.readFile("./koders.json", "utf8");
  const parsedDB = JSON.parse(db);
  response.json(parsedDB);
});

app.get("/koders/:name", async (request, response) => {
  const { name } = request.params;
  const db = await fsPromises.readFile("./koders.json", "utf8");
  const parsedDB = JSON.parse(db);
  const filteredDB = parsedDB.koders.filter((koder) => {
    return koder["name"].toLowerCase() === name.toLowerCase();
  })[0];
  response.send(filteredDB);
});

app.listen(8080, () => {
  console.log("Servidor Encendido");
});
