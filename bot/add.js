exports.add = ({message,db}) => {
  let data = require('./../data.json')

    let array = Object.entries(data.bosses);
    for(let i=0;i<array.length;i++){
      db.collection('bosses').doc(array[i][0]).set(array[i][1])
      console.log('added')
    }
}