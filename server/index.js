const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Course = require('./models/course')
const cors = require('cors')
const multer=require('multer')
const path = require('path')
const upload=multer()

mongoose.connect('mongodb://127.0.0.1:27017/edublocks', {
  useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  console.log('Mongoose Connected Woohoo!')
})

// app.use(upload.any()); 
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

//post course details
app.post('/course',upload.any(),async (req, res) => {
  if (req.body.name == null || undefined) {
    res.status(400).send('Illegal request')
  }
  else {
    const checkcourse = await Course.findOne({ id: req.body.id })
    if (checkcourse) {
      console.log("already in database,id=", req.body.id)
      res.status(400).send("Already in database")
    }
    else {
      await Course.create({
        name: req.body.name,
        id: req.body.id,
        description: req.body.description,
        author: req.body.author,
        author_id: req.body.author_id,
        price: req.body.price,
        question:req.body.question,
        deadline: req.body.deadline,
        users: req.body.users,
        thumbnail: req.files[0].buffer.toString('base64'),
        content:req.files[1].buffer
      })
      console.log('Added to database')
      res.status(200).send("Added to database!")
    }
  }
})
app.post('/results', async (req, res) => {
  console.log(req.body)
  if (req.body.searchterm == null || undefined) {
    res.status(400).send('illegal request')
  }
  else {
    const results = await Course.find({ $text: { $search: req.body.searchterm } })
    if (results.length!=0) {
      console.log("Results displayed")
      // console.log(results[0].thumbnail.buffer)
      res.status(200).send(results)
    }
    else{
      console.log("No results found!")
      res.status(404).send("No results found!")
    }
  }
})
app.get('/submissions',async(req,res)=>{
    const submission=await Course.findOne({author_id:1})
    if(submission){
      res.status(200).send(submission)
    }
    else{
      res.status(404).send()
    }
  
})
const PORT = process.env.PORT || '4000'

app.listen(PORT, () => { console.log('Listening on port', PORT) });