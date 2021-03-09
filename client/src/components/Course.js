import { Nav, Button, Row, Col, Tab, Form  } from 'react-bootstrap'
import '../styles/Course.css'

export const Course=()=>{
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
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <p>Course Content goes here</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h2 className="my-2">Assignment Question?</h2>
                                <Form>
                                    <Form.File 
                                        id="assignment-file"
                                        label="Choose PDF"
                                        custom
                                    />
                                    </Form>
                                <Button className="btn-success my-4">Submit</Button>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Course