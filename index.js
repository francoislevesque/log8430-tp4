const express = require('express')
const bodyParser = require('body-parser')

const app = express()
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
    invoice.products = body.products

    return invoice
}

function getProducts() {
    return db.mongoose.model('products').find({})
}

function getProduct(productId) {
    return db.mongoose.model('products').find({id: productId})
}

function addProduct(body) {
    let Product = db.mongoose.model('products')
    let product = new Product()

    product.id = body.id
    product.name = body.name
    product.price = body.price

    return product
}

app.get('/', function (req, res) {
    getInvoices().then((invoices) => {
        res.json(invoices);
    })
})

app.listen(3009, function () {
    console.log('Example app listening on port 3009!')
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