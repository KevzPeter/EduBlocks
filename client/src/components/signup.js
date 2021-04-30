import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../styles/Login.css'

export const Signup = ({ address, contract }) => {

    const history = useHistory();
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [succ, setSucc] = useState(false)
    const [fail, setFail] = useState(false)
    const [type, setType] = useState(true)
    const [passerr, setPasserr] = useState(false)

    const success = () => {
        history.push("/login")
    }
    const addUser=async()=>{
        if(type===true){
            await contract.methods.addStudent(name,pass)
            .send({from:address}, (err, hash) => {
                if (err) { 
                console.log("Error: ", err) 
                setFail(true)
                }
                else{
                    console.log("Hash: ", hash)
                    setSucc(true)
                }

            })
        }
      else{
        await contract.methods.addEducator(name,pass)
        .send({from:address}, (err, hash) => {
            if (err) { 
            console.log("Error: ", err) 
            setFail(true)
            }
            else{
                console.log("Hash: ", hash)
                setSucc(true)
            }

        })
      }
      }
    const passError = () => {
        return (
            <div className="alert alert-danger" role="alert">
                <p>Password should contain more than 8 characters</p>
            </div>
        )
    }
    const failure = () => {
        return (
            <div className="alert alert-danger" role="alert">
                <h4>Failed! Try again after sometime</h4>
            </div>
        )
    }
    // const checkpassword = () => {
    //     if (pass.length < 8) {
    //         setPasserr(true)
    //         return false;
    //     }
    //     else {
    //         setPasserr(false)
    //         return true;
    //     }
    // }
    // const checkblank = () => {
    //     if (name.length === 0 || name.length === undefined || pass.length === 0 || pass.length === undefined) {
    //         setBlankerr(true)
    //         return false;
    //     }
    //     else {
    //         setBlankerr(false)
    //         return true;
    //     }
    // }
    const post = () => {
        if(pass.length<8){
            setPasserr(true)
        }
        else{
            addUser()
        }
    }
    return (
        <div className="outer-container justify-content-center">
            <div className="text-center py-2">{succ ? success() : fail ? failure() : null}</div>
            <div className="text-center py-2">
                <h4>Signup</h4>
            </div>
            <div className="col-md-4 offset-md-4 py-2">
                <form>
                    <div className="form-field">
                        <span><i className="fas fa-user-circle fa-2x"></i></span>
                        <input className="form-control my-2" type="text" id="name" name="name"
                            placeholder="Name" onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div className="form-field">
                        <span><i className="fas fa-key fa-2x"></i></span>
                        <input className="form-control my-2" type="password" id="pass" name="pass"
                            placeholder="Password" onChange={e => setPass(e.target.value)}></input>
                    </div >
                    <div className='custom-control custom-switch'>
                    <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customSwitchesChecked'
                            defaultChecked
                            onChange={e=>{setType(!type)}}/>
                        <label className='custom-control-label' htmlFor='customSwitchesChecked'>
                            Signup as Student
                        </label>
                    </div>
                    {passerr ? passError() : null}
                </form>
            </div>
            <div className="text-center py-2">
                <button type="submit" className="btn btn-primary" onClick={post}>Register</button>
                <p id="help"><em>Already have an account? </em>
                    <Link to={'/login'}> Login!</Link></p>
            </div>
        </div>
    )
}