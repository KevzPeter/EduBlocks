import React from 'react'
import '../styles/CourseCard.css'
import course_logo from '../assets/undraw_Graduation.png'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

export const CourseCard=({address,t_contract,ts_contract,title,s_name,c_id,desc,subs,price,author,thumbnail,id,type,user,author_address})=>{
    
    const purchase= async()=>{
        if(id==null){
            window.alert('Create a Student Account to Purchase')
        }
        else{
            await ts_contract.meothds.payEducator(author_address,parseInt(price)).send({from:address}, (err, hash) => {
                if (err) 
                console.log("Error: ", err) 
                else
                console.log("Hash: ", hash)
            })
        }
    }
    return(
        <div className="course-card">
            <div className="course-img">
                <img src={`data:image/png;base64,${thumbnail}`} alt="course_img"></img>
            </div>
            <div className="course-content">
                <p id='course-title'>{title || "No data"}</p>
                <p id='course-desc'>{desc || "No data"}</p>
                <p id='course-subs'>Users: <Badge variant='info'>{subs || "0"}</Badge></p>
                <p id='course-price'>Price: <Badge variant='success'>{price || "No data"}</Badge></p>
                <p id='course-author'>Author: <Badge variant='secondary'>{author || "No data"}</Badge></p>
                {!type?<Link to={{pathname:'/course',c_id:c_id, c_name:title, s_name:s_name}}><Button>Open Course</Button></Link>:
                <Button className="btn-info" onClick={purchase} disabled={user=='educator'}>Purchase</Button>}
            </div>
        </div>
    )
}
export default CourseCard