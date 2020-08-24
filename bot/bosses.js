exports.bosses = ({message,db}) => {
  db.collection('bosses').get()
    .then(snapshot=>{
      let string = 'Bosses:\n'
      snapshot.forEach(doc => {
        let data = doc.data()
        string+=`\tName: ${data.name}\n\t:arrow_forward: Code: ${doc.id}\n`
      })
      message.reply(string)
    })
    .catch((err)=>{
      console.log('Error getting documents, on ./bot/bosses.js,', err)
    })
}