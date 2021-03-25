import React,{useState,useContext} from 'react'
import CourseCard from './CourseCard'
import {Alert} from 'react-bootstrap'
import { UserContext } from '../UserContext'
const axios=require('axios')


export const Search=()=>{
    const[search,setSearch]=useState("")
    const [results,setResults]=useState([])
    const[err,setErr]=useState(false)
    const {id,setID}=useContext(UserContext)

    const getResults=async()=>{
        await axios.post('http://localhost:4000/results',{searchterm:search},
        {headers:{'Content-Type': 'application/json'}}
        ).then(res=>{
            if(res.data!=undefined){
            setErr(false)
            console.log(res.data)
            setResults(res.data)
            }
        }).catch(err=>{
            console.log(err)
            setErr(true)
        })
    }
    const ShowResults=()=>{
        return(
            err?(<div className="alert-box">
                <Alert variant="danger">
                No results
              </Alert>
                </div>)
            :(<div>
                {results.map((el,idx)=><CourseCard key={idx} title={el.name} 
                    desc={el.description} subs={el.users} price={el.price} 
                    author={el.author} id={id} thumbnail={el.thumbnail}/>)}
            </div>
            )
        )
    }
    return(
        <div className="search-box">
              <div className="input-group mb-3"> 
              <input type="text" className="form-control" placeholder="Search for courses" onChange={e=>setSearch(e.target.value)}></input>
            <div className="input-group-append">
                <button className="btn btn-primary" onClick={getResults}><i className="fas fa-search"></i></button>
            </div>
            </div>
            <div className="course-results">
                <ShowResults/>
            </div>
        </div>
    )
}

export default Search