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
  price: {
    type: Number,
    required: true
  },
  users: {
    type: Number,
    required: true,
    default:0
  },
  deadline:{
    type:Number,
    required:true,
    default:1
  }
})

module.exports = mongoose.model('Course', courseSchema)