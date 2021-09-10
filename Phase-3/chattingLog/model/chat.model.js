// load the module 
let mongoose = require("mongoose")

mongoose.pluralize(null);       // to avoid creating in lower case with s postfix. 
// create the schema 
let chatSchema = mongoose.Schema({

    uname : String,
    message : String
});


let chatModel = mongoose.model("ChatLog",chatSchema);

module.exports=chatModel;    // we can import using require.
                                // in anothe file 