const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request')

const app = express()
app.use(cors())
const db = require('./scripts/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

function getInvoices() {
    return db.mongoose.model('invoices').find({})
}

function addInvoice(body) {
    let Invoice = db.mongoose.model('invoices')
    let invoice = new Invoice()

    invoice.id = body.id
    invoice.products = JSON.parse(body.products)

    return invoice
}

function deleteInvoice(invoiceId) {
    return db.mongoose.model("invoices").deleteOne({id: invoiceId});
}

function getProducts() {
    return db.mongoose.model('products').find({})
}

function addProduct(body) {
    let Product = db.mongoose.model('products')
    let product = new Product()

    product.id = body.id
    product.name = body.name
    product.price = body.price

    return product
}

function deleteProduct(productId) {
    return db.mongoose.model("products").deleteOne({id: productId});
}

app.get('/', function (req, res) {
    getInvoices().then((invoices) => {
        res.json(invoices);
    })
})

app.get('/api/spark/submit/frequent-products', function (req, res) {
    request.post(
        'http://master:6066/v1/submissions/create',
        {
            "action" : "CreateSubmissionRequest",
            "appArgs" : [ "/opt/spark/tasks/FrequentProduct.py" ],
            "appResource" : "/opt/spark/tasks/FrequentProduct.py",
            "clientSparkVersion" : "2.3.2",
            "environmentVariables" : {
                "SPARK_ENV_LOADED" : "1"
            },
            "sparkProperties" : {
                "spark.driver.supervise" : "false",
                "spark.app.name" : "Simple App",
                "spark.eventLog.enabled": "true",
                "spark.submit.deployMode" : "cluster",
                "spark.master" : "spark://spark-master:6066"
            }
        },
        function (error, response, body) {
            console.log(body)
        }
    )
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000')
})

app.get('/api/invoices', (req, res) => {
    getInvoices().then((invoices) => {
        res.json(invoices);
    })
})

app.post('/api/invoices', (req, res) => {
    addInvoice(req.body).save((err) => {
        if (err) {
            res.status(400)
            res.send(err)
        } else {
            res.status(201)
            res.send('The invoice has been created')
        }
    })
})

app.delete('/api/invoices/:id', (req, res) => {
    deleteInvoice(req.params.id).then((obj) => {
        res.send('The product has been deleted')
    }).catch((err) => {
        res.send(err)
    })
})

app.get('/api/products', (req, res) => {
    getProducts().then((products) => {
        res.json(products);
    })
})

app.post('/api/products', (req, res) => {
    addProduct(req.body).save((err) => {
        if (err) {
            res.status(400)
            res.send(err)
        } else {
            res.status(201)
            res.send('The product has been created')
        }
    })
})

app.delete('/api/products/:id', (req, res) => {
    deleteProduct(req.params.id).then((obj) => {
        res.send('The product has been deleted')
    }).catch((err) => {
        res.send(err)
    })
})