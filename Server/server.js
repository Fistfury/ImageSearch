require("dotenv").config();
const express = require("express");
const cors = require("cors");



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let gallery = [];

app.post("/gallery", (req, res) => {
  const image = req.body;
  gallery.push(image);
  res.status(201).send();
});

app.get("/gallery", (req, res) => {
  res.send(gallery);
});

app.listen(port, () => console.log(`Server is up...${port}`));
