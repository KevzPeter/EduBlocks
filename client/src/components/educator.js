import React,{useState} from 'react'
import { Nav, Button, Badge, Row, Col, Tab, Modal } from 'react-bootstrap'
import '../styles/Educator.css'
const axios = require('axios')

export const Educator = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[name,setName]=useState("")
    const[desc,setDesc]=useState("")
    const[price,setPrice]=useState("")
    const[ques,setQues]=useState("")
    const[dline,setDline]=useState(1)

    const uploadCourse=(e)=>{
        e.preventDefault()
        handleClose()
        axios.post('http://localhost:4000/course',{
            name:name,
            id:3,
            description:desc,
            author:"kevin",
            author_id:27,
            price:price,
            users:0,
            deadline:dline,
            
        }).then(res=>console.log(res)).catch(err=>{
            if(!err){
                console.log("Network Error")
            }else
            console.log(err)}) 
    }
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} className="left-tab-container">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Courses</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Submissions</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Payments</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Button className="btn-primary my-3" onClick={handleShow}>Add Course</Button>
                                <Modal show={show} onHide={handleClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Course</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form className="form-container" >
                                            <div className="form-field">
                                            <label for="name"><i className="fas fa-signature"></i></label>
                                            <input type="text" id="name" name="name" placeholder="Title" onChange={e=>{setName(e.target.value)}}></input>
                                            </div>
                                            <div className="form-field">
                                            <label for="desc"><i className="fas fa-comment-alt"></i></label>
                                            <input type="text" id="desc" name="desc" placeholder="Description" onChange={e=>{setDesc(e.target.value)}}></input>
                                            </div>
                                            <div className="form-field">
                                            <label for="price"><i className="fas fa-dollar-sign"></i></label>
                                            <input type="text" id="price" name="price" placeholder="Price" onChange={e=>{setPrice(e.target.value)}}></input>
                                            </div>
                                            <div className="form-field">
                                            <label for="assignment"><i className="fas fa-file-alt"></i></label>
                                            <input type="text" id="assgn" name="assgn" placeholder="Assignment Question" onChange={e=>{setQues(e.target.value)}}></input>
                                            </div>
                                            <div className="form-field">
                                            <label for="deadline"><i className="fas fa-calendar-check"></i></label>
                                            <input type="number" id="deadline" name="deadline" placeholder="Deadline" onChange={e=>{setDline(e.target.value)}}></input>
                                            </div>
                                        </form>
                                        <Button className="btn-primary mx-3">Upload Thumbnail</Button>
                                        <Button className="btn-primary">Upload Content</Button>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={handleClose}>Cancel</Button>
                                        <Button variant="success" onClick={uploadCourse}>Publish Course</Button>
                                    </Modal.Footer>
                                </Modal>
                                <p>Show list of course cards here</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <p>Hi there this is some text</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h3>Your balance: <Badge variant="success">3000 EDUB</Badge></h3>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}
export default Educator