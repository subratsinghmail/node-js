const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://test:test@cluster101.jqj99.mongodb.net/sample_training?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');
      _db=client.db('sample_training')
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};


const getDataBaseName=()=>{
   if(_db){
     return _db;
   }else{
      throw 'No database found';
   }
}



exports.mongoConnect=mongoConnect;
exports.getDataBaseName=getDataBaseName;