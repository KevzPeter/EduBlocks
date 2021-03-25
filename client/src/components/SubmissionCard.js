import React,{useState} from 'react'
import user_logo from '../assets/student1.png'
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, Badge, Modal } from 'react-bootstrap'
import '../styles/SubmissionCard.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const axios = require('axios')

export const SubmissionCard=()=>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        getSubmission()
    };
    const [renderPDF,setRenderPDF]=useState(null)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [grade,setGrade]=useState();

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

      const getSubmission=()=>{
         fetch('http://localhost:4000/submissions').then(response => response.json())
         .then(data =>setRenderPDF(data.content.data));
      }
    return(
        <div className="submission-card">
            <div className="submit-img">
                <img src={user_logo} alt="user_img"></img>
            </div>
            <div className="submission-content">
                <p id='std-name'>Submitted by: Kevin Peter</p>
                <p id='scourse-title'>Course: Introduction to Blockchain</p>
                <p id='course-assgn'>Assignment: Explain Proof-of-Work in Blockchain Technology</p>
                <p id='marks'>Marks: <Badge variant='info'>ungraded</Badge></p>
                <Button className="btn-info" onClick={handleShow} >Grade Submission</Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Grade Submission</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                {renderPDF?(<Document file={{data: renderPDF}} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} />
                                </Document>):(<p>Loading...</p>)}
                                    <p>Page {pageNumber} of {numPages}</p>
                                    <div className="buttonc"> 
                                    <Button disabled={pageNumber <= 1} onClick={previousPage} className="mx-2">Previous</Button> 
                                    <Button disabled={pageNumber >= numPages} onClick={nextPage}>Next</Button> 
                                    </div>
                                    <div className="form-field marks">
                                            <label htmlFor="grade">Marks <i className="fas fa-clipboard-check"></i></label>
                                            <input type="number" id="grade" name="Grade" max="100" min="0" placeholder="Grade" onChange={e=>{setGrade(e.target.value)}}></input>
                                            </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={handleClose}>Cancel</Button>
                                        <Button variant="success">Set Grade</Button>
                                    </Modal.Footer>
                                </Modal>
            </div>
        </div>
    )
}
export default SubmissionCard