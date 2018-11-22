const express = require('express')
const app = express()
const db = require('./db')

app.get('/', function (req, res) {
    db.mongoose.model("Invoice").find({}).then(data => {
      res.send(data)
    })
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