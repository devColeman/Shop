const express = require('express')
const mongosse = require ('mongoose')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const multer = require('multer');

const path = require('path');



const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Shop'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

  

    

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/product', async(req,res) => {
    const item = await db.collection('items').find().toArray()
    res.render('product.ejs', {items: item})
})

app.get('/cart', (req,res) => {
    res.render('cart.ejs')
})

app.get('/addItems', (req, res) => {
    res.render('addItems.ejs')
})

app.post('/addCart', (req, res) => {
    const data = {message: "hey whats up"}
    res.redirect('/product')
    res.json(data)
    
})

app.get('/charger',async (req,res) => {
    const item = await db.collection('items').find().toArray()
    res.render('charger.ejs', {items: item})
})

app.get('/bottle', async (req, res) => {
    const item = await db.collection('items').find().toArray()
    res.render('bottle.ejs', {items: item})
})


app.get('/light', async (req, res) => {
    const item = await db.collection('items').find().toArray()
    res.render('light.ejs', {items: item})
})

app.get('/pillow', async (req, res) => {
    const item = await db.collection('items').find().toArray()
    res.render('pillow.ejs', {items: item})
})


app.post('/addItems', (req, res) => {
   console.log(req.body)
   db.collection('items').insertOne({productName: req.body.title, price: req.body.price, desc: req.body.desc, filePath: req.body.filePath})
    res.redirect('/addItems')
})



app.listen(process.env.PORT, () => {
    console.log(`This server is running on port ${process.env.PORT} go catch it`)

})