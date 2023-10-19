const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
	publicKey: 'BPg7VUGcxfpaD7QZHZWirIPz8CWRdwYMfOshVBnoDHYQ7LF5HJrmVOyjn0oY7I3W_do6sYR6wqxMwvCEx4fQtGs',
	privateKey: 'BEG5U0S0LcfSKPtFjG0vtHeBc-KRUSnmMqnB66XeM94',
}

webpush.setVapidDetails(
  'mailto:d.bokun@yandex.ru',
  apiKeys.publicKey,
  apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
})

const subDatabase = [];

app.post("/save-subscription", (req, res) => {
  subDatabase.push(req.body);
  res.json({ status: "Success", message: "Subscription saved!" })
	console.log('subDatabase', subDatabase)
})

app.get("/send-notification", (req, res) => {
	console.log('subDatabse[0]', subDatabase)
  webpush.sendNotification(subDatabase[0], "Hello world");
  res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.get("/console", (req, res) => {
  console.log("push");
})

app.listen(port, () => {
  console.log("Server running on port 3000!");
})
