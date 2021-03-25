import React from 'react'
import '../styles/CourseCard.css'
import course_logo from '../assets/undraw_Graduation.png'
import Badge from 'react-bootstrap/Badge'

export const CourseCard=({title,desc,subs,price,author,thumbnail,id})=>{
    
    const purchase=()=>{
        if(id==null || id===undefined){
            window.alert('Please login to purchase course')
        }
        else{
            //purchase course
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
                <button className="btn btn-info" onClick={purchase}>Purchase</button>
            </div>
        </div>
    )
}
export default CourseCard