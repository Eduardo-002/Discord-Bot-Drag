const express = require('express')
const app = express();
const config = require("./config.json")


const firebase = require('firebase')
firebase.initializeApp(config.FIREBASE_CONFIG)
let db = firebase.firestore()


const Discord = require("discord.js")
const client = new Discord.Client()
client.login(config.BOT_TOKEN)


const bot = require('./bot/index')
bot.bot({client,db})


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});


app.listen(process.env.PORT);

// setInterval(() => {
//   http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
// }, 60000);