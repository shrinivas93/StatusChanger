const express = require("express");
const app = express();
const port = 3000;
let map = {};

app.use(express.json());

app.get("/", (req, res) => {
  res.send(Object.keys(map).map((key) => ({ key, value: map[key] })));
});

app.post("/", (req, res) => {
  let key = req.body.key;
  let time = new Date();
  map[key] = time;
  res.send({
    key,
    value: time,
  });
});

app.get("/:key", (req, res) => {
  let key = req.params.key;
  let value = map[key];
  let status = getStatus(value);
  res.send({
    key,
    value,
    status,
  });
});

function getStatus(value) {
  let time = new Date();
  let diff = time - value;
  if (diff < 10000) {
    return "SUBMITTED";
  } else if (diff < 20000) {
    return "IN PROGRESS";
  } else if (diff < 30000) {
    return "PROCESSING";
  } else if (diff < 40000) {
    return "STILL PROCESSING";
  } else {
    if (value % 2 == 0) {
      return "SUCCESS";
    } else {
      return "FAILED";
    }
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
