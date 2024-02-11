import express from "express";
import diagon from "diagonjs";

const app = express();
app.use(express.json());

app.post("/math", (req, res) => {
  const expression = req.body.expression || "";
  const translatedExpression = diagon.translate.math(expression, {
    style: "Unicode",
  });

  res.send(translatedExpression);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
