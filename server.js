const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(express.json())


let db;
MongoClient.connect('mongodb+srv://Ruben:Manucelicas1@cluster0.lwmjc.mongodb.net/',(err, client) =>{
    db = client.db('webstore');
})


app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

//this will tell the user to specify the right collection if they have done that yet
app.get('/', (req, res, next) => {
    res.send('select a collection with /collection/collectionName');
})

//this gets the collection from the database and comes back as a response 
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}, {limit: 5, sort: [['price', -1]]}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})

//add an object to the database
app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (e, results) =>{
        if (e) return next (e)
        res.send(results.ops)
    })
})

//get a single object from the database
const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.findOne({_id: new ObjectID(req.params.id) }, (e, result) =>{
        if (e) return next(e)
        res.send(result)
    })
})

//update a single object from the database
app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.update(
        {_id: new ObjectID(req.params.id) }, 
    {$set: req.body},
    {safe: true, multi: false},
    (e, result) =>{
        if (e) return next(e)
        res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
    })
})

//delete a single object from the database
app.delete('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.deleteOne(
        {_id: new ObjectID(req.params.id) }, 
        (e, result) =>{
            if (e) return next(e)
            res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
        })
    })
    
    
    //this tells the server to listen on port 3000
    const port = process.env.PORT || 3000
    app.listen(port, ()=> {
        console.log('localhost 3000 running');
    })