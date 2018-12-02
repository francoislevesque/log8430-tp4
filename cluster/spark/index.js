const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { exec } = require('child_process')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3001, function () {
    console.log('Example app listening on port 3001')
})

app.get('/api/spark/frequent-products', function (req, res) {
    exec('/opt/spark/bin/spark-submit --master spark://master:7077 --packages org.mongodb.spark:mongo-spark-connector_2.11:2.3.1 /opt/spark/tasks/FrequentProducts.py', (err, stdout, stderr) => {
        if (err) {
            res.status(500)
            res.send(err)
            return
        }

        res.send(stdout)
    })
})
