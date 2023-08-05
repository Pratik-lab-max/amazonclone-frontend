import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./signup.css"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {

    const [udata,setUdata] = useState({
        yname:"",
        email:"",
        password:"",
        cpassword:""
    });
    console.log(udata)

    const addData = (e) => {
        const {name,value} = e.target;

        setUdata(() => {
            return {
                ...udata,
                [name]:value
            }
        })
    }

    const senddata = async(e)=>{
        e.preventDefault()
        const {yname,email,password,cpassword} = udata

        const res = await fetch("/register" ,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                yname,email,password,cpassword
            })
        });

        const data = await res.json()
        console.log(data)

        if(res.status === 422 || !data){
            toast.error("Invalid details",{
                position:"top-center",
                theme:"dark"
            })
        }else{
            toast.success("Registered successfully", {
                position:"top-center",
                theme:"dark"
            })
            setUdata({
                ...udata,
                yname:"",
                email:"",
                password:"",
                cpassword:""
            })
        }            
    }

  return (
    <>
        <section>
            <div className="sign_container">
                <div className="sign_header1">
                    <img src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" alt="" />
                </div>
                <div className="reg_form">
                    <form method="POST">
                        <h1>Sign-Up</h1>
                        <div className="form_data">
                            <label htmlFor="yname">Your Name</label>
                            <input type="text" onChange={addData} value={udata.yname} name="yname" id="yname" />
                        </div>
                        
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text" onChange={addData} value={udata.email} name="email" id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={addData} value={udata.password} name="password" placeholder="min 8 character" id="password" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" onChange={addData} value={udata.cpassword} name="cpassword" placeholder="min 8 character" id="cpassword" />
                        </div>
                        <NavLink to="/login"><button className='signin_btn' onClick={senddata}>Continue</button></NavLink>

                        <hr></hr>

                        <div className="signin_info">
                            <p>Already have an account ?</p>
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    </>
  )
}

export default Signup
