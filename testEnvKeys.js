const dotenv = require('dotenv');
dotenv.config();

const Discord = require("discord.js")
const client = new Discord.Client()
//client.login(config.BOT_TOKEN)~

client.login(process.env.TOKEN_DISCORD)

client.on('ready',()=>{
  console.log('Ready!')
})