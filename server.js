const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb://localhost:27017/',(err, client) =>{
    db = client.db('webstore');
})


app.use(express.json())