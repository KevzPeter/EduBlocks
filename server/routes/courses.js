const express=require('express')
const router=express()
const Course = require('../models/course')
const path = require('path')
const multer=require('multer')
const upload=multer()
//post course details
router.post('/upload',upload.any(),async (req, res) => {
    if (req.body.name == null || undefined) {
      res.status(400).send('Illegal request')
    }
    else {
      const checkcourse = await Course.findOne({ id: req.body.id })
      if (checkcourse) {
        console.log("Already in database,id= ", req.body.id," name= ",req.body.name)
        res.status(400).send("Already in database")
      }
      else {
        await Course.create({
          name: req.body.name,
          id: req.body.id,
          description: req.body.description,
          author: req.body.author,
          author_id: req.body.author_id,
          address:req.body.address,
          price: req.body.price,
          question:req.body.question,
          deadline: req.body.deadline,
          users: req.body.users,
          thumbnail: req.files[0].buffer.toString('base64'),
          content:req.files[1].buffer
        })
        console.log('Course added to database, ID= ',req.body.id," Name: ",req.body.name)
        res.status(200).send("Success!")
      }
    }
  })

  router.post('/results', async (req, res) => {
    console.log(req.body)
    if (req.body.searchterm == null || undefined) {
      res.status(400).send('Illegal request')
    }
    else {
      const results = await Course.find({ $text: { $search: req.body.searchterm } })
      if (results.length!=0) {
        console.log("Results displayed: ",results.length)
        res.status(200).send(results)
      }
      else{
        console.log("No results found!")
        res.status(404).send("No results found!")
      }
    }
  })
//get educator courses
  router.post('/educator', async (req, res) => {
    console.log(req.body)
    if(req.body.id== null||undefined)
    res.status(400).send("Parameter ID not set")
    else{
      const educatorCourses=await Course.find({author_id:req.body.id})
      if(educatorCourses){
        res.status(200).send(educatorCourses)
        console.log("Educator courses displayed")
      }
      else{
        res.status(404).send("No courses available")
      }
    }
  })
// get student courses
  router.post('/student', async (req, res) => {
    console.log(req.body)
    if(req.body.courses== null||undefined)
    res.status(400).send("List of subscribed courses not sent")
    else{
        coursesArr=[]
        req.body.courses.forEach(async el=>{
            const studentCourse=await Course.findOne({id:el})
            if(studentCourse){
                coursesArr.push(studentCourse)
            }
        })
        if(coursesArr.length!=0){
        res.status(200).send(coursesArr)
        console.log("Student's courses displayed")
      }
      else{
        res.status(404).send("No courses")
      }
    }
  })
//fetch course content
  router.post('/content', async (req, res) => {
    if(req.body.course_id == null)
    res.status(400).send("Course ID not set")
    else{
        const coursecontent=await Course.findOne({id:req.body.course_id})
        if(coursecontent){
          res.status(200).send(coursecontent)
          console.log("Course content displayed")
      }
      else{
        res.status(404).send("Unable to fetch data")
      }
    }
  })
  module.exports=router