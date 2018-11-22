"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Invoice = new Schema({
  id: { type: Number, unique: true }
}, { versionKey: false });

mongoose.model("Invoice", Invoice);

mongoose.Promise = global.Promise;

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
mongoose.connect("mongodb://admin:secret@log8430-tp4.witify.io:27017", { useMongoClient: true });

module.exports = {
    mongoose: mongoose
}
