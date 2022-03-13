const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/question", (req, res) => {
  res.sendFile(path.join(__dirname, "src/component/question.html"));
});

app.post("/submit", (req, res) => {
  const data = req.body;
  const values = Object.values(data);
  let emptyArr = Array(5).fill(0);
  let maxValueIndex = 0;

  for (let value of values) {
    emptyArr[value - 1]++;
  }
  maxValueIndex = emptyArr.indexOf(Math.max(...emptyArr)) + 1;
  res.redirect("/result/" + maxValueIndex);
});

app.get("/result/[1-5]", (req, res) => {
  res.sendFile(path.join(__dirname, "src/component/result.html"));
});

app.listen(3000, () => {
  console.log("Server running on 3000!");
});
