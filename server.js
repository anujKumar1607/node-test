const Express = require("express");

const app = Express();

app.get("/", (req, res, next) => {
  res.send("Hi FRom Node");
});

app.listen(5000, () => {
  console.log("app is running on 5000 port");
});
