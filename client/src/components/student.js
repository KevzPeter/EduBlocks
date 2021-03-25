import React,{useContext} from 'react'
import { UserContext } from '../UserContext'
import { Nav, Button, Badge, Row, Col, Tab, Modal } from 'react-bootstrap'

export const Student=()=>{
    const {id,setID}=useContext(UserContext)
    
    return(
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} className="left-tab-container">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">My Courses</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Payments</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <p>List of student courses</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h3>Your balance: <Badge variant="success">300 EDBX</Badge></h3>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Student