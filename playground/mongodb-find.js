const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{

    if(err){
        return console.log('Unable to connect to mongo database')
    }
    console.log('Connection to MongoDB successful')

    db.collection('Todos').find({completed: true}).toArray().then( (docs) =>{
        console.log('TODOS:');
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) =>{
        console.log(err)
    })

    // db.close();

})