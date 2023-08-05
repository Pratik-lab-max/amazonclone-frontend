/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./Cart.css"
import { LoginContext } from '../Context/ContextProvider'

const Cart = () => {

    const {id} = useParams("")
    // console.log(id)
    const history = useNavigate("")
    
    const {account,setAccount} = useContext(LoginContext)
    // console.log(account)

    const [inddata,setInddata] = useState([])
    console.log(inddata)

    const getindata = async()=>{
        const res = await fetch(`/getproductsone/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json()
        // console.log(data)
        if(res.status !==201){
            console.log("no data available")
        }
        else{
            console.log("getdata")
            setInddata(data)
        }
    }

    useEffect(()=>{
        setTimeout(getindata, 1000)
    },getindata,[id])

//add to cart function
    const addtocart = async(id) => {
        const checkres = await fetch(`/addcart/${id}`,{
            method:"POST",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                inddata
            }),
            credentials:"include"
        })
        const data1 = await checkres.json()
        console.log(data1)

        if(checkres.status === 401 || !data1){
            console.log("user invalid")
            alert("user invalid")
        }else{
            // alert("data added into cart")
            history("/buynow")
            setAccount(data1)
        }
    } 

  return (
    <div className='cart_section'>
      {inddata && Object.keys(inddata).length &&  
        <div className="cart_container">
            <div className="left_cart">
                <img src={inddata.detailUrl} alt="cart" />
                <div className="cart_btn">
                    <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
                    <button className='cart_btn2'>Buy Now</button>
                </div>
            </div>
            <div className="right_cart">
                <h3>{inddata.title.shortTitle}</h3>
                <h4>{inddata.title.longTitle}</h4>
                <hr></hr>
                <p className="mrp">M.R.P. : ₹{inddata.price.mrp}</p>
                <p>Deal of the Day : <span style={{color:"red"}}>₹{inddata.price.cost}</span></p>
                <p>You save : <span style={{color:"red"}}>₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span></p>

                <div className="discount_box">
                    <h5>Discount : <span style={{color:"#111"}}>{inddata.discount}</span></h5>
                    <h4>Free Delivery : <span style={{color:"#111",fontWeight:600}}>Oct 3 - 8</span> &nbsp; Details</h4>
                    <p>Fastest Delivery : <span style={{color:"#111",fontWeight:600}}>Tomorrow 11Am</span></p>
                </div>
                <p className='description'>About the Item : <span style={{color:"#565959",fontSize:14,fontWeight:500,letterSpacing:"0.4px"}}>{inddata.description}</span></p>
            </div>
        </div>
      }  
    </div>
  )
}           

export default Cart
