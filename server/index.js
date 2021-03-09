const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Course = require('./models/course')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017/edublocks', {
  useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  console.log('Mongoose Connected Woohoo!')
})

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//post course details
app.post('/course', async (req, res) => {
  if (req.body.name == null || undefined) {
    res.status(400).send('illegal request')
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
        deadline: req.body.deadline,
        users: req.body.users
      })
      console.log('added to database')
      res.status(200).send("Added to database!")
    }
  }
})
app.post('/course_results', async (req, res) => {
  if (req.body.searchterm == null || undefined) {
    res.status(400).send('illegal request')
  }
  else {
    const results = await Course.find({ $text: { $search: req.body.searchterm } })
    if (results) {
      console.log("Results displayed")
      res.status(200).send(results)
    }
    else{
      console.log("No results found!")
      res.status(404).send("No results found!")
    }
  }

})
const PORT = process.env.PORT || '4000'

app.listen(PORT, () => { console.log('Listening on port', PORT) });