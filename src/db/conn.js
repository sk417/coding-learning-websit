const mongoose = require("mongoose");
mongoose.connect(process.env.DB).then(()=>{
    console.log("connection is successfull");
}).catch((err)=>{
    console.log(err);
})