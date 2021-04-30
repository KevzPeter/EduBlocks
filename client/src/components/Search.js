import React,{useState,useContext} from 'react'
import CourseCard from './CourseCard'
import {Alert} from 'react-bootstrap'
import { UserContext } from '../UserContext'
const axios=require('axios')


export const Search=({address,t_contract,ts_contract})=>{
    const[search,setSearch]=useState("")
    const [results,setResults]=useState([])
    const[err,setErr]=useState(false)
    const {id}=useContext(UserContext)

    const getResults=async()=>{
        await axios.post('http://localhost:4000/courses/results',{searchterm:search},
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
    const ShowResults=(address,t_contract,ts_contract)=>{
        return(
            err?(<div className="alert-box">
                <Alert variant="danger" id="home-alert">
                No results
              </Alert>
                </div>)
            :(<div>
                {results.map((el,idx)=><CourseCard key={idx} t_contract={t_contract} title={el.name} address={address}
                    desc={el.description} subs={el.users} price={el.price} ts_contract={ts_contract} author_address={el.address}
                    author={el.author} id={id.id} thumbnail={el.thumbnail} type={true} user={id.user}/>)}
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
                <ShowResults address={address}ts_contract={ts_contract} t_contract={t_contract}/>
            </div>
        </div>
    )
}

export default Search