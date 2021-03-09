import {Navbar,Container} from 'react-bootstrap'

const Footer=({address})=>{
    return(
        <div className="footer">  
            <Navbar color="dark" dark>
                <Container>
                    <Navbar.Brand>©2021 Kevin Peter</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer 