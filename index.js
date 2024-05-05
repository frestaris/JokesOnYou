import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/any");
    const jokeData = response.data;
    res.render("index.ejs", { joke: jokeData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  try {
    const category = req.body.category;
    console.log(`Category: ${category}`);
    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
    const jokeData = response.data;
    res.render("index.ejs", { joke: jokeData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
