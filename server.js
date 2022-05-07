const mongoose = require('mongoose')
const express = require(`express`);
const bodyParser = require('body-parser');
const e = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/Tasks')
app.listen (port, () => console.log (`server is live on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "))
db.once('open', () => console.log("MongoDB Connected"))

const TaskSchema = mongoose.Schema({
    id: Number,
    done: Boolean,
    name: String,
    discription: String,
    date: String,
    hour: String
})

const Task = mongoose.model("Task", TaskSchema)

app.get('/',async (req, res) => {
    tmp = await Task.find({});
    res.json(tmp);
});

app.post("/", async (req, res) => {
    var myData = new Task (
        {
            id: req.body.id,
            done: false,
            name: req.body.name,
            discription: req.body.discription,
            date: req.body.date,
            hour: req.body.hour
        }
    )
    await myData.save()
    res.json(myData)
  });

  app.put('/', async (req, res) => {
    let updateID = req.body.updateBody.ID; 
    let updateStatus = req.body.updateBody.done
    await Task.updateOne({id: updateID}, {done: updateStatus}).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.delete('/', async (req, res) => {
    var c = req.body.id; 
    await Task.deleteOne({id: c}).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });