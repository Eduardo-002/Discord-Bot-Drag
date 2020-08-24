exports.claim = ({message,db,args}) => {
  if(args[0]==='clear'||args[0]==='get'||args[0]=='set'){
    functions[ args[0] ]({ message,db,args }, (string) => {
      message.reply(string)
      return
    })
  }
  else{
    message.reply('Inexistent Argument, check !help')
    return
  }
}

const clear = ({db,args}, callback) => {
  if( !args[1] ){ // without specified boss
    const {bosses} = require('./../json/bosses.json')
    bosses.forEach(boss=>{
      db.collection('bosses').doc(boss).collection('claim')
        .get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            db.collection('bosses').doc(boss).collection('claim').doc(doc.id)
              .delete()
          })
        })
    })
    callback(`Bosses cleaned!`)
  }
  else{ // with specified boss
    db.collection('bosses').doc(args[1]).collection('claim')
      .get()
      .then(snapshot=>{
        if(snapshot.empty){
          callback('Need to intruduce a boss code, check !bosses')
          return
        }
        snapshot.forEach(doc=>{
          db.collection('bosses').doc(args[1]).collection('claim').doc(doc.id)
            .delete()
        })
        
      })
      .then(()=>{
        callback(`Boss ${args[1]} cleaned!`)
      })
  }
}

const get = ({message,db,args}, callback) => {
  if( !verifyBossExists(args[1]) ) {
    callback('You need to specify the boss code, check !bosses')
    return;
  }
  
  db.collection('bosses').doc(args[1]).collection('claim')
    .orderBy('index', 'asc')
    .get()
    .then(snapshot=>{
      if(snapshot.empty){
        callback('Boss without claims!')
        return;
      }
      let responseString = '\nClaims:\n'
      snapshot.forEach(doc => {
        let {username,id,index} = doc.data()
        responseString += `${index}º => @${username}\n`
      });
      callback(responseString)
    })
}

const set = ({message,db,args},callback) => {
  if( !verifyBossExists(args[1]) ){
    callback('You need to specify the boss code, check !bosses')
    return
  }
  if(!['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'].includes(args[2])){
    callback('Wrong Arguments, check !help')
    return
  }

  db.collection('bosses').doc(args[1]).collection('claim')
    .get()
    .then(snapshot=>{
      let array = []
      snapshot.forEach(doc => {
        let {username,id} = doc.data()
        array.push({index:doc.id,username,id})
      });

      // the message author alredy have a claim
      let userClaim = array.findIndex(user=>user.id==message.author.id)
      let existentUserClaim = userClaim != -1

      // the index that the author wants alredy have a claim
      let indexClaim = array.findIndex(user=>user.index==args[2])
      let existentIndexClaim = indexClaim != -1

      if( existentUserClaim && !existentIndexClaim ){
        db.collection('bosses').doc(args[1]).collection('claim').doc(array[userClaim].index+'').delete()
          .then((resp)=>{
            makeClaim({message,args,db},()=>{
              callback('Older claim removed and new has been added!')
            })
          })
      }
      else if( existentIndexClaim ){
        callback(`Place already taken by @${array[userClaim].username}`)
      }
      else if( !existentUserClaim && !existentIndexClaim ){ 
        makeClaim({message,args,db},()=>{
          callback('The claim has been done!')
        })
      }

    })

}
const functions = {clear,get,set}


const makeClaim = ({message,args,db},callback) => {
  db.collection('bosses').doc(args[1]).collection('claim').doc(args[2])
    .set({
      id: message.author.id,
      username: message.author.username,
      index: args[2],
    })
    .then(resp=>{
      callback()
    })
}

const verifyBossExists = (arg) => {
  if(arg=='')return false;
  const bosses = require('./../json/bosses.json')
  let verify = bosses.bosses.findIndex(name=>name==arg)
  //console.log(verify)
  return verify!=-1
}