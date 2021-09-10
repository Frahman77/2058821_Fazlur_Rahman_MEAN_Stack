// load the express module 
let express = require("express");

let router = express.Router();
let chatController = require("../controller/chat.controller")

router.post("/save",chatController.storedChat);


module.exports=router;