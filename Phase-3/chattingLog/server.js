let express = require("express")    //load the express module
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
let routerChat= require("./router/chat.router");
const { request, response } = require("express");

let app = express();   

// add middleware 
app.use(cors());
app.use(bodyParser.json())

let ws = require("express-ws")(app);
//url database 
let url = "mongodb://localhost:27017/tcsmean"
mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));

//http://localhost:9090
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.use("/api/chat",routerChat);
app.ws("/", (socket,request)=>{     


    socket.on("message", msg=>{    //receive message from client application.
        console.log( msg);
        socket.send(Date());
    })

    socket.send("connected");       //This is used to send data to the client application
    // socket.send(Date()); 
})
app.listen(9090, ()=>console.log("Server running on port 9090"));