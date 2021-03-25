import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Nav, Button, Row, Col, Tab, Form  } from 'react-bootstrap'
import '../styles/Course.css'
import template from '../assets/BlockchainBasics.pdf' 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const Course=()=>{
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    
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
                            <Nav.Item>
                                <Nav.Link eventKey="third">Grades</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                            <div>
                                <Document file={template} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <p>Page {pageNumber} of {numPages}</p>
                                    <div className="buttonc"> 
                                    <Button disabled={pageNumber <= 1} onClick={previousPage} className="mx-2">Previous</Button> 
                                    <Button disabled={pageNumber >= numPages} onClick={nextPage}>Next</Button> 
                                    </div> 
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h3 className="my-2">Question: Explain Proof-of-Work in Blockchain Technology</h3>
                                <Form>
                                    <Form.File 
                                        id="assignment-file"
                                        label="Choose PDF"
                                        custom
                                    />
                                    </Form>
                                <Button className="btn-success my-4">Submit</Button>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h2 className="my-2">Result</h2>
                                <p>You have not completed the assignment yet!</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Course