const commandArray = {
  ping: require('./ping'),
  help: require('./help'),
  add: require('./add'),
  bosses: require('./bosses'),
  claim: require('./claim')
}

const bot = ({client,db}) => {
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

    //console.log(message.author.username)

    try{
      const func = commandArray[command][command]({message,db,args})
    }
    catch(e){
      console.log('Error on ./bot/index.js line 27',e)
      message.reply('Invalid Command, try !help')
    }
    

    if(command === 'testread'){
      db.collection('users').get()
        .then((snapshot) => {
          let array = []
          snapshot.forEach((doc) => {
            let {born,first,last} = doc.data()
            array.push(`\t${doc.id} => ${first} ${last}, ${born}`)
          });
          message.reply(`\nData:\n${array.join('\n')}`)
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
    }
    
  })
}

module.exports = {
  bot: bot
}