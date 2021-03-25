import React,{useState} from 'react'
import { Nav, Button, Badge, Row, Col, Tab, Modal } from 'react-bootstrap'
import '../styles/Educator.css'
import SubmissionCard from './SubmissionCard'
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
    const [thumbnail, setThumbnail] = useState();
    const [content, setContent] = useState();
	const [isThumbnailPicked, setThumbnailPicked] = useState(false);
	const [isContentPicked, setContentPicked] = useState(false);

	const t_changeHandler = (e) => {
		setThumbnail(e.target.files[0]);
		setThumbnailPicked(true);
	};
    const c_changeHandler = (e) => {
		setContent(e.target.files[0]);
		setContentPicked(true);
	};


    const uploadCourse=(e)=>{
        e.preventDefault()
        handleClose()
        const form = new FormData()
        form.append("name",name)
        form.append("id",1)
        form.append("description",desc)
        form.append("author","Kevin Peter")
        form.append("author_id",1)
        form.append("price",price)
        form.append("question",ques)
        form.append("deadline",dline)
        form.append("thumbnail",thumbnail)
        form.append("content",content)
        axios.post('http://localhost:4000/course',form).then(res=>console.log(res)).catch(err=>{
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
                                        <div>
                                            <input type="file" name="file" onChange={t_changeHandler} />
                                            {isThumbnailPicked ? (<p>Size: {(thumbnail===undefined)?"0":((thumbnail.size)/1000000).toFixed(1)} MB</p>) : (<p>Upload Course thumbnail</p>)}
                                        </div>
                                        <div>
                                            <input type="file" name="file" onChange={c_changeHandler} />
                                            {isContentPicked ? (<p>Size: {(content===undefined)?"0":((content.size)/1000000).toFixed(1)} MB</p>) : (<p>Upload Course content</p>)}
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={handleClose}>Cancel</Button>
                                        <Button variant="success" onClick={uploadCourse}>Publish Course</Button>
                                    </Modal.Footer>
                                </Modal>
                                <p>Show list of courses here</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {/* <p>Assignment Submissions show up here</p> */}
                                <SubmissionCard/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h3>Your balance: <Badge variant="success">3000 EDBX</Badge></h3>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}
export default Educator