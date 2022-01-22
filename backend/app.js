const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

//using mongoose to connect to our mongoDB database
mongoose.connect("mongodb://localhost:27017/noteDB", { useNewUrlParser: true });

const noteSchema =  new mongoose.Schema({
    title: String,
    content: String,
});

const Note = new mongoose.model("Note", noteSchema);

app.get("/",function(req,res){
    Note.find(function(err, foundNotes){
        if(err){
            console.log(err);
        }else{
            if (foundNotes) {
              res.send(foundNotes);
            }
        }
    });
});

app.post("/",function(req,res){
    console.log(req.body);
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });

    newNote.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.send("Note added!");
        }
    });
});

app.delete("/:noteId",(req, res)=>{
    Note.findByIdAndDelete(req.params.noteId)
    .then(() =>
      res.send("Successfully Deleted Note!")
    )
    .catch( e => console.log(e));
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
