import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import '../styles/InfoPanel.css'

function InfoPanel({address,name}){
    return(
        <div className="info-panel">
        <div className="left">
            <h4 id='info-name'>Welcome {name || null}</h4>
            <p id='info-address'>Address: {address || null}</p>
        </div>
        <div className="right">
        <Link to='/'><Button variant="dark" >Search Course</Button></Link>
        </div>
    </div>
    )
}

export default InfoPanel