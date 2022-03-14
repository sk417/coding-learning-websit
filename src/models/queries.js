const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Query:{
        type:String,
        required:true
    }

})

const fill = new mongoose.model("Query", querySchema);

module.exports = fill;