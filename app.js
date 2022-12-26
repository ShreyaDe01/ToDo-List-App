const express = require("express")
const bodyParser = require("body-parser")
var app = express()
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const mongoose = require("mongoose")
/*mongoose.connect("mongodb://localhost:27017/todo")*/
mongoose.connect('mongodb+srv://admin-shreya:admin-123@cluster0.tnm9w3h.mongodb.net/todo')

const trySchema = new mongoose.Schema({
    name : String,
    date: String
})

const item = mongoose.model("task", trySchema)
/*const todo = new item({
    name: "Create some videos"
})*/
//todo.save()
app.post("/", function(req, res){
    const itemName = req.body.item1;
    const todo = new item({
        name: itemName,
        date: new Date().toDateString()
    })
    todo.save()
    console.log("Task added!")
    res.redirect("/")
    
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
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

var date = currentDate.toLocaleDateString('en-in', options)

app.get("/", function(req, res){
    item.find({}, function(err, foundItems){
        if(err){
            console.log(err)
        }
        else{
            res.render("list", {
                currentDate: date,
                ejes : foundItems})
        }
    })
})

app.listen(PORT, function(){
    console.log("Server is running on port ${PORT}...")
})
