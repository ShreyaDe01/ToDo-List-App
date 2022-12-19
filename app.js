const express = require("express")
const bodyParser = require("body-parser")
var app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/todo")
const trySchema = new mongoose.Schema({
    name : String
})

const item = mongoose.model("task", trySchema)
/*const todo = new item({
    name: "Create some videos"
})*/
//todo.save()
app.post("/", function(req, res){
    const itemName = req.body.item1;
    const todo = new item({
        name: itemName
    })
    todo.save()
    res.redirect("/")
    preventDefault();
})

app.post("/delete", function(req, res){
    const checked = req.body.checkbox1;
    item.findByIdAndRemove(checked, function(err){
        if(!err){
            console.log("Deleted!")
            res.redirect("/")
        }
    })
})

app.get("/", function(req, res){
    item.find({}, function(err, foundItems){
        if(err){
            console.log(err)
        }
        else{
            console.log("Task added!")
            res.render("list", {ejes : foundItems})
        }
    })
})

app.listen("3000", function(){
    console.log("Server is running...")
})
