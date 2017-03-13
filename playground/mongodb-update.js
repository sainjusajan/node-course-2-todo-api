
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Couldnt connect to the mongo database')
    }
    console.log('connected to mongo database')

    // find one and update takes 4 parameters: filter, update, options, callback, if not callback, returns promise
    // db.collection('Todos').findOneAndUpdate({
    //     _id : new ObjectId('58c541ab5d9e1a2684a3942b')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // } , {
    //     returnOriginal: false
    // }).then( (result) => {
    //     console.log(result)
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId('58c52b0ad8bbaa21d8d4116e')
    }, {
        $set: {
            name: 'Sajan Sainju'
        },
        $inc: {
            age: 3
        }
    }, {
        returnOriginal: false
    }).then( (result) => {
        console.log(result)
    })


    // db.close();
})
