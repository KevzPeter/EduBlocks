import React,{useState} from 'react'
import CourseCard from './CourseCard'
const axios=require('axios')

export const Search=()=>{
    const[search,setSearch]=useState("")
    const [results,setResults]=useState([])

    const getResults=()=>{
        axios.post('http://localhost:4000/course_results',{
            searchterm:search
        }).then(res=>{
            if(res.data!=undefined){
            setResults(res.data)
            }
            
        }).catch(err=>{console.log(err)})
    }
    const ShowResults=()=>{
        return(
        <div>
            {results.map((el,idx)=><CourseCard key={idx} title={el.name} 
           desc={el.description} subs={el.users} price={el.price} author={el.author} />)}
        </div>
           
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