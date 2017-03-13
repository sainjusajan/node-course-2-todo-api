
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Couldnt connect to the mongo database')
    }
    console.log('connected to mongo database')

    // deleteMany
    // db.collection('Users').deleteMany({ name: 'sajan sainju' }).then( (result) => {
    //     console.log(result)
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({ name: 'sajan sainju'}).then( (result) => {
    //    console.log(result)
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: true}).then( (result) => {
    //    console.log(result)
    // });

    // deleting via object id
    // db.collection('Users').deleteOne({
    //     _id : new ObjectId('58c52b0ad8bbaa21d8d4116e')
    // }).then( (result) => {
    //     console.log(result)
    // })

    // db.close();
})