import express from "express";
const port = process.env.PORT || 3333;
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Ola willian" });
});

app.listen(port, () => {
  console.log(`Server is Running on port: ${port}`);
});
