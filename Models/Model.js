const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
    DateDepart: {
        type: String,
    },
    DateArrive: {
        type: String,
    },
    LieuDepart: {
        type: String,
    },
    LieuArrive: {
        type: String,
    },
    heure: {
        type: String
    }
});

module.exports = mongoose.model("Model", userModel);
