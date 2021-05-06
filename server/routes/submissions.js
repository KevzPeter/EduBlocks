const express=require('express')
const router=express()
const Submission = require('../models/submission')
const path = require('path')
const multer=require('multer')
const upload=multer()
//upload student submission
router.post('/upload',upload.any(),async(req,res,err)=>{
    if (req.body == null || undefined) {
        res.status(400).send('Illegal request')
      }
      else {
          try{
            const checksubmission = await Submission.findOne({ $and:[{std_id:req.body.std_id},{course_id:req.body.course_id}]})
            if (checksubmission) {
              console.log("Already in database, Student ID= ",req.body.std_id," Course ID= ",req.body.course_id)
              res.status(400).send('Already in Database')
            }
            else {
              await Submission.create({
                course_name: req.body.course_name,
                course_id: req.body.course_id,
                std_name: req.body.std_name,
                std_id: req.body.std_id,
                address:req.body.address,
                author: req.body.author,
                author_id: req.body.author_id,
                submission_time:req.body.submission_time,
                transaction_hash: req.body.transaction_hash,
                content:req.files[0].buffer,
                marks:0,
              })
              console.log('Submission added')
              res.status(200).send("Success!")
            }
          }
          catch(e){
              res.status(400).send(e._message)}
        
      }
})
//get submissions for the given educator
router.post('/edu_submissions',async(req,res)=>{
    console.log(req.body)
    if(req.body.id== null||undefined)
    res.status(400).send("Parameter ID not set")
    else{
      const edu_submissions=await Submission.find({author_id:req.body.id})
      if(edu_submissions){
        res.status(200).send(edu_submissions)
        console.log("Submissions to educator displayed")
      }
      else{
        res.status(404).send("No submissions available")
      }
    }
})
//upload marks for submission
router.post('/uploadmarks',async(req,res)=>{
    console.log(req.body)
    if(req.body.std_id== null || req.body.course_id==null)
    res.status(400).send("Parameter ID not set")
    else{
      const submission=await Submission.findOne({ $and:[{std_id:req.body.std_id},{course_id:req.body.course_id}]})
      if(submission){
        submission.marks=req.body.marks
        await submission.save()
        res.status(200).send('Marks updated')
        console.log("Marks updated!")
      }
      else{
        res.status(404).send("Unable to update marks")
      }
    }
})

router.post('/getmarks',async(req,res)=>{
    console.log(req.body)
    if(req.body.std_id== null|| req.body.course_id==null)
    res.status(400).send("Parameter ID not set")
    else{
      const submission=await Submission.findOne({ $and:[{std_id:req.body.std_id},{course_id:req.body.course_id}]})
      if(submission){
        res.status(200).send(submission)
        console.log("Marks Displayed")
      }
      else{
        res.status(404).send("Unable to fetch marks")
      }
    }
})
module.exports=router