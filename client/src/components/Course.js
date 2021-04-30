import React, { useState,useEffect,useContext } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Nav, Button, Row, Col, Tab, Form  } from 'react-bootstrap'
import '../styles/Course.css'
import {useLocation} from "react-router-dom";
import { UserContext } from '../UserContext'
const axios=require('axios')
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const Course=({address,contract})=>{

    const {id}=useContext(UserContext)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isContentPicked, setContentPicked] = useState(false)
    const [courseName,setCourseName]=useState(" ")
    const [courseID,setCourseID]=useState(1)
    const [std_Name,setStd_Name]=useState(" ")
    const [std_ID,setStd_ID]=useState(1)
    const [author,setAuthor]=useState(" ")
    const [authorID,setAuthorID]=useState(1)
    const [time,setTime]=useState(" ")
    const [tx,setTx]=useState(" ")
    const [content, setContent] = useState()
    const [question, setQuestion] = useState(" ")
    const [deadline, setDeadline] = useState()
    const [err, setErr] = useState(false)
    const [show, setShow] = useState(false)
    
    let location=useLocation()
    useEffect(()=>{
       getDetails(location)
    },[])

    const getDetails=async(location)=>{
        console.log('getDetails is running!')
        setStd_Name(location.s_name)
        axios.post('http://localhost:4000/courses/content',{course_id:location.c_id}
        ,{headers:{'Content-Type': 'application/json'}}).then(res=>{
            setAuthor(res.data.author)
            setAuthorID(res.data.author_id)
            setContent(res.data.content)
            setCourseID(res.data.id)
            setCourseName(res.data.name)
            setStd_ID(id.id)
            setQuestion(res.data.question)
            setDeadline(res.data.deadline)
        }).catch(err=>{
            if(!err){
                console.log("Network Error")
            }else
            console.log(err)})
        axios.post('http://localhost:4000/submissions/getmarks',{std_id:id.id,course_id:location.c_id}
        ,{headers:{'Content-Type': 'application/json'}}).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            if(!err){
                console.log("Network Error")
            }else
            console.log(err)})
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
      function changePage(offset) { 
        setPageNumber(prevPageNumber => prevPageNumber + offset); 
      } 
      
      function previousPage() { 
        changePage(-1); 
      } 
      
      function nextPage() { 
        changePage(1); 
      } 
      const c_changeHandler = (e) => {
		setContent(e.target.files[0]);
		setContentPicked(true);
	};
      const uploadSubmission=(e)=>{
        e.preventDefault()
        setTime(Math.round((new Date()).getTime() / 1000))
        const form = new FormData()
        form.append("course_name",courseName)
        form.append("course_id",courseID)
        form.append("std_name",std_Name)
        form.append("std_id",std_ID)
        form.append("address",address)
        form.append("author",author)
        form.append("author_id",authorID)
        form.append("content",content)
        //check submission time 
        // await contract.methods.submitAssignment(parseInt(studentID),parseInt(courseID),parseInt(submission_time))
            // .send({from:address}, (err, hash) => {
            //     if (err) 
            //     console.log("Error: ", err) 
            //     else
            //     console.log("Hash: ", hash)
            // setTx(hash)
             form.append("transaction_hash",tx)
            // })
        form.append("submission_time",time)
        axios.post('http://localhost:4000/submissions/upload',form).then(async res=>{
        res.status==200?setErr(false):setErr(true)
        setShow(true)
        }).catch(err=>{
            if(!err){
                console.log("Network Error")
            }else
            console.log(err)}) 
    }
    
    return(
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} className="left-tab-container">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Content</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Assignment</Nav.Link>
                            </Nav.Item>
                            {id.user=='student'?<Nav.Item>
                                <Nav.Link eventKey="third">Grades</Nav.Link>
                            </Nav.Item>:null}
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                            <div>
                                {content?<Document file={{data: content.data}} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} />
                                </Document>:<p>Unavailable</p>}
                                <p>Page {pageNumber} of {numPages}</p>
                                    <div className="buttonc"> 
                                    <Button disabled={pageNumber <= 1} onClick={previousPage} className="mx-2">Previous</Button> 
                                    <Button disabled={pageNumber >= numPages} onClick={nextPage}>Next</Button> 
                                    </div> 
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h6 className="my-2" id="assignment-ques">Assignment Question</h6>
                                <h3 className="my-2">{question}</h3>
                                <Form>
                                    <Form.File 
                                        id="assignment-file"
                                        label="Choose PDF"
                                        custom
                                        onChange={c_changeHandler}
                                    />
                                    </Form>
                                    {isContentPicked ? (<>{(content==null)?"":<p>File {content.name}</p>}
                                    {(content==null)?"":<p>Size: {((content.size)/1000000).toFixed(1)}MB</p>}</>) : (<h6>Upload Assignment</h6>)}
                                <Button className="btn-success my-4" onClick={uploadSubmission} disabled={id.user=='educator'}>Submit</Button>
                                <h6 className="my-2" id="deadline">Submission Deadline <i class="far fa-clock"></i> : 
                                {id.user=='educator'?<p>{deadline} days</p>:<p>{deadline} + Purchase Time</p>}</h6>
                                {show?(err?(<div className="alert alert-danger">
                                    <p>Error</p>
                                </div>):<div className="alert alert-success">
                                    <p>Success</p>
                                </div>):null}
                            </Tab.Pane>
                            {id.user=='student'?<Tab.Pane eventKey="third">
                                <h2 className="my-2">Result</h2>
                            </Tab.Pane>:null}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Course