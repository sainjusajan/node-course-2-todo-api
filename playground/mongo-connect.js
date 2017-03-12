// var MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to database')
    }
    console.log('database connectino successful');

    // inserting a doc into TodoApp collection
    db.collection('Todos').insertOne({
        text: 'Some text to enter in the database to show off my mongo skills ',
        completed: false
    }, (err, result) => {
        if(err){
            return console.log(err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });
    db.close();


    // // inserting a doc into Users collection
    // db.collection('Users').insertOne({
    //     name: 'sajan sainju',
    //     age: 23,
    //     location: 'Bhaktapur, Nepal'
    // }, (err, result) => {
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    // db.close();
} )