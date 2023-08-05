/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useContext } from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoginContext } from '../Context/ContextProvider'

const Signin = () => {

    const [logdata,setData] = useState({
        email:"",
        password:""
    });
    console.log(logdata)

    const {account,setAccount} = useContext(LoginContext)

    const addData = (e) => {
        const {name,value} = e.target;

        setData(() => {
            return {
                ...logdata,
                [name]:value
            }
        })
    }

    const senddata = async(e) => {
        e.preventDefault()

        const {email,password} = logdata

        const res = await fetch("/login" ,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });

        const data = await res.json()
        console.log(data)

        if(res.status === 400 || !data){
            // console.log("invalid details")
            toast.error("Invalid details", {
                position:"top-center",
                theme:"dark"
            })

        }else{
            // console.log("data valid")
            setAccount(data)
            toast.success("Login successfully", {
                position:"top-center",
                theme:"dark"
            })
            setData({
                ...logdata,
                email:"",
                password:""
            })
        }
    }

  return (
    <>
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" alt="" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-in</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text" onChange={addData} value={logdata.email} name="email" placeholder="abc@gmail.com" id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={addData} value={logdata.password} name="password" placeholder="min 8 character" id="password" />
                        </div>
                        <NavLink to="/"><button className='signin_btn' onClick={senddata}>Log in</button></NavLink>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New To Amazon</p>
                    <NavLink to="/register"><button>Create Your account here</button></NavLink>
                </div>
            </div>
            <ToastContainer />
        </section>
    </>
  )
}

export default Signin
