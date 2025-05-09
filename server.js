const express = require('express')
const mongosse = require ('mongoose')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const path = require('path');



const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Blog'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })s

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/product', (req,res) => {
    res.render('product.ejs')
})

app.get('/cart', (req,res) => {
    res.render('cart.ejs')
})

app.get('/addItems', (req, res) => {
    res.render('addItems.ejs')
})

app.listen(process.env.PORT, () => {
    console.log(`This server is running on port ${process.env.PORT} go catch it`)

})