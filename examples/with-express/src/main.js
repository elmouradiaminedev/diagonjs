const express = require("express");
const Diagon = require("diagonjs");

const app = express();
app.use(express.json());

app.post("/math", async (req, res) => {
  const diagon = await Diagon.init();

  const expression = req.body.expression || "";
  const translatedExpression = diagon.translate.math(expression, {
    style: "Unicode",
  });

  res.send(translatedExpression);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
