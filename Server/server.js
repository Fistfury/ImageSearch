require("dotenv").config();
const express = require("express");
const path = require("path");
const Joi = require("joi");
const cors = require("cors");
const fs = require("fs");

let users = [];

try {
  const data = fs.readFileSync(path.join(__dirname, "users.json"), "utf8");
  users = JSON.parse(data);

  // console.log(users)
} catch (err) {
  console.error(err);
}

const schema = Joi.object({
  user: Joi.string().required(),
  savedPicture: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        byteSize: Joi.number().required(),
        url: Joi.string().uri().required(),
      })
    )
    .required(),
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/gallery", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { user, savedPicture } = req.body;

  let userObj = users.find((u) => u.user === user);
  if (!userObj) {
    userObj = { user, savedPicture: [] };
    users.push(userObj);
  }

  userObj.savedPicture.push(...savedPicture);

  try {
    fs.writeFileSync(
      path.join(__dirname, "users.json"),
      JSON.stringify(users, null, 2),
      "utf8"
    );
    res.status(201).send("Image saved.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error when saving the data.");
  }
});

app.get("/gallery/:username", (req, res) => {
  console.log(req.params);
  const username = req.params.username;
  const userObj = users.find((u) => u.user === username);

  console.log(username);

  if (!userObj) {
    return res.status(404).send("User not found.");
  }

  res.send(userObj.savedPicture);
});

app.delete("/gallery/:username/:pictureUrl", (req, res) => {
  const { username, pictureUrl } = req.params;
  const userObj = users.find((u) => u.user === username);

  if (!userObj) {
    return res.status(404).send("User not found");
  }

  const pictureIndex = userObj.savedPicture.findIndex((p) => p.url === pictureUrl);

  if (pictureIndex === -1) {
    return res.status(404).send("Picture not found.");
  }

  userObj.savedPicture.splice(pictureIndex, 1);

  try {
    fs.writeFileSync(
      path.join(__dirname, "users.json"),
      JSON.stringify(users, null, 2),
      "utf8"
    );
    res.status(200).send("Picture deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => console.log(`Server is up...${port}`));
