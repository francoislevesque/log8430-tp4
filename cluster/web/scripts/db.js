'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Invoice = new Schema({
    id: { type: Number, unique: true },
    products: Array
}, { versionKey: false })

const Product = new Schema({
    id: { type: Number, unique: true },
    name: String,
    price: Number
}, { versionKey: false })

mongoose.model('invoices', Invoice)
mongoose.model('products', Product)

mongoose.Promise = global.Promise

mongoose.connect('mongodb://admin:secret@db:27017/log8430-tp4')

module.exports = {
    mongoose: mongoose
}
