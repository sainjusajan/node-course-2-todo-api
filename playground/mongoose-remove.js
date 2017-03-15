const {mongoose} = require('./../server/db/mongoose')
var {ObjectID} = require('mongodb')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = '58c8fd0ae473a9328fb19088'

if (!ObjectID.isValid(id)) {
    return console.log('ID is invalid');
}

// to remove in the collection
/*
Todo.remove({}).then( (todos) => {
    console.log('deleted Todos: ', todos)
})
*/


// // findOneAndRemove
// Todo.findOneAndRemove({ _id: id }).then( (doc) => {
//     console.log(doc)
// })
//
// // findByIdAndRemove()
// Todo.findByIdAndRemove('58c8fd0ae473a9328fb19088').then( (doc) => {
//     console.log(doc)
// })

