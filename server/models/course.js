const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  users: {
    type: Number,
    required: true,
    default:0
  },
  question:{
    type:String,
    required:true
  },
  deadline:{
    type:Number,
    required:true,
    default:1
  },
  thumbnail:{ 
    type: String, 
    required:true,
  },
  content:{
    type:Buffer,
    required:true,
  }

})

module.exports = mongoose.model('Course', courseSchema)