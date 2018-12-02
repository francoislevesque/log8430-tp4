const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3001, function () {
    console.log('Example app listening on port 3001')
})

app.get('/api/spark/frequent-products', function (req, res) {
    res.send('ok')
})
