const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3009, function () {
    console.log('Example app listening on port 3009!')
})

app.get('/api/factures', (req, res) => {

})

app.post('/api/factures', (req, res) => {

})

app.get('/api/products', (req, res) => {

})

app.post('/api/products', (req, res) => {
    
})