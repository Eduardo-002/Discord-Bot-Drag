const http = require('http');
const express = require('express');
const app = express();

const Discord = require("discord.js")
const fetch = require('node-fetch')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()

const config = require("./config.json")

const client = new Discord.Client()
client.login(config.BOT_TOKEN)

const prefix = '!'

client.on('ready', ()=>{
  console.log('I am Ready!')
})

client.on('message', (message) => {
  if(message.author.bot) return
  if(!message.content.startsWith(prefix)) return

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  console.log(message.member.roles.member._roles)
  let role = message.member.roles.cache.find(r=>r.name=='Admin')
  console.log(role?`Role Name: ${role.name}`:'Not Found')

  if(command === 'ping'){
    const timeTaken = Date.now() - message.createdTimestamp
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`)
  }
  
  else if(command === 'sum'){
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
  
  else if(command === 'trivia'){
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then(response=>response.json())
      .then(data=>{
        message.reply(`First Question is ${entities.decode(data.results[0].question)}`)
      })
  }
})


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  let channel = (client.channels.cache.find(ch=>ch.name==='botonlinecheck'))
  channel.send('online check!')
}, 60000);